export default function Terms({ onBack }) {
  return (
    <div style={st.wrap}>
      <style>{css}</style>
      <div style={st.inner}>
        <div style={st.topRow}>
          {onBack && <button style={st.backBtn} onClick={onBack}>← Home</button>}
          <span style={st.topTitle}>Terms of Service</span>
          <div />
        </div>

        <div style={st.card}>
          <p style={st.updated}>Last updated: February 18, 2026</p>

          <h2 style={st.h2}>Agreement to Terms</h2>
          <p style={st.p}>
            By accessing or using DeenScroll at deenscroll.com ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
          </p>

          <h2 style={st.h2}>Description of Service</h2>
          <p style={st.p}>
            DeenScroll is an Islamic educational platform that provides interactive games, quizzes, and content designed to help users learn about Islam. The Service includes both free and premium tiers.
          </p>

          <h2 style={st.h2}>Accounts</h2>
          <p style={st.p}>
            To access certain features, you must sign in using Google Sign-In. You are responsible for maintaining the security of your account. You must provide accurate information when creating your account. You may not use the Service for any illegal or unauthorized purpose.
          </p>

          <h2 style={st.h2}>Free and Premium Tiers</h2>
          <p style={st.p}>
            DeenScroll offers a free tier with daily play limits and advertisements, and a premium tier ("DeenScroll Premium") for $5.00 USD per month. Premium features include unlimited plays on all games, access to exclusive content, ad-free experience, and early access to new features.
          </p>

          <h2 style={st.h2}>Payments and Subscriptions</h2>
          <p style={st.p}>
            Premium subscriptions are billed monthly through Stripe. Your subscription will automatically renew each month unless cancelled. You may cancel your subscription at any time through the Account page or Stripe Customer Portal. Cancellations take effect at the end of the current billing period. Refunds are handled on a case-by-case basis — contact us at support@deenscroll.com.
          </p>

          <h2 style={st.h2}>Content Accuracy</h2>
          <p style={st.p}>
            We strive to ensure all Islamic content on DeenScroll is accurate and sourced from authentic references. However, the content is provided for educational purposes only and should not be considered as religious rulings (fatwa). For specific religious guidance, please consult a qualified Islamic scholar.
          </p>

          <h2 style={st.h2}>Intellectual Property</h2>
          <p style={st.p}>
            All content, design, and code on DeenScroll is owned by DeenScroll and protected by applicable laws. You may not copy, modify, distribute, or reproduce any part of the Service without our written permission.
          </p>

          <h2 style={st.h2}>Affiliate Links</h2>
          <p style={st.p}>
            DeenScroll participates in affiliate programs, including the Amazon Associates Program. Some links on the Service may be affiliate links, meaning we earn a small commission if you make a purchase through them. This comes at no additional cost to you. We only recommend products we believe are relevant and beneficial.
          </p>

          <h2 style={st.h2}>Advertisements</h2>
          <p style={st.p}>
            Free-tier users may see advertisements served by Google AdSense. These ads may use cookies to display relevant content. Premium subscribers enjoy an ad-free experience.
          </p>

          <h2 style={st.h2}>Limitation of Liability</h2>
          <p style={st.p}>
            DeenScroll is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the Service. We do not guarantee uninterrupted or error-free operation of the Service.
          </p>

          <h2 style={st.h2}>Termination</h2>
          <p style={st.p}>
            We reserve the right to terminate or suspend your account at our discretion, without notice, for conduct that we determine violates these Terms or is harmful to other users or the Service.
          </p>

          <h2 style={st.h2}>Changes to Terms</h2>
          <p style={st.p}>
            We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the new Terms.
          </p>

          <h2 style={st.h2}>Contact Us</h2>
          <p style={st.p}>
            If you have questions about these Terms, please contact us at:
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
  p: { fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: "0.5rem" },
  contact: { fontSize: "0.85rem", color: "#34D399", marginTop: "0.5rem" },
  link: { color: "#34D399", textDecoration: "none" },
};
