import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";

const MIRACLES = [
  // SCIENTIFIC
  { id: "s1", cat: "Scientific", title: "The Expanding Universe", ayah: "And the heaven We constructed with strength, and indeed, We are [its] expander.", ref: "Quran 51:47", detail: "This verse describes the expansion of the universe — a fact only confirmed by Edwin Hubble in 1929, over 1,300 years after the Quran was revealed." },
  { id: "s2", cat: "Scientific", title: "Embryonic Development", ayah: "We created man from an extract of clay. Then We made him as a drop in a place of settlement, firmly fixed. Then We made the drop into an alaqah (clinging clot)...", ref: "Quran 23:12-14", detail: "The Quran describes the stages of human embryonic development with remarkable accuracy — from nutfah (drop) to alaqah (clinging clot) to mudghah (chewed-like lump) — matching modern embryology." },
  { id: "s3", cat: "Scientific", title: "Mountains as Pegs", ayah: "Have We not made the earth a resting place? And the mountains as stakes?", ref: "Quran 78:6-7", detail: "Modern geology confirms mountains have deep roots extending into the earth's crust, stabilizing tectonic plates — exactly like pegs or stakes, as described in the Quran." },
  { id: "s4", cat: "Scientific", title: "The Barrier Between Seas", ayah: "He released the two seas, meeting [side by side]; between them is a barrier [so] neither of them transgresses.", ref: "Quran 55:19-20", detail: "Where two different bodies of water meet (like the Mediterranean and Atlantic), they maintain distinct temperatures, salinity, and density. This barrier phenomenon was only discovered through modern oceanography." },
  { id: "s5", cat: "Scientific", title: "Iron Sent Down", ayah: "And We sent down iron, wherein is great military might and benefits for the people.", ref: "Quran 57:25", detail: "The Quran uses the word 'sent down' (anzalna) for iron. Scientists now know that iron was not formed on Earth — it came from massive star explosions (supernovae) billions of years ago." },
  { id: "s6", cat: "Scientific", title: "The Frontal Lobe", ayah: "No! If he does not desist, We will surely drag him by the nasiyah — a lying, sinning nasiyah (forelock/front of the head).", ref: "Quran 96:15-16", detail: "The Quran attributes lying and sin to the front of the head (nasiyah). Modern neuroscience confirms the prefrontal cortex, located behind the forehead, controls decision-making, personality, and moral judgment." },
  { id: "s7", cat: "Scientific", title: "Water as the Origin of Life", ayah: "And We made from water every living thing. Will they not then believe?", ref: "Quran 21:30", detail: "Modern biology confirms that all living organisms are predominantly composed of water and that life originated in water — a fact stated in the Quran 1,400 years ago." },
  { id: "s8", cat: "Scientific", title: "The Big Bang", ayah: "Have those who disbelieved not considered that the heavens and the earth were a joined entity, and We separated them?", ref: "Quran 21:30", detail: "This verse describes the universe beginning as a single mass that was then split apart — remarkably consistent with the Big Bang theory, proposed in the 20th century." },
  { id: "s9", cat: "Scientific", title: "Skin Pain Receptors", ayah: "Every time their skins are roasted through, We will replace them with other skins so they may taste the punishment.", ref: "Quran 4:56", detail: "The Quran states that skin is replaced so punishment is felt again. Science confirms pain receptors are primarily in the skin — once burned through, pain sensation is lost until new skin forms." },
  { id: "s10", cat: "Scientific", title: "The Orbit of Celestial Bodies", ayah: "It is not for the sun to overtake the moon, nor does the night outstrip the day. They all float, each in an orbit.", ref: "Quran 36:40", detail: "The Quran states that the sun, moon, and celestial bodies travel in their own orbits — a concept only scientifically understood centuries later." },

  // NUMERICAL
  { id: "n1", cat: "Numerical", title: "The Word 'Day'", ayah: "", ref: "", detail: "The word 'yawm' (day) appears exactly 365 times in the Quran — the same number of days in a solar year." },
  { id: "n2", cat: "Numerical", title: "The Word 'Month'", ayah: "", ref: "", detail: "The word 'shahr' (month) appears exactly 12 times in the Quran — the same number of months in a year." },
  { id: "n3", cat: "Numerical", title: "Sea and Land Ratio", ayah: "", ref: "", detail: "The word 'bahr' (sea) appears 32 times and 'barr' (land) appears 13 times. 32/(32+13) = 71.1% sea and 28.9% land — matching the actual ratio of water to land on Earth." },
  { id: "n4", cat: "Numerical", title: "Man and Woman", ayah: "", ref: "", detail: "The words 'man' and 'woman' each appear exactly 24 times in the Quran, reflecting the equality and balance in creation." },
  { id: "n5", cat: "Numerical", title: "Life and Death", ayah: "", ref: "", detail: "The words 'al-hayat' (life) and 'al-mawt' (death) each appear exactly 145 times in the Quran." },
  { id: "n6", cat: "Numerical", title: "Surah Al-Hadid and Iron", ayah: "", ref: "Quran 57 (Al-Hadid)", detail: "Al-Hadid means 'Iron.' It is the 57th surah. The word 'hadid' (iron) appears in verse 25. The atomic number of iron is 26, and if you count from the first surah revealed (Al-Alaq, 96), Al-Hadid is the 26th in revelation order." },

  // LINGUISTIC
  { id: "l1", cat: "Linguistic", title: "The Inimitable Challenge", ayah: "And if you are in doubt about what We have sent down upon Our Servant, then produce a surah the like thereof...", ref: "Quran 2:23", detail: "The Quran challenges all of humanity and jinn to produce even a single chapter like it. In 1,400 years, no one — Arab poets, scholars, or linguists — has successfully met this challenge." },
  { id: "l2", cat: "Linguistic", title: "Perfect Preservation", ayah: "Indeed, it is We who sent down the Quran and indeed, We will be its guardian.", ref: "Quran 15:9", detail: "Unlike any other ancient text, the Quran has been perfectly preserved letter by letter for over 1,400 years. Manuscripts from the 7th century match today's Quran exactly." },
  { id: "l3", cat: "Linguistic", title: "Unique Literary Form", ayah: "", ref: "", detail: "The Quran is neither poetry nor prose — it is a unique literary form that has never been replicated. Arabic linguists recognize it as its own category of literature, unmatched in rhythm, structure, and eloquence." },
  { id: "l4", cat: "Linguistic", title: "The Unlettered Prophet", ayah: "Those who follow the Messenger, the unlettered Prophet...", ref: "Quran 7:157", detail: "Prophet Muhammad ﷺ could neither read nor write, yet the Quran is the most linguistically sophisticated Arabic text ever produced. This itself is considered a miracle." },
  { id: "l5", cat: "Linguistic", title: "Word Choice Precision", ayah: "", ref: "", detail: "Every word in the Quran is chosen with impossible precision. For example, the Quran uses different words for 'heart' (qalb, fu'ad, sadr) each with distinct meanings — qalb for the spiritual heart, fu'ad for the emotional heart, sadr for the chest/inner self." },
];

