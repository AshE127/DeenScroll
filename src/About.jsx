import { useAuth } from "./AuthContext.jsx";

export default function About({ onBack }) {
  const { user, isPremium, signInWithGoogle } = useAuth();

  return (
    <div style={st.wrap}>
      <style>{css}</style>
      <div style={st.inner}>
        {/* Header */}
        <div style={st.topRow}>
          {onBack && <button style={st.backBtn} onClick={onBack}>← Home</button>}
          <span style={st.topTitle}>About</span>
          <div />
        </div>

        {/* Mission */}
        <div style={st.card}>
          <span style={st.cardEmoji}>🌙</span>
          <h2 style={st.cardTitle}>What is DeenScroll?</h2>
          <p style={st.cardText}>
            DeenScroll was built with one goal: replace your doomscroll with something
            that strengthens your deen. Instead of mindlessly scrolling through social media,
            spend a few minutes learning about Islam through fun, interactive games.
          </p>
          <p style={st.cardText}>
            Every question, every fact, every story is designed to be bite-sized —
            something you can learn in 30 seconds between tasks, on a commute,
            or before bed.
          </p>
        </div>

        {/* What's Inside */}
        <div style={st.card}>
          <h2 style={st.cardTitle}>What's Inside</h2>
          <div style={st.featureList}>
            <div style={st.feature}>
              <span style={st.featureEmoji}>🧠</span>
              <div>
                <span style={st.featureName}>Islamic Trivia</span>
                <span style={st.featureDesc}>150+ questions across Quran, Seerah, Prophets, Fiqh, History & Ramadan</span>
              </div>
            </div>
            <div style={st.feature}>
              <span style={st.featureEmoji}>📖</span>
              <div>
                <span style={st.featureName}>Surah Match</span>
                <span style={st.featureDesc}>Match Arabic surah names with their English translations</span>
              </div>
            </div>
            <div style={st.feature}>
              <span style={st.featureEmoji}>🤔</span>
              <div>
                <span style={st.featureName}>Guess the Emoji</span>
                <span style={st.featureDesc}>64 Islamic concepts represented by emojis</span>
              </div>
            </div>
            <div style={st.feature}>
              <span style={st.featureEmoji}>⚖️</span>
              <div>
                <span style={st.featureName}>True or False</span>
                <span style={st.featureDesc}>80 hadith statements — test your knowledge</span>
              </div>
            </div>
            <div style={st.feature}>
              <span style={st.featureEmoji}>🎯</span>
              <div>
                <span style={st.featureName}>Islamic Bingo</span>
                <span style={st.featureDesc}>Daily & weekly deed tracking with streaks</span>
              </div>
            </div>
            <div style={st.feature}>
              <span style={st.featureEmoji}>💡</span>
              <div>
                <span style={st.featureName}>Fun Islamic Facts</span>
                <span style={st.featureDesc}>90+ swipeable facts across 9 categories</span>
              </div>
            </div>
            <div style={st.feature}>
              <span style={st.featureEmoji}>📜</span>
              <div>
                <span style={st.featureName}>Stories of the Prophets</span>
                <span style={st.featureDesc}>20 powerful stories with reflection prompts</span>
              </div>
            </div>
            <div style={st.feature}>
              <span style={st.featureEmoji}>🤲</span>
              <div>
                <span style={st.featureName}>Mood Reminders</span>
                <span style={st.featureDesc}>Personalized Quran verses, hadith & duas for 12 moods</span>
              </div>
            </div>
            <div style={st.feature}>
              <span style={st.featureEmoji}>✨</span>
              <div>
                <span style={st.featureName}>Miracles of the Quran</span>
                <span style={st.featureDesc}>Scientific, numerical & linguistic miracles with references</span>
              </div>
            </div>
            <div style={st.feature}>
              <span style={st.featureEmoji}>📖</span>
              <div>
                <span style={st.featureName}>Surah Summaries</span>
                <span style={st.featureDesc}>Browse summaries, themes & context for every surah</span>
              </div>
            </div>
          </div>
        </div>

        {/* Premium */}
        {!isPremium && (
          <div style={st.premCard}>
            <span style={st.cardEmoji}>⭐</span>
            <h2 style={st.premTitle}>DeenScroll Premium</h2>
            <p style={st.cardText}>
              Unlimited plays on all games, access to Facts, Stories & Mood Reminders,
              all trivia categories unlocked, ad-free experience, and early access to new content.
            </p>
            <p style={st.premPrice}>$5/month</p>
            <button style={st.premBtn} onClick={() => {
              if (!user) signInWithGoogle();
              else window.open(`https://buy.stripe.com/aFaeVe2jt6Wb9IG3pi28800?client_reference_id=${user?.uid || 'guest'}`, '_blank');
            }}>
              🌙 Unlock All Access
            </button>
          </div>
        )}

        {/* Contact */}
        <div style={st.card}>
          <h2 style={st.cardTitle}>Contact Us</h2>
          <p style={st.cardText}>
            Have questions, feedback, or just want to say salaam? We'd love to hear from you.
          </p>
          <a href="mailto:support@deenscroll.com" style={st.contactBtn}>
            ✉️ support@deenscroll.com
          </a>
          <p style={st.cardTextSmall}>
            We typically respond within 24 hours.
          </p>
        </div>

        {/* Footer */}
        <div style={st.footer}>
          <span style={st.footerLogo}>🌙 DeenScroll</span>
          <span style={st.footerTagline}>Scroll Less, Deen More.</span>
          <span style={st.footerCopy}>© 2026 DeenScroll. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Amiri:wght@400;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  body { background: #0A0F1C; }
  button { cursor: pointer; font-family: 'Outfit', sans-serif; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
`;

const st = {
  wrap: {
    minHeight: "100vh", fontFamily: "'Outfit', sans-serif",
    background: "linear-gradient(170deg, #0A0F1C 0%, #0F1A2E 50%, #0A0F1C 100%)",
  },
  inner: {
    maxWidth: "480px", margin: "0 auto", padding: "1.25rem 1rem",
    minHeight: "100vh", display: "flex", flexDirection: "column", gap: "1rem",
  },

  topRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  backBtn: { background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" },
  topTitle: { fontFamily: "'Amiri', serif", fontSize: "1.4rem", color: "#F0E6D3", fontWeight: 700 },

  card: {
    padding: "1.25rem", background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px",
    animation: "fadeUp 0.3s ease-out",
  },
  cardEmoji: { fontSize: "2rem", display: "block", marginBottom: "0.5rem" },
  cardTitle: { fontFamily: "'Amiri', serif", fontSize: "1.2rem", color: "#F0E6D3", marginBottom: "0.6rem" },
  cardText: { fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: "0.5rem" },
  cardTextSmall: { fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", lineHeight: 1.5, marginTop: "0.5rem" },

  featureList: { display: "flex", flexDirection: "column", gap: "0.6rem" },
  feature: { display: "flex", gap: "0.6rem", alignItems: "flex-start" },
  featureEmoji: { fontSize: "1.2rem", marginTop: "0.1rem" },
  featureName: { display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#F0E6D3" },
  featureDesc: { display: "block", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.4 },

  premCard: {
    padding: "1.25rem", background: "rgba(255,217,61,0.03)",
    border: "1px solid rgba(255,217,61,0.12)", borderRadius: "20px",
    textAlign: "center", animation: "fadeUp 0.3s ease-out",
  },
  premTitle: { fontFamily: "'Amiri', serif", fontSize: "1.2rem", color: "#FFD93D", marginBottom: "0.6rem" },
  premPrice: { fontSize: "1.5rem", fontWeight: 700, color: "#FFD93D", margin: "0.5rem 0" },
  premBtn: {
    padding: "0.75rem 1.5rem", borderRadius: "12px", border: "none",
    background: "linear-gradient(135deg, #FFD93D, #F97316)", color: "#0A0F1C",
    fontSize: "0.9rem", fontWeight: 700,
  },

  contactRow: { display: "flex", alignItems: "center", gap: "0.5rem", margin: "0.5rem 0" },
  contactIcon: { fontSize: "1.1rem" },
  contactText: { fontSize: "0.85rem", color: "#34D399", fontWeight: 600 },
  contactBtn: {
    display: "inline-block", padding: "0.6rem 1.2rem", borderRadius: "12px",
    background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)",
    color: "#34D399", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none",
    marginBottom: "0.5rem",
  },

  footer: {
    textAlign: "center", padding: "1.5rem 0", marginTop: "auto",
    display: "flex", flexDirection: "column", gap: "0.3rem",
  },
  footerLogo: { fontFamily: "'Amiri', serif", fontSize: "1.1rem", color: "#F0E6D3", fontWeight: 700 },
  footerTagline: { fontSize: "0.7rem", color: "rgba(255,255,255,0.2)", fontStyle: "italic" },
  footerCopy: { fontSize: "0.6rem", color: "rgba(255,255,255,0.12)", marginTop: "0.3rem" },
};
