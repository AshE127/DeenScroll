import { useAuth } from "./AuthContext.jsx";

export default function UserButton() {
  const { user, isPremium, signInWithGoogle, signOutUser, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return (
      <button style={st.signInBtn} onClick={signInWithGoogle}>
        Sign In
      </button>
    );
  }

  return (
    <div style={st.wrap}>
      {isPremium && <span style={st.premBadge}>⭐ Premium</span>}
      <button style={st.avatar} onClick={signOutUser} title="Tap to sign out">
        {user.photoURL ? (
          <img src={user.photoURL} alt="" style={st.avatarImg} referrerPolicy="no-referrer" />
        ) : (
          <span style={st.avatarLetter}>{(user.displayName || user.email || "U")[0].toUpperCase()}</span>
        )}
      </button>
    </div>
  );
}

const st = {
  signInBtn: {
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(240,230,211,0.5)", padding: "0.4rem 0.8rem", borderRadius: "20px",
    fontSize: "0.7rem", fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif",
  },
  wrap: { display: "flex", alignItems: "center", gap: "0.4rem" },
  premBadge: {
    fontSize: "0.6rem", fontWeight: 700, color: "#FFD93D",
    background: "rgba(255,217,61,0.08)", padding: "0.2rem 0.5rem",
    borderRadius: "10px", whiteSpace: "nowrap",
  },
  avatar: {
    width: "32px", height: "32px", borderRadius: "50%", border: "2px solid rgba(52,211,153,0.3)",
    overflow: "hidden", cursor: "pointer", background: "rgba(52,211,153,0.1)",
    display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
  },
  avatarImg: { width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" },
  avatarLetter: { fontSize: "0.8rem", fontWeight: 700, color: "#34D399" },
};
