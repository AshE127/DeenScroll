import { useState, useEffect } from "react";

// ============================================
// MOOD-BASED REMINDERS DATABASE
// ============================================
const MOODS = [
  { id: "anxious", label: "Anxious", emoji: "😰", color: "#4ECDC4", desc: "Feeling worried or uneasy" },
  { id: "sad", label: "Sad", emoji: "😢", color: "#60A5FA", desc: "Feeling down or heartbroken" },
  { id: "angry", label: "Angry", emoji: "😤", color: "#FF6B6B", desc: "Feeling frustrated or upset" },
  { id: "grateful", label: "Grateful", emoji: "🤲", color: "#34D399", desc: "Feeling blessed and thankful" },
  { id: "lonely", label: "Lonely", emoji: "🥺", color: "#A78BFA", desc: "Feeling isolated or forgotten" },
  { id: "hopeless", label: "Hopeless", emoji: "😞", color: "#6B7280", desc: "Feeling stuck or lost" },
  { id: "happy", label: "Happy", emoji: "😊", color: "#FFD93D", desc: "Feeling joyful and content" },
  { id: "lost", label: "Lost", emoji: "🌫️", color: "#94A3B8", desc: "Feeling confused about life" },
  { id: "tired", label: "Tired", emoji: "😴", color: "#818CF8", desc: "Feeling exhausted or drained" },
  { id: "scared", label: "Scared", emoji: "😨", color: "#F472B6", desc: "Feeling fearful about the future" },
  { id: "motivated", label: "Motivated", emoji: "💪", color: "#F97316", desc: "Ready to do good" },
  { id: "guilty", label: "Guilty", emoji: "😔", color: "#EC4899", desc: "Feeling regret or shame" },
];

