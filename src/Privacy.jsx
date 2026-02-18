export default function Privacy({ onBack }) {
  return (
    <div style={st.wrap}>
      <style>{css}</style>
      <div style={st.inner}>
        <div style={st.topRow}>
          {onBack && <button style={st.backBtn} onClick={onBack}>← Home</button>}
          <span style={st.topTitle}>Privacy Policy</span>
          <div />
        </div>

        <div style={st.card}>
          <p style={st.updated}>Last updated: February 18, 2026</p>

          <h2 style={st.h2}>Introduction</h2>
          <p style={st.p}>
            DeenScroll ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website at deenscroll.com and any associated services (collectively, the "Service").
          </p>

          <h2 style={st.h2}>Information We Collect</h2>
          <h3 style={st.h3}>Information you provide</h3>
          <p style={st.p}>
            When you create an account using Google Sign-In, we receive your name, email address, and profile photo from Google. When you subscribe to DeenScroll Premium, your payment is processed securely by Stripe. We do not store your credit card details — Stripe handles all payment information directly.
          </p>
          <h3 style={st.h3}>Information collected automatically</h3>
          <p style={st.p}>
            We collect game progress and scores, which are stored locally on your device using browser storage. We use Google Analytics to collect anonymous usage data including pages visited, time spent, device type, and general location. We may use cookies and similar technologies to maintain your session and preferences.
          </p>

          <h2 style={st.h2}>How We Use Your Information</h2>
          <p style={st.p}>
            We use your information to provide and maintain the Service, process premium subscriptions and payments, track your game progress and achievements, improve and optimize the Service, send important updates about your account or subscription, and display relevant advertisements to free-tier users through Google AdSense.
          </p>

          <h2 style={st.h2}>Third-Party Services</h2>
          <p style={st.p}>
            We use the following third-party services that may collect information about you:
          </p>
          <p style={st.p}>
            <strong style={st.strong}>Google Sign-In</strong> — for authentication. Subject to Google's Privacy Policy.
          </p>
          <p style={st.p}>
            <strong style={st.strong}>Stripe</strong> — for payment processing. Subject to Stripe's Privacy Policy.
          </p>
          <p style={st.p}>
            <strong style={st.strong}>Google Analytics</strong> — for usage analytics. Subject to Google's Privacy Policy.
          </p>
          <p style={st.p}>
            <strong style={st.strong}>Google AdSense</strong> — for displaying advertisements to free-tier users. AdSense may use cookies to serve ads based on your prior visits to this or other websites. You can opt out of personalized advertising by visiting Google's Ads Settings.
          </p>
          <p style={st.p}>
            <strong style={st.strong}>Amazon Associates</strong> — we participate in the Amazon Associates Program, an affiliate advertising program. Links to products on Amazon may earn us a commission at no additional cost to you.
          </p>
          <p style={st.p}>
            <strong style={st.strong}>Firebase</strong> — for data storage and hosting. Subject to Google's Privacy Policy.
          </p>

          <h2 style={st.h2}>Data Storage and Security</h2>
          <p style={st.p}>
            Your account information is stored securely in Google Firebase. Game progress is stored locally on your device. We implement appropriate security measures to protect your personal information, but no method of transmission over the Internet is 100% secure.
          </p>

          <h2 style={st.h2}>Your Rights</h2>
          <p style={st.p}>
            You can access and update your account information through the Account page. You can delete your account by contacting us at support@deenscroll.com. You can manage your subscription through the Stripe Customer Portal accessible from your Account page. You can opt out of personalized ads through Google's Ads Settings.
          </p>

          <h2 style={st.h2}>Children's Privacy</h2>
          <p style={st.p}>
            DeenScroll is designed to be family-friendly and suitable for all ages. We do not knowingly collect personal information from children under 13 without parental consent. If you believe we have collected information from a child under 13, please contact us immediately.
          </p>

          <h2 style={st.h2}>Changes to This Policy</h2>
          <p style={st.p}>
            We may update this Privacy Policy from time to time. We will notify users of any material changes by posting the new policy on this page with an updated date.
          </p>

          <h2 style={st.h2}>Contact Us</h2>
          <p style={st.p}>
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <p style={st.contact}>
            📧 <a href="mailto:support@deenscroll.com" style={st.link}>support@deenscroll.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Amiri:wght@400;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0A0F1C; }
`;

const st = {
  wrap: {
    minHeight: "100vh", fontFamily: "'Outfit', sans-serif",
    background: "linear-gradient(170deg, #0A0F1C 0%, #0F1A2E 50%, #0A0F1C 100%)",
  },
  inner: { maxWidth: "580px", margin: "0 auto", padding: "1.25rem 1rem", minHeight: "100vh" },
  topRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" },
  backBtn: { background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", cursor: "pointer", fontFamily: "'Outfit', sans-serif" },
  topTitle: { fontFamily: "'Amiri', serif", fontSize: "1.4rem", color: "#F0E6D3", fontWeight: 700 },
  card: {
    padding: "1.5rem", background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px",
  },
  updated: { fontSize: "0.7rem", color: "rgba(255,255,255,0.2)", marginBottom: "1.2rem" },
  h2: { fontFamily: "'Amiri', serif", fontSize: "1.1rem", color: "#F0E6D3", margin: "1.5rem 0 0.6rem 0" },
  h3: { fontSize: "0.85rem", color: "#FFD93D", margin: "0.8rem 0 0.4rem 0", fontWeight: 600 },
  p: { fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: "0.5rem" },
  strong: { color: "rgba(255,255,255,0.55)" },
  contact: { fontSize: "0.85rem", color: "#34D399", marginTop: "0.5rem" },
  link: { color: "#34D399", textDecoration: "none" },
};
