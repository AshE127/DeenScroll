import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext.jsx";

// ============================================
// EMOJI PUZZLE DATABASE - 60+ puzzles
// ============================================
const ALL_PUZZLES = [
  // PROPHETS & STORIES
  { id: "e1", emojis: "🌊🚢🕊️", answer: 0, opts: ["Story of Nuh (Noah)", "Story of Musa (Moses)", "Story of Yunus (Jonah)", "Story of Sulayman"], cat: "Prophets", info: "Nuh (AS) built the Ark by Allah's command, and the dove signaled the end of the flood." },
  { id: "e2", emojis: "🔥🕊️🙏", answer: 0, opts: ["Ibrahim thrown in Fire", "Musa & the Bush", "Story of Lut (AS)", "Day of Judgment"], cat: "Prophets", info: "Ibrahim (AS) was thrown into a fire by Nimrod, but Allah commanded: 'O fire, be cool and safe.'" },
  { id: "e3", emojis: "🐋🌊🤲", answer: 0, opts: ["Story of Yunus (Jonah)", "Story of Nuh (Noah)", "Story of Musa (Moses)", "Story of Dawud"], cat: "Prophets", info: "Yunus (AS) was swallowed by a whale and made dua in its belly until Allah saved him." },
  { id: "e4", emojis: "🌈👔😢🕳️", answer: 0, opts: ["Story of Yusuf (Joseph)", "Story of Yaqub (Jacob)", "Story of Musa (Moses)", "Story of Dawud"], cat: "Prophets", info: "Yusuf's brothers threw him in a well out of jealousy. His colorful garment was used to deceive their father." },
  { id: "e5", emojis: "🏔️⚡📜", answer: 0, opts: ["Musa receives the Torah", "Isra and Mi'raj", "Story of Ibrahim", "Revelation of Quran"], cat: "Prophets", info: "Musa (AS) received the Torah from Allah on Mount Sinai." },
  { id: "e6", emojis: "🌊🏃‍♂️👑💀", answer: 0, opts: ["Musa parts the Red Sea", "Story of Nuh", "Story of Yunus", "Conquest of Makkah"], cat: "Prophets", info: "Musa struck the sea with his staff and Allah parted it, drowning Pharaoh's army." },
  { id: "e7", emojis: "👶🌴💧", answer: 0, opts: ["Birth of Isa (Jesus)", "Birth of Musa", "Story of Hajar", "Birth of Yahya"], cat: "Prophets", info: "Maryam gave birth to Isa under a palm tree, and Allah provided dates and a stream." },
  { id: "e8", emojis: "🐜👑🗣️", answer: 0, opts: ["Sulayman & the Ant", "Musa & the Bush", "Dawud & Goliath", "Ibrahim & Birds"], cat: "Prophets", info: "Sulayman (AS) heard an ant warning others to hide, smiled, and thanked Allah." },
  { id: "e9", emojis: "🐑🔪🤲😇", answer: 0, opts: ["Ibrahim's Sacrifice", "Eid al-Adha origin", "Story of Habil & Qabil", "Aqeeqah tradition"], cat: "Prophets", info: "Allah tested Ibrahim by commanding him to sacrifice Ismail, then replaced him with a ram." },
  { id: "e10", emojis: "🦅🔪🏔️✨", answer: 0, opts: ["Ibrahim & the Four Birds", "Sulayman & Hoopoe", "Nuh & the Dove", "Story of Ababil"], cat: "Prophets", info: "Allah showed Ibrahim how He gives life — four birds were cut apart, scattered, then returned alive." },
  { id: "e11", emojis: "👶🏞️📦👸", answer: 0, opts: ["Baby Musa in the River", "Baby Isa (Jesus)", "Baby Ibrahim", "Baby Ismail"], cat: "Prophets", info: "Musa's mother placed him in a basket in the Nile. Pharaoh's wife Asiyah found and raised him." },
  { id: "e12", emojis: "🐛😷🤲⏳", answer: 0, opts: ["Patience of Ayyub (Job)", "Sickness of Prophet ﷺ", "Story of Yaqub", "Story of Dhul-Kifl"], cat: "Prophets", info: "Ayyub (AS) endured years of illness and loss with incredible sabr. Allah restored everything." },
  { id: "e13", emojis: "⭐⭐🌙☀️", answer: 0, opts: ["Yusuf's Dream", "Isra and Mi'raj", "Ibrahim's Dream", "Laylatul Qadr"], cat: "Prophets", info: "Young Yusuf dreamed of 11 stars, the sun, and moon bowing to him — fulfilled years later in Egypt." },
  { id: "e14", emojis: "🏗️🕋👨‍👦🤲", answer: 0, opts: ["Building the Ka'bah", "Building Masjid Nabawi", "Building Al-Aqsa", "Story of Thamud"], cat: "Prophets", info: "Ibrahim and Ismail raised the foundations of the Ka'bah, praying for Allah's acceptance." },
  { id: "e15", emojis: "💎👸🐦✉️", answer: 0, opts: ["Sulayman & Queen of Sheba", "Sulayman & the Jinn", "Dawud & Psalms", "Yusuf & Zulaykha"], cat: "Prophets", info: "Sulayman sent a hoopoe bird with a letter to the Queen of Sheba, inviting her to worship Allah." },
  { id: "e16", emojis: "🏜️💧👶😭", answer: 0, opts: ["Hajar & Baby Ismail", "Maryam & Baby Isa", "Musa's mother", "Story of Lut"], cat: "Prophets", info: "Hajar ran between Safa and Marwa seeking water for baby Ismail. Allah sent the well of Zamzam." },
  { id: "e17", emojis: "🪨👦🗡️👑", answer: 0, opts: ["Dawud vs Goliath", "Musa vs Pharaoh", "Ibrahim vs Nimrod", "Khalid in Battle"], cat: "Prophets", info: "Young Dawud defeated the giant Goliath (Jalut) with a sling and a stone, by Allah's will." },
  { id: "e18", emojis: "🔥🌳🗣️👟", answer: 0, opts: ["Musa & Burning Bush", "Ibrahim in the Fire", "Jinn & Fire", "Story of Salih"], cat: "Prophets", info: "Musa saw a fire on Mount Tur. Allah spoke to him from the burning bush and told him to remove his shoes." },

  // ISLAMIC EVENTS
  { id: "e19", emojis: "🌙✈️🕌🌟", answer: 0, opts: ["Isra and Mi'raj", "Hijrah to Madinah", "Laylatul Qadr", "Conquest of Makkah"], cat: "Events", info: "The Prophet ﷺ traveled from Makkah to Jerusalem and ascended through the seven heavens in one night." },
  { id: "e20", emojis: "🏜️🐪🌙🕌", answer: 0, opts: ["The Hijrah to Madinah", "Conquest of Makkah", "Journey to Ta'if", "Battle of Badr"], cat: "Events", info: "The Prophet ﷺ and Abu Bakr migrated to Madinah in 622 CE, starting the Islamic calendar." },
  { id: "e21", emojis: "⚔️3️⃣1️⃣3️⃣🏜️", answer: 0, opts: ["Battle of Badr", "Battle of Uhud", "Battle of Khandaq", "Battle of Hunayn"], cat: "Events", info: "313 Muslims defeated about 1,000 Quraysh at Badr — the first major victory in Islam." },
  { id: "e22", emojis: "🕋🔓🕊️☪️", answer: 0, opts: ["Conquest of Makkah", "Treaty of Hudaybiyyah", "Battle of Hunayn", "Farewell Pilgrimage"], cat: "Events", info: "The Prophet ﷺ entered Makkah with 10,000 Muslims, forgave everyone, and cleansed the Ka'bah." },
  { id: "e23", emojis: "🕸️🐦🏔️😮", answer: 0, opts: ["Cave of Thawr (Hijrah)", "Cave of Hira", "People of the Cave", "Companions of Trench"], cat: "Events", info: "During Hijrah, a spider spun a web and a bird nested at the cave entrance, hiding the Prophet ﷺ and Abu Bakr." },
  { id: "e24", emojis: "📖💡🏔️😇", answer: 0, opts: ["First Revelation in Hira", "Musa on Mount Sinai", "Isra and Mi'raj", "Torah revealed"], cat: "Events", info: "Angel Jibreel appeared to Prophet Muhammad ﷺ in Cave Hira and said 'Iqra' — Read!" },
  { id: "e25", emojis: "🏔️⚔️🏹😢", answer: 0, opts: ["Battle of Uhud", "Battle of Badr", "Battle of Khandaq", "Battle of Tabuk"], cat: "Events", info: "At Uhud, Muslims suffered losses when archers left their posts. The Prophet ﷺ was wounded." },
  { id: "e26", emojis: "🏚️⛏️🌊🛡️", answer: 0, opts: ["Battle of the Trench", "Battle of Badr", "Battle of Uhud", "Siege of Ta'if"], cat: "Events", info: "Salman al-Farisi suggested digging a trench around Madinah, stopping a massive coalition army." },
  { id: "e27", emojis: "📝🤝🕊️⏸️", answer: 0, opts: ["Treaty of Hudaybiyyah", "Constitution of Madinah", "Treaty of Aqaba", "Conquest of Makkah"], cat: "Events", info: "A 10-year peace treaty with Quraysh that seemed unfavorable but was a strategic victory for Islam." },
  { id: "e28", emojis: "🐘🏕️🐦💥", answer: 0, opts: ["Year of the Elephant", "Battle of Badr", "Story of Thamud", "Conquest of Makkah"], cat: "Events", info: "Abraha's army with elephants tried to destroy the Ka'bah. Allah sent birds with stones to destroy them." },
  { id: "e29", emojis: "🕋🏔️👣🤲", answer: 0, opts: ["Farewell Pilgrimage", "First Hajj", "Umrah of Prophet ﷺ", "Ibrahim builds Ka'bah"], cat: "Events", info: "The Prophet's ﷺ final Hajj where he delivered his famous farewell sermon to 100,000+ Muslims." },
  { id: "e30", emojis: "📢🗣️🏛️😡", answer: 0, opts: ["Prophet ﷺ at Mount Safa", "Bilal's Adhan", "Abu Bakr's speech", "Umar accepts Islam"], cat: "Events", info: "The Prophet ﷺ climbed Mount Safa to publicly invite the Quraysh to Islam for the first time." },

  // PILLARS & PRACTICES
  { id: "e31", emojis: "🕌🧎‍♂️5️⃣☀️🌙", answer: 0, opts: ["Five Daily Prayers", "Five Pillars of Islam", "Taraweeh Prayer", "Jumu'ah Prayer"], cat: "Pillars", info: "Muslims pray 5 times daily: Fajr, Dhuhr, Asr, Maghrib, and Isha." },
  { id: "e32", emojis: "🌙🍽️🚫☀️", answer: 0, opts: ["Fasting in Ramadan", "Suhoor meal", "Iftar meal", "Eid celebration"], cat: "Pillars", info: "Muslims fast from dawn to sunset during Ramadan — no food, drink, or bad behavior." },
  { id: "e33", emojis: "🕋👣⚪🤲", answer: 0, opts: ["Hajj Pilgrimage", "Umrah", "Tawaf only", "Eid prayer"], cat: "Pillars", info: "Hajj is the annual pilgrimage to Makkah — one of the five pillars, required once if able." },
  { id: "e34", emojis: "💰🤲❤️🧑‍🤝‍🧑", answer: 0, opts: ["Zakat (Charity)", "Sadaqah", "Khums", "Waqf"], cat: "Pillars", info: "Zakat is giving 2.5% of savings to those in need — a pillar of Islam that purifies wealth." },
  { id: "e35", emojis: "☝️🗣️❤️🕌", answer: 0, opts: ["Shahada (Declaration)", "Making Dua", "Dhikr", "Khutbah"], cat: "Pillars", info: "The Shahada — declaring belief in one God and Muhammad ﷺ as His messenger — is the first pillar." },
  { id: "e36", emojis: "🌙✨📖🤲", answer: 0, opts: ["Laylatul Qadr", "Taraweeh", "Isra & Mi'raj", "Eid night"], cat: "Pillars", info: "The Night of Power in the last 10 nights of Ramadan — better than 1,000 months of worship." },
  { id: "e37", emojis: "💧🤲👣🧹", answer: 0, opts: ["Wudu (Ablution)", "Ghusl", "Tayammum", "Istinja"], cat: "Pillars", info: "Wudu is the ritual washing before prayer — face, arms, head, and feet." },
  { id: "e38", emojis: "🌅🍴💪🤲", answer: 0, opts: ["Suhoor (Pre-dawn meal)", "Iftar meal", "Eid breakfast", "Walimah feast"], cat: "Pillars", info: "Suhoor is the blessed pre-dawn meal before fasting begins. The Prophet ﷺ encouraged never skipping it." },
  { id: "e39", emojis: "🌇🍴🤲😊", answer: 0, opts: ["Iftar (Breaking fast)", "Suhoor meal", "Eid feast", "Friday lunch"], cat: "Pillars", info: "Iftar is breaking the fast at sunset, traditionally with dates and water following the Sunnah." },
  { id: "e40", emojis: "🕌🌙🧎‍♂️📖", answer: 0, opts: ["Taraweeh Prayer", "Tahajjud", "Eid Prayer", "Jumu'ah"], cat: "Pillars", info: "Taraweeh is the special night prayer in Ramadan, prayed in congregation after Isha." },

  // CONCEPTS & PLACES
  { id: "e41", emojis: "🕋🔲🌍🧭", answer: 0, opts: ["The Ka'bah / Qiblah", "Masjid An-Nabawi", "Masjid Al-Aqsa", "Dome of the Rock"], cat: "Places", info: "The Ka'bah in Makkah is the Qiblah — the direction all Muslims face when praying." },
  { id: "e42", emojis: "💚🕌🌴☮️", answer: 0, opts: ["Madinah", "Makkah", "Jerusalem", "Damascus"], cat: "Places", info: "Madinah — the City of the Prophet ﷺ — where he migrated, lived, and is buried." },
  { id: "e43", emojis: "🏛️🌟🕌🪨", answer: 0, opts: ["Masjid Al-Aqsa", "Masjid Al-Haram", "Masjid An-Nabawi", "Dome of the Rock"], cat: "Places", info: "Al-Aqsa in Jerusalem — the third holiest mosque, destination of the Prophet's ﷺ Night Journey." },
  { id: "e44", emojis: "💧⛰️🏃‍♀️7️⃣", answer: 0, opts: ["Sa'i between Safa & Marwa", "Tawaf around Ka'bah", "Wudu steps", "Zamzam well"], cat: "Places", info: "During Hajj, pilgrims walk between Safa and Marwa 7 times, honoring Hajar's search for water." },
  { id: "e45", emojis: "💧🕳️♾️🤲", answer: 0, opts: ["Zamzam Well", "River Nile", "River Kawthar", "Spring of Salsabil"], cat: "Places", info: "The Zamzam well has been flowing since Allah provided it for baby Ismail — over 4,000 years." },

  // ISLAMIC HERITAGE & PEOPLE
  { id: "e46", emojis: "📢🗣️⛓️🕊️", answer: 0, opts: ["Bilal ibn Rabah", "Abu Bakr As-Siddiq", "Umar ibn Al-Khattab", "Salman al-Farisi"], cat: "People", info: "Bilal was an enslaved man who endured torture for his faith and became the first mu'adhin." },
  { id: "e47", emojis: "🦁⚔️☪️💪", answer: 0, opts: ["Khalid ibn Al-Walid", "Ali ibn Abi Talib", "Hamza", "Sa'd ibn Abi Waqqas"], cat: "People", info: "Khalid ibn Al-Walid — 'Sword of Allah' — was an undefeated military commander in Islamic history." },
  { id: "e48", emojis: "👧❤️📚🕌", answer: 0, opts: ["Khadijah bint Khuwaylid", "Aisha bint Abu Bakr", "Fatimah bint Muhammad", "Maryam"], cat: "People", info: "Khadijah was the Prophet's ﷺ first wife, first believer, and his greatest supporter." },
  { id: "e49", emojis: "⚖️📏🌍💪", answer: 0, opts: ["Umar ibn Al-Khattab", "Abu Bakr", "Uthman", "Ali"], cat: "People", info: "Umar's caliphate was known for justice, expansion, and administrative innovation." },
  { id: "e50", emojis: "🤲💰📖😭", answer: 0, opts: ["Abu Bakr As-Siddiq", "Umar", "Uthman", "Ali"], cat: "People", info: "Abu Bakr gave everything he owned for Islam and was the first adult man to accept the faith." },
  { id: "e51", emojis: "📖💡🧪🌍", answer: 0, opts: ["Islamic Golden Age", "Ottoman Empire", "Umayyad Dynasty", "Abbasid founding"], cat: "People", info: "The Islamic Golden Age saw Muslim scholars pioneer algebra, optics, medicine, and astronomy." },
  { id: "e52", emojis: "⚔️🏰🕊️😊", answer: 0, opts: ["Salahuddin Al-Ayyubi", "Tariq ibn Ziyad", "Muhammad al-Fatih", "Khalid ibn Al-Walid"], cat: "People", info: "Salahuddin recaptured Jerusalem in 1187 CE and was famous for his mercy to defeated enemies." },

  // FUN / EMOJI WORDPLAY
  { id: "e53", emojis: "🐝📖", answer: 0, opts: ["Surah An-Nahl (The Bee)", "Surah Al-Ankabut", "Surah An-Naml", "Surah Al-Fil"], cat: "Quran", info: "Surah An-Nahl (The Bee) — Chapter 16 — discusses bees as a sign of Allah's creation." },
  { id: "e54", emojis: "🕷️📖", answer: 0, opts: ["Surah Al-Ankabut (Spider)", "Surah An-Nahl", "Surah An-Naml", "Surah Al-Fil"], cat: "Quran", info: "Surah Al-Ankabut (The Spider) — Chapter 29 — compares false beliefs to a spider's fragile web." },
  { id: "e55", emojis: "🐜📖", answer: 0, opts: ["Surah An-Naml (The Ant)", "Surah Al-Ankabut", "Surah An-Nahl", "Surah Al-Fil"], cat: "Quran", info: "Surah An-Naml (The Ant) — Chapter 27 — features the story of Sulayman and the ant." },
  { id: "e56", emojis: "🐘📖", answer: 0, opts: ["Surah Al-Fil (Elephant)", "Surah An-Nahl", "Surah Al-Baqarah", "Surah An-Naml"], cat: "Quran", info: "Surah Al-Fil (The Elephant) — about Abraha's army that tried to destroy the Ka'bah." },
  { id: "e57", emojis: "🐄📖", answer: 0, opts: ["Surah Al-Baqarah (The Cow)", "Surah An-Nahl", "Surah Al-An'am", "Surah Al-Fil"], cat: "Quran", info: "Surah Al-Baqarah (The Cow) — the longest surah, named after the golden calf story." },
  { id: "e58", emojis: "🌟📖🌃", answer: 0, opts: ["Surah An-Najm (The Star)", "Surah Al-Qamar", "Surah Ash-Shams", "Surah Al-Buruj"], cat: "Quran", info: "Surah An-Najm (The Star) — Chapter 53 — opens with Allah swearing by the star." },
  { id: "e59", emojis: "🌙📖", answer: 0, opts: ["Surah Al-Qamar (The Moon)", "Surah An-Najm", "Surah Ash-Shams", "Surah Al-Layl"], cat: "Quran", info: "Surah Al-Qamar (The Moon) — describes the miracle of the moon splitting." },
  { id: "e60", emojis: "☀️📖", answer: 0, opts: ["Surah Ash-Shams (The Sun)", "Surah Al-Qamar", "Surah Ad-Duha", "Surah Al-Fajr"], cat: "Quran", info: "Surah Ash-Shams (The Sun) — Chapter 91 — opens with Allah swearing by the sun and its brightness." },
  { id: "e61", emojis: "⛰️🌅📖", answer: 0, opts: ["Surah Al-Fajr (The Dawn)", "Surah Ad-Duha", "Surah Ash-Shams", "Surah Al-Asr"], cat: "Quran", info: "Surah Al-Fajr (The Dawn) — Chapter 89 — discusses the fate of past civilizations." },
  { id: "e62", emojis: "🫣🤦‍♂️📖", answer: 0, opts: ["Surah Abasa (He Frowned)", "Surah Al-Humazah", "Surah Al-Masad", "Surah At-Takwir"], cat: "Quran", info: "Surah Abasa — Allah addressed the Prophet ﷺ when he frowned at a blind man seeking knowledge." },
  { id: "e63", emojis: "🌅⏰📖", answer: 0, opts: ["Surah Al-Asr (Declining Day)", "Surah Al-Fajr", "Surah Ad-Duha", "Surah Al-Layl"], cat: "Quran", info: "Surah Al-Asr — 'By time, indeed mankind is in loss' — one of the shortest but most powerful surahs." },
  { id: "e64", emojis: "🤲❤️☝️📖", answer: 0, opts: ["Surah Al-Ikhlas (Sincerity)", "Surah Al-Fatiha", "Surah An-Nas", "Surah Al-Falaq"], cat: "Quran", info: "Surah Al-Ikhlas — pure monotheism in 4 verses. Equal to one-third of the Quran in reward." },
];

