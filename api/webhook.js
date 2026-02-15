import Stripe from 'stripe';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin (server-side)
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false, // Stripe needs raw body for signature verification
  },
};

// Read raw body from request
async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let event;

  try {
    const rawBody = await getRawBody(req);
    const sig = req.headers['stripe-signature'];

    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } else {
      // Fallback if no webhook secret set (less secure, for initial testing)
      event = JSON.parse(rawBody.toString());
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  try {
    switch (event.type) {
      // Payment link completed - new subscription
      case 'checkout.session.completed': {
        const session = event.data.object;
        const firebaseUid = session.client_reference_id;
        const stripeCustomerId = session.customer;
        const subscriptionId = session.subscription;

        if (firebaseUid && firebaseUid !== 'guest') {
          await db.collection('users').doc(firebaseUid).set({
            premium: true,
            stripeCustomerId: stripeCustomerId,
            subscriptionId: subscriptionId,
            premiumSince: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }, { merge: true });

          console.log(`Premium activated for user: ${firebaseUid}`);
        }
        break;
      }

      // Subscription renewed successfully
      case 'invoice.paid': {
        const invoice = event.data.object;
        const stripeCustomerId = invoice.customer;

        // Find user by Stripe customer ID
        const snapshot = await db.collection('users')
          .where('stripeCustomerId', '==', stripeCustomerId)
          .limit(1)
          .get();

        if (!snapshot.empty) {
          const userDoc = snapshot.docs[0];
          await userDoc.ref.update({
            premium: true,
            updatedAt: new Date().toISOString(),
          });
          console.log(`Subscription renewed for user: ${userDoc.id}`);
        }
        break;
      }

      // Payment failed
      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const stripeCustomerId = invoice.customer;

        const snapshot = await db.collection('users')
          .where('stripeCustomerId', '==', stripeCustomerId)
          .limit(1)
          .get();

        if (!snapshot.empty) {
          const userDoc = snapshot.docs[0];
          await userDoc.ref.update({
            premiumPaymentFailed: true,
            updatedAt: new Date().toISOString(),
          });
          console.log(`Payment failed for user: ${userDoc.id}`);
        }
        break;
      }

      // Subscription cancelled or expired
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const stripeCustomerId = subscription.customer;

        const snapshot = await db.collection('users')
          .where('stripeCustomerId', '==', stripeCustomerId)
          .limit(1)
          .get();

        if (!snapshot.empty) {
          const userDoc = snapshot.docs[0];
          await userDoc.ref.update({
            premium: false,
            premiumPaymentFailed: false,
            cancelledAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
          console.log(`Premium cancelled for user: ${userDoc.id}`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
