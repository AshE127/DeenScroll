import { useState, useEffect, useRef } from "react";

// ============================================
// ISLAMIC FACTS DATABASE - 100+ facts
// ============================================
const ALL_FACTS = [
  // QURAN
  { id: "f1", fact: "The Quran has 6,236 verses (ayahs), 114 surahs, and 30 juz (parts). It was revealed over 23 years.", cat: "Quran", emoji: "📖" },
  { id: "f2", fact: "The word 'Allah' appears 2,698 times in the Quran — more than any other word.", cat: "Quran", emoji: "☝️" },
  { id: "f3", fact: "Surah Al-Baqarah is the longest surah with 286 verses. Surah Al-Kawthar is the shortest with only 3 verses.", cat: "Quran", emoji: "📏" },
  { id: "f4", fact: "The Quran mentions 25 prophets by name, but Islamic tradition holds there were 124,000 prophets sent to humanity.", cat: "Quran", emoji: "🌟" },
  { id: "f5", fact: "'Bismillah' appears 114 times in the Quran — once at the start of each surah, plus once in Surah An-Naml (27:30).", cat: "Quran", emoji: "✨" },
  { id: "f6", fact: "The first word revealed of the Quran was 'Iqra' (Read!) — making literacy and knowledge the very first command in Islam.", cat: "Quran", emoji: "📚" },
  { id: "f7", fact: "Surah Ar-Rahman repeats 'Which of the favors of your Lord would you deny?' 31 times as a powerful rhetorical refrain.", cat: "Quran", emoji: "🌺" },
  { id: "f8", fact: "The Quran was revealed in Ramadan. Specifically, it first descended on Laylatul Qadr — the Night of Power.", cat: "Quran", emoji: "🌙" },
  { id: "f9", fact: "Maryam (Mary) is the only woman mentioned by name in the entire Quran. An entire surah (Surah 19) is named after her.", cat: "Quran", emoji: "👩" },
  { id: "f10", fact: "The Quran mentions bees, ants, spiders, elephants, cows, and horses — each teaching a different lesson about Allah's creation.", cat: "Quran", emoji: "🐝" },

  // PROPHET ﷺ
  { id: "f11", fact: "The Prophet ﷺ was known as 'Al-Amin' (The Trustworthy) even before prophethood. People would leave valuables with him for safekeeping.", cat: "Prophet ﷺ", emoji: "🤝" },
  { id: "f12", fact: "The Prophet ﷺ mended his own shoes, sewed his own clothes, and milked his own goats. He never considered housework beneath him.", cat: "Prophet ﷺ", emoji: "🧵" },
  { id: "f13", fact: "The Prophet ﷺ never hit a woman, a child, or a servant in his entire life.", cat: "Prophet ﷺ", emoji: "🕊️" },
  { id: "f14", fact: "The Prophet ﷺ would stand in prayer so long at night that his feet would swell. When asked why, he said: 'Should I not be a grateful servant?'", cat: "Prophet ﷺ", emoji: "🙏" },
  { id: "f15", fact: "The Prophet ﷺ had a cat named Muezza. He once cut off the sleeve of his garment rather than disturb the cat sleeping on it.", cat: "Prophet ﷺ", emoji: "🐱" },
  { id: "f16", fact: "The Prophet ﷺ raced with his wife Aisha on two occasions. She won the first race, and he won the second.", cat: "Prophet ﷺ", emoji: "🏃" },
  { id: "f17", fact: "The Prophet ﷺ would greet children first when passing by them, smile at everyone, and always shake hands when meeting someone.", cat: "Prophet ﷺ", emoji: "😊" },
  { id: "f18", fact: "The Prophet ﷺ said that the best names are Abdullah (servant of Allah) and Abdur-Rahman (servant of the Most Merciful).", cat: "Prophet ﷺ", emoji: "📝" },
  { id: "f19", fact: "The Prophet ﷺ's last words before passing were: 'O Allah, with the highest companions' — referring to meeting Allah.", cat: "Prophet ﷺ", emoji: "💫" },
  { id: "f20", fact: "The Prophet ﷺ would often joke with companions but never said anything untrue, even in jest.", cat: "Prophet ﷺ", emoji: "😄" },

  // SCIENCE & NATURE
  { id: "f21", fact: "The Quran describes the expansion of the universe (51:47) — 1,400 years before Hubble's discovery in 1929.", cat: "Science", emoji: "🔭" },
  { id: "f22", fact: "The Quran describes human embryonic development (23:12-14) with accuracy that wasn't confirmed by science until the 20th century.", cat: "Science", emoji: "🧬" },
  { id: "f23", fact: "The Quran mentions that mountains have deep roots like pegs (78:7) — a geological fact confirmed by modern plate tectonics.", cat: "Science", emoji: "🏔️" },
  { id: "f24", fact: "The Quran states that every living thing is made from water (21:30). Modern biology confirms all life requires water.", cat: "Science", emoji: "💧" },
  { id: "f25", fact: "The Quran describes a barrier between fresh and salt water meeting (55:19-20). This is the halocline — discovered by modern oceanography.", cat: "Science", emoji: "🌊" },
  { id: "f26", fact: "Muslim scholars invented algebra (Al-Khwarizmi), modern optics (Ibn al-Haytham), and pioneered early surgery (Al-Zahrawi).", cat: "Science", emoji: "🧪" },
  { id: "f27", fact: "The word 'algorithm' comes from the name of Muslim mathematician Al-Khwarizmi, who wrote the first algebra textbook in the 9th century.", cat: "Science", emoji: "🔢" },
  { id: "f28", fact: "Ibn Sina (Avicenna) wrote 'The Canon of Medicine' — the standard medical textbook in Europe for over 500 years.", cat: "Science", emoji: "⚕️" },
  { id: "f29", fact: "The first university in the world was founded by Fatima al-Fihri in 859 CE — the University of al-Qarawiyyin in Fez, Morocco.", cat: "Science", emoji: "🎓" },
  { id: "f30", fact: "Abbas ibn Firnas attempted controlled flight in 875 CE — over 1,000 years before the Wright Brothers.", cat: "Science", emoji: "✈️" },

  // HISTORY
  { id: "f31", fact: "The Islamic calendar (Hijri) started from the migration of the Prophet ﷺ from Makkah to Madinah in 622 CE — not from his birth or death.", cat: "History", emoji: "📅" },
  { id: "f32", fact: "During the Conquest of Makkah, the Prophet ﷺ forgave everyone — including those who had persecuted and tortured Muslims for years.", cat: "History", emoji: "🕊️" },
  { id: "f33", fact: "The first muezzin (caller to prayer) in Islam was Bilal ibn Rabah, a formerly enslaved Ethiopian man. Islam elevated him to one of the most honored companions.", cat: "History", emoji: "📢" },
  { id: "f34", fact: "The Prophet's Mosque in Madinah was originally built with date palm trunks and mud bricks. It doubled as a school, court, and community center.", cat: "History", emoji: "🕌" },
  { id: "f35", fact: "Umar ibn Al-Khattab entered Jerusalem in 637 CE. He refused to pray inside the Church of the Holy Sepulchre so it wouldn't be converted into a mosque.", cat: "History", emoji: "🏛️" },
  { id: "f36", fact: "At the Battle of Badr, 313 Muslims with limited weapons defeated an army of about 1,000 well-equipped Quraysh soldiers.", cat: "History", emoji: "⚔️" },
  { id: "f37", fact: "Salahuddin Al-Ayyubi recaptured Jerusalem in 1187 CE without looting or massacring civilians — a stark contrast to the Crusader conquest.", cat: "History", emoji: "🏰" },
  { id: "f38", fact: "The Treaty of Hudaybiyyah seemed like a loss for Muslims, but the Quran called it a 'clear victory' (48:1). It led to the Conquest of Makkah.", cat: "History", emoji: "📜" },
  { id: "f39", fact: "Khadijah bint Khuwaylid was one of the most successful businesswomen in Makkah. She employed the Prophet ﷺ before marrying him.", cat: "History", emoji: "💼" },
  { id: "f40", fact: "The House of Wisdom (Bayt al-Hikma) in Baghdad was a major intellectual center that translated Greek, Persian, and Indian works into Arabic.", cat: "History", emoji: "🏫" },

  // WORSHIP & PRACTICES
  { id: "f41", fact: "Muslims around the world all face the same direction in prayer — toward the Ka'bah in Makkah. This unified direction is called the Qiblah.", cat: "Worship", emoji: "🧭" },
  { id: "f42", fact: "The five daily prayers contain a total of 17 mandatory rak'ahs: 2 (Fajr) + 4 (Dhuhr) + 4 (Asr) + 3 (Maghrib) + 4 (Isha).", cat: "Worship", emoji: "🕌" },
  { id: "f43", fact: "Zamzam water has been flowing continuously for over 4,000 years since Allah provided it for baby Ismail and his mother Hajar.", cat: "Worship", emoji: "💧" },
  { id: "f44", fact: "During Hajj, all pilgrims wear simple white garments (ihram), removing all markers of wealth, status, and nationality — everyone is equal before Allah.", cat: "Worship", emoji: "⚪" },
  { id: "f45", fact: "The Black Stone (Hajr al-Aswad) at the Ka'bah is believed to have come from Paradise. The Prophet ﷺ said it was originally white but turned black from absorbing sins.", cat: "Worship", emoji: "🖤" },
  { id: "f46", fact: "Friday (Jumu'ah) is considered the best day of the week in Islam. The Prophet ﷺ said Adam was created on a Friday and the Day of Judgment will occur on a Friday.", cat: "Worship", emoji: "📿" },
  { id: "f47", fact: "Wudu (ablution before prayer) washes the face, arms, head, and feet — the same body parts that will shine with light (noor) on the Day of Judgment.", cat: "Worship", emoji: "✨" },
  { id: "f48", fact: "The Quran is the most memorized book in human history. Millions of 'huffaz' (memorizers) carry the entire text in their hearts.", cat: "Worship", emoji: "🧠" },
  { id: "f49", fact: "In Islam, even smiling is charity, removing an obstacle from the road is charity, and speaking a kind word is charity.", cat: "Worship", emoji: "😊" },
  { id: "f50", fact: "The adhaan (call to prayer) has remained virtually unchanged for over 1,400 years — the same words Bilal first called in Madinah.", cat: "Worship", emoji: "📢" },

  // NUMBERS & RECORDS
  { id: "f51", fact: "Islam is the fastest-growing religion in the world, with nearly 2 billion followers — about 25% of the global population.", cat: "Numbers", emoji: "🌍" },
  { id: "f52", fact: "There are 99 names of Allah (Asma ul-Husna), each describing a different attribute — from Ar-Rahman (Most Merciful) to As-Sabur (Most Patient).", cat: "Numbers", emoji: "9️⃣9️⃣" },
  { id: "f53", fact: "The Ka'bah is approximately 13.1 meters (43 feet) high. It is covered with a black silk cloth (kiswah) embroidered with gold Quranic verses.", cat: "Numbers", emoji: "🕋" },
  { id: "f54", fact: "During Hajj, over 2 million people gather in one place at one time — making it the largest annual gathering of humans on Earth.", cat: "Numbers", emoji: "👥" },
  { id: "f55", fact: "The Prophet Muhammad ﷺ delivered his Farewell Sermon to over 100,000 people — one of the largest gatherings in the ancient world.", cat: "Numbers", emoji: "🗣️" },
  { id: "f56", fact: "Ramadan shifts by about 11 days each year because the Islamic calendar is lunar. Over a lifetime, Muslims fast in every season.", cat: "Numbers", emoji: "🌙" },
  { id: "f57", fact: "A Muslim who prays five times daily makes at least 119 sajdahs (prostrations) per day — the closest position to Allah.", cat: "Numbers", emoji: "🧎" },
  { id: "f58", fact: "The Ottoman Empire, one of history's largest Islamic civilizations, lasted 624 years (1299-1922) and spanned three continents.", cat: "Numbers", emoji: "🗺️" },
  { id: "f59", fact: "The Great Mosque of Mecca (Masjid al-Haram) can hold up to 4 million worshippers during peak Hajj times.", cat: "Numbers", emoji: "🕌" },
  { id: "f60", fact: "The word 'day' (yawm) appears exactly 365 times in the Quran — the same as the number of days in a solar year.", cat: "Numbers", emoji: "📊" },

  // SURPRISING & COOL
  { id: "f61", fact: "Coffee was discovered by an Ethiopian Muslim shepherd named Kaldi. Muslim Sufi monks popularized it to stay awake for night prayers.", cat: "Cool", emoji: "☕" },
  { id: "f62", fact: "The check/cheque system was invented by Muslim merchants. The Arabic word 'sakk' became the English word 'check.'", cat: "Cool", emoji: "💳" },
  { id: "f63", fact: "Hospitals as we know them were pioneered in the Islamic world. The first modern hospitals had separate wards, pharmacies, and medical training.", cat: "Cool", emoji: "🏥" },
  { id: "f64", fact: "The camera obscura — the basis of all modern cameras — was explained by Ibn al-Haytham in his Book of Optics in the 11th century.", cat: "Cool", emoji: "📸" },
  { id: "f65", fact: "Soap was perfected by Muslim chemists who combined vegetable oils with sodium hydroxide and aromatics — essentially modern soap-making.", cat: "Cool", emoji: "🧼" },
  { id: "f66", fact: "The pointed arch — a key feature of Gothic cathedrals — was originally an Islamic architectural innovation from mosques.", cat: "Cool", emoji: "🏗️" },
  { id: "f67", fact: "Toothbrush use was popularized in Islam. The Prophet ﷺ used the miswak (a twig brush) and recommended it before every prayer.", cat: "Cool", emoji: "🪥" },
  { id: "f68", fact: "Carpets were introduced to Europe through the Islamic world. Prayer rugs evolved into the decorative carpets we know today.", cat: "Cool", emoji: "🧶" },
  { id: "f69", fact: "The three-course meal (soup, main, dessert) originated in the Islamic world and was brought to Europe through Muslim Spain (Al-Andalus).", cat: "Cool", emoji: "🍽️" },
  { id: "f70", fact: "Windmills were invented in Persia by Muslim engineers in the 7th century — 500 years before they appeared in Europe.", cat: "Cool", emoji: "💨" },

  // EVERYDAY ISLAM
  { id: "f71", fact: "Saying 'Bismillah' before eating is Sunnah. The Prophet ﷺ said if you forget, say 'Bismillahi awwalahu wa akhirahu' (In the name of Allah, its beginning and end).", cat: "Daily", emoji: "🍽️" },
  { id: "f72", fact: "The Prophet ﷺ recommended sleeping on your right side. Modern sleep science suggests this aids digestion and heart function.", cat: "Daily", emoji: "😴" },
  { id: "f73", fact: "In Islam, entering a home or mosque with the right foot and leaving with the left is Sunnah.", cat: "Daily", emoji: "👣" },
  { id: "f74", fact: "The Prophet ﷺ said: 'The best of you is the one who is best to his family.' Character at home matters most.", cat: "Daily", emoji: "🏠" },
  { id: "f75", fact: "Yawning is attributed to Shaytan in Islamic tradition. The Prophet ﷺ taught covering the mouth when yawning.", cat: "Daily", emoji: "🤭" },
  { id: "f76", fact: "The Prophet ﷺ would say 'Alhamdulillah' after sneezing and taught others to respond with 'Yarhamukallah' (May Allah have mercy on you).", cat: "Daily", emoji: "🤧" },
  { id: "f77", fact: "Eating with three fingers (thumb, index, and middle) was the Sunnah of the Prophet ﷺ. He also encouraged licking fingers after eating.", cat: "Daily", emoji: "🤲" },
  { id: "f78", fact: "The Prophet ﷺ recommended eating dates in odd numbers — 1, 3, 5, or 7 — especially when breaking fast.", cat: "Daily", emoji: "🌴" },
  { id: "f79", fact: "Making dua (supplication) when it rains is Sunnah. The Prophet ﷺ said rain is a time when dua is more likely to be accepted.", cat: "Daily", emoji: "🌧️" },
  { id: "f80", fact: "The Prophet ﷺ used to apply kohl (eyeliner) and encouraged it, saying it strengthens eyesight and promotes eyelash growth.", cat: "Daily", emoji: "👁️" },

  // BONUS
  { id: "f81", fact: "The Quran challenges anyone to produce even one surah like it (2:23). This challenge has remained unmet for over 1,400 years.", cat: "Quran", emoji: "💎" },
  { id: "f82", fact: "Islam has no clergy or priesthood. Every Muslim has a direct relationship with Allah — no intermediaries needed.", cat: "Worship", emoji: "☝️" },
  { id: "f83", fact: "The Prophet ﷺ said: 'The most beloved places to Allah are the mosques, and the most hated places are the markets.'", cat: "Prophet ﷺ", emoji: "🕌" },
  { id: "f84", fact: "Abu Hurairah — one of the most prolific hadith narrators — got his name (Father of the Kitten) because he always carried a kitten.", cat: "History", emoji: "🐱" },
  { id: "f85", fact: "The Islamic Golden Age (8th-14th century) saw Muslim scholars preserve and advance Greek, Persian, and Indian knowledge during Europe's Dark Ages.", cat: "History", emoji: "💡" },
  { id: "f86", fact: "Surah Al-Ikhlas (Chapter 112) is only 4 verses but the Prophet ﷺ said reciting it equals one-third of the Quran in reward.", cat: "Quran", emoji: "🌟" },
  { id: "f87", fact: "The Prophet ﷺ said there is a cure for every disease. This hadith has inspired Muslim scholars to pursue medical research for centuries.", cat: "Science", emoji: "💊" },
  { id: "f88", fact: "The Arabic language reads right to left. The Quran's Arabic is considered the highest form of Arabic literature ever produced.", cat: "Quran", emoji: "📝" },
  { id: "f89", fact: "In Islam, time is considered one of the greatest blessings. Surah Al-Asr swears by time and warns that humanity is at loss except those who believe and do good.", cat: "Worship", emoji: "⏳" },
  { id: "f90", fact: "The Prophet ﷺ said: 'Make things easy, do not make things difficult. Give glad tidings, do not drive people away.'", cat: "Prophet ﷺ", emoji: "🌿" },
];