const CATEGORIES = ["All", "Prophets", "Events", "Pillars", "Places", "People", "Quran"];
const CAT_EMOJIS = { All: "✦", Prophets: "🌟", Events: "⚔️", Pillars: "🕌", Places: "🕋", People: "👤", Quran: "📖" };
const CAT_COLORS = { Prophets: "#FFD93D", Events: "#FF6B6B", Pillars: "#34D399", Places: "#4ECDC4", People: "#F97316", Quran: "#A78BFA" };

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const STORAGE_KEY = "deenscroll-emoji";

function loadData() {
  try {
    const d = localStorage.getItem(STORAGE_KEY);
    return d ? JSON.parse(d) : null;
  } catch { return null; }
}

function saveData(d) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch {}
}

function getDefault() {
  return { seen: [], correct: [], wrong: [], streak: 0, bestStreak: 0, total: 0, totalCorrect: 0 };
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function EmojiGame({ onBack }) {
  const { checkPlayLimit, recordPlay } = useAuth();
  const [screen, setScreen] = useState("home");
  const [progress, setProgress] = useState(getDefault());
  const [category, setCategory] = useState("All");
  const [queue, setQueue] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [session, setSession] = useState({ correct: 0, total: 0 });
  const [anim, setAnim] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);

  useEffect(() => {
    const saved = loadData();
    if (saved) setProgress(saved);
  }, []);

  const buildQueue = useCallback((cat) => {
    const pool = cat === "All" ? ALL_PUZZLES : ALL_PUZZLES.filter(p => p.cat === cat);
    const unseen = pool.filter(p => !progress.seen.includes(p.id));
    const wrongRetry = pool.filter(p => progress.wrong.includes(p.id) && !unseen.find(u => u.id === p.id));
    const rest = pool.filter(p => !unseen.find(u => u.id === p.id) && !wrongRetry.find(w => w.id === p.id));
    const ordered = [...shuffle(unseen), ...shuffle(wrongRetry), ...shuffle(rest)];
    return ordered.length > 0 ? ordered : shuffle(pool);
  }, [progress]);

  const startGame = (cat) => {
    if (!checkPlayLimit('emoji')) return;
    setCategory(cat);
    setQueue(buildQueue(cat));
    setIdx(0);
    setSelected(null);
    setShowInfo(false);
    setSession({ correct: 0, total: 0 });
    setHintLevel(0);
    setScreen("game");
  };

  const currentP = queue[idx];

  const handleAnswer = (i) => {
    if (selected !== null) return;
    recordPlay('emoji');
    setSelected(i);
    setShowInfo(true);

    const isCorrect = i === currentP.answer;
    setSession(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));

    const np = { ...progress };
    if (!np.seen.includes(currentP.id)) np.seen = [...np.seen, currentP.id];
    np.total += 1;
    if (isCorrect) {
      np.totalCorrect += 1;
      np.streak += 1;
      np.wrong = np.wrong.filter(id => id !== currentP.id);
      if (!np.correct.includes(currentP.id)) np.correct = [...np.correct, currentP.id];
      if (np.streak > np.bestStreak) np.bestStreak = np.streak;
    } else {
      np.streak = 0;
      if (!np.wrong.includes(currentP.id)) np.wrong = [...np.wrong, currentP.id];
      np.correct = np.correct.filter(id => id !== currentP.id);
    }
    setProgress(np);
    saveData(np);
  };

  const nextQuestion = () => {
    if (!checkPlayLimit('emoji')) return;
    setAnim(true);
    setTimeout(() => {
      if (idx + 1 >= queue.length) {
        setScreen("results");
      } else {
        setIdx(idx + 1);
        setSelected(null);
        setShowInfo(false);
        setHintLevel(0);
      }
      setAnim(false);
    }, 250);
  };

  const revealHint = () => {
    if (hintLevel < currentP.emojis.length) setHintLevel(h => h + 1);
  };

  const resetProgress = () => {
    const d = getDefault();
    setProgress(d);
    saveData(d);
    setScreen("home");
  };

  const shareResult = () => {
    const pct = session.total > 0 ? Math.round((session.correct / session.total) * 100) : 0;
    const text = `🌙 DeenScroll Emoji Quiz\n\n${session.correct}/${session.total} correct (${pct}%)\n🔥 Best streak: ${progress.bestStreak}\n\nScroll Less, Deen More.\ndeenscroll.com`;
    if (navigator.share) {
      navigator.share({ text });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
  };

  // ============================================
  // HOME
  // ============================================
  if (screen === "home") {
    const pct = progress.total > 0 ? Math.round((progress.totalCorrect / progress.total) * 100) : 0;
    return (
      <div style={st.container}>
        <style>{css}</style>
        <div style={st.homeInner}>
          {onBack && <button style={st.backLink} onClick={onBack}>← DeenScroll Home</button>}
          <div style={st.homeHero}>
            <span style={st.heroEmoji}>🤔</span>
            <h1 style={st.heroTitle}>Guess the Emoji</h1>
            <p style={st.heroBadge}>Islamic Edition</p>
            <p style={st.heroSub}>Can you guess the Islamic story, event, or concept from emojis alone?</p>
          </div>

          <div style={st.statsRow}>
            <div style={st.statBox}>
              <span style={st.statNum}>{progress.bestStreak}</span>
              <span style={st.statLabel}>🔥 Best</span>
            </div>
            <div style={st.statDiv} />
            <div style={st.statBox}>
              <span style={st.statNum}>{progress.seen.length}</span>
              <span style={st.statLabel}>Played</span>
            </div>
            <div style={st.statDiv} />
            <div style={st.statBox}>
              <span style={st.statNum}>{pct}%</span>
              <span style={st.statLabel}>Accuracy</span>
            </div>
          </div>

          <div style={st.catSection}>
            <p style={st.catLabel}>Pick a Category</p>
            <div style={st.catGrid}>
              {CATEGORIES.map(cat => {
                const count = cat === "All" ? ALL_PUZZLES.length : ALL_PUZZLES.filter(p => p.cat === cat).length;
                return (
                  <button key={cat} style={{
                    ...st.catCard,
                    borderColor: cat === "All" ? "rgba(255,255,255,0.1)" : (CAT_COLORS[cat] || "#fff") + "30",
                  }} onClick={() => startGame(cat)}>
                    <span style={st.catEmoji}>{CAT_EMOJIS[cat]}</span>
                    <span style={st.catName}>{cat}</span>
                    <span style={st.catCount}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {progress.total > 0 && (
            <button style={st.resetBtn} onClick={resetProgress}>Reset Progress</button>
          )}
        </div>
      </div>
    );
  }

  // ============================================
  // GAME
  // ============================================
  if (screen === "game" && currentP) {
    const catColor = CAT_COLORS[currentP.cat] || "#34D399";
    const emojiChars = [...currentP.emojis.match(/\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu) || []];

    return (
      <div style={st.container}>
        <style>{css}</style>
        <div style={st.gameInner}>
          {/* Top bar */}
          <div style={st.topBar}>
            <button style={st.closeBtn} onClick={() => setScreen("home")}>✕</button>
            <div style={st.progressBar}>
              <div style={{ ...st.progressFill, width: `${((idx + 1) / queue.length) * 100}%`, background: catColor }} />
            </div>
            <span style={st.counter}>{idx + 1}/{queue.length}</span>
          </div>

          {/* Card */}
          <div style={{
            ...st.card,
            opacity: anim ? 0 : 1,
            transform: anim ? "translateY(-20px)" : "translateY(0)",
          }}>
            <div style={{ ...st.cardCat, background: catColor + "18", color: catColor }}>
              {CAT_EMOJIS[currentP.cat]} {currentP.cat}
            </div>

            {/* Emoji Display */}
            <div style={st.emojiBox}>
              <div style={st.emojiRow}>
                {emojiChars.map((e, i) => (
                  <span key={i} style={{
                    ...st.emojiChar,
                    animationDelay: `${i * 0.12}s`,
                  }}>{e}</span>
                ))}
              </div>
              <p style={st.emojiPrompt}>What does this represent?</p>
            </div>

            {/* Options */}
            <div style={st.optsCol}>
              {currentP.opts.map((opt, i) => {
                let optSt = { ...st.optBtn };
                if (selected !== null) {
                  if (i === currentP.answer) optSt = { ...optSt, ...st.optCorrect };
                  else if (i === selected && i !== currentP.answer) optSt = { ...optSt, ...st.optWrong };
                  else optSt = { ...optSt, opacity: 0.35 };
                }
                return (
                  <button key={i} style={optSt} onClick={() => handleAnswer(i)}>
                    <span style={st.optText}>{opt}</span>
                    {selected !== null && i === currentP.answer && <span style={st.check}>✓</span>}
                    {selected === i && i !== currentP.answer && <span style={st.cross}>✗</span>}
                  </button>
                );
              })}
            </div>

            {/* Info */}
            {showInfo && (
              <div style={st.infoBox}>
                <p style={st.infoText}>{currentP.info}</p>
                <button style={{ ...st.nextBtn, background: catColor }} onClick={nextQuestion}>
                  {idx + 1 >= queue.length ? "See Results" : "Next →"}
                </button>
              </div>
            )}
          </div>

          {/* Session */}
          <div style={st.sessionBar}>
            {progress.streak >= 3 && <span style={st.streakPill}>🔥 {progress.streak}</span>}
            <span style={{ color: "#34D399" }}>✓ {session.correct}</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
            <span style={{ color: "#FF6B6B" }}>✗ {session.total - session.correct}</span>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // RESULTS
  // ============================================
  if (screen === "results") {
    const pct = session.total > 0 ? Math.round((session.correct / session.total) * 100) : 0;
    let msg = "";
    if (pct >= 90) msg = "Masha'Allah! Emoji master! 🌟";
    else if (pct >= 70) msg = "Great job! You really know your deen! 💪";
    else if (pct >= 50) msg = "Good effort! Keep learning! 📚";
    else msg = "Every attempt is a step closer to knowledge! 🤲";

    return (
      <div style={st.container}>
        <style>{css}</style>
        <div style={st.resultsInner}>
          <span style={st.resultsMoon}>🌙</span>
          <h1 style={st.resultsTitle}>Round Complete!</h1>
          <p style={st.resultsMsg}>{msg}</p>

          <div style={st.resultsRing}>
            <svg width="150" height="150" viewBox="0 0 150 150">
              <circle cx="75" cy="75" r="64" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9" />
              <circle cx="75" cy="75" r="64" fill="none"
                stroke={pct >= 70 ? "#34D399" : pct >= 50 ? "#FFD93D" : "#FF6B6B"}
                strokeWidth="9" strokeDasharray={`${(pct / 100) * 402} 402`}
                strokeLinecap="round" transform="rotate(-90 75 75)" />
            </svg>
            <div style={st.ringInner}>
              <span style={st.ringPct}>{pct}%</span>
            </div>
          </div>

          <div style={st.resultsStats}>
            <div style={st.rStat}><span style={{ ...st.rStatNum, color: "#34D399" }}>{session.correct}</span><span style={st.rStatLabel}>Correct</span></div>
            <div style={st.rStat}><span style={{ ...st.rStatNum, color: "#FF6B6B" }}>{session.total - session.correct}</span><span style={st.rStatLabel}>Missed</span></div>
            <div style={st.rStat}><span style={{ ...st.rStatNum, color: "#FFD93D" }}>{progress.bestStreak}</span><span style={st.rStatLabel}>🔥 Best</span></div>
          </div>

          <button style={st.shareBtn} onClick={shareResult}>
            📤 Share Results
          </button>
          <button style={st.playAgainBtn} onClick={() => startGame(category)}>
            Play Again — {category}
          </button>
          <button style={st.homeBtn} onClick={() => setScreen("home")}>
            ← Back to Categories
          </button>
        </div>
      </div>
    );
  }

  return null;
}

// ============================================
// CSS
// ============================================
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Amiri:wght@400;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  body { background: #0A0F1C; }
  button { cursor: pointer; font-family: 'Outfit', sans-serif; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes popEmoji { from { opacity: 0; transform: scale(0.3) rotate(-10deg); } to { opacity: 1; transform: scale(1) rotate(0); } }
  @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }
  @keyframes glow { 0%,100%{box-shadow:0 0 8px rgba(255,217,61,0.3)} 50%{box-shadow:0 0 20px rgba(255,217,61,0.5)} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
`;

// ============================================
// STYLES
// ============================================
const st = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(170deg, #0A0F1C 0%, #1A0A2E 40%, #0D1B2A 70%, #0A0F1C 100%)",
    fontFamily: "'Outfit', sans-serif",
  },

  // HOME
  homeInner: { maxWidth: "480px", margin: "0 auto", padding: "1.5rem 1.25rem" },
  backLink: {
    background: "none", border: "none", color: "rgba(255,255,255,0.3)",
    fontSize: "0.8rem", padding: "0.5rem 0", display: "block", marginBottom: "0.5rem",
  },
  homeHero: { textAlign: "center", marginBottom: "1.5rem" },
  heroEmoji: { fontSize: "3.5rem", display: "block", marginBottom: "0.5rem", animation: "float 3s ease-in-out infinite" },
  heroTitle: { fontFamily: "'Amiri', serif", fontSize: "2.5rem", color: "#F0E6D3", fontWeight: 700 },
  heroBadge: {
    display: "inline-block", marginTop: "0.4rem", padding: "0.25rem 0.9rem", borderRadius: "20px",
    background: "rgba(167,139,250,0.12)", color: "#A78BFA", fontSize: "0.75rem",
    fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
  },
  heroSub: { fontSize: "0.95rem", color: "rgba(240,230,211,0.45)", lineHeight: 1.6, marginTop: "1rem", maxWidth: "340px", margin: "1rem auto 0" },

  statsRow: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: "1.25rem",
    background: "rgba(255,255,255,0.03)", borderRadius: "16px", padding: "1rem",
    border: "1px solid rgba(255,255,255,0.05)", marginBottom: "1.75rem",
  },
  statBox: { display: "flex", flexDirection: "column", alignItems: "center", gap: "0.15rem" },
  statNum: { fontSize: "1.5rem", fontWeight: 700, color: "#F0E6D3" },
  statLabel: { fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" },
  statDiv: { width: "1px", height: "28px", background: "rgba(255,255,255,0.06)" },

  catSection: { marginBottom: "1.5rem" },
  catLabel: { fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "0.75rem" },
  catGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" },
  catCard: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem",
    padding: "0.9rem 0.5rem", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)", transition: "all 0.2s",
  },
  catEmoji: { fontSize: "1.4rem" },
  catName: { fontSize: "0.85rem", fontWeight: 600, color: "#F0E6D3" },
  catCount: { fontSize: "0.65rem", color: "rgba(255,255,255,0.25)" },
  resetBtn: {
    display: "block", margin: "0 auto", background: "none",
    border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)",
    padding: "0.55rem 1.25rem", borderRadius: "25px", fontSize: "0.75rem",
  },

  // GAME
  gameInner: { maxWidth: "480px", margin: "0 auto", padding: "1rem 1.25rem", minHeight: "100vh", display: "flex", flexDirection: "column" },
  topBar: { display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" },
  closeBtn: {
    background: "rgba(255,255,255,0.05)", border: "none", color: "#F0E6D3",
    width: "34px", height: "34px", borderRadius: "50%", fontSize: "0.95rem",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  progressBar: { flex: 1, height: "5px", background: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: "3px", transition: "width 0.4s" },
  counter: { fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", fontWeight: 500, minWidth: "2.5rem", textAlign: "right" },

  card: { flex: 1, display: "flex", flexDirection: "column", transition: "all 0.25s ease" },
  cardCat: {
    display: "inline-flex", alignItems: "center", gap: "0.3rem",
    padding: "0.3rem 0.75rem", borderRadius: "18px", fontSize: "0.7rem",
    fontWeight: 600, alignSelf: "flex-start", marginBottom: "1rem",
  },

  emojiBox: { textAlign: "center", marginBottom: "1.5rem" },
  emojiRow: { display: "flex", justifyContent: "center", gap: "0.35rem", flexWrap: "wrap", marginBottom: "0.75rem" },
  emojiChar: {
    fontSize: "3rem", animation: "popEmoji 0.4s ease-out both",
    filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
  },
  emojiPrompt: { fontSize: "0.85rem", color: "rgba(255,255,255,0.3)", fontWeight: 500 },

  optsCol: { display: "flex", flexDirection: "column", gap: "0.55rem" },
  optBtn: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0.95rem 1rem", borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)",
    color: "#F0E6D3", fontSize: "0.9rem", textAlign: "left", transition: "all 0.2s",
  },
  optCorrect: { background: "rgba(52,211,153,0.1)", borderColor: "#34D399", color: "#34D399" },
  optWrong: { background: "rgba(255,107,107,0.1)", borderColor: "#FF6B6B", color: "#FF6B6B", animation: "shake 0.35s" },
  optText: { fontWeight: 500, flex: 1 },
  check: { fontSize: "1.1rem", fontWeight: 700, color: "#34D399" },
  cross: { fontSize: "1.1rem", fontWeight: 700, color: "#FF6B6B" },

  infoBox: {
    marginTop: "1.25rem", padding: "1.15rem", borderRadius: "14px",
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)",
    animation: "fadeUp 0.3s ease-out",
  },
  infoText: { fontSize: "0.85rem", color: "rgba(240,230,211,0.6)", lineHeight: 1.6, marginBottom: "1rem" },
  nextBtn: { width: "100%", padding: "0.8rem", borderRadius: "12px", border: "none", color: "#0A0F1C", fontSize: "0.95rem", fontWeight: 700 },

  sessionBar: {
    display: "flex", justifyContent: "center", alignItems: "center", gap: "0.65rem",
    padding: "0.75rem", fontSize: "0.85rem", fontWeight: 600,
  },
  streakPill: {
    padding: "0.2rem 0.5rem", borderRadius: "10px", background: "rgba(255,217,61,0.1)",
    color: "#FFD93D", fontSize: "0.75rem", fontWeight: 600, animation: "glow 2s ease-in-out infinite",
  },

  // RESULTS
  resultsInner: {
    maxWidth: "400px", margin: "0 auto", padding: "3rem 1.5rem",
    textAlign: "center", animation: "fadeUp 0.5s ease-out",
  },
  resultsMoon: { fontSize: "3rem", display: "block", marginBottom: "0.5rem" },
  resultsTitle: { fontFamily: "'Amiri', serif", fontSize: "2rem", color: "#F0E6D3" },
  resultsMsg: { fontSize: "0.95rem", color: "rgba(240,230,211,0.5)", marginTop: "0.5rem", marginBottom: "2rem" },
  resultsRing: { position: "relative", display: "inline-block", marginBottom: "2rem" },
  ringInner: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" },
  ringPct: { fontSize: "2.5rem", fontWeight: 800, color: "#F0E6D3" },
  resultsStats: { display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "2rem" },
  rStat: { display: "flex", flexDirection: "column", alignItems: "center", gap: "0.15rem" },
  rStatNum: { fontSize: "1.4rem", fontWeight: 700 },
  rStatLabel: { fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" },
  shareBtn: {
    width: "100%", padding: "0.85rem", borderRadius: "12px",
    background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.3)",
    color: "#A78BFA", fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.65rem",
  },
  playAgainBtn: {
    width: "100%", padding: "0.85rem", borderRadius: "12px", border: "none",
    background: "linear-gradient(135deg, #34D399, #059669)", color: "#0A0F1C",
    fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.65rem",
  },
  homeBtn: {
    width: "100%", padding: "0.75rem", borderRadius: "12px",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    color: "rgba(240,230,211,0.5)", fontSize: "0.85rem", fontWeight: 500,
  },
};
