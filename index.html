import { useState, useMemo } from "react";
import { useAuth } from "./AuthContext.jsx";

const SURAHS = [
  { num: 1, name: "Al-Fatiha", en: "The Opening", ayahs: 7, type: "Meccan", summary: "The foundation of every prayer. It praises Allah, affirms His sovereignty, and asks for guidance to the straight path. Known as the 'Mother of the Quran' (Umm al-Quran).", themes: ["Praise", "Guidance", "Worship"] },
  { num: 2, name: "Al-Baqarah", en: "The Cow", ayahs: 286, type: "Medinan", summary: "The longest surah, covering laws of worship, social conduct, and stories of past nations. Includes Ayatul Kursi (2:255), the greatest verse. Establishes foundations of Islamic law, fasting, Hajj, and financial dealings.", themes: ["Law", "Guidance", "Stories", "Faith"] },
  { num: 3, name: "Ali 'Imran", en: "The Family of Imran", ayahs: 200, type: "Medinan", summary: "Discusses the family of Maryam (Mary), the birth of Isa (Jesus), and the Battle of Uhud. Emphasizes steadfastness in faith and refutes misconceptions about Prophet Isa.", themes: ["Isa (Jesus)", "Patience", "Battle of Uhud"] },
  { num: 4, name: "An-Nisa", en: "The Women", ayahs: 176, type: "Medinan", summary: "Addresses women's rights, inheritance laws, marriage regulations, and justice for orphans. Establishes important social and family laws in Islam.", themes: ["Women's Rights", "Inheritance", "Justice"] },
  { num: 12, name: "Yusuf", en: "Joseph", ayahs: 111, type: "Meccan", summary: "The most detailed narrative in the Quran — the beautiful story of Prophet Yusuf from his childhood dream to becoming a leader in Egypt. A story of patience, trust in Allah, and ultimate triumph.", themes: ["Patience", "Dreams", "Forgiveness", "Trust in Allah"] },
  { num: 18, name: "Al-Kahf", en: "The Cave", ayahs: 110, type: "Meccan", summary: "Contains four powerful stories: the People of the Cave, the man with two gardens, Musa and Khidr, and Dhul-Qarnayn. Reading it on Fridays brings light between two Fridays. Protects from the trials of Dajjal.", themes: ["Faith Trials", "Wealth", "Knowledge", "Power"] },
  { num: 19, name: "Maryam", en: "Mary", ayahs: 98, type: "Meccan", summary: "Named after Maryam, the mother of Isa. Tells the miraculous birth of both Yahya (John) and Isa (Jesus). Emphasizes Allah's mercy and the stories of several prophets.", themes: ["Mercy", "Miracles", "Prophets"] },
  { num: 36, name: "Ya-Sin", en: "Ya-Sin", ayahs: 83, type: "Meccan", summary: "Called the 'Heart of the Quran.' Addresses resurrection, the signs of Allah in creation, and the fate of those who reject the message. Often recited for the deceased and for seeking blessings.", themes: ["Resurrection", "Signs of Allah", "Prophethood"] },
  { num: 55, name: "Ar-Rahman", en: "The Most Merciful", ayahs: 78, type: "Medinan", summary: "Known as the 'Beauty of the Quran.' Lists the blessings and favors of Allah with the repeated refrain: 'So which of the favors of your Lord would you deny?' Describes Paradise in vivid detail.", themes: ["Gratitude", "Blessings", "Paradise"] },
  { num: 56, name: "Al-Waqi'ah", en: "The Event", ayahs: 96, type: "Meccan", summary: "Describes the Day of Judgment and divides people into three groups: the forerunners (closest to Allah), the people of the right, and the people of the left. The Prophet ﷺ said reciting it prevents poverty.", themes: ["Day of Judgment", "Provision", "Afterlife"] },
  { num: 67, name: "Al-Mulk", en: "The Sovereignty", ayahs: 30, type: "Meccan", summary: "Discusses Allah's dominion over creation and the purpose of life and death as a test. The Prophet ﷺ said it intercedes for its reader until they are forgiven. Recommended to recite before sleeping.", themes: ["Sovereignty", "Life as Test", "Protection"] },
  { num: 78, name: "An-Naba", en: "The News", ayahs: 40, type: "Meccan", summary: "Opens Juz' Amma. Describes the great news of resurrection that people question. Presents signs of Allah's power in creation as proof that resurrection is real.", themes: ["Resurrection", "Signs in Creation"] },
  { num: 87, name: "Al-A'la", en: "The Most High", ayahs: 19, type: "Meccan", summary: "Glorifies Allah and reminds of the ease He provides. Mentions the earlier scriptures of Ibrahim and Musa. The Prophet ﷺ used to recite it in the Eid and Friday prayers.", themes: ["Glorification", "Ease", "Earlier Scriptures"] },
  { num: 93, name: "Ad-Duha", en: "The Morning Hours", ayahs: 11, type: "Meccan", summary: "Revealed to comfort the Prophet ﷺ during a period when revelation paused. Allah reassures him that He has not abandoned him. A beautiful reminder for anyone going through hardship.", themes: ["Comfort", "Hope", "Gratitude"] },
  { num: 94, name: "Ash-Sharh", en: "The Relief", ayahs: 8, type: "Meccan", summary: "Reminds the Prophet ﷺ of Allah's favors — expanding his chest, removing his burden, and raising his mention. Contains the powerful promise: 'With hardship comes ease' — repeated twice for emphasis.", themes: ["Relief", "Hardship & Ease", "Gratitude"] },
  { num: 96, name: "Al-Alaq", en: "The Clot", ayahs: 19, type: "Meccan", summary: "The first revelation to Prophet Muhammad ﷺ. The angel Jibreel said 'Iqra!' (Read!). Establishes the importance of knowledge and reading in Islam. Also warns against arrogance.", themes: ["First Revelation", "Knowledge", "Humility"] },
  { num: 103, name: "Al-Asr", en: "The Declining Day", ayahs: 3, type: "Meccan", summary: "One of the shortest but most powerful surahs. Imam Shafi'i said if only this surah was revealed, it would be sufficient. Summarizes the entire formula for success: faith, good deeds, truth, and patience.", themes: ["Time", "Success", "Faith & Action"] },
  { num: 112, name: "Al-Ikhlas", en: "The Sincerity", ayahs: 4, type: "Meccan", summary: "Defines pure monotheism (Tawheed) in four verses. The Prophet ﷺ said it equals one-third of the Quran in meaning. Declares Allah is One, Eternal, and has no equal.", themes: ["Tawheed", "Oneness of Allah"] },
  { num: 113, name: "Al-Falaq", en: "The Daybreak", ayahs: 5, type: "Meccan", summary: "One of the two protective surahs (Al-Mu'awwidhatayn). Seeks refuge in Allah from the evil of creation, darkness, sorcery, and envy. Recited for protection morning and evening.", themes: ["Protection", "Refuge in Allah"] },
  { num: 114, name: "An-Nas", en: "Mankind", ayahs: 6, type: "Meccan", summary: "The final surah of the Quran. Seeks refuge in Allah from the whispers of Shaytan that affect the hearts of mankind. Recited along with Al-Falaq for daily protection.", themes: ["Protection", "Shaytan", "Refuge in Allah"] },
];

