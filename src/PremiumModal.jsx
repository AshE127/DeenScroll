import { useAuth } from "./AuthContext.jsx";

const GAME_NAMES = {
  trivia: "Islamic Trivia",
  "surah-match": "Surah Match",
  emoji: "Guess the Emoji",
  hadith: "True or False",
};

export default function PremiumModal() {
  const { showPremiumModal, closePremiumModal, limitGame, DAILY_LIMITS, user, signInWithGoogle } = useAuth();

  if (!showPremiumModal) return null;

  const gameName = GAME_NAMES[limitGame] || "this game";
  const limit = DAILY_LIMITS[limitGame] || 0;

  const handleUpgrade = async () => {
    if (!user) {
      const result = await signInWithGoogle();
      if (!result) return;
    }
    // Redirect to Stripe checkout
    window.open(
      `https://buy.stripe.com/test_placeholder?client_reference_id=${user?.uid || "guest"}`,
      "_blank"
    );
  };

  return (
    <div style={st.overlay} onClick={closePremiumModal}>
      <div style={st.modal} onClick={e => e.stopPropagation()}>
        {/* Glow accent */}
        <div style={st.glowTop} />

        <span style={st.lockIcon}>🔒</span>
        <h2 style={st.title}>Daily Limit Reached</h2>
        <p style={st.sub}>
          You've used your <strong>{limit} free {gameName}</strong> plays for today.
          Come back tomorrow or upgrade to Premium for unlimited access!
        </p>

        {/* What you get */}
        <div style={st.perksBox}>
          <span style={st.perksTitle}>DeenScroll Premium</span>
          <div style={st.perk}><span style={st.perkCheck}>✓</span> Unlimited plays on all games</div>
          <div style={st.perk}><span style={st.perkCheck}>✓</span> All categories unlocked</div>
          <div style={st.perk}><span style={st.perkCheck}>✓</span> Full stats dashboard</div>
          <div style={st.perk}><span style={st.perkCheck}>✓</span> Ad-free experience</div>
          <div style={st.perk}><span style={st.perkCheck}>✓</span> Early access to new games</div>
          <div style={st.price}>$5<span style={st.pricePer}>/month</span></div>
        </div>

        <button style={st.upgradeBtn} onClick={handleUpgrade}>
          {user ? "⭐ Go Premium" : "Sign in with Google & Go Premium"}
        </button>

        <button style={st.laterBtn} onClick={closePremiumModal}>
          Maybe later — I'll come back tomorrow
        </button>

        <p style={st.footer}>Cancel anytime. No commitment.</p>
      </div>
    </div>
  );
}

const st = {
  overlay: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 200, padding: "1.25rem", fontFamily: "'Outfit', sans-serif",
  },
  modal: {
    background: "linear-gradient(180deg, #1A1F35 0%, #12162A 100%)",
    borderRadius: "24px", padding: "2rem 1.5rem", maxWidth: "380px", width: "100%",
    textAlign: "center", border: "1px solid rgba(255,217,61,0.12)", position: "relative",
    overflow: "hidden", animation: "popIn 0.25s ease-out",
  },
  glowTop: {
    position: "absolute", top: "-40px", left: "50%", transform: "translateX(-50%)",
    width: "200px", height: "80px", background: "radial-gradient(ellipse, rgba(255,217,61,0.15), transparent)",
    borderRadius: "50%", pointerEvents: "none",
  },
  lockIcon: { fontSize: "2.5rem", display: "block", marginBottom: "0.5rem", position: "relative" },
  title: { fontFamily: "'Amiri', serif", fontSize: "1.5rem", color: "#F0E6D3", marginBottom: "0.5rem", position: "relative" },
  sub: { fontSize: "0.85rem", color: "rgba(240,230,211,0.45)", lineHeight: 1.6, marginBottom: "1.25rem", position: "relative" },

  perksBox: {
    background: "rgba(255,217,61,0.04)", border: "1px solid rgba(255,217,61,0.1)",
    borderRadius: "16px", padding: "1rem", marginBottom: "1.25rem", textAlign: "left",
    position: "relative",
  },
  perksTitle: { display: "block", fontSize: "0.7rem", color: "#FFD93D", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.6rem", textAlign: "center" },
  perk: { display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.25rem 0", fontSize: "0.8rem", color: "rgba(240,230,211,0.6)" },
  perkCheck: { color: "#34D399", fontWeight: 700, fontSize: "0.75rem" },
  price: { textAlign: "center", fontSize: "2rem", fontWeight: 800, color: "#F0E6D3", marginTop: "0.75rem" },
  pricePer: { fontSize: "0.85rem", fontWeight: 400, color: "rgba(240,230,211,0.4)" },

  upgradeBtn: {
    width: "100%", padding: "0.9rem", borderRadius: "14px", border: "none",
    background: "linear-gradient(135deg, #FFD93D, #F97316)", color: "#0A0F1C",
    fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", marginBottom: "0.6rem",
    boxShadow: "0 0 30px rgba(255,217,61,0.2)", position: "relative",
    fontFamily: "'Outfit', sans-serif",
  },
  laterBtn: {
    width: "100%", padding: "0.7rem", borderRadius: "12px", border: "none",
    background: "transparent", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem",
    cursor: "pointer", fontFamily: "'Outfit', sans-serif",
  },
  footer: { fontSize: "0.6rem", color: "rgba(255,255,255,0.15)", marginTop: "0.5rem", position: "relative" },
};
