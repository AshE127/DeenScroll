import { useState } from "react";
import { useAuth } from "./AuthContext.jsx";

// ============================================
// THE 5 DAILY PRAYERS
// ============================================
const PRAYERS = [
  { name: "Fajr", arabic: "الفجر", time: "Before sunrise", rakats: "2 Sunnah + 2 Fard", desc: "The dawn prayer. Start your day with Allah. The Prophet ﷺ said: 'The two rak'ahs of Fajr are better than the world and everything in it.'" },
  { name: "Dhuhr", arabic: "الظهر", time: "After midday", rakats: "4 Sunnah + 4 Fard + 2 Sunnah", desc: "The noon prayer. A break in the middle of the day to reconnect with your Creator." },
  { name: "Asr", arabic: "العصر", time: "Late afternoon", rakats: "4 Fard", desc: "The afternoon prayer. The Prophet ﷺ said: 'Whoever misses the Asr prayer, it is as if they lost their family and property.'" },
  { name: "Maghrib", arabic: "المغرب", time: "Just after sunset", rakats: "3 Fard + 2 Sunnah", desc: "The sunset prayer. Pray as soon as the sun sets — don't delay." },
  { name: "Isha", arabic: "العشاء", time: "Night (after twilight fades)", rakats: "4 Fard + 2 Sunnah + 3 Witr", desc: "The night prayer. Witr is the final prayer of the day, prayed in odd numbers." },
];

