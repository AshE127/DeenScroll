import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "./AuthContext.jsx";

// ============================================
// SURAH DATABASE - 114 Surahs
// ============================================
const ALL_SURAHS = [
  { ar: "الفاتحة", tr: "Al-Fatihah", en: "The Opening" },
  { ar: "البقرة", tr: "Al-Baqarah", en: "The Cow" },
  { ar: "آل عمران", tr: "Aal-Imran", en: "Family of Imran" },
  { ar: "النساء", tr: "An-Nisa", en: "The Women" },
  { ar: "المائدة", tr: "Al-Ma'idah", en: "The Table Spread" },
  { ar: "الأنعام", tr: "Al-An'am", en: "The Cattle" },
  { ar: "الأعراف", tr: "Al-A'raf", en: "The Heights" },
  { ar: "الأنفال", tr: "Al-Anfal", en: "The Spoils of War" },
  { ar: "التوبة", tr: "At-Tawbah", en: "The Repentance" },
  { ar: "يونس", tr: "Yunus", en: "Jonah" },
  { ar: "هود", tr: "Hud", en: "Hud" },
  { ar: "يوسف", tr: "Yusuf", en: "Joseph" },
  { ar: "الرعد", tr: "Ar-Ra'd", en: "The Thunder" },
  { ar: "إبراهيم", tr: "Ibrahim", en: "Abraham" },
  { ar: "الحجر", tr: "Al-Hijr", en: "The Rocky Tract" },
  { ar: "النحل", tr: "An-Nahl", en: "The Bee" },
  { ar: "الإسراء", tr: "Al-Isra", en: "The Night Journey" },
  { ar: "الكهف", tr: "Al-Kahf", en: "The Cave" },
  { ar: "مريم", tr: "Maryam", en: "Mary" },
  { ar: "طه", tr: "Ta-Ha", en: "Ta-Ha" },
  { ar: "الأنبياء", tr: "Al-Anbiya", en: "The Prophets" },
  { ar: "الحج", tr: "Al-Hajj", en: "The Pilgrimage" },
  { ar: "المؤمنون", tr: "Al-Mu'minun", en: "The Believers" },
  { ar: "النور", tr: "An-Nur", en: "The Light" },
  { ar: "الفرقان", tr: "Al-Furqan", en: "The Criterion" },
  { ar: "الشعراء", tr: "Ash-Shu'ara", en: "The Poets" },
  { ar: "النمل", tr: "An-Naml", en: "The Ant" },
  { ar: "القصص", tr: "Al-Qasas", en: "The Stories" },
  { ar: "العنكبوت", tr: "Al-Ankabut", en: "The Spider" },
  { ar: "الروم", tr: "Ar-Rum", en: "The Romans" },
  { ar: "لقمان", tr: "Luqman", en: "Luqman" },
  { ar: "السجدة", tr: "As-Sajdah", en: "The Prostration" },
  { ar: "الأحزاب", tr: "Al-Ahzab", en: "The Confederates" },
  { ar: "سبأ", tr: "Saba", en: "Sheba" },
  { ar: "فاطر", tr: "Fatir", en: "The Originator" },
  { ar: "يس", tr: "Ya-Sin", en: "Ya-Sin" },
  { ar: "الصافات", tr: "As-Saffat", en: "The Ranks" },
  { ar: "ص", tr: "Sad", en: "Sad" },
  { ar: "الزمر", tr: "Az-Zumar", en: "The Groups" },
  { ar: "غافر", tr: "Ghafir", en: "The Forgiver" },
  { ar: "فصلت", tr: "Fussilat", en: "Explained in Detail" },
  { ar: "الشورى", tr: "Ash-Shura", en: "The Consultation" },
  { ar: "الزخرف", tr: "Az-Zukhruf", en: "The Gold Adornments" },
  { ar: "الدخان", tr: "Ad-Dukhan", en: "The Smoke" },
  { ar: "الجاثية", tr: "Al-Jathiyah", en: "The Kneeling" },
  { ar: "الأحقاف", tr: "Al-Ahqaf", en: "The Sand Dunes" },
  { ar: "محمد", tr: "Muhammad", en: "Muhammad" },
  { ar: "الفتح", tr: "Al-Fath", en: "The Victory" },
  { ar: "الحجرات", tr: "Al-Hujurat", en: "The Rooms" },
  { ar: "ق", tr: "Qaf", en: "Qaf" },
  { ar: "الذاريات", tr: "Adh-Dhariyat", en: "The Scattering Winds" },
  { ar: "الطور", tr: "At-Tur", en: "The Mount" },
  { ar: "النجم", tr: "An-Najm", en: "The Star" },
  { ar: "القمر", tr: "Al-Qamar", en: "The Moon" },
  { ar: "الرحمن", tr: "Ar-Rahman", en: "The Most Merciful" },
  { ar: "الواقعة", tr: "Al-Waqi'ah", en: "The Inevitable" },
  { ar: "الحديد", tr: "Al-Hadid", en: "The Iron" },
  { ar: "المجادلة", tr: "Al-Mujadilah", en: "The Dispute" },
  { ar: "الحشر", tr: "Al-Hashr", en: "The Gathering" },
  { ar: "الممتحنة", tr: "Al-Mumtahanah", en: "The Examined One" },
  { ar: "الصف", tr: "As-Saff", en: "The Row" },
  { ar: "الجمعة", tr: "Al-Jumu'ah", en: "Friday" },
  { ar: "المنافقون", tr: "Al-Munafiqun", en: "The Hypocrites" },
  { ar: "التغابن", tr: "At-Taghabun", en: "The Mutual Loss" },
  { ar: "الطلاق", tr: "At-Talaq", en: "The Divorce" },
  { ar: "التحريم", tr: "At-Tahrim", en: "The Prohibition" },
  { ar: "الملك", tr: "Al-Mulk", en: "The Sovereignty" },
  { ar: "القلم", tr: "Al-Qalam", en: "The Pen" },
  { ar: "الحاقة", tr: "Al-Haqqah", en: "The Inevitable Hour" },
  { ar: "المعارج", tr: "Al-Ma'arij", en: "The Ascending Stairways" },
  { ar: "نوح", tr: "Nuh", en: "Noah" },
  { ar: "الجن", tr: "Al-Jinn", en: "The Jinn" },
  { ar: "المزمل", tr: "Al-Muzzammil", en: "The Enshrouded One" },
  { ar: "المدثر", tr: "Al-Muddaththir", en: "The Cloaked One" },
  { ar: "القيامة", tr: "Al-Qiyamah", en: "The Resurrection" },
  { ar: "الإنسان", tr: "Al-Insan", en: "The Human" },
  { ar: "المرسلات", tr: "Al-Mursalat", en: "Those Sent Forth" },
  { ar: "النبأ", tr: "An-Naba", en: "The Announcement" },
  { ar: "النازعات", tr: "An-Nazi'at", en: "Those Who Pull Out" },
  { ar: "عبس", tr: "Abasa", en: "He Frowned" },
  { ar: "التكوير", tr: "At-Takwir", en: "The Overthrowing" },
  { ar: "الانفطار", tr: "Al-Infitar", en: "The Cleaving" },
  { ar: "المطففين", tr: "Al-Mutaffifin", en: "The Defrauders" },
  { ar: "الانشقاق", tr: "Al-Inshiqaq", en: "The Splitting Open" },
  { ar: "البروج", tr: "Al-Buruj", en: "The Great Stars" },
  { ar: "الطارق", tr: "At-Tariq", en: "The Night Comer" },
  { ar: "الأعلى", tr: "Al-A'la", en: "The Most High" },
  { ar: "الغاشية", tr: "Al-Ghashiyah", en: "The Overwhelming" },
  { ar: "الفجر", tr: "Al-Fajr", en: "The Dawn" },
  { ar: "البلد", tr: "Al-Balad", en: "The City" },
  { ar: "الشمس", tr: "Ash-Shams", en: "The Sun" },
  { ar: "الليل", tr: "Al-Layl", en: "The Night" },
  { ar: "الضحى", tr: "Ad-Duha", en: "The Morning Hours" },
  { ar: "الشرح", tr: "Ash-Sharh", en: "The Relief" },
  { ar: "التين", tr: "At-Tin", en: "The Fig" },
  { ar: "العلق", tr: "Al-Alaq", en: "The Clot" },
  { ar: "القدر", tr: "Al-Qadr", en: "The Night of Power" },
  { ar: "البينة", tr: "Al-Bayyinah", en: "The Clear Evidence" },
  { ar: "الزلزلة", tr: "Az-Zalzalah", en: "The Earthquake" },
  { ar: "العاديات", tr: "Al-Adiyat", en: "The Chargers" },
  { ar: "القارعة", tr: "Al-Qari'ah", en: "The Striking Hour" },
  { ar: "التكاثر", tr: "At-Takathur", en: "The Rivalry" },
  { ar: "العصر", tr: "Al-Asr", en: "The Declining Day" },
  { ar: "الهمزة", tr: "Al-Humazah", en: "The Slanderer" },
  { ar: "الفيل", tr: "Al-Fil", en: "The Elephant" },
  { ar: "قريش", tr: "Quraysh", en: "Quraysh" },
  { ar: "الماعون", tr: "Al-Ma'un", en: "The Small Kindness" },
  { ar: "الكوثر", tr: "Al-Kawthar", en: "The Abundance" },
  { ar: "الكافرون", tr: "Al-Kafirun", en: "The Disbelievers" },
  { ar: "النصر", tr: "An-Nasr", en: "The Divine Support" },
  { ar: "المسد", tr: "Al-Masad", en: "The Palm Fiber" },
  { ar: "الإخلاص", tr: "Al-Ikhlas", en: "The Sincerity" },
  { ar: "الفلق", tr: "Al-Falaq", en: "The Daybreak" },
  { ar: "الناس", tr: "An-Nas", en: "Mankind" },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function SurahMatch({ onBack }) {
  const { checkPlayLimit, recordPlay } = useAuth();
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [totalMatched, setTotalMatched] = useState(0);
  const [batch, setBatch] = useState([]);
  const [shuffledEn, setShuffledEn] = useState([]);
  const [selectedAr, setSelectedAr] = useState(null);
  const [selectedEn, setSelectedEn] = useState(null);
  const [matched, setMatched] = useState([]);
  const [wrongPair, setWrongPair] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [usedIndices, setUsedIndices] = useState([]);
  const [started, setStarted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  const pickBatch = useCallback((used) => {
    let available = ALL_SURAHS.map((s, i) => ({ ...s, idx: i })).filter(s => !used.includes(s.idx));
    if (available.length < 4) {
      available = ALL_SURAHS.map((s, i) => ({ ...s, idx: i }));
      setUsedIndices([]);
    }
    const picked = shuffle(available).slice(0, 4);
    const newUsed = [...used, ...picked.map(p => p.idx)];
    setUsedIndices(newUsed);
    setBatch(picked);
    setShuffledEn(shuffle(picked.map(p => ({ en: p.en, idx: p.idx }))));
    setMatched([]);
    setSelectedAr(null);
    setSelectedEn(null);
    setWrongPair(null);
  }, []);

  const startGame = () => {
    if (!checkPlayLimit('surah-match')) return;
    recordPlay('surah-match');
    setStarted(true);
    setScore(0);
    setTotalMatched(0);
    setRound(0);
    setStreak(0);
    setBestStreak(0);
    setUsedIndices([]);
    setShowComplete(false);
    pickBatch([]);
  };

  // Handle selection logic
  useEffect(() => {
    if (selectedAr === null || selectedEn === null) return;

    const arItem = batch[selectedAr];
    const enItem = shuffledEn[selectedEn];

    if (arItem.idx === enItem.idx) {
      // Correct match
      const newMatched = [...matched, arItem.idx];
      setMatched(newMatched);
      setScore(s => s + 1);
      setTotalMatched(t => t + 1);
      setStreak(s => {
        const ns = s + 1;
        setBestStreak(b => Math.max(b, ns));
        return ns;
      });
      setSelectedAr(null);
      setSelectedEn(null);

      // Check if batch complete
      if (newMatched.length === 4) {
        recordPlay('surah-match');
        setTimeout(() => {
          if (!checkPlayLimit('surah-match')) return;
          setTransitioning(true);
          setTimeout(() => {
            setRound(r => r + 1);
            pickBatch(usedIndices);
            setTransitioning(false);
          }, 500);
        }, 600);
      }
    } else {
      // Wrong match
      setWrongPair({ ar: selectedAr, en: selectedEn });
      setStreak(0);
      setTimeout(() => {
        setWrongPair(null);
        setSelectedAr(null);
        setSelectedEn(null);
      }, 600);
    }
  }, [selectedAr, selectedEn]);

  const handleArClick = (i) => {
    if (matched.includes(batch[i].idx) || transitioning) return;
    if (wrongPair) return;
    if (selectedAr === i) {
      setSelectedAr(null);
      return;
    }
    setSelectedAr(i);
  };

  const handleEnClick = (i) => {
    if (matched.includes(shuffledEn[i].idx) || transitioning) return;
    if (wrongPair) return;
    if (selectedEn === i) {
      setSelectedEn(null);
      return;
    }
    setSelectedEn(i);
  };

  // Check for milestone
  useEffect(() => {
    if (totalMatched > 0 && totalMatched % 20 === 0 && !showComplete) {
      setShowComplete(true);
    }
  }, [totalMatched]);

  // ============================================
  // START SCREEN
  // ============================================
  if (!started) {
    return (
      <div style={s.outerWrap}>
        <style>{css}</style>
        <div style={s.startContainer}>
          <div style={s.startInner}>
            <div style={s.startIcon}>📖</div>
            <h1 style={s.startTitle}>Surah Match</h1>
            <div style={s.startBadge}>DeenScroll</div>
            <p style={s.startDesc}>
              Match Arabic surah names to their English meanings.
              Test your knowledge — how many can you get right?
            </p>
            <div style={s.startHowTo}>
              <div style={s.howToStep}>
                <span style={s.howToNum}>1</span>
                <span style={s.howToText}>Tap an Arabic name on the left</span>
              </div>
              <div style={s.howToStep}>
                <span style={s.howToNum}>2</span>
                <span style={s.howToText}>Tap its English meaning on the right</span>
              </div>
              <div style={s.howToStep}>
                <span style={s.howToNum}>3</span>
                <span style={s.howToText}>Match all 4 to get a new batch</span>
              </div>
            </div>
            <button style={s.startBtn} onClick={startGame}>
              Start Matching
            </button>
            {onBack && <button style={{...s.startBtn, background: 'rgba(255,255,255,0.06)', color: '#F0E6D3', boxShadow: 'none', marginTop: '0.75rem', border: '1px solid rgba(255,255,255,0.1)'}} onClick={onBack}>
              ← Back to DeenScroll
            </button>}
            <p style={s.startVerse}>"And We have made the Quran easy to remember." — 54:17</p>
          </div>
          <div style={s.bgPattern} />
        </div>
      </div>
    );
  }

  // ============================================
  // MILESTONE SCREEN
  // ============================================
  if (showComplete) {
    return (
      <div style={s.outerWrap}>
        <style>{css}</style>
        <div style={s.milestoneContainer}>
          <div style={s.milestoneInner}>
            <div style={s.milestoneStar}>⭐</div>
            <h1 style={s.milestoneTitle}>Masha'Allah!</h1>
            <p style={s.milestoneSubtitle}>{totalMatched} surahs matched!</p>
            <div style={s.milestoneStats}>
              <div style={s.mStat}>
                <span style={s.mStatNum}>{score}</span>
                <span style={s.mStatLabel}>Correct</span>
              </div>
              <div style={s.mStatDiv} />
              <div style={s.mStat}>
                <span style={s.mStatNum}>{round + 1}</span>
                <span style={s.mStatLabel}>Rounds</span>
              </div>
              <div style={s.mStatDiv} />
              <div style={s.mStat}>
                <span style={{ ...s.mStatNum, color: "#FFD93D" }}>{bestStreak}</span>
                <span style={s.mStatLabel}>Best Streak</span>
              </div>
            </div>
            <button style={s.startBtn} onClick={() => setShowComplete(false)}>
              Keep Going →
            </button>
            <button style={s.milestoneReset} onClick={startGame}>
              Restart
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // GAME SCREEN
  // ============================================
  return (
    <div style={s.outerWrap}>
      <style>{css}</style>
      <div style={s.gameContainer}>
        {/* Header */}
        <div style={s.gameHeader}>
          <div style={s.gameHeaderLeft}>
            <h2 style={s.gameTitle}>Surah Match</h2>
            <span style={s.gameBadge}>Round {round + 1}</span>
          </div>
          <div style={s.gameScoreArea}>
            {streak >= 3 && <span style={s.streakBadge}>🔥 {streak}</span>}
            <span style={s.gameScore}>{score} matched</span>
          </div>
        </div>

        {/* Instruction */}
        <p style={s.instruction}>
          {selectedAr !== null && selectedEn === null ? "Now tap the English meaning →" :
           selectedEn !== null && selectedAr === null ? "← Now tap the Arabic name" :
           "Tap an Arabic name, then its English meaning"}
        </p>

        {/* Match Area */}
        <div style={{
          ...s.matchArea,
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? "scale(0.95)" : "scale(1)",
        }}>
          {/* Arabic Column */}
          <div style={s.column}>
            <div style={s.colLabel}>العربية</div>
            {batch.map((item, i) => {
              const isMatched = matched.includes(item.idx);
              const isSelected = selectedAr === i;
              const isWrong = wrongPair && wrongPair.ar === i;
              return (
                <button
                  key={`ar-${item.idx}-${round}`}
                  style={{
                    ...s.card,
                    ...s.cardAr,
                    ...(isMatched ? s.cardMatched : {}),
                    ...(isSelected ? s.cardSelectedAr : {}),
                    ...(isWrong ? s.cardWrong : {}),
                    animationDelay: `${i * 0.08}s`,
                  }}
                  onClick={() => handleArClick(i)}
                  disabled={isMatched}
                >
                  <span style={{
                    ...s.cardArInner,
                    ...(isMatched ? { opacity: 0.3 } : {}),
                  }}>
                    <span style={s.cardArText}>{item.ar}</span>
                    <span style={s.cardTrText}>{item.tr}</span>
                  </span>
                  {isMatched && <span style={s.matchCheck}>✓</span>}
                </button>
              );
            })}
          </div>

          {/* Connection Lines Visual */}
          <div style={s.midCol}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={s.midDot}>
                <div style={{
                  ...s.dotInner,
                  background: matched.length > i ? "#34D399" : "rgba(255,255,255,0.1)",
                }} />
              </div>
            ))}
          </div>

          {/* English Column */}
          <div style={s.column}>
            <div style={s.colLabel}>English</div>
            {shuffledEn.map((item, i) => {
              const isMatched = matched.includes(item.idx);
              const isSelected = selectedEn === i;
              const isWrong = wrongPair && wrongPair.en === i;
              return (
                <button
                  key={`en-${item.idx}-${round}`}
                  style={{
                    ...s.card,
                    ...s.cardEn,
                    ...(isMatched ? s.cardMatched : {}),
                    ...(isSelected ? s.cardSelectedEn : {}),
                    ...(isWrong ? s.cardWrong : {}),
                    animationDelay: `${i * 0.08 + 0.1}s`,
                  }}
                  onClick={() => handleEnClick(i)}
                  disabled={isMatched}
                >
                  <span style={{
                    ...s.cardEnText,
                    ...(isMatched ? { opacity: 0.3 } : {}),
                  }}>{item.en}</span>
                  {isMatched && <span style={s.matchCheck}>✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress dots */}
        <div style={s.progressDots}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{
              ...s.pDot,
              background: matched.length > i ? "#34D399" : "rgba(255,255,255,0.1)",
              boxShadow: matched.length > i ? "0 0 12px rgba(52,211,153,0.4)" : "none",
            }} />
          ))}
        </div>

        {/* Bottom tagline */}
        <div style={s.bottomTag}>
          <span style={s.bottomLogo}>DeenScroll</span>
          <span style={s.bottomTagline}>Scroll Less, Deen More.</span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// CSS
// ============================================
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Amiri:wght@400;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  body { background: #0A0F1C; overflow-x: hidden; }
  button { cursor: pointer; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes popIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
  @keyframes shake { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-4px); } 40%, 80% { transform: translateX(4px); } }
  @keyframes glow { 0%, 100% { box-shadow: 0 0 8px rgba(52,211,153,0.3); } 50% { box-shadow: 0 0 20px rgba(52,211,153,0.5); } }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
`;

// ============================================
// STYLES
// ============================================
const s = {
  outerWrap: {
    minHeight: "100vh",
    background: "linear-gradient(170deg, #0A0F1C 0%, #0B1A2E 40%, #0D2818 70%, #0A0F1C 100%)",
    fontFamily: "'Outfit', sans-serif",
  },

  // START
  startContainer: {
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    position: "relative", overflow: "hidden",
  },
  startInner: {
    textAlign: "center", padding: "2rem 1.5rem", zIndex: 2, animation: "fadeIn 0.6s ease-out",
    maxWidth: "420px",
  },
  startIcon: { fontSize: "3.5rem", marginBottom: "0.75rem", animation: "float 3s ease-in-out infinite" },
  startTitle: { fontFamily: "'Amiri', serif", fontSize: "2.8rem", color: "#F0E6D3", fontWeight: 700, lineHeight: 1.1 },
  startBadge: {
    display: "inline-block", marginTop: "0.5rem", padding: "0.3rem 1rem", borderRadius: "20px",
    background: "rgba(52,211,153,0.12)", color: "#34D399", fontSize: "0.75rem",
    fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase",
  },
  startDesc: {
    fontSize: "1rem", color: "rgba(240,230,211,0.55)", lineHeight: 1.6, margin: "1.5rem 0",
  },
  startHowTo: {
    display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "2rem",
    textAlign: "left", maxWidth: "300px", margin: "0 auto 2rem",
  },
  howToStep: { display: "flex", alignItems: "center", gap: "0.75rem" },
  howToNum: {
    width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(52,211,153,0.15)", color: "#34D399", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0,
  },
  howToText: { fontSize: "0.9rem", color: "rgba(240,230,211,0.5)" },
  startBtn: {
    background: "linear-gradient(135deg, #34D399, #059669)", color: "#0A0F1C", border: "none",
    padding: "1rem 2.5rem", borderRadius: "60px", fontSize: "1.1rem", fontWeight: 700,
    fontFamily: "'Outfit', sans-serif", boxShadow: "0 0 40px rgba(52,211,153,0.25)",
  },
  startVerse: {
    fontFamily: "'Amiri', serif", fontSize: "0.85rem", color: "rgba(240,230,211,0.25)",
    marginTop: "2rem", fontStyle: "italic",
  },
  bgPattern: {
    position: "absolute", inset: 0, zIndex: 1, opacity: 0.02,
    backgroundImage: "repeating-conic-gradient(rgba(240,230,211,1) 0% 25%, transparent 0% 50%)",
    backgroundSize: "30px 30px",
  },

  // GAME
  gameContainer: {
    minHeight: "100vh", padding: "1.25rem 0.75rem", maxWidth: "480px", margin: "0 auto",
    display: "flex", flexDirection: "column",
  },
  gameHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem",
  },
  gameHeaderLeft: { display: "flex", alignItems: "center", gap: "0.6rem" },
  gameTitle: { fontFamily: "'Amiri', serif", fontSize: "1.3rem", color: "#F0E6D3", fontWeight: 700 },
  gameBadge: {
    padding: "0.2rem 0.6rem", borderRadius: "10px", background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.35)", fontSize: "0.7rem", fontWeight: 500,
  },
  gameScoreArea: { display: "flex", alignItems: "center", gap: "0.5rem" },
  streakBadge: {
    padding: "0.2rem 0.55rem", borderRadius: "10px", background: "rgba(255,217,61,0.12)",
    color: "#FFD93D", fontSize: "0.75rem", fontWeight: 600, animation: "glow 2s ease-in-out infinite",
    boxShadow: "0 0 12px rgba(255,217,61,0.15)",
  },
  gameScore: { fontSize: "0.85rem", color: "#34D399", fontWeight: 600 },

  instruction: {
    textAlign: "center", fontSize: "0.8rem", color: "rgba(255,255,255,0.3)",
    marginBottom: "1rem", minHeight: "1.2rem",
  },

  // MATCH AREA
  matchArea: {
    display: "flex", gap: "0.4rem", flex: 1, alignItems: "flex-start",
    transition: "all 0.4s ease",
  },
  column: { flex: 1, display: "flex", flexDirection: "column", gap: "0.55rem" },
  colLabel: {
    textAlign: "center", fontSize: "0.7rem", color: "rgba(255,255,255,0.25)",
    textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "0.25rem",
  },
  midCol: {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around",
    gap: "0.55rem", paddingTop: "1.65rem", width: "24px",
  },
  midDot: {
    height: "64px", display: "flex", alignItems: "center", justifyContent: "center",
  },
  dotInner: {
    width: "8px", height: "8px", borderRadius: "50%", transition: "all 0.3s ease",
  },

  // CARDS
  card: {
    padding: "0.85rem 0.6rem", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center",
    minHeight: "64px", transition: "all 0.2s ease", position: "relative",
    animation: "fadeIn 0.35s ease-out both", fontFamily: "'Outfit', sans-serif",
  },
  cardAr: {
    background: "rgba(78,205,196,0.04)", borderColor: "rgba(78,205,196,0.12)",
  },
  cardEn: {
    background: "rgba(167,139,250,0.04)", borderColor: "rgba(167,139,250,0.12)",
  },
  cardSelectedAr: {
    borderColor: "#4ECDC4", background: "rgba(78,205,196,0.12)",
    boxShadow: "0 0 20px rgba(78,205,196,0.15)", transform: "scale(1.02)",
  },
  cardSelectedEn: {
    borderColor: "#A78BFA", background: "rgba(167,139,250,0.12)",
    boxShadow: "0 0 20px rgba(167,139,250,0.15)", transform: "scale(1.02)",
  },
  cardMatched: {
    borderColor: "rgba(52,211,153,0.25)", background: "rgba(52,211,153,0.06)",
    animation: "popIn 0.3s ease-out",
  },
  cardWrong: {
    borderColor: "#FF6B6B", background: "rgba(255,107,107,0.1)",
    animation: "shake 0.4s ease-out",
  },
  cardArText: {
    fontFamily: "'Noto Sans Arabic', 'Amiri', serif", fontSize: "1.25rem", color: "#F0E6D3",
    fontWeight: 600, direction: "rtl",
  },
  cardArInner: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: "2px",
  },
  cardTrText: {
    fontSize: "0.7rem", color: "rgba(78,205,196,0.6)", fontWeight: 500,
    fontFamily: "'Outfit', sans-serif", letterSpacing: "0.02em",
  },
  cardEnText: {
    fontSize: "0.85rem", color: "#F0E6D3", fontWeight: 500, textAlign: "center", lineHeight: 1.3,
  },
  matchCheck: {
    position: "absolute", top: "4px", right: "8px", color: "#34D399",
    fontSize: "0.8rem", fontWeight: 700,
  },

  // PROGRESS
  progressDots: {
    display: "flex", justifyContent: "center", gap: "0.5rem", margin: "1.25rem 0 0.75rem",
  },
  pDot: {
    width: "10px", height: "10px", borderRadius: "50%", transition: "all 0.3s ease",
  },

  // BOTTOM
  bottomTag: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: "0.15rem",
    padding: "0.5rem 0",
  },
  bottomLogo: {
    fontFamily: "'Amiri', serif", fontSize: "1rem", color: "rgba(240,230,211,0.2)", fontWeight: 700,
  },
  bottomTagline: {
    fontSize: "0.6rem", color: "rgba(52,211,153,0.3)", letterSpacing: "0.2em", textTransform: "uppercase",
  },

  // MILESTONE
  milestoneContainer: {
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
  },
  milestoneInner: {
    textAlign: "center", padding: "2rem 1.5rem", animation: "fadeIn 0.6s ease-out", maxWidth: "400px",
  },
  milestoneStar: { fontSize: "3.5rem", marginBottom: "0.75rem", animation: "float 2.5s ease-in-out infinite" },
  milestoneTitle: { fontFamily: "'Amiri', serif", fontSize: "2.5rem", color: "#F0E6D3" },
  milestoneSubtitle: { fontSize: "1.1rem", color: "#34D399", fontWeight: 600, marginTop: "0.35rem", marginBottom: "1.5rem" },
  milestoneStats: {
    display: "flex", justifyContent: "center", gap: "1.5rem", marginBottom: "2rem",
    background: "rgba(255,255,255,0.04)", borderRadius: "16px", padding: "1.25rem",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  mStat: { display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem" },
  mStatNum: { fontSize: "1.5rem", fontWeight: 700, color: "#F0E6D3" },
  mStatLabel: { fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" },
  mStatDiv: { width: "1px", background: "rgba(255,255,255,0.06)" },
  milestoneReset: {
    marginTop: "0.75rem", background: "none", border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.35)", padding: "0.65rem 1.5rem", borderRadius: "30px",
    fontSize: "0.85rem", fontFamily: "'Outfit', sans-serif", width: "100%",
  },
};