const REMINDERS = {
  anxious: [
    { type: "Quran", ref: "Quran 2:286", text: "Allah does not burden a soul beyond that it can bear.", note: "Whatever you're facing right now — Allah knows you can handle it. He specifically chose this test for you because He knows your strength, even when you don't." },
    { type: "Quran", ref: "Quran 94:5-6", text: "Verily, with hardship comes ease. Verily, with hardship comes ease.", note: "Allah repeated it twice. Not after hardship — WITH hardship. The ease is already on its way, even while you're struggling." },
    { type: "Quran", ref: "Quran 3:139", text: "Do not weaken and do not grieve, for you are superior if you are true believers.", note: "Your anxiety doesn't define you. Your faith does. Allah sees your struggle and honors you for pushing through it." },
    { type: "Hadith", ref: "Bukhari & Muslim", text: "The Prophet ﷺ said: 'How wonderful is the affair of the believer. All of his affairs are good. If something good happens, he is grateful and that is good for him. If something bad happens, he is patient and that is good for him.'", note: "Either way, you win. Gratitude in ease, patience in hardship — both earn you reward." },
    { type: "Dua", ref: "Fortress of the Muslim", text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ\nAllahumma inni a'udhu bika minal hammi wal hazan\n(O Allah, I seek refuge in You from anxiety and grief)", note: "The Prophet ﷺ made this dua regularly. You're not weak for feeling anxious — you're human. Take this dua and let Allah carry the weight." },
    { type: "Quran", ref: "Quran 13:28", text: "Verily, in the remembrance of Allah do hearts find rest.", note: "When your mind is racing, dhikr is the reset button. SubhanAllah, Alhamdulillah, Allahu Akbar — let those words slow your heartbeat." },
    { type: "Hadith", ref: "Tirmidhi", text: "The Prophet ﷺ said: 'If you put your trust in Allah as He deserves, He would provide for you as He provides for the birds — they go out hungry in the morning and return full in the evening.'", note: "The birds don't have savings accounts or backup plans. They just trust Allah and take flight. Sometimes that's all we need to do." },
  ],
  sad: [
    { type: "Quran", ref: "Quran 93:3-5", text: "Your Lord has not abandoned you, nor has He become hateful. The Hereafter is better for you than the present. And your Lord will give you so much that you will be satisfied.", note: "Surah Ad-Duha was revealed when the Prophet ﷺ himself felt abandoned. Allah sent an entire surah to comfort him. He will comfort you too." },
    { type: "Quran", ref: "Quran 12:86", text: "I only complain of my suffering and grief to Allah.", note: "Yaqub lost his son Yusuf and cried until he went blind. But he never complained to people — only to Allah. Pour your heart out in sujood." },
    { type: "Hadith", ref: "Muslim", text: "The Prophet ﷺ said: 'No fatigue, illness, anxiety, sorrow, harm, or sadness afflicts any Muslim — even the prick of a thorn — except that Allah wipes away some of his sins because of it.'", note: "Your pain isn't pointless. Every tear, every ache — Allah is using it to purify you. Nothing is wasted." },
    { type: "Quran", ref: "Quran 39:53", text: "Say: O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins.", note: "ALL sins. No exceptions. If sadness comes from guilt, know that Allah's mercy is bigger than whatever you've done." },
    { type: "Dua", ref: "Abu Dawud", text: "اللَّهُمَّ إِنِّي عَبْدُكَ ابْنُ عَبْدِكَ\nAllahumma inni abduka ibnu abdika\n(O Allah, I am Your servant, son of Your servant... I ask by every name belonging to You that You make the Quran the spring of my heart and the light of my chest, a departure for my sorrow and a release for my anxiety.)", note: "This dua is specifically for sadness and anxiety. The Prophet ﷺ said whoever makes it, Allah will replace their sadness with happiness." },
    { type: "Hadith", ref: "Bukhari", text: "The Prophet ﷺ said: 'Allah says: I am as My servant thinks I am. So let him think of Me as he wishes.'", note: "Think well of Allah. He hasn't forgotten you. He's preparing something you can't see yet." },
  ],
  angry: [
    { type: "Hadith", ref: "Bukhari & Muslim", text: "The Prophet ﷺ said: 'The strong person is not the one who can wrestle, but the one who controls himself when he is angry.'", note: "Real strength isn't in your fists — it's in your ability to pause when everything inside you is on fire." },
    { type: "Hadith", ref: "Abu Dawud", text: "The Prophet ﷺ said: 'If any of you becomes angry, let him be silent.'", note: "Simple but powerful. The words you say in anger can destroy years of trust in seconds. Silence protects you and everyone around you." },
    { type: "Hadith", ref: "Abu Dawud", text: "The Prophet ﷺ said: 'If any of you becomes angry and is standing, let him sit down. If the anger goes away, fine; otherwise, let him lie down.'", note: "Change your physical state. Stand up, sit down, leave the room, make wudu. Break the pattern before the anger breaks you." },
    { type: "Quran", ref: "Quran 3:134", text: "Those who spend in prosperity and adversity, who repress anger, and who pardon people — Allah loves the doers of good.", note: "Allah doesn't just ask you to control anger — He loves you MORE when you do. Swallowing anger is an act of worship." },
    { type: "Dua", ref: "Bukhari & Muslim", text: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ\nA'udhu billahi minash-shaytanir-rajeem\n(I seek refuge in Allah from Shaytan the accursed)", note: "The Prophet ﷺ said anger comes from Shaytan. When you feel the heat rising, say this. Let Allah extinguish the fire." },
    { type: "Hadith", ref: "Tabarani", text: "The Prophet ﷺ said: 'Do not be angry, and Paradise will be yours.'", note: "That's the whole hadith. Simple. Powerful. Every time you swallow your anger, you're buying your ticket to Jannah." },
  ],
  grateful: [
    { type: "Quran", ref: "Quran 14:7", text: "If you are grateful, I will surely increase you in favor.", note: "Gratitude isn't just good manners — it's a multiplier. The more you thank Allah, the more He gives you. It's a divine promise." },
    { type: "Quran", ref: "Quran 55:13", text: "So which of the favors of your Lord would you deny?", note: "This verse is repeated 31 times in Surah Ar-Rahman. Let it wash over you. Count your blessings until you lose count." },
    { type: "Hadith", ref: "Tirmidhi", text: "The Prophet ﷺ said: 'The first thing Allah will ask about on the Day of Judgment is: Did I not give you a healthy body? Did I not give you cool water to drink?'", note: "A healthy body. Clean water. These alone are blessings that billions struggle to have. Alhamdulillah for the basics." },
    { type: "Hadith", ref: "Tirmidhi", text: "The Prophet ﷺ said: 'Look at those below you (in worldly matters) and not at those above you. That is more likely to prevent you from belittling Allah's blessings.'", note: "Comparison kills gratitude. Someone out there is making dua for the life you already have." },
    { type: "Hadith", ref: "Abu Dawud & Tirmidhi", text: "The Prophet ﷺ said: 'He who does not thank people does not thank Allah.'", note: "Gratitude starts with people. Thank your parents, your friends, the stranger who held the door. That's worship too." },
  ],
  lonely: [
    { type: "Quran", ref: "Quran 2:186", text: "And when My servants ask about Me — indeed I am near. I respond to the call of the caller when he calls upon Me.", note: "You are never truly alone. Allah is closer to you than your jugular vein. Talk to Him — He's always listening." },
    { type: "Quran", ref: "Quran 9:40", text: "Do not grieve; indeed Allah is with us.", note: "Abu Bakr was terrified in the cave during Hijrah. The Prophet ﷺ said these words to calm him. Allah is with you too, right now, in your loneliness." },
    { type: "Hadith", ref: "Muslim", text: "The Prophet ﷺ said: 'Allah says: I am with My servant when he remembers Me. If he remembers Me in himself, I remember him in Myself.'", note: "When you whisper SubhanAllah alone in your room, the Creator of the universe remembers YOU by name. You're never alone." },
    { type: "Quran", ref: "Quran 29:69", text: "And those who strive for Us — We will surely guide them to Our ways. And indeed, Allah is with the doers of good.", note: "Keep striving. Keep praying. Keep being good. Allah promises He will guide you — and guidance often comes through the right people at the right time." },
    { type: "Dua", ref: "Quran 3:8", text: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا\nRabbana la tuzigh quloobana ba'da idh hadaytana\n(Our Lord, do not let our hearts deviate after You have guided us, and grant us mercy from You.)", note: "When loneliness makes you question everything, anchor yourself with this dua. Ask Allah to keep your heart steady." },
  ],
  hopeless: [
    { type: "Quran", ref: "Quran 12:87", text: "Indeed, no one despairs of Allah's mercy except the disbelieving people.", note: "Despair and faith cannot coexist. If you believe in Allah, you must believe in hope. Things WILL get better." },
    { type: "Quran", ref: "Quran 65:2-3", text: "Whoever fears Allah — He will make for him a way out. And will provide for him from where he does not expect.", note: "FROM WHERE YOU DO NOT EXPECT. The solution you can't even imagine right now — Allah already has it planned." },
    { type: "Quran", ref: "Quran 94:5-6", text: "Verily, with hardship comes ease. Verily, with hardship comes ease.", note: "Not one — but TWO eases for every hardship. Allah's math is always in your favor." },
    { type: "Hadith", ref: "Tirmidhi", text: "The Prophet ﷺ said: 'Know that what missed you was never meant to hit you, and what hit you was never meant to miss you.'", note: "Nothing is random. Everything that happened — and didn't happen — was written by the Best of Planners. Trust the plan." },
    { type: "Quran", ref: "Quran 2:216", text: "Perhaps you hate a thing and it is good for you; and perhaps you love a thing and it is bad for you. Allah knows, and you do not know.", note: "Your worst chapter might be setting up your best chapter. You just can't see it yet. But Allah can." },
  ],
  happy: [
    { type: "Quran", ref: "Quran 14:7", text: "If you are grateful, I will surely increase you in favor.", note: "You're happy — Alhamdulillah! Now lock it in. Gratitude multiplies joy. Thank Allah and watch the blessings multiply." },
    { type: "Hadith", ref: "Bukhari & Muslim", text: "The Prophet ﷺ said: 'How wonderful is the affair of the believer. If something good happens, he is grateful and that is good for him.'", note: "This happiness is a gift from Allah. Enjoy it fully. Smile. Laugh. Share it with others. And say Alhamdulillah." },
    { type: "Quran", ref: "Quran 28:77", text: "And do good as Allah has done good to you.", note: "Allah has blessed you with joy — now pass it on. Make someone else smile today. That's how happiness compounds." },
    { type: "Hadith", ref: "Muslim", text: "The Prophet ﷺ said: 'Allah is pleased with a servant who praises Him when he eats and praises Him when he drinks.'", note: "Even the simplest pleasures deserve gratitude. A good meal, a warm drink, a moment of peace — say Alhamdulillah." },
    { type: "Hadith", ref: "Tirmidhi", text: "The Prophet ﷺ said: 'The most beloved deeds to Allah are those done consistently, even if small.'", note: "While you're feeling good, build a habit. Start praying tahajjud, reading Quran, or giving daily sadaqah. Plant seeds now that will grow when times get hard." },
  ],
  lost: [
    { type: "Quran", ref: "Quran 93:7", text: "And He found you lost and guided you.", note: "This was said to the Prophet ﷺ himself. Even the best of creation was lost before Allah guided him. You being lost isn't a failure — it's the beginning of being found." },
    { type: "Quran", ref: "Quran 29:69", text: "And those who strive for Us — We will surely guide them to Our ways.", note: "You don't need to have it all figured out. Just keep seeking, keep asking, keep trying. Allah promises to meet your effort with guidance." },
    { type: "Dua", ref: "Quran 1:6", text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ\nIhdinas-siratal-mustaqeem\n(Guide us to the straight path)", note: "You say this at least 17 times a day in your prayers. Let it sink in. Every time you recite Al-Fatiha, you're asking for exactly what you need right now." },
    { type: "Hadith", ref: "Muslim", text: "The Prophet ﷺ said: 'Allah says: Take one step towards Me, I will take ten steps towards you. Walk towards Me, I will run towards you.'", note: "You don't need to sprint. Just take one step. Read one page of Quran. Pray one extra prayer. Allah will meet you more than halfway." },
    { type: "Quran", ref: "Quran 6:125", text: "Whoever Allah wills to guide — He expands his heart to Islam.", note: "The fact that you're even here, seeking guidance, means Allah is already working on your heart. That restlessness you feel? It's Him calling you back." },
  ],
  tired: [
    { type: "Hadith", ref: "Muslim", text: "The Prophet ﷺ said: 'No fatigue, illness, anxiety, sorrow, harm, or sadness afflicts any Muslim — even the prick of a thorn — except that Allah wipes away some of his sins because of it.'", note: "Your exhaustion isn't wasted. Every moment of fatigue is erasing sins you didn't even know about. Rest, but know it's counting for you." },
    { type: "Quran", ref: "Quran 94:5-6", text: "Verily, with hardship comes ease.", note: "You're tired because you've been carrying a lot. The ease is coming. Rest is not laziness — even the Prophet ﷺ rested." },
    { type: "Hadith", ref: "Bukhari", text: "The Prophet ﷺ said: 'Your body has a right over you.'", note: "Sleep. Eat well. Take a break. Islam doesn't ask you to burn out. Taking care of your body is worship too." },
    { type: "Hadith", ref: "Bukhari & Muslim", text: "The Prophet ﷺ said: 'The most beloved deeds to Allah are those done consistently, even if small.'", note: "When you're exhausted, don't try to do everything. Just do something small consistently. Two rak'ahs. One page. One dua. Small is still beautiful." },
    { type: "Quran", ref: "Quran 73:20", text: "Allah knows that you are unable to keep count of it, so He has turned to you in mercy. So recite what is easy from the Quran.", note: "Even in Quran recitation, Allah says: read what is easy. He knows your limits better than you do. Be gentle with yourself." },
  ],
  scared: [
    { type: "Quran", ref: "Quran 3:173", text: "Allah is sufficient for us, and He is the best Disposer of affairs.", note: "Ibrahim said this when thrown into fire. The companions said it when armies gathered against them. Say it now — and mean it." },
    { type: "Quran", ref: "Quran 8:30", text: "They plan, and Allah plans. And Allah is the best of planners.", note: "Whatever you're afraid of — it's in Allah's hands, not yours. And His plan is always, always better." },
    { type: "Hadith", ref: "Tirmidhi", text: "The Prophet ﷺ said: 'Know that if the entire creation were to gather together to benefit you, they would not benefit you except with what Allah has already written for you. And if they gathered to harm you, they would not harm you except with what Allah has already written against you.'", note: "Nothing can touch you without Allah's permission. Read that again. Nothing. Let that truth dissolve your fear." },
    { type: "Dua", ref: "Abu Dawud", text: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ\nBismillahilladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'\n(In the name of Allah, with whose name nothing on earth or in heaven can cause harm)", note: "Say this three times morning and evening. The Prophet ﷺ promised that nothing will harm you. What better security system exists?" },
    { type: "Quran", ref: "Quran 9:51", text: "Say: Nothing will happen to us except what Allah has decreed for us. He is our Protector. And upon Allah let the believers rely.", note: "The future is unknown to you — but fully known to Allah. And He is your Protector. Let that be enough." },
  ],
  motivated: [
    { type: "Quran", ref: "Quran 13:11", text: "Indeed, Allah will not change the condition of a people until they change what is in themselves.", note: "You feel motivated — now ACT. This is your window. Allah won't change your situation until you take the first step. Go." },
    { type: "Hadith", ref: "Hakim", text: "The Prophet ﷺ said: 'Take advantage of five before five: your youth before your old age, your health before your sickness, your wealth before your poverty, your free time before your busyness, and your life before your death.'", note: "This energy won't last forever. Use it NOW. Start that project. Make that change. Build that habit. The clock is ticking." },
    { type: "Quran", ref: "Quran 3:200", text: "O you who believe! Persevere and endure and remain stationed and fear Allah that you may be successful.", note: "Motivation gets you started. Perseverance keeps you going. Ask Allah to give you both." },
    { type: "Hadith", ref: "Muslim", text: "The Prophet ﷺ said: 'Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.'", note: "Channel this energy into learning. Every lecture, every page, every lesson is a step toward Jannah." },
    { type: "Quran", ref: "Quran 29:69", text: "And those who strive for Us — We will surely guide them to Our ways.", note: "Your effort is never wasted with Allah. Even if results don't come immediately, the striving itself is honored." },
  ],
  guilty: [
    { type: "Quran", ref: "Quran 39:53", text: "Say: O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives ALL sins.", note: "ALL. Every single one. No matter how big, how repeated, how shameful. Allah's forgiveness has no limit. Turn to Him right now." },
    { type: "Hadith", ref: "Muslim", text: "The Prophet ﷺ said: 'Allah extends His hand at night so that the sinners of the day may repent, and extends His hand during the day so that the sinners of the night may repent.'", note: "Allah is literally reaching out to you right now. Every single day and night, He's waiting for you to turn back. Don't keep Him waiting." },
    { type: "Hadith", ref: "Tirmidhi", text: "The Prophet ﷺ said: 'Every son of Adam sins, and the best of those who sin are those who repent.'", note: "The best people aren't those who never sin — they're those who keep coming back to Allah. Your guilt is proof your heart is alive." },
    { type: "Hadith", ref: "Bukhari & Muslim", text: "The Prophet ﷺ said: 'By the One in whose Hand is my soul, if you did not sin, Allah would replace you with people who would sin, then seek forgiveness from Allah, and He would forgive them.'", note: "Allah WANTS to forgive. That's why He created forgiveness. Don't deny Him the chance to show you His mercy." },
    { type: "Dua", ref: "Bukhari", text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ\nAstaghfirullaha wa atubu ilayh\n(I seek Allah's forgiveness and repent to Him)", note: "The Prophet ﷺ said this over 70 times a day — and he was sinless. Say it now. Say it again. Keep saying it. Each time, guilt gets lighter." },
  ],
};

function shuffle(arr) {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a;
}

const STORAGE_KEY = "deenscroll-mood";
function loadData() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; } }
function saveData(d) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch {} }

export default function MoodReminders({ onBack }) {
  const [screen, setScreen] = useState("pick");
  const [mood, setMood] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [idx, setIdx] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);
  const [anim, setAnim] = useState("");

  useEffect(() => { const s = loadData(); if (s.bookmarks) setBookmarks(s.bookmarks); }, []);

  const pickMood = (m) => {
    setMood(m);
    setReminders(shuffle(REMINDERS[m.id] || []));
    setIdx(0);
    setScreen("remind");
  };

  const current = reminders[idx];

  const next = () => {
    setAnim("next");
    setTimeout(() => {
      setIdx(i => (i + 1 >= reminders.length ? 0 : i + 1));
      setAnim("");
    }, 200);
  };

  const prev = () => {
    if (idx <= 0) return;
    setAnim("prev");
    setTimeout(() => { setIdx(i => i - 1); setAnim(""); }, 200);
  };

  const toggleBookmark = () => {
    if (!current || !mood) return;
    const key = mood.id + ":" + current.ref;
    let nb;
    if (bookmarks.includes(key)) nb = bookmarks.filter(k => k !== key);
    else nb = [...bookmarks, key];
    setBookmarks(nb);
    saveData({ bookmarks: nb });
  };

  const shareReminder = () => {
    if (!current) return;
    const text = `${mood.emoji} Feeling ${mood.label}?\n\n"${current.text}"\n— ${current.ref}\n\n${current.note}\n\n— DeenScroll\ndeenscroll.com`;
    if (navigator.share) navigator.share({ text });
    else if (navigator.clipboard) navigator.clipboard.writeText(text);
  };

  const isBookmarked = current && mood ? bookmarks.includes(mood.id + ":" + current.ref) : false;

  // ============================================
  // MOOD PICKER
  // ============================================
  if (screen === "pick") {
    return (
      <div style={st.wrap}>
        <style>{css}</style>
        <div style={st.inner}>
          {onBack && <button style={st.backLink} onClick={onBack}>← DeenScroll Home</button>}
          <div style={st.pickHero}>
            <span style={st.heroEmoji}>🤲</span>
            <h1 style={st.heroTitle}>How Are You Feeling?</h1>
            <p style={st.heroSub}>Pick your mood and receive a personalized reminder from the Quran, Hadith, or Dua that speaks to your heart.</p>
          </div>

          <div style={st.moodGrid}>
            {MOODS.map(m => (
              <button key={m.id} style={{ ...st.moodCard, borderColor: m.color + "25" }} onClick={() => pickMood(m)}>
                <span style={st.moodEmoji}>{m.emoji}</span>
                <span style={{ ...st.moodLabel, color: m.color }}>{m.label}</span>
                <span style={st.moodDesc}>{m.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // REMINDER VIEW
  // ============================================
  if (screen === "remind" && current && mood) {
    const typeColors = { Quran: "#A78BFA", Hadith: "#34D399", Dua: "#FFD93D" };
    const typeColor = typeColors[current.type] || "#34D399";

    return (
      <div style={{ ...st.wrap, background: `linear-gradient(170deg, #0A0F1C 0%, ${mood.color}10 50%, #0A0F1C 100%)` }}>
        <style>{css}</style>
        <div style={st.inner}>
          {/* Top */}
          <div style={st.topRow}>
            <button style={st.backBtn} onClick={() => setScreen("pick")}>← Moods</button>
            <div style={st.moodTag}>
              <span>{mood.emoji}</span>
              <span style={{ color: mood.color }}>{mood.label}</span>
            </div>
            <span style={st.counter}>{idx + 1}/{reminders.length}</span>
          </div>

          {/* Card */}
          <div style={{
            ...st.card,
            borderColor: mood.color + "20",
            opacity: anim ? 0 : 1,
            transform: anim === "next" ? "translateX(-20px)" : anim === "prev" ? "translateX(20px)" : "translateX(0)",
          }}>
            {/* Type badge */}
            <div style={{ ...st.typeBadge, background: typeColor + "15", color: typeColor }}>
              {current.type === "Quran" ? "📖" : current.type === "Hadith" ? "🕌" : "🤲"} {current.type}
            </div>

            {/* Source */}
            <span style={st.refText}>{current.ref}</span>

            {/* Main text */}
            <p style={st.mainText}>{current.text}</p>

            {/* Divider */}
            <div style={{ ...st.divider, background: mood.color + "15" }} />

            {/* Reflection */}
            <p style={st.noteText}>{current.note}</p>

            {/* Actions */}
            <div style={st.actions}>
              <button style={{ ...st.actionBtn, color: isBookmarked ? "#FFD93D" : "rgba(255,255,255,0.3)" }} onClick={toggleBookmark}>
                {isBookmarked ? "★ Saved" : "☆ Save"}
              </button>
              <button style={st.actionBtn} onClick={shareReminder}>↗ Share</button>
            </div>
          </div>

          {/* Nav */}
          <div style={st.navRow}>
            <button style={{ ...st.navBtn, opacity: idx <= 0 ? 0.25 : 1 }} onClick={prev}>←</button>
            <button style={{ ...st.newMoodBtn, borderColor: mood.color + "30", color: mood.color }} onClick={() => setScreen("pick")}>
              Change Mood
            </button>
            <button style={st.navBtn} onClick={next}>→</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
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
  wrap: { minHeight: "100vh", fontFamily: "'Outfit', sans-serif", background: "linear-gradient(170deg, #0A0F1C 0%, #0F1A2E 40%, #0A0F1C 100%)" },
  inner: { maxWidth: "480px", margin: "0 auto", padding: "1.5rem 1.25rem", minHeight: "100vh", display: "flex", flexDirection: "column" },

  backLink: { background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", padding: "0.5rem 0", display: "block", marginBottom: "0.5rem" },

  pickHero: { textAlign: "center", marginBottom: "1.75rem" },
  heroEmoji: { fontSize: "3rem", display: "block", marginBottom: "0.5rem", animation: "float 3s ease-in-out infinite" },
  heroTitle: { fontFamily: "'Amiri', serif", fontSize: "2rem", color: "#F0E6D3", fontWeight: 700 },
  heroSub: { fontSize: "0.9rem", color: "rgba(240,230,211,0.4)", lineHeight: 1.6, marginTop: "0.75rem", maxWidth: "340px", margin: "0.75rem auto 0" },

  moodGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.6rem" },
  moodCard: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem",
    padding: "0.9rem 0.5rem", borderRadius: "16px", border: "1px solid",
    background: "rgba(255,255,255,0.025)", transition: "all 0.2s",
  },
  moodEmoji: { fontSize: "1.6rem" },
  moodLabel: { fontSize: "0.8rem", fontWeight: 700 },
  moodDesc: { fontSize: "0.6rem", color: "rgba(255,255,255,0.25)", textAlign: "center" },

  // REMIND
  topRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" },
  backBtn: { background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" },
  moodTag: { display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.85rem", fontWeight: 600 },
  counter: { fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" },

  card: {
    flex: 1, display: "flex", flexDirection: "column",
    background: "rgba(255,255,255,0.025)", border: "1px solid", borderRadius: "24px",
    padding: "1.5rem 1.25rem", transition: "all 0.2s ease", animation: "fadeUp 0.3s ease-out",
  },
  typeBadge: { display: "inline-flex", alignItems: "center", gap: "0.3rem", padding: "0.25rem 0.7rem", borderRadius: "14px", fontSize: "0.7rem", fontWeight: 600, alignSelf: "flex-start", marginBottom: "0.75rem" },
  refText: { fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", fontWeight: 600, marginBottom: "1rem" },
  mainText: { fontFamily: "'Amiri', serif", fontSize: "1.2rem", color: "#F0E6D3", lineHeight: 1.8, whiteSpace: "pre-line", marginBottom: "1.25rem" },
  divider: { height: "1px", width: "60px", margin: "0 0 1.25rem 0", borderRadius: "1px" },
  noteText: { fontSize: "0.9rem", color: "rgba(240,230,211,0.5)", lineHeight: 1.7, fontStyle: "italic" },
  actions: { display: "flex", gap: "1.5rem", marginTop: "auto", paddingTop: "1.25rem" },
  actionBtn: { background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", fontWeight: 600 },

  navRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0" },
  navBtn: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#F0E6D3", width: "44px", height: "44px", borderRadius: "50%", fontSize: "1rem", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" },
  newMoodBtn: { padding: "0.55rem 1rem", borderRadius: "20px", background: "none", border: "1px solid", fontSize: "0.75rem", fontWeight: 600 },
};
