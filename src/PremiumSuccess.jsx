import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";

export default function PremiumSuccess({ onNavigate }) {
  const { user, isPremium, signInWithGoogle, loading } = useAuth();
  const [checking, setChecking] = useState(true);
  const [dots, setDots] = useState("");

  // Animate loading dots
  useEffect(() => {
    const t = setInterval(() => setDots(d => d.length >= 3 ? "" : d + "."), 500);
    return () => clearInterval(t);
  }, []);

  // Give Firestore a moment to update from webhook
  useEffect(() => {
    const t = setTimeout(() => setChecking(false), 4000);
    return () => clearTimeout(t);
  }, []);

  // If premium confirmed early, stop checking
  useEffect(() => {
    if (isPremium) setChecking(false);
  }, [isPremium]);

  if (loading || checking) {
    return (
      <div style={st.wrap}>
        <style>{css}</style>
        <div style={st.center}>
          <span style={st.loadEmoji}>⭐</span>
          <h2 style={st.loadTitle}>Activating Premium{dots}</h2>
          <p style={st.loadSub}>Confirming your payment. This takes a few seconds.</p>
        </div>
      </div>
    );
  }

  if (isPremium) {
    return (
      <div style={st.wrap}>
        <style>{css}</style>
        <div style={st.center}>
          <span style={st.successEmoji}>🎉</span>
          <h1 style={st.successTitle}>Welcome to Premium!</h1>
          <p style={st.successSub}>
            Alhamdulillah — you now have unlimited access to everything on DeenScroll.
            No limits. No locks. All knowledge.
          </p>

          <div style={st.perksBox}>
            <div style={st.perk}>✓ Unlimited plays on all games</div>
            <div style={st.perk}>✓ Prophet Stories — 20 powerful stories</div>
            <div style={st.perk}>✓ Fun Islamic Facts — 90+ facts</div>
            <div style={st.perk}>✓ Mood Reminders — personalized ayahs & duas</div>
            <div style={st.perk}>✓ Ad-free experience</div>
            <div style={st.perk}>✓ Early access to new content</div>
          </div>

          <div style={st.quickStart}>
            <span style={st.qsLabel}>Start exploring</span>
            <div style={st.qsGrid}>
              {[
                { id: "trivia", emoji: "🧠", name: "Trivia" },
                { id: "stories", emoji: "📜", name: "Stories" },
                { id: "facts", emoji: "💡", name: "Facts" },
                { id: "mood", emoji: "🤲", name: "Mood" },
                { id: "bingo", emoji: "🎯", name: "Bingo" },
                { id: "hadith", emoji: "⚖️", name: "Hadith" },
              ].map(g => (
                <button key={g.id} style={st.qsBtn} onClick={() => onNavigate(g.id)}>
                  <span style={st.qsEmoji}>{g.emoji}</span>
                  <span style={st.qsName}>{g.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button style={st.homeBtn} onClick={() => onNavigate("landing")}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Payment went through but premium not yet in Firestore
  return (
    <div style={st.wrap}>
      <style>{css}</style>
      <div style={st.center}>
        <span style={st.successEmoji}>✅</span>
        <h1 style={st.successTitle}>Payment Received!</h1>
        <p style={st.successSub}>
          Your payment was successful. Premium access is being activated —
          it may take a minute or two. Try refreshing the page shortly.
        </p>

        {!user && (
          <button style={st.signInBtn} onClick={signInWithGoogle}>
            Sign in to activate Premium
          </button>
        )}

        <button style={st.homeBtn} onClick={() => onNavigate("landing")}>
          ← Back to Home
        </button>

        <p style={st.helpText}>
          Still not working after a few minutes? Reach out to us and we'll sort it out.
        </p>
      </div>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Amiri:wght@400;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0A0F1C; }
  button { cursor: pointer; font-family: 'Outfit', sans-serif; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
`;

const st = {
  wrap: {
    minHeight: "100vh",
    background: "linear-gradient(170deg, #0A0F1C 0%, #1A1000 40%, #0A0F1C 100%)",
    fontFamily: "'Outfit', sans-serif",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  center: {
    maxWidth: "440px", width: "100%", padding: "2rem 1.5rem", textAlign: "center",
    animation: "fadeUp 0.5s ease-out",
  },

  // Loading
  loadEmoji: { fontSize: "3rem", display: "block", marginBottom: "1rem", animation: "float 2s ease-in-out infinite" },
  loadTitle: { fontFamily: "'Amiri', serif", fontSize: "1.5rem", color: "#F0E6D3", marginBottom: "0.5rem" },
  loadSub: { fontSize: "0.85rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 },

  // Success
  successEmoji: { fontSize: "4rem", display: "block", marginBottom: "0.75rem" },
  successTitle: { fontFamily: "'Amiri', serif", fontSize: "2rem", color: "#FFD93D", marginBottom: "0.75rem" },
  successSub: { fontSize: "0.9rem", color: "rgba(240,230,211,0.5)", lineHeight: 1.7, marginBottom: "1.5rem" },

  perksBox: {
    background: "rgba(255,217,61,0.04)", border: "1px solid rgba(255,217,61,0.1)",
    borderRadius: "16px", padding: "1rem 1.25rem", marginBottom: "1.5rem", textAlign: "left",
    display: "flex", flexDirection: "column", gap: "0.4rem",
  },
  perk: { fontSize: "0.8rem", color: "rgba(240,230,211,0.55)" },

  quickStart: { marginBottom: "1.5rem" },
  qsLabel: { fontSize: "0.65rem", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.15em", display: "block", marginBottom: "0.75rem" },
  qsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" },
  qsBtn: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem",
    padding: "0.75rem 0.5rem", borderRadius: "14px",
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
  },
  qsEmoji: { fontSize: "1.3rem" },
  qsName: { fontSize: "0.7rem", fontWeight: 600, color: "rgba(240,230,211,0.6)" },

  homeBtn: {
    padding: "0.75rem 1.5rem", borderRadius: "12px",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    color: "rgba(240,230,211,0.5)", fontSize: "0.85rem", fontWeight: 600,
  },

  signInBtn: {
    width: "100%", padding: "0.85rem", borderRadius: "12px", border: "none",
    background: "linear-gradient(135deg, #FFD93D, #F97316)", color: "#0A0F1C",
    fontSize: "0.9rem", fontWeight: 700, marginBottom: "1rem",
  },

  helpText: { fontSize: "0.7rem", color: "rgba(255,255,255,0.15)", marginTop: "1.25rem", lineHeight: 1.5 },
};