const CATS = ["All", "Scientific", "Numerical", "Linguistic"];
const CAT_COLORS = { Scientific: "#4ECDC4", Numerical: "#FFD93D", Linguistic: "#A78BFA" };
const CAT_ICONS = { All: "✦", Scientific: "🔬", Numerical: "🔢", Linguistic: "📝" };

export default function QuranMiracles({ onBack }) {
  const { isPremium, user, signInWithGoogle } = useAuth();
  const [cat, setCat] = useState("All");
  const [idx, setIdx] = useState(0);
  const [anim, setAnim] = useState(false);

  const filtered = cat === "All" ? MIRACLES : MIRACLES.filter(m => m.cat === cat);
  const current = filtered[idx];

  const next = () => {
    if (idx + 1 >= filtered.length) return;
    setAnim(true);
    setTimeout(() => { setIdx(idx + 1); setAnim(false); }, 200);
  };

  const prev = () => {
    if (idx <= 0) return;
    setAnim(true);
    setTimeout(() => { setIdx(idx - 1); setAnim(false); }, 200);
  };

  useEffect(() => { setIdx(0); }, [cat]);

  // Swipe handling
  const [touchStart, setTouchStart] = useState(null);
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 50) next();
    else if (diff < -50) prev();
    setTouchStart(null);
  };

  return (
    <div style={st.wrap}>
      <style>{css}</style>
      <div style={st.inner}>
        <div style={st.topRow}>
          <button style={st.backBtn} onClick={onBack}>← Back</button>
          <span style={st.topTitle}>Miracles of the Quran</span>
          <span style={st.counter}>{idx + 1}/{filtered.length}</span>
        </div>

        {/* Category pills */}
        <div style={st.catRow}>
          {CATS.map(c => (
            <button key={c} style={{
              ...st.catPill,
              background: cat === c ? (c === "All" ? "rgba(255,255,255,0.1)" : CAT_COLORS[c] + "20") : "transparent",
              borderColor: cat === c ? (c === "All" ? "rgba(255,255,255,0.2)" : CAT_COLORS[c]) : "rgba(255,255,255,0.08)",
              color: cat === c ? (c === "All" ? "#F0E6D3" : CAT_COLORS[c]) : "rgba(255,255,255,0.3)",
            }} onClick={() => setCat(c)}>
              {CAT_ICONS[c]} {c}
            </button>
          ))}
        </div>

        {/* Card */}
        {current && (
          <div style={{ ...st.card, opacity: anim ? 0 : 1, borderColor: CAT_COLORS[current.cat] + "30" }}
            onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <span style={{ ...st.catBadge, background: CAT_COLORS[current.cat] + "15", color: CAT_COLORS[current.cat] }}>
              {CAT_ICONS[current.cat]} {current.cat}
            </span>
            <h2 style={st.cardTitle}>{current.title}</h2>
            {current.ayah && (
              <div style={st.ayahBox}>
                <p style={st.ayah}>"{current.ayah}"</p>
                <span style={st.ref}>{current.ref}</span>
              </div>
            )}
            <p style={st.detail}>{current.detail}</p>
          </div>
        )}

        {/* Navigation */}
        <div style={st.navRow}>
          <button style={{ ...st.navBtn, opacity: idx <= 0 ? 0.3 : 1 }} onClick={prev} disabled={idx <= 0}>
            ← Previous
          </button>
          <button style={{ ...st.navBtn, opacity: idx + 1 >= filtered.length ? 0.3 : 1 }} onClick={next} disabled={idx + 1 >= filtered.length}>
            Next →
          </button>
        </div>

        {/* Swipe hint */}
        <p style={st.swipeHint}>← Swipe to navigate →</p>
      </div>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Amiri:wght@400;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  body { background: #0A0F1C; }
  button { cursor: pointer; font-family: 'Outfit', sans-serif; }
`;

const st = {
  wrap: {
    minHeight: "100vh", fontFamily: "'Outfit', sans-serif",
    background: "linear-gradient(170deg, #0A0F1C 0%, #0F1A2E 50%, #0A0F1C 100%)",
  },
  inner: { maxWidth: "480px", margin: "0 auto", padding: "1.25rem 1rem", minHeight: "100vh" },
  topRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" },
  backBtn: { background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" },
  topTitle: { fontFamily: "'Amiri', serif", fontSize: "1.1rem", color: "#F0E6D3", fontWeight: 700 },
  counter: { fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", fontWeight: 600 },

  catRow: { display: "flex", gap: "0.4rem", marginBottom: "1rem", flexWrap: "wrap" },
  catPill: {
    padding: "0.35rem 0.7rem", borderRadius: "20px", border: "1px solid",
    fontSize: "0.7rem", fontWeight: 600, transition: "all 0.2s",
  },

  card: {
    padding: "1.5rem", background: "rgba(255,255,255,0.025)",
    border: "1px solid", borderRadius: "20px", transition: "opacity 0.2s",
    minHeight: "300px",
  },
  catBadge: {
    display: "inline-block", padding: "0.2rem 0.6rem", borderRadius: "12px",
    fontSize: "0.65rem", fontWeight: 600, marginBottom: "0.8rem",
  },
  cardTitle: { fontFamily: "'Amiri', serif", fontSize: "1.3rem", color: "#F0E6D3", marginBottom: "0.8rem" },
  ayahBox: {
    padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: "12px",
    borderLeft: "3px solid rgba(255,217,61,0.3)", marginBottom: "0.8rem",
  },
  ayah: { fontFamily: "'Amiri', serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, fontStyle: "italic" },
  ref: { fontSize: "0.7rem", color: "#FFD93D", marginTop: "0.4rem", display: "block" },
  detail: { fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.8 },

  navRow: { display: "flex", justifyContent: "space-between", marginTop: "1rem", gap: "0.5rem" },
  navBtn: {
    flex: 1, padding: "0.7rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)", color: "#F0E6D3", fontSize: "0.8rem", fontWeight: 600,
  },
  swipeHint: { textAlign: "center", fontSize: "0.65rem", color: "rgba(255,255,255,0.15)", marginTop: "0.8rem" },
};