// ============================================
// PRAYER POSITIONS & WHAT TO SAY
// ============================================
const POSITIONS = [
  {
    name: "Standing (Qiyam)", emoji: "🧍", arabic: "قيام",
    steps: [
      { action: "Raise hands to ears and say Takbir", arabic: "اللَّهُ أَكْبَرُ", transliteration: "Allahu Akbar", translation: "Allah is the Greatest" },
      { action: "Place right hand over left on chest. Recite opening dua", arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَىٰ جَدُّكَ وَلَا إِلَٰهَ غَيْرُكَ", transliteration: "Subhanaka Allahumma wa bihamdika, wa tabarakasmuka, wa ta'ala jadduka, wa la ilaha ghayruk", translation: "Glory is to You O Allah, and praise. Blessed is Your name, exalted is Your majesty, and there is no god but You." },
      { action: "Say Ta'awwudh", arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", transliteration: "A'udhu billahi minash-shaytanir-rajim", translation: "I seek refuge in Allah from Satan the accursed" },
      { action: "Say Bismillah", arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", transliteration: "Bismillahir-Rahmanir-Rahim", translation: "In the name of Allah, the Most Gracious, the Most Merciful" },
      { action: "Recite Surah Al-Fatiha (required in every rakat)", arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", transliteration: "Alhamdu lillahi Rabbil-'alamin. Ar-Rahmanir-Rahim. Maliki yawmid-din. Iyyaka na'budu wa iyyaka nasta'in. Ihdinas-siratal-mustaqim. Siratal-ladhina an'amta 'alayhim, ghayril-maghdubi 'alayhim wa lad-dallin", translation: "All praise is due to Allah, Lord of all the worlds. The Most Gracious, the Most Merciful. Master of the Day of Judgment. You alone we worship, and You alone we ask for help. Guide us to the straight path. The path of those upon whom You have bestowed favor, not of those who have earned anger nor of those who are astray." },
      { action: "Say Ameen, then recite any short surah (e.g., Al-Ikhlas)", arabic: "آمِين", transliteration: "Ameen", translation: "O Allah, answer our prayer" },
    ]
  },
  {
    name: "Bowing (Ruku)", emoji: "🙇", arabic: "ركوع",
    steps: [
      { action: "Say Takbir while bowing", arabic: "اللَّهُ أَكْبَرُ", transliteration: "Allahu Akbar", translation: "Allah is the Greatest" },
      { action: "Bow with back straight, hands on knees. Say 3 times:", arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ", transliteration: "Subhana Rabbiyal-Adhim", translation: "Glory is to my Lord, the Almighty" },
      { action: "Rise from bowing and say:", arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ", transliteration: "Sami' Allahu liman hamidah", translation: "Allah hears whoever praises Him" },
      { action: "While standing straight, say:", arabic: "رَبَّنَا وَلَكَ الْحَمْدُ", transliteration: "Rabbana wa lakal-hamd", translation: "Our Lord, to You is all praise" },
    ]
  },
  {
    name: "Prostration (Sujood)", emoji: "🤲", arabic: "سجود",
    steps: [
      { action: "Say Takbir while going down", arabic: "اللَّهُ أَكْبَرُ", transliteration: "Allahu Akbar", translation: "Allah is the Greatest" },
      { action: "Place forehead, nose, palms, knees, and toes on the ground. Say 3 times:", arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَىٰ", transliteration: "Subhana Rabbiyal-A'la", translation: "Glory is to my Lord, the Most High" },
      { action: "This is the closest you are to Allah. Make personal dua here.", arabic: "", transliteration: "", translation: "The Prophet ﷺ said: 'The closest a servant is to his Lord is when he is in prostration, so increase your dua.'" },
    ]
  },
  {
    name: "Sitting (Jalsah)", emoji: "🧎", arabic: "جلسة",
    steps: [
      { action: "Sit between the two prostrations. Say:", arabic: "رَبِّ اغْفِرْ لِي رَبِّ اغْفِرْ لِي", transliteration: "Rabbighfir li, Rabbighfir li", translation: "My Lord, forgive me. My Lord, forgive me." },
      { action: "Then go into the second prostration (same as above)", arabic: "", transliteration: "", translation: "" },
    ]
  },
  {
    name: "Final Sitting (Tashahhud)", emoji: "☝️", arabic: "تشهد",
    steps: [
      { action: "Sit after the last prostration of the last rakat. Recite At-Tashahhud:", arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ", transliteration: "At-tahiyyatu lillahi was-salawatu wat-tayyibat. As-salamu 'alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuh. As-salamu 'alayna wa 'ala 'ibadillahis-salihin. Ash-hadu an la ilaha illallah wa ash-hadu anna Muhammadan 'abduhu wa rasuluh", translation: "All greetings, prayers, and good things are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and messenger." },
      { action: "Recite Salawat (Darood Ibrahim):", arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ", transliteration: "Allahumma salli 'ala Muhammadin wa 'ala aali Muhammadin kama sallayta 'ala Ibrahima wa 'ala aali Ibrahima innaka Hamidun Majid", translation: "O Allah, send blessings upon Muhammad and upon the family of Muhammad, as You sent blessings upon Ibrahim and upon the family of Ibrahim. Indeed, You are Praiseworthy and Glorious." },
    ]
  },
  {
    name: "Ending (Taslim)", emoji: "👋", arabic: "تسليم",
    steps: [
      { action: "Turn head right and say:", arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ", transliteration: "As-salamu 'alaykum wa rahmatullah", translation: "Peace and mercy of Allah be upon you" },
      { action: "Turn head left and say the same:", arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ", transliteration: "As-salamu 'alaykum wa rahmatullah", translation: "Peace and mercy of Allah be upon you" },
      { action: "Your prayer is complete! Make personal dua now.", arabic: "", transliteration: "", translation: "" },
    ]
  },
];

// ============================================
// ESSENTIAL SURAHS
// ============================================
const ESSENTIAL_SURAHS = [
  {
    name: "Al-Fatiha", num: 1, en: "The Opening", why: "Required in every rakat of prayer",
    verses: [
      { ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", tr: "Bismillahir-Rahmanir-Rahim", en: "In the name of Allah, the Most Gracious, the Most Merciful" },
      { ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", tr: "Alhamdu lillahi Rabbil-'alamin", en: "All praise is due to Allah, Lord of all the worlds" },
      { ar: "الرَّحْمَٰنِ الرَّحِيمِ", tr: "Ar-Rahmanir-Rahim", en: "The Most Gracious, the Most Merciful" },
      { ar: "مَالِكِ يَوْمِ الدِّينِ", tr: "Maliki yawmid-din", en: "Master of the Day of Judgment" },
      { ar: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", tr: "Iyyaka na'budu wa iyyaka nasta'in", en: "You alone we worship, and You alone we ask for help" },
      { ar: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", tr: "Ihdinas-siratal-mustaqim", en: "Guide us to the straight path" },
      { ar: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", tr: "Siratal-ladhina an'amta 'alayhim, ghayril-maghdubi 'alayhim wa lad-dallin", en: "The path of those You have blessed, not of those who earned anger, nor of those who went astray" },
    ]
  },
  {
    name: "Al-Ikhlas", num: 112, en: "The Sincerity", why: "Equals 1/3 of the Quran. Great for prayer.",
    verses: [
      { ar: "قُلْ هُوَ اللَّهُ أَحَدٌ", tr: "Qul Huwa Allahu Ahad", en: "Say: He is Allah, the One" },
      { ar: "اللَّهُ الصَّمَدُ", tr: "Allahus-Samad", en: "Allah, the Eternal Refuge" },
      { ar: "لَمْ يَلِدْ وَلَمْ يُولَدْ", tr: "Lam yalid wa lam yulad", en: "He neither begets nor is born" },
      { ar: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", tr: "Wa lam yakun lahu kufuwan ahad", en: "Nor is there any equivalent to Him" },
    ]
  },
  {
    name: "Al-Falaq", num: 113, en: "The Daybreak", why: "Protection surah. Recite morning & evening.",
    verses: [
      { ar: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", tr: "Qul a'udhu bi Rabbil-falaq", en: "Say: I seek refuge in the Lord of daybreak" },
      { ar: "مِن شَرِّ مَا خَلَقَ", tr: "Min sharri ma khalaq", en: "From the evil of that which He created" },
      { ar: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", tr: "Wa min sharri ghasiqin idha waqab", en: "And from the evil of darkness when it settles" },
      { ar: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", tr: "Wa min sharrin-naffathati fil-'uqad", en: "And from the evil of those who blow on knots" },
      { ar: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", tr: "Wa min sharri hasidin idha hasad", en: "And from the evil of an envier when he envies" },
    ]
  },
  {
    name: "An-Nas", num: 114, en: "Mankind", why: "Protection surah. Recite morning & evening.",
    verses: [
      { ar: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", tr: "Qul a'udhu bi Rabbin-nas", en: "Say: I seek refuge in the Lord of mankind" },
      { ar: "مَلِكِ النَّاسِ", tr: "Malikin-nas", en: "The Sovereign of mankind" },
      { ar: "إِلَٰهِ النَّاسِ", tr: "Ilahin-nas", en: "The God of mankind" },
      { ar: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", tr: "Min sharril-waswasil-khannas", en: "From the evil of the retreating whisperer" },
      { ar: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", tr: "Alladhi yuwaswisu fi sudurin-nas", en: "Who whispers in the breasts of mankind" },
      { ar: "مِنَ الْجِنَّةِ وَالنَّاسِ", tr: "Minal-jinnati wan-nas", en: "Among jinn and among mankind" },
    ]
  },
  {
    name: "Al-Kawthar", num: 108, en: "The Abundance", why: "Shortest surah. Easy to memorize for prayer.",
    verses: [
      { ar: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", tr: "Inna a'taynakal-kawthar", en: "Indeed, We have granted you Al-Kawthar" },
      { ar: "فَصَلِّ لِرَبِّكَ وَانْحَرْ", tr: "Fasalli li Rabbika wanhar", en: "So pray to your Lord and sacrifice" },
      { ar: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", tr: "Inna shani'aka huwal-abtar", en: "Indeed, your enemy is the one cut off" },
    ]
  },
];

// ============================================
// COMMON DUAS
// ============================================
const DUAS = [
  { occasion: "Before Eating", emoji: "🍽️", arabic: "بِسْمِ اللَّهِ", transliteration: "Bismillah", translation: "In the name of Allah" },
  { occasion: "After Eating", emoji: "✅", arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ", transliteration: "Alhamdu lillahil-ladhi at'amana wa saqana wa ja'alana Muslimin", translation: "Praise be to Allah who fed us, gave us drink, and made us Muslims" },
  { occasion: "Before Sleeping", emoji: "😴", arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", transliteration: "Bismika Allahumma amutu wa ahya", translation: "In Your name, O Allah, I die and I live" },
  { occasion: "Waking Up", emoji: "🌅", arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَمَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur", translation: "Praise be to Allah who gave us life after death, and to Him is the resurrection" },
  { occasion: "Entering the Masjid", emoji: "🕌", arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", transliteration: "Allahumma-ftah li abwaba rahmatik", translation: "O Allah, open for me the doors of Your mercy" },
  { occasion: "Leaving the Masjid", emoji: "🚶", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ", transliteration: "Allahumma inni as'aluka min fadlik", translation: "O Allah, I ask You from Your bounty" },
  { occasion: "Entering the Bathroom", emoji: "🚪", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ", transliteration: "Allahumma inni a'udhu bika minal-khubthi wal-khaba'ith", translation: "O Allah, I seek refuge in You from evil male and female jinn" },
  { occasion: "Looking in the Mirror", emoji: "🪞", arabic: "اللَّهُمَّ أَنْتَ حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي", transliteration: "Allahumma anta hassanta khalqi fa hassin khuluqi", translation: "O Allah, You made my form beautiful, so beautify my character" },
  { occasion: "When it Rains", emoji: "🌧️", arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا", transliteration: "Allahumma sayyiban nafi'a", translation: "O Allah, let it be beneficial rain" },
  { occasion: "During Hardship", emoji: "💪", arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", transliteration: "Hasbunallahu wa ni'mal-wakil", translation: "Allah is sufficient for us and He is the best Disposer of affairs" },
  { occasion: "For Forgiveness", emoji: "🤲", arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ", transliteration: "Astaghfirullaha al-'Adhim alladhi la ilaha illa Huwal-Hayyul-Qayyumu wa atubu ilayh", translation: "I seek forgiveness from Allah, the Almighty, there is no god but He, the Living, the Self-Sustaining, and I repent to Him" },
  { occasion: "When Leaving Home", emoji: "🏠", arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", transliteration: "Bismillahi tawakkaltu 'alallahi wa la hawla wa la quwwata illa billah", translation: "In the name of Allah, I place my trust in Allah, and there is no might or power except with Allah" },
];

// ============================================
// TABS
// ============================================
const TABS = [
  { id: "prayers", label: "🕌 Prayers", desc: "The 5 daily prayers" },
  { id: "howto", label: "🤲 How to Pray", desc: "Step by step" },
  { id: "surahs", label: "📖 Surahs", desc: "Essential for prayer" },
  { id: "duas", label: "💫 Duas", desc: "Daily supplications" },
];

export default function Beginners({ onBack }) {
  const [tab, setTab] = useState("prayers");
  const [expandedPrayer, setExpandedPrayer] = useState(null);
  const [expandedPos, setExpandedPos] = useState(0);
  const [expandedSurah, setExpandedSurah] = useState(null);

  return (
    <div style={st.wrap}>
      <style>{css}</style>
      <div style={st.inner}>
        <div style={st.topRow}>
          <button style={st.backBtn} onClick={onBack}>← Back</button>
          <span style={st.topTitle}>Islam for Beginners</span>
          <div />
        </div>
        <p style={st.subtitle}>Learn the foundations of your deen</p>

        {/* Tab Pills */}
        <div style={st.tabRow}>
          {TABS.map(t => (
            <button key={t.id} style={{
              ...st.tabPill,
              background: tab === t.id ? "rgba(255,217,61,0.1)" : "transparent",
              borderColor: tab === t.id ? "rgba(255,217,61,0.3)" : "rgba(255,255,255,0.08)",
              color: tab === t.id ? "#FFD93D" : "rgba(255,255,255,0.3)",
            }} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ========== PRAYERS TAB ========== */}
        {tab === "prayers" && (
          <div style={st.section}>
            <h2 style={st.secTitle}>The 5 Daily Prayers</h2>
            <p style={st.secDesc}>Every Muslim prays 5 times a day. Here's what they are:</p>
            {PRAYERS.map((p, i) => (
              <button key={p.name} style={st.prayerCard} onClick={() => setExpandedPrayer(expandedPrayer === i ? null : i)}>
                <div style={st.prayerHeader}>
                  <div>
                    <span style={st.prayerName}>{p.name}</span>
                    <span style={st.prayerArabic}>{p.arabic}</span>
                  </div>
                  <div style={st.prayerRight}>
                    <span style={st.prayerTime}>{p.time}</span>
                    <span style={st.prayerArrow}>{expandedPrayer === i ? "▾" : "▸"}</span>
                  </div>
                </div>
                {expandedPrayer === i && (
                  <div style={st.prayerExpanded}>
                    <span style={st.prayerRakats}>{p.rakats}</span>
                    <p style={st.prayerDesc}>{p.desc}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* ========== HOW TO PRAY TAB ========== */}
        {tab === "howto" && (
          <div style={st.section}>
            <h2 style={st.secTitle}>How to Pray</h2>
            <p style={st.secDesc}>Step-by-step guide for each position in prayer</p>

            {/* Position selector */}
            <div style={st.posRow}>
              {POSITIONS.map((p, i) => (
                <button key={p.name} style={{
                  ...st.posPill,
                  background: expandedPos === i ? "rgba(255,217,61,0.1)" : "rgba(255,255,255,0.03)",
                  borderColor: expandedPos === i ? "rgba(255,217,61,0.3)" : "rgba(255,255,255,0.06)",
                }} onClick={() => setExpandedPos(i)}>
                  <span style={st.posEmoji}>{p.emoji}</span>
                  <span style={{ ...st.posName, color: expandedPos === i ? "#FFD93D" : "rgba(255,255,255,0.4)" }}>
                    {p.name.split(" (")[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected position details */}
            {POSITIONS[expandedPos] && (
              <div style={st.posCard}>
                <h3 style={st.posTitle}>{POSITIONS[expandedPos].emoji} {POSITIONS[expandedPos].name}</h3>
                <span style={st.posArabicTitle}>{POSITIONS[expandedPos].arabic}</span>
                {POSITIONS[expandedPos].steps.map((step, i) => (
                  <div key={i} style={st.step}>
                    <span style={st.stepNum}>{i + 1}</span>
                    <div style={st.stepContent}>
                      <p style={st.stepAction}>{step.action}</p>
                      {step.arabic && <p style={st.stepArabic}>{step.arabic}</p>}
                      {step.transliteration && <p style={st.stepTranslit}>{step.transliteration}</p>}
                      {step.translation && <p style={st.stepTranslation}>{step.translation}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Nav buttons */}
            <div style={st.posNav}>
              <button style={{ ...st.posNavBtn, opacity: expandedPos <= 0 ? 0.3 : 1 }}
                onClick={() => setExpandedPos(Math.max(0, expandedPos - 1))} disabled={expandedPos <= 0}>
                ← Previous
              </button>
              <span style={st.posCounter}>{expandedPos + 1}/{POSITIONS.length}</span>
              <button style={{ ...st.posNavBtn, opacity: expandedPos >= POSITIONS.length - 1 ? 0.3 : 1 }}
                onClick={() => setExpandedPos(Math.min(POSITIONS.length - 1, expandedPos + 1))} disabled={expandedPos >= POSITIONS.length - 1}>
                Next →
              </button>
            </div>
          </div>
        )}

        {/* ========== SURAHS TAB ========== */}
        {tab === "surahs" && (
          <div style={st.section}>
            <h2 style={st.secTitle}>Essential Surahs</h2>
            <p style={st.secDesc}>These surahs are used in daily prayer. Learn them with Arabic, transliteration, and translation.</p>
            {ESSENTIAL_SURAHS.map((s, i) => (
              <div key={s.num}>
                <button style={st.surahHeader} onClick={() => setExpandedSurah(expandedSurah === i ? null : i)}>
                  <div>
                    <span style={st.surahName}>{s.name}</span>
                    <span style={st.surahEn}>{s.en} · Surah {s.num}</span>
                  </div>
                  <div style={st.surahRight}>
                    <span style={st.surahWhy}>{s.why}</span>
                    <span style={st.posArrow}>{expandedSurah === i ? "▾" : "▸"}</span>
                  </div>
                </button>
                {expandedSurah === i && (
                  <div style={st.surahVerses}>
                    {s.verses.map((v, j) => (
                      <div key={j} style={st.verse}>
                        <p style={st.verseAr}>{v.ar}</p>
                        <p style={st.verseTr}>{v.tr}</p>
                        <p style={st.verseEn}>{v.en}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ========== DUAS TAB ========== */}
        {tab === "duas" && (
          <div style={st.section}>
            <h2 style={st.secTitle}>Common Duas</h2>
            <p style={st.secDesc}>Daily supplications for every occasion</p>
            {DUAS.map((d, i) => (
              <div key={i} style={st.duaCard}>
                <div style={st.duaHeader}>
                  <span style={st.duaEmoji}>{d.emoji}</span>
                  <span style={st.duaOccasion}>{d.occasion}</span>
                </div>
                <p style={st.duaArabic}>{d.arabic}</p>
                <p style={st.duaTranslit}>{d.transliteration}</p>
                <p style={st.duaTranslation}>{d.translation}</p>
              </div>
            ))}
          </div>
        )}
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
  wrap: { minHeight: "100vh", fontFamily: "'Outfit', sans-serif", background: "linear-gradient(170deg, #0A0F1C 0%, #0F1A2E 50%, #0A0F1C 100%)" },
  inner: { maxWidth: "480px", margin: "0 auto", padding: "1.25rem 1rem", minHeight: "100vh" },
  topRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" },
  backBtn: { background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" },
  topTitle: { fontFamily: "'Amiri', serif", fontSize: "1.15rem", color: "#F0E6D3", fontWeight: 700 },
  subtitle: { fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", textAlign: "center", marginBottom: "1rem" },

  // Tabs
  tabRow: { display: "flex", gap: "0.3rem", marginBottom: "1.2rem", flexWrap: "wrap" },
  tabPill: { padding: "0.4rem 0.65rem", borderRadius: "12px", border: "1px solid", fontSize: "0.7rem", fontWeight: 600 },

  // Section
  section: {},
  secTitle: { fontFamily: "'Amiri', serif", fontSize: "1.15rem", color: "#F0E6D3", marginBottom: "0.3rem" },
  secDesc: { fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", marginBottom: "1rem", lineHeight: 1.5 },

  // Prayers
  prayerCard: { width: "100%", padding: "0.8rem", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", marginBottom: "0.5rem", textAlign: "left" },
  prayerHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  prayerName: { display: "block", fontSize: "1rem", color: "#F0E6D3", fontWeight: 700 },
  prayerArabic: { fontSize: "0.8rem", color: "rgba(255,255,255,0.25)" },
  prayerRight: { textAlign: "right", display: "flex", alignItems: "center", gap: "0.5rem" },
  prayerTime: { fontSize: "0.7rem", color: "#34D399", fontWeight: 600 },
  prayerArrow: { fontSize: "0.7rem", color: "rgba(255,255,255,0.2)" },
  prayerExpanded: { marginTop: "0.6rem", paddingTop: "0.6rem", borderTop: "1px solid rgba(255,255,255,0.05)" },
  prayerRakats: { display: "block", fontSize: "0.75rem", color: "#FFD93D", fontWeight: 600, marginBottom: "0.3rem" },
  prayerDesc: { fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.7 },

  // Positions
  posRow: { display: "flex", gap: "0.3rem", marginBottom: "1rem", flexWrap: "wrap" },
  posPill: { padding: "0.4rem 0.5rem", borderRadius: "10px", border: "1px solid", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.15rem", minWidth: "55px" },
  posEmoji: { fontSize: "1.1rem" },
  posName: { fontSize: "0.55rem", fontWeight: 600 },
  posCard: { padding: "1.2rem", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", marginBottom: "0.8rem" },
  posTitle: { fontFamily: "'Amiri', serif", fontSize: "1.1rem", color: "#F0E6D3", marginBottom: "0.2rem" },
  posArabicTitle: { display: "block", fontSize: "0.9rem", color: "rgba(255,255,255,0.2)", marginBottom: "1rem" },

  step: { display: "flex", gap: "0.6rem", marginBottom: "1rem" },
  stepNum: { width: "22px", height: "22px", borderRadius: "50%", background: "rgba(255,217,61,0.1)", color: "#FFD93D", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.1rem" },
  stepContent: { flex: 1 },
  stepAction: { fontSize: "0.8rem", color: "#F0E6D3", fontWeight: 600, marginBottom: "0.3rem", lineHeight: 1.4 },
  stepArabic: { fontFamily: "'Amiri', serif", fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "0.2rem", direction: "rtl", textAlign: "right" },
  stepTranslit: { fontSize: "0.75rem", color: "#4ECDC4", fontStyle: "italic", marginBottom: "0.15rem", lineHeight: 1.5 },
  stepTranslation: { fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.5 },

  posNav: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  posNavBtn: { padding: "0.5rem 1rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#F0E6D3", fontSize: "0.75rem", fontWeight: 600 },
  posCounter: { fontSize: "0.7rem", color: "rgba(255,255,255,0.2)" },
  posArrow: { fontSize: "0.7rem", color: "rgba(255,255,255,0.2)" },

  // Surahs
  surahHeader: { width: "100%", padding: "0.8rem", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", marginBottom: "0.4rem", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" },
  surahName: { display: "block", fontSize: "0.95rem", color: "#F0E6D3", fontWeight: 700, fontFamily: "'Amiri', serif" },
  surahEn: { fontSize: "0.7rem", color: "rgba(255,255,255,0.25)" },
  surahRight: { textAlign: "right", display: "flex", alignItems: "center", gap: "0.5rem" },
  surahWhy: { fontSize: "0.6rem", color: "#34D399", maxWidth: "120px" },
  surahVerses: { padding: "0.8rem", background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "12px", marginBottom: "0.5rem" },
  verse: { marginBottom: "0.8rem", paddingBottom: "0.8rem", borderBottom: "1px solid rgba(255,255,255,0.04)" },
  verseAr: { fontFamily: "'Amiri', serif", fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", lineHeight: 2, direction: "rtl", textAlign: "right", marginBottom: "0.3rem" },
  verseTr: { fontSize: "0.75rem", color: "#4ECDC4", fontStyle: "italic", lineHeight: 1.5, marginBottom: "0.15rem" },
  verseEn: { fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.5 },

  // Duas
  duaCard: { padding: "1rem", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", marginBottom: "0.5rem" },
  duaHeader: { display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" },
  duaEmoji: { fontSize: "1.1rem" },
  duaOccasion: { fontSize: "0.85rem", color: "#F0E6D3", fontWeight: 700 },
  duaArabic: { fontFamily: "'Amiri', serif", fontSize: "1.1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.9, direction: "rtl", textAlign: "right", marginBottom: "0.3rem" },
  duaTranslit: { fontSize: "0.75rem", color: "#4ECDC4", fontStyle: "italic", lineHeight: 1.5, marginBottom: "0.15rem" },
  duaTranslation: { fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.5 },
};