const CATEGORIES = ["All", "Quran", "Prophet ﷺ", "Science", "History", "Worship", "Numbers", "Cool", "Daily"];
const CAT_COLORS = {
  "All": "#34D399", "Quran": "#A78BFA", "Prophet ﷺ": "#34D399", "Science": "#4ECDC4",
  "History": "#F97316", "Worship": "#FFD93D", "Numbers": "#FF6B6B", "Cool": "#EC4899", "Daily": "#60A5FA"
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const STORAGE_KEY = "deenscroll-facts";
function loadData() { try { const d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : null; } catch { return null; } }
function saveData(d) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch {} }

export default function FunFacts({ onBack }) {
  const [category, setCategory] = useState("All");
  const [facts, setFacts] = useState([]);
  const [idx, setIdx] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);
  const [seen, setSeen] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [anim, setAnim] = useState("");
  const touchStart = useRef(null);

  useEffect(() => {
    const saved = loadData();
    if (saved) {
      setBookmarks(saved.bookmarks || []);
      setSeen(saved.seen || []);
    }
  }, []);

  useEffect(() => {
    const pool = category === "All" ? ALL_FACTS : ALL_FACTS.filter(f => f.cat === category);
    setFacts(shuffle(pool));
    setIdx(0);
  }, [category]);

  const current = facts[idx];

  const markSeen = (factId) => {
    if (!seen.includes(factId)) {
      const ns = [...seen, factId];
      setSeen(ns);
      saveData({ bookmarks, seen: ns });
    }
  };

  const goNext = () => {
    if (idx >= facts.length - 1) {
      setFacts(shuffle(category === "All" ? ALL_FACTS : ALL_FACTS.filter(f => f.cat === category)));
      setIdx(0);
      return;
    }
    setAnim("next");
    setTimeout(() => {
      setIdx(i => i + 1);
      if (facts[idx]) markSeen(facts[idx].id);
      setAnim("");
    }, 200);
  };

  const goPrev = () => {
    if (idx <= 0) return;
    setAnim("prev");
    setTimeout(() => {
      setIdx(i => i - 1);
      setAnim("");
    }, 200);
  };

  const toggleBookmark = () => {
    if (!current) return;
    let nb;
    if (bookmarks.includes(current.id)) {
      nb = bookmarks.filter(id => id !== current.id);
    } else {
      nb = [...bookmarks, current.id];
    }
    setBookmarks(nb);
    saveData({ bookmarks: nb, seen });
  };

  const shareFact = () => {
    if (!current) return;
    const text = `${current.emoji} Did You Know?\n\n${current.fact}\n\n— DeenScroll\nScroll Less, Deen More.\ndeenscroll.com`;
    if (navigator.share) navigator.share({ text });
    else if (navigator.clipboard) navigator.clipboard.writeText(text);
  };

  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;
    const diff = e.changedTouches[0].clientX - touchStart.current;
    if (diff < -50) goNext();
    else if (diff > 50) goPrev();
    touchStart.current = null;
  };

  // BOOKMARKS VIEW
  if (showBookmarks) {
    const saved = ALL_FACTS.filter(f => bookmarks.includes(f.id));
    return (
      <div style={st.wrap}>
        <style>{css}</style>
        <div style={st.inner}>
          <div style={st.topRow}>
            <button style={st.backBtn} onClick={() => setShowBookmarks(false)}>← Back</button>
            <span style={st.topTitle}>Saved Facts</span>
            <span style={st.topCount}>{saved.length}</span>
          </div>
          {saved.length === 0 ? (
            <p style={st.emptyMsg}>No saved facts yet. Tap the bookmark icon on any fact to save it!</p>
          ) : (
            <div style={st.bmList}>
              {saved.map(f => (
                <div key={f.id} style={st.bmCard}>
                  <span style={st.bmEmoji}>{f.emoji}</span>
                  <p style={st.bmText}>{f.fact}</p>
                  <span style={{ ...st.bmCat, color: CAT_COLORS[f.cat] }}>{f.cat}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // MAIN VIEW
  const isBookmarked = current && bookmarks.includes(current.id);
  const catColor = current ? CAT_COLORS[current.cat] || "#34D399" : "#34D399";

  return (
    <div style={st.wrap}>
      <style>{css}</style>
      <div style={st.inner}>
        {/* Top */}
        <div style={st.topRow}>
          {onBack ? <button style={st.backBtn} onClick={onBack}>← Home</button> : <div />}
          <span style={st.topTitle}>Fun Facts</span>
          <button style={st.bmBtn} onClick={() => setShowBookmarks(true)}>
            🔖 {bookmarks.length}
          </button>
        </div>

        {/* Category pills */}
        <div style={st.catRow}>
          {CATEGORIES.map(c => (
            <button key={c} style={{
              ...st.catPill,
              ...(c === category ? { background: CAT_COLORS[c] + "20", borderColor: CAT_COLORS[c], color: CAT_COLORS[c] } : {}),
            }} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>

        {/* Fact Card */}
        {current && (
          <div
            style={{
              ...st.card,
              borderColor: catColor + "20",
              opacity: anim ? 0 : 1,
              transform: anim === "next" ? "translateX(-30px)" : anim === "prev" ? "translateX(30px)" : "translateX(0)",
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div style={st.cardTop}>
              <span style={{ ...st.cardCat, background: catColor + "15", color: catColor }}>{current.cat}</span>
              <span style={st.cardNum}>{idx + 1} / {facts.length}</span>
            </div>

            <span style={st.cardEmoji}>{current.emoji}</span>

            <div style={st.cardLabel}>Did You Know?</div>

            <p style={st.cardFact}>{current.fact}</p>

            <div style={st.cardActions}>
              <button style={{ ...st.actionBtn, color: isBookmarked ? "#FFD93D" : "rgba(255,255,255,0.3)" }} onClick={toggleBookmark}>
                {isBookmarked ? "★" : "☆"} {isBookmarked ? "Saved" : "Save"}
              </button>
              <button style={st.actionBtn} onClick={shareFact}>
                ↗ Share
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={st.navRow}>
          <button style={{ ...st.navBtn, opacity: idx <= 0 ? 0.3 : 1 }} onClick={goPrev}>← Prev</button>
          <div style={st.swipeHint}>Swipe or tap</div>
          <button style={st.navBtn} onClick={goNext}>Next →</button>
        </div>

        {/* Progress */}
        <div style={st.progressRow}>
          <div style={st.progressOuter}>
            <div style={{ ...st.progressFill, width: `${(seen.length / ALL_FACTS.length) * 100}%` }} />
          </div>
          <span style={st.progressText}>{seen.length} / {ALL_FACTS.length} facts explored</span>
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
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
`;

const st = {
  wrap: {
    minHeight: "100vh",
    background: "linear-gradient(170deg, #0A0F1C 0%, #0D1F3C 40%, #0A1628 70%, #0A0F1C 100%)",
    fontFamily: "'Outfit', sans-serif",
  },
  inner: { maxWidth: "480px", margin: "0 auto", padding: "1.5rem 1.25rem", minHeight: "100vh", display: "flex", flexDirection: "column" },

  topRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" },
  backBtn: { background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" },
  topTitle: { fontFamily: "'Amiri', serif", fontSize: "1.3rem", color: "#F0E6D3", fontWeight: 700 },
  topCount: { fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" },
  bmBtn: { background: "rgba(255,217,61,0.08)", border: "1px solid rgba(255,217,61,0.15)", color: "#FFD93D", padding: "0.35rem 0.75rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 600 },

  catRow: { display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.75rem", marginBottom: "0.75rem", scrollbarWidth: "none" },
  catPill: {
    whiteSpace: "nowrap", padding: "0.35rem 0.8rem", borderRadius: "20px", fontSize: "0.72rem",
    fontWeight: 600, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)",
    color: "rgba(255,255,255,0.4)", transition: "all 0.2s", flexShrink: 0,
  },

  card: {
    flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    background: "rgba(255,255,255,0.025)", border: "1px solid", borderRadius: "24px",
    padding: "2rem 1.5rem", transition: "all 0.2s ease", minHeight: "320px",
  },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "1.25rem" },
  cardCat: { padding: "0.25rem 0.7rem", borderRadius: "14px", fontSize: "0.7rem", fontWeight: 600 },
  cardNum: { fontSize: "0.7rem", color: "rgba(255,255,255,0.2)" },
  cardEmoji: { fontSize: "3rem", marginBottom: "0.75rem", animation: "float 3s ease-in-out infinite" },
  cardLabel: { fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "0.75rem" },
  cardFact: { fontFamily: "'Amiri', serif", fontSize: "1.15rem", color: "#F0E6D3", lineHeight: 1.7, textAlign: "center", maxWidth: "380px" },
  cardActions: { display: "flex", gap: "1.5rem", marginTop: "1.5rem" },
  actionBtn: { background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", fontWeight: 600 },

  navRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0" },
  navBtn: {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    color: "#F0E6D3", padding: "0.65rem 1.25rem", borderRadius: "12px", fontSize: "0.85rem", fontWeight: 600,
  },
  swipeHint: { fontSize: "0.65rem", color: "rgba(255,255,255,0.15)" },

  progressRow: { marginTop: "auto", paddingTop: "0.5rem" },
  progressOuter: { height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden", marginBottom: "0.4rem" },
  progressFill: { height: "100%", background: "linear-gradient(90deg, #4ECDC4, #34D399)", borderRadius: "2px", transition: "width 0.4s" },
  progressText: { fontSize: "0.65rem", color: "rgba(255,255,255,0.2)", textAlign: "center", display: "block" },

  // BOOKMARKS
  emptyMsg: { fontSize: "0.9rem", color: "rgba(255,255,255,0.3)", textAlign: "center", marginTop: "3rem" },
  bmList: { display: "flex", flexDirection: "column", gap: "0.75rem" },
  bmCard: {
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "16px", padding: "1rem 1.25rem",
  },
  bmEmoji: { fontSize: "1.5rem", display: "block", marginBottom: "0.5rem" },
  bmText: { fontSize: "0.9rem", color: "#F0E6D3", lineHeight: 1.6, marginBottom: "0.5rem" },
  bmCat: { fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" },
};