export default function SurahSummaries({ onBack }) {
  const { isPremium } = useAuth();
  const [mode, setMode] = useState("browse"); // browse or random
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return SURAHS;
    const q = search.toLowerCase();
    return SURAHS.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.en.toLowerCase().includes(q) ||
      String(s.num).includes(q) ||
      s.themes.some(t => t.toLowerCase().includes(q))
    );
  }, [search]);

  const randomSurah = () => {
    const s = SURAHS[Math.floor(Math.random() * SURAHS.length)];
    setSelected(s);
    setMode("random");
  };

  return (
    <div style={st.wrap}>
      <style>{css}</style>
      <div style={st.inner}>
        <div style={st.topRow}>
          <button style={st.backBtn} onClick={onBack}>← Back</button>
          <span style={st.topTitle}>Surah Summaries</span>
          <button style={st.randomBtn} onClick={randomSurah}>🎲</button>
        </div>

        <p style={st.subtitle}>{SURAHS.length} surahs with summaries, themes & context</p>

        {/* Search */}
        <input
          style={st.search}
          placeholder="Search by name, number, or theme..."
          value={search}
          onChange={e => { setSearch(e.target.value); setSelected(null); setMode("browse"); }}
        />

        {/* Random card */}
        {mode === "random" && selected && (
          <div style={st.randomCard}>
            <div style={st.randomHeader}>
              <span style={st.randomLabel}>🎲 Random Surah</span>
              <button style={st.randomAgain} onClick={randomSurah}>Another →</button>
            </div>
            <SurahCard s={selected} />
          </div>
        )}

        {/* Browse list */}
        {mode === "browse" && (
          <div style={st.list}>
            {filtered.map(s => (
              <div key={s.num}>
                <button style={{
                  ...st.listItem,
                  background: selected?.num === s.num ? "rgba(255,255,255,0.05)" : "transparent",
                }} onClick={() => setSelected(selected?.num === s.num ? null : s)}>
                  <div style={st.listLeft}>
                    <span style={st.listNum}>{s.num}</span>
                    <div>
                      <span style={st.listName}>{s.name}</span>
                      <span style={st.listEn}>{s.en} · {s.ayahs} ayahs · {s.type}</span>
                    </div>
                  </div>
                  <span style={st.listArrow}>{selected?.num === s.num ? "▾" : "▸"}</span>
                </button>
                {selected?.num === s.num && (
                  <div style={st.expandedCard}>
                    <SurahCard s={selected} />
                  </div>
                )}
              </div>
            ))}
            {filtered.length === 0 && (
              <p style={st.noResults}>No surahs found for "{search}"</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SurahCard({ s }) {
  return (
    <div style={st.card}>
      <div style={st.cardHeader}>
        <span style={st.cardNum}>{s.num}</span>
        <div>
          <h2 style={st.cardName}>{s.name}</h2>
          <span style={st.cardEn}>{s.en} · {s.ayahs} ayahs</span>
        </div>
        <span style={{ ...st.typeBadge, background: s.type === "Meccan" ? "rgba(255,107,107,0.1)" : "rgba(78,205,196,0.1)", color: s.type === "Meccan" ? "#FF6B6B" : "#4ECDC4" }}>
          {s.type}
        </span>
      </div>
      <p style={st.cardSummary}>{s.summary}</p>
      <div style={st.themes}>
        {s.themes.map(t => (
          <span key={t} style={st.theme}>{t}</span>
        ))}
      </div>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Amiri:wght@400;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  body { background: #0A0F1C; }
  button { cursor: pointer; font-family: 'Outfit', sans-serif; }
  input { font-family: 'Outfit', sans-serif; }
`;

const st = {
  wrap: {
    minHeight: "100vh", fontFamily: "'Outfit', sans-serif",
    background: "linear-gradient(170deg, #0A0F1C 0%, #0F1A2E 50%, #0A0F1C 100%)",
  },
  inner: { maxWidth: "480px", margin: "0 auto", padding: "1.25rem 1rem", minHeight: "100vh" },
  topRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" },
  backBtn: { background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" },
  topTitle: { fontFamily: "'Amiri', serif", fontSize: "1.2rem", color: "#F0E6D3", fontWeight: 700 },
  randomBtn: {
    padding: "0.3rem 0.6rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.03)", fontSize: "1rem",
  },
  subtitle: { fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", textAlign: "center", marginBottom: "1rem" },

  search: {
    width: "100%", padding: "0.7rem 1rem", borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)",
    color: "#F0E6D3", fontSize: "0.8rem", marginBottom: "1rem", outline: "none",
  },

  randomCard: { marginBottom: "1rem" },
  randomHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" },
  randomLabel: { fontSize: "0.75rem", color: "#FFD93D", fontWeight: 600 },
  randomAgain: {
    padding: "0.3rem 0.7rem", borderRadius: "8px", border: "1px solid rgba(255,217,61,0.2)",
    background: "rgba(255,217,61,0.05)", color: "#FFD93D", fontSize: "0.7rem", fontWeight: 600,
  },

  list: { display: "flex", flexDirection: "column", gap: "0.2rem", marginBottom: "0.5rem" },
  listItem: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "0.7rem 0.5rem", borderRadius: "10px", border: "none",
    width: "100%", textAlign: "left",
  },
  listLeft: { display: "flex", alignItems: "center", gap: "0.6rem" },
  listNum: {
    width: "28px", height: "28px", borderRadius: "8px", display: "flex",
    alignItems: "center", justifyContent: "center", fontSize: "0.65rem",
    background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)", fontWeight: 700,
  },
  listName: { display: "block", fontSize: "0.85rem", color: "#F0E6D3", fontWeight: 600 },
  listEn: { display: "block", fontSize: "0.65rem", color: "rgba(255,255,255,0.25)" },
  listArrow: { fontSize: "0.7rem", color: "rgba(255,255,255,0.2)" },
  noResults: { textAlign: "center", fontSize: "0.8rem", color: "rgba(255,255,255,0.2)", padding: "2rem" },

  expandedCard: { marginTop: "0.5rem" },
  card: {
    padding: "1.25rem", background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px",
  },
  cardHeader: { display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.8rem" },
  cardNum: {
    width: "36px", height: "36px", borderRadius: "10px", display: "flex",
    alignItems: "center", justifyContent: "center", fontSize: "0.9rem",
    background: "rgba(255,217,61,0.08)", color: "#FFD93D", fontWeight: 800,
  },
  cardName: { fontFamily: "'Amiri', serif", fontSize: "1.1rem", color: "#F0E6D3" },
  cardEn: { fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" },
  typeBadge: {
    marginLeft: "auto", padding: "0.2rem 0.5rem", borderRadius: "8px",
    fontSize: "0.6rem", fontWeight: 600,
  },
  cardSummary: { fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: "0.8rem" },
  themes: { display: "flex", gap: "0.3rem", flexWrap: "wrap" },
  theme: {
    padding: "0.2rem 0.5rem", borderRadius: "8px", fontSize: "0.6rem",
    background: "rgba(167,139,250,0.1)", color: "#A78BFA", fontWeight: 600,
  },
};
