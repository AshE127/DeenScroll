import { useState } from "react";
import { useAuth } from "./AuthContext.jsx";

export default function Account({ onBack }) {
  const { user, isPremium, signInWithGoogle, signOutUser, getRemainingPlays } = useAuth();
  const [portalLoading, setPortalLoading] = useState(false);

  const openPortal = async () => {
    if (!user) return;
    setPortalLoading(true);
    try {
      const res = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firebaseUid: user.uid }),
      });
      const data = await res.json();
      if (data.url) {
        window.open(data.url, "_blank");
      } else {
        alert("Could not open subscription management. Please try again or email support@deenscroll.com");
      }
    } catch (err) {
      alert("Something went wrong. Please email support@deenscroll.com");
    }
    setPortalLoading(false);
  };

  if (!user) {
    return (
      <div style={st.wrap}>
        <style>{css}</style>
        <div style={st.inner}>
          <div style={st.topRow}>
            {onBack && <button style={st.backBtn} onClick={onBack}>← Home</button>}
            <span style={st.topTitle}>Account</span>
            <div />
          </div>
          <div style={st.signInBox}>
            <span style={st.signInEmoji}>🔐</span>
            <h2 style={st.signInTitle}>Sign In</h2>
            <p style={st.signInText}>Sign in to track your progress, save bookmarks, and manage your subscription.</p>
            <button style={st.googleBtn} onClick={signInWithGoogle}>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  const limitedGames = [
    { id: "trivia", name: "Islamic Trivia", limit: 10 },
    { id: "surah-match", name: "Surah Match", limit: 5 },
    { id: "emoji", name: "Emoji Quiz", limit: 5 },
    { id: "hadith", name: "True or False", limit: 10 },
  ];

  return (
    <div style={st.wrap}>
      <style>{css}</style>
      <div style={st.inner}>
        {/* Header */}
        <div style={st.topRow}>
          {onBack && <button style={st.backBtn} onClick={onBack}>← Home</button>}
          <span style={st.topTitle}>Account</span>
          <div />
        </div>

        {/* Profile */}
        <div style={st.profileCard}>
          <div style={st.avatarWrap}>
            {user.photoURL ? (
              <img src={user.photoURL} alt="" style={st.avatar} referrerPolicy="no-referrer" />
            ) : (
              <div style={st.avatarFallback}>{(user.displayName || "U")[0]}</div>
            )}
          </div>
          <h2 style={st.profileName}>{user.displayName || "User"}</h2>
          <p style={st.profileEmail}>{user.email}</p>
        </div>

        {/* Membership */}
        <div style={isPremium ? st.memberCardPrem : st.memberCardFree}>
          <div style={st.memberTop}>
            <span style={st.memberIcon}>{isPremium ? "⭐" : "🆓"}</span>
            <div>
              <span style={isPremium ? st.memberLabelPrem : st.memberLabelFree}>
                {isPremium ? "Premium Member" : "Free Plan"}
              </span>
              <span style={st.memberSub}>
                {isPremium ? "$5.00/month • Auto-renews monthly" : "Limited daily plays"}
              </span>
            </div>
          </div>

          {isPremium ? (
            <>
              <div style={st.premPerks}>
                <span style={st.perkItem}>✓ Unlimited plays on all games</span>
                <span style={st.perkItem}>✓ Fun Islamic Facts — 90+ facts</span>
                <span style={st.perkItem}>✓ Stories of the Prophets — 20 stories with reflections</span>
                <span style={st.perkItem}>✓ Mood Reminders — personalized ayahs & duas</span>
                <span style={st.perkItem}>✓ Ad-free experience</span>
                <span style={st.perkItem}>✓ Early access to new content</span>
              </div>
              <button style={st.manageBtn} onClick={openPortal} disabled={portalLoading}>
                {portalLoading ? "Opening..." : "Manage Subscription"}
              </button>
              <p style={st.manageNote}>
                Update payment method, view invoices, or cancel anytime.
                Powered by Stripe — secure and instant.
              </p>
            </>
          ) : (
            <>
              <div style={st.freeInfo}>
                <span style={st.freeHeader}>Today's remaining plays:</span>
                {limitedGames.map(g => {
                  const remaining = getRemainingPlays(g.id);
                  return (
                    <div key={g.id} style={st.freeRow}>
                      <span style={st.freeName}>{g.name}</span>
                      <span style={{
                        ...st.freeCount,
                        color: remaining <= 0 ? "#FF6B6B" : remaining <= 2 ? "#FFD93D" : "#34D399",
                      }}>
                        {remaining <= 0 ? "Limit reached" : `${remaining}/${g.limit} left`}
                      </span>
                    </div>
                  );
                })}
                <span style={st.freeNote}>Bingo, Facts, Stories, Mood — unlimited for all</span>
              </div>
              <button style={st.upgradeBtn} onClick={() => {
                window.open(
                  `https://buy.stripe.com/aFaeVe2jt6Wb9IG3pi28800?client_reference_id=${user.uid}`,
                  "_blank"
                );
              }}>
                ⭐ Upgrade to Premium — $5/mo
              </button>
            </>
          )}
        </div>

        {/* Actions */}
        <div style={st.actionsCard}>
          <button style={st.actionItem} onClick={signOutUser}>
            <span>🚪</span>
            <span style={st.actionText}>Sign Out</span>
          </button>
        </div>

        {/* Info */}
        <p style={st.footerNote}>
          Questions? Contact support@deenscroll.com
        </p>
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

  // SIGN IN
  signInBox: {
    flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", textAlign: "center", gap: "0.75rem",
  },
  signInEmoji: { fontSize: "3rem" },
  signInTitle: { fontFamily: "'Amiri', serif", fontSize: "1.6rem", color: "#F0E6D3" },
  signInText: { fontSize: "0.85rem", color: "rgba(255,255,255,0.35)", maxWidth: "300px", lineHeight: 1.6 },
  googleBtn: {
    padding: "0.8rem 1.5rem", borderRadius: "12px", border: "none",
    background: "linear-gradient(135deg, #34D399, #059669)", color: "#0A0F1C",
    fontSize: "0.95rem", fontWeight: 700, marginTop: "0.5rem",
  },

  // PROFILE
  profileCard: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem",
    padding: "1.5rem", background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px",
    animation: "fadeUp 0.3s ease-out",
  },
  avatarWrap: { marginBottom: "0.3rem" },
  avatar: { width: "64px", height: "64px", borderRadius: "50%", border: "3px solid rgba(52,211,153,0.3)" },
  avatarFallback: {
    width: "64px", height: "64px", borderRadius: "50%", background: "rgba(52,211,153,0.1)",
    border: "3px solid rgba(52,211,153,0.3)", display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: "1.5rem", fontWeight: 700, color: "#34D399",
  },
  profileName: { fontSize: "1.2rem", fontWeight: 700, color: "#F0E6D3" },
  profileEmail: { fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" },

  // MEMBERSHIP
  memberCardFree: {
    padding: "1.25rem", background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px",
  },
  memberCardPrem: {
    padding: "1.25rem", background: "rgba(255,217,61,0.03)",
    border: "1px solid rgba(255,217,61,0.12)", borderRadius: "20px",
  },
  memberTop: { display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" },
  memberIcon: { fontSize: "1.8rem" },
  memberLabelFree: { display: "block", fontSize: "1rem", fontWeight: 700, color: "#F0E6D3" },
  memberLabelPrem: { display: "block", fontSize: "1rem", fontWeight: 700, color: "#FFD93D" },
  memberSub: { display: "block", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", marginTop: "0.1rem" },

  premPerks: { display: "flex", flexDirection: "column", gap: "0.35rem", marginBottom: "1rem" },
  perkItem: { fontSize: "0.8rem", color: "rgba(52,211,153,0.7)" },

  freeInfo: { display: "flex", flexDirection: "column", gap: "0.3rem", marginBottom: "1rem" },
  freeItem: { fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" },

  upgradeBtn: {
    width: "100%", padding: "0.85rem", borderRadius: "12px", border: "none",
    background: "linear-gradient(135deg, #FFD93D, #F97316)", color: "#0A0F1C",
    fontSize: "0.95rem", fontWeight: 700, boxShadow: "0 0 25px rgba(255,217,61,0.15)",
  },
  manageBtn: {
    width: "100%", padding: "0.7rem", borderRadius: "12px",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    color: "rgba(240,230,211,0.5)", fontSize: "0.8rem", fontWeight: 600,
  },
  manageNote: {
    fontSize: "0.65rem", color: "rgba(255,255,255,0.2)", textAlign: "center",
    marginTop: "0.5rem", lineHeight: 1.5,
  },

  freeInfo: { display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1rem" },
  freeHeader: { fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", fontWeight: 600, marginBottom: "0.2rem" },
  freeRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.3rem 0" },
  freeName: { fontSize: "0.8rem", color: "rgba(240,230,211,0.5)" },
  freeCount: { fontSize: "0.75rem", fontWeight: 600 },
  freeNote: { fontSize: "0.65rem", color: "rgba(255,255,255,0.2)", fontStyle: "italic", marginTop: "0.3rem" },

  // ACTIONS
  actionsCard: {
    padding: "0.5rem", background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px",
  },
  actionItem: {
    display: "flex", alignItems: "center", gap: "0.6rem", width: "100%",
    padding: "0.7rem 0.5rem", background: "none", border: "none",
    color: "#FF6B6B", fontSize: "0.85rem", fontWeight: 600, borderRadius: "10px",
  },
  actionText: {},

  footerNote: {
    fontSize: "0.65rem", color: "rgba(255,255,255,0.15)", textAlign: "center",
    marginTop: "auto", paddingTop: "1rem",
  },
};
