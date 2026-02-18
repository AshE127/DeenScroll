import Stripe from 'stripe';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import nodemailer from 'nodemailer';

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

// Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'support@deenscroll.com',
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendWelcomeEmail(toEmail, userName) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #0A0F1C; color: #F0E6D3; padding: 2rem; border-radius: 16px;">
      <h1 style="text-align: center; font-size: 1.8rem;">🌙 Welcome to DeenScroll Premium!</h1>
      <p style="color: #ccc; line-height: 1.7;">Assalamu Alaikum${userName ? ` ${userName}` : ''}! Thank you for subscribing to DeenScroll Premium. May Allah bless you for investing in your deen.</p>
      <h3 style="color: #FFD93D; ">What you now have access to:</h3>
      <ul style="color: #ccc; line-height: 2;">
        <li><strong>Unlimited plays</strong> on all games (Trivia, Surah Match, Emoji Quiz, True or False, Bingo)</li>
        <li><strong>Fun Islamic Facts</strong> — 90+ swipeable facts across 9 categories</li>
        <li><strong>Stories of the Prophets</strong> — 20 powerful stories with reflection prompts</li>
        <li><strong>Miracles of the Quran</strong> — Scientific, numerical & linguistic miracles</li>
        <li><strong>Surah Summaries</strong> — Browse every surah with themes & context</li>
        <li><strong>Mood Reminders</strong> — personalized Quran, Hadith & Duas for 12 moods</li>
        <li><strong>Ad-free experience</strong></li>
        <li><strong>Early access</strong> to new games and content</li>
      </ul>
      <h3 style="color: #34D399;">What's coming soon:</h3>
      <ul style="color: #ccc; line-height: 2;">
        <li>Cloud sync across all your devices</li>
        <li>Leaderboards & weekly challenges</li>
        <li>Ramadan special content</li>
        <li>More games every month</li>
      </ul>
      <div style="text-align: center; margin: 1.5rem 0;">
        <a href="https://deenscroll.com" style="display: inline-block; padding: 0.8rem 2rem; background: linear-gradient(135deg, #FFD93D, #F97316); color: #0A0F1C; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 1rem;">Start Exploring ✨</a>
      </div>
      <p style="color: #888; font-size: 0.75rem; margin-top: 2rem; text-align: center;">
        Need help? Reply to this email or contact us at support@deenscroll.com<br/>
        <a href="https://deenscroll.com/account" style="color: #888;">Manage your subscription</a><br/><br/>
        Scroll Less, Deen More. 🌙<br/>© 2026 DeenScroll
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: '"DeenScroll" <noreply@deenscroll.com>',
    replyTo: 'support@deenscroll.com',
    to: toEmail,
    subject: '🌙 Welcome to DeenScroll Premium!',
    html,
  });
}

export const config = {
  api: {
    bodyParser: false,
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
          const existingDoc = await db.collection('users').doc(firebaseUid).get();
          const userData = existingDoc.exists ? existingDoc.data() : {};

          await db.collection('users').doc(firebaseUid).set({
            premium: true,
            stripeCustomerId: stripeCustomerId,
            subscriptionId: subscriptionId,
            premiumSince: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }, { merge: true });

          // Send welcome email via Gmail SMTP
          const customerEmail = session.customer_details?.email || userData.email;
          const customerName = session.customer_details?.name || userData.displayName || '';
          if (customerEmail) {
            try {
              await sendWelcomeEmail(customerEmail, customerName);
              console.log(`Welcome email sent to: ${customerEmail}`);
            } catch (emailErr) {
              console.error('Email send error (non-fatal):', emailErr.message);
            }
          }

          console.log(`Premium activated for user: ${firebaseUid}`);
        }
        break;
      }

      // Subscription renewed successfully
      case 'invoice.paid': {
        const invoice = event.data.object;
        const stripeCustomerId = invoice.customer;

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
