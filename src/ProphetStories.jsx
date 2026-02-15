import { useState, useEffect, useRef } from "react";

// ============================================
// PROPHET STORY DATABASE - 50+ snippets
// ============================================
const ALL_STORIES = [
  // ADAM (AS)
  { id: "s1", prophet: "Adam (AS)", title: "The First Sin & First Repentance", parts: [
    "Adam and Hawa lived in Paradise with everything they could want. Allah gave them one rule — don't approach one tree. But Shaytan whispered, and they ate from it.",
    "Immediately, they felt shame. But instead of making excuses, Adam turned to Allah and said: 'Our Lord, we have wronged ourselves. If You do not forgive us, we will be among the losers.' (7:23)\n\nAllah forgave them. The first sin in human history was followed by the first repentance — teaching us that turning back to Allah is always possible."
  ], reflect: "When was the last time you sincerely asked Allah for forgiveness?", emoji: "🌿", color: "#34D399" },

  // NUH (AS)
  { id: "s2", prophet: "Nuh (Noah)", title: "950 Years of Patience", parts: [
    "Nuh called his people to Allah for 950 years. Not 950 days — 950 years. Most of them mocked him. His own son refused to believe. Imagine dedicating your entire life to a mission and seeing almost no results.",
    "Yet Nuh never gave up. When Allah finally commanded him to build the Ark, people laughed even harder — 'Why is he building a ship on dry land?'\n\nThen the flood came. Those who believed were saved. Nuh's patience across centuries teaches us that our job is to keep trying — results are in Allah's hands."
  ], reflect: "What's something you've been patient with that feels like it's taking forever?", emoji: "🚢", color: "#4ECDC4" },

  // IBRAHIM (AS)
  { id: "s3", prophet: "Ibrahim (AS)", title: "Walking Into Fire", parts: [
    "Ibrahim smashed the idols of his people to prove they were powerless. When confronted, he pointed to the largest idol: 'Ask him, if he can speak.' They knew the idols couldn't speak — but their pride wouldn't let them accept the truth.",
    "So they built a massive fire and threw Ibrahim into it. As he flew through the air toward the flames, Jibreel asked: 'Do you need anything?' Ibrahim replied: 'Not from you. Only from Allah.'\n\nAllah commanded: 'O fire, be cool and safe for Ibrahim.' (21:69)\n\nThe fire didn't burn him. When you put your trust entirely in Allah, even fire can become a garden."
  ], reflect: "What 'fire' in your life do you need to trust Allah with?", emoji: "🔥", color: "#F97316" },

  { id: "s4", prophet: "Ibrahim (AS)", title: "The Ultimate Sacrifice", parts: [
    "Ibrahim had waited decades for a son. Finally, Allah blessed him with Ismail. Then came the hardest test any parent could face — a dream commanding him to sacrifice his beloved son.",
    "Ibrahim told Ismail about the dream. Ismail didn't run or cry. He said: 'O my father, do as you are commanded. You will find me, if Allah wills, among the patient.' (37:102)\n\nAs Ibrahim laid the knife against his son's neck, Allah called out: 'You have fulfilled the vision.' A ram was sent as a replacement.\n\nThis wasn't about the sacrifice itself — it was about complete surrender to Allah. That moment is why we celebrate Eid al-Adha every year."
  ], reflect: "What is something you love that you'd struggle to give up for Allah's sake?", emoji: "🐑", color: "#F97316" },

  { id: "s5", prophet: "Ibrahim (AS)", title: "Leaving Hajar & Baby Ismail in the Desert", parts: [
    "Allah commanded Ibrahim to leave his wife Hajar and baby Ismail in the barren desert of Makkah — no water, no food, no people. As Ibrahim walked away, Hajar called out: 'Did Allah command you to do this?' Ibrahim nodded.",
    "Hajar said: 'Then He will not let us perish.'\n\nWhen the water ran out, baby Ismail cried from thirst. Hajar ran between the hills of Safa and Marwa seven times, desperately searching for help. Then a miracle — water burst from the ground beneath Ismail's feet.\n\nThat water is Zamzam, still flowing today, over 4,000 years later. And Hajar's desperate run? We honor it during every Hajj and Umrah."
  ], reflect: "Has there been a time when trusting Allah through hardship led to something beautiful?", emoji: "💧", color: "#F97316" },

  // YUSUF (AS)
  { id: "s6", prophet: "Yusuf (Joseph)", title: "Betrayed by Brothers", parts: [
    "Yusuf was his father Yaqub's most beloved child. His brothers burned with jealousy. They threw him into a dark well as a child and told their father a wolf had eaten him, staining his shirt with fake blood.",
    "Yaqub wept so much he went blind. But he never lost hope in Allah. He said: 'I only complain of my suffering and grief to Allah.' (12:86)\n\nYusuf was pulled from the well by travelers and sold as a slave in Egypt. But Allah had a plan far greater than anyone could imagine."
  ], reflect: "Have you ever been hurt by someone close to you? How did you cope?", emoji: "🕳️", color: "#A78BFA" },

  { id: "s7", prophet: "Yusuf (Joseph)", title: "From Prison to Palace", parts: [
    "In Egypt, Yusuf was falsely accused and thrown in prison for years. But even in prison, he called people to Allah and interpreted dreams. He never stopped being a servant of God, no matter his circumstances.",
    "When the King of Egypt had a dream no one could interpret, the prisoner they'd forgotten about — Yusuf — was summoned. He interpreted the dream, saved Egypt from famine, and was appointed as treasurer of the entire nation.\n\nYears later, his brothers came to Egypt begging for food — not recognizing the brother they'd thrown in a well. When Yusuf revealed himself, he said: 'No blame on you today. Allah will forgive you.' (12:92)\n\nHe forgave them completely. From a well to a throne — Allah's plan is always greater than your pain."
  ], reflect: "Can you think of a hardship that later turned out to be a hidden blessing?", emoji: "👑", color: "#A78BFA" },

  // MUSA (AS)
  { id: "s8", prophet: "Musa (Moses)", title: "A Baby in the River", parts: [
    "Pharaoh ordered every newborn Israelite boy killed. Musa's mother, terrified, received divine inspiration: 'Put him in a basket and place him in the river.' Imagine the faith required to put your baby in a river.",
    "The basket floated directly to Pharaoh's palace. His wife Asiyah found baby Musa and fell in love with him. She convinced Pharaoh to adopt him.\n\nThe very child Pharaoh wanted to kill was raised in his own home, fed at his own table, sleeping under his own roof. And when Musa needed a nurse, Allah arranged for his own mother to be hired — so she held her son again.\n\nAllah's planning is beyond anything we can imagine."
  ], reflect: "When has something scary turned out to be exactly what needed to happen?", emoji: "👶", color: "#FF6B6B" },

  { id: "s9", prophet: "Musa (Moses)", title: "The Sea Parts", parts: [
    "Pharaoh's army was behind them. The Red Sea was in front of them. The Israelites panicked: 'We are caught!' Musa said the words of someone with absolute trust: 'No! My Lord is with me. He will guide me.' (26:62)",
    "Allah told Musa to strike the sea with his staff. The sea split into two towering walls of water, with dry ground between them. The Israelites walked through safely.\n\nWhen Pharaoh's army followed, the waters crashed down upon them. As Pharaoh drowned, he cried: 'I believe!' — but it was too late.\n\nWhen you feel trapped between impossibilities, remember: the One who split the sea can make a way for you."
  ], reflect: "What feels impossible in your life right now that you need to trust Allah with?", emoji: "🌊", color: "#FF6B6B" },

  // AYYUB (AS)
  { id: "s10", prophet: "Ayyub (Job)", title: "The Man Who Lost Everything", parts: [
    "Ayyub was wealthy, healthy, and had a large family. Then Allah tested him. He lost his wealth. His children died. His body was struck with a painful illness that lasted years. Friends abandoned him. Only his wife stayed.",
    "Through all of it — years of suffering — Ayyub never complained against Allah. He only said: 'Harm has afflicted me, and You are the Most Merciful of the merciful.' (21:83)\n\nAllah healed him, restored his wealth doubled, and gave him his family back.\n\nAyyub teaches us that patience isn't passive — it's an active choice to trust Allah even when everything falls apart."
  ], reflect: "What's the hardest test you've faced, and how did your faith help you through it?", emoji: "🤲", color: "#FFD93D" },

  // YUNUS (AS)
  { id: "s11", prophet: "Yunus (Jonah)", title: "Inside the Whale", parts: [
    "Yunus was sent to his people, but when they rejected his message, he left in frustration before Allah gave him permission. He boarded a ship that was soon caught in a violent storm. The crew cast lots to lighten the load — Yunus's name came up.",
    "He was thrown overboard and swallowed by a massive whale. In the darkness of the whale's belly, at the bottom of the ocean, at night — three layers of darkness — Yunus made the most famous dua:\n\n'There is no god but You. Glory be to You. I was among the wrongdoers.' (21:87)\n\nAllah commanded the whale to release him. He was cast onto shore, weak and humbled. His people, meanwhile, had repented — all of them.\n\nNo matter how deep your darkness, that dua can reach Allah."
  ], reflect: "Have you ever felt completely alone in the dark? Did you call on Allah?", emoji: "🐋", color: "#4ECDC4" },

  // DAWUD (AS)
  { id: "s12", prophet: "Dawud (David)", title: "The Shepherd Who Defeated a Giant", parts: [
    "Goliath (Jalut) was a massive warrior who terrified armies. King Talut asked for a volunteer to face him. A young shepherd boy named Dawud stepped forward — no armor, no sword, just a sling and a stone.",
    "The army was skeptical. But Dawud had something they didn't — complete trust in Allah. He launched a single stone at Goliath.\n\nIt struck him down. The mighty giant fell. Dawud would go on to become a prophet and king, blessed with the Psalms (Zabur) and a voice so beautiful that mountains and birds would praise Allah alongside him.\n\nSize and strength mean nothing when Allah is on your side."
  ], reflect: "What 'giant' problem in your life feels too big to face alone?", emoji: "🪨", color: "#60A5FA" },

  // ISA (AS)
  { id: "s13", prophet: "Isa (Jesus)", title: "A Miracle Birth", parts: [
    "Maryam was the most devout woman of her time. She dedicated her life to worship in the temple. One day, angel Jibreel appeared and told her she would have a son. She was shocked — 'How can I have a child when no man has touched me?'",
    "Jibreel said: 'It is easy for Allah. He says 'Be' and it is.' (19:21)\n\nWhen labor pains drove her to a palm tree, alone and afraid, she wished she had never existed. Allah sent comfort — fresh dates fell from the tree and a stream appeared beneath her.\n\nWhen she brought baby Isa to her people, they accused her. But baby Isa spoke from the cradle: 'I am the servant of Allah. He has given me the Scripture and made me a prophet.' (19:30)\n\nAllah defends those who trust Him — sometimes in ways no one expects."
  ], reflect: "When have you felt judged unfairly? Did you trust that Allah knew the truth?", emoji: "🌴", color: "#34D399" },

  // MUHAMMAD ﷺ
  { id: "s14", prophet: "Muhammad ﷺ", title: "The Year of Sorrow", parts: [
    "In a single year, the Prophet ﷺ lost two of the most important people in his life: his wife Khadijah — his rock, his first supporter, his comfort — and his uncle Abu Talib, who had protected him from Quraysh for decades.",
    "Grieving and vulnerable, the Prophet ﷺ traveled to Ta'if to seek support. The people there rejected him and sent children to stone him until he bled. Bleeding and exhausted, he made dua — not for revenge, but asking Allah: 'If You are not angry with me, I do not care.'\n\nAllah sent Jibreel with the angel of the mountains, offering to crush Ta'if between two mountains. The Prophet ﷺ refused: 'Perhaps their children will worship Allah.'\n\nIn his darkest hour, he chose mercy. That's why he's the best of creation."
  ], reflect: "How do you respond when people hurt you? Can you choose mercy?", emoji: "💔", color: "#34D399" },

  { id: "s15", prophet: "Muhammad ﷺ", title: "The Night Journey", parts: [
    "After the Year of Sorrow — his lowest point — Allah gave him the greatest gift any human has received. In one night, the Prophet ﷺ was taken from Makkah to Jerusalem, then ascended through all seven heavens.",
    "He met Adam in the first heaven, Isa and Yahya in the second, Yusuf in the third, Idris in the fourth, Harun in the fifth, Musa in the sixth, and Ibrahim in the seventh. Each prophet welcomed him.\n\nBeyond the seventh heaven, he stood before Allah — closer than any creation has ever been. There, the five daily prayers were given as a gift to the ummah.\n\nThe lesson: after your lowest point, Allah can elevate you to the highest heights."
  ], reflect: "After a difficult time, have you experienced something unexpectedly beautiful?", emoji: "🌟", color: "#34D399" },

  { id: "s16", prophet: "Muhammad ﷺ", title: "Forgiving Makkah", parts: [
    "For 21 years, the people of Makkah tortured Muslims, killed his companions, boycotted his family until they ate tree leaves from hunger, drove him from his home, and tried to assassinate him.",
    "When the Prophet ﷺ returned to Makkah with 10,000 Muslims — powerful enough to take any revenge — the Quraysh trembled. He asked: 'What do you think I will do with you?'\n\nThey said: 'You are a generous brother, son of a generous brother.'\n\nHe said: 'Go. You are free.'\n\nNo revenge. No trials. No executions. The greatest conqueror showed the greatest mercy. That single act caused thousands to accept Islam."
  ], reflect: "Is there someone you've been holding a grudge against? What would it feel like to let go?", emoji: "🕊️", color: "#34D399" },

  // SULAYMAN (AS)
  { id: "s17", prophet: "Sulayman (Solomon)", title: "The King Who Thanked Allah", parts: [
    "Sulayman was given a kingdom unlike any other. He could command the wind, understand animals, and the jinn worked under his authority. He had wealth, power, and armies of humans, jinn, and birds.",
    "Yet with all this power, he never became arrogant. When he saw the throne of the Queen of Sheba transported to him in the blink of an eye, he said: 'This is from the favor of my Lord to test me — whether I will be grateful or ungrateful.' (27:40)\n\nSulayman understood that every blessing is a test. The question isn't just 'What has Allah given you?' but 'What will you do with it?'"
  ], reflect: "What blessings do you take for granted? When did you last thank Allah for them?", emoji: "👑", color: "#FFD93D" },

  // YAQUB (AS)
  { id: "s18", prophet: "Yaqub (Jacob)", title: "A Father's Beautiful Patience", parts: [
    "Yaqub lost his beloved son Yusuf as a child. Years later, he lost his second son Binyamin too. He wept so much from grief that he went blind. His other sons told him to stop — 'You'll destroy yourself with this grief.'",
    "Yaqub said something extraordinary: 'I only complain of my suffering and grief to Allah, and I know from Allah that which you do not know.' (12:86)\n\nHe never complained to people. He never lost hope. He told his sons: 'Do not despair of Allah's mercy. Only the disbelieving people despair of Allah's mercy.' (12:87)\n\nDecades later, Yusuf was found alive as the most powerful man in Egypt. Yaqub's sight was restored when Yusuf's shirt was placed over his eyes.\n\nBeautiful patience always has a beautiful ending."
  ], reflect: "What are you waiting for with patience right now?", emoji: "😢", color: "#A78BFA" },

  // SHUAYB (AS)
  { id: "s19", prophet: "Shu'ayb (AS)", title: "The Preacher of Honesty", parts: [
    "Shu'ayb's people were cheaters. They would give less when measuring goods for others and demand more when receiving. They rigged their scales. Business was built on deception.",
    "Shu'ayb warned them: 'Give full measure and weight. Do not cheat people of their things.' (26:181-183) They laughed at him: 'Does your prayer command you to tell us what to do with our money?'\n\nWhen they refused to change, Allah destroyed them with an earthquake and a scorching blast.\n\nShu'ayb's story reminds us that honesty in business isn't just good ethics — it's a command from Allah. Cheating people is never 'just business.'"
  ], reflect: "Are you completely honest in all your dealings — even when no one is watching?", emoji: "⚖️", color: "#F97316" },

  // LUQMAN
  { id: "s20", prophet: "Luqman (The Wise)", title: "A Father's Timeless Advice", parts: [
    "Luqman wasn't a prophet, but Allah honored him with an entire surah. His advice to his son is some of the most beautiful parenting guidance ever recorded.",
    "He said: 'O my son, do not associate anything with Allah. Indeed, association with Him is a great injustice.' (31:13)\n\n'O my son, establish prayer, command what is good, forbid what is wrong, and be patient with what befalls you.' (31:17)\n\n'Do not turn your cheek away from people in contempt, and do not walk through the earth arrogantly.' (31:18)\n\n'Be moderate in your pace and lower your voice. Indeed, the most disagreeable of sounds is the voice of donkeys.' (31:19)\n\nSimple advice. Timeless wisdom. Every parent should memorize these verses."
  ], reflect: "What's the best piece of advice your parents ever gave you?", emoji: "📖", color: "#60A5FA" },
];

const PROPHETS = ["All", ...Array.from(new Set(ALL_STORIES.map(s => s.prophet)))];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const STORAGE_KEY = "deenscroll-stories";
function loadData() { try { const d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : null; } catch { return null; } }
function saveData(d) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch {} }

export default function ProphetStories({ onBack }) {
  const [stories, setStories] = useState(ALL_STORIES);
  const [idx, setIdx] = useState(0);
  const [partIdx, setPartIdx] = useState(0);
  const [showReflect, setShowReflect] = useState(false);
  const [seen, setSeen] = useState([]);
  const [filter, setFilter] = useState("All");
  const [anim, setAnim] = useState("");
  const touchStart = useRef(null);

  useEffect(() => { const s = loadData(); if (s) setSeen(s.seen || []); }, []);

  useEffect(() => {
    const pool = filter === "All" ? ALL_STORIES : ALL_STORIES.filter(s => s.prophet === filter);
    setStories(pool);
    setIdx(0);
    setPartIdx(0);
    setShowReflect(false);
  }, [filter]);

  const current = stories[idx];

  const markSeen = (id) => {
    if (!seen.includes(id)) {
      const ns = [...seen, id];
      setSeen(ns);
      saveData({ seen: ns });
    }
  };

  const nextPart = () => {
    if (!current) return;
    if (partIdx < current.parts.length - 1) {
      setAnim("next");
      setTimeout(() => { setPartIdx(p => p + 1); setAnim(""); }, 200);
    } else if (!showReflect) {
      setAnim("next");
      setTimeout(() => { setShowReflect(true); markSeen(current.id); setAnim(""); }, 200);
    } else {
      goNextStory();
    }
  };

  const prevPart = () => {
    if (showReflect) {
      setAnim("prev");
      setTimeout(() => { setShowReflect(false); setAnim(""); }, 200);
    } else if (partIdx > 0) {
      setAnim("prev");
      setTimeout(() => { setPartIdx(p => p - 1); setAnim(""); }, 200);
    }
  };

  const goNextStory = () => {
    setAnim("next");
    setTimeout(() => {
      if (idx + 1 >= stories.length) setIdx(0);
      else setIdx(i => i + 1);
      setPartIdx(0);
      setShowReflect(false);
      setAnim("");
    }, 200);
  };

  const shareStory = () => {
    if (!current) return;
    const text = `${current.emoji} ${current.prophet}: ${current.title}\n\n${current.parts[0].substring(0, 150)}...\n\nRead more on DeenScroll\ndeenscroll.com`;
    if (navigator.share) navigator.share({ text });
    else if (navigator.clipboard) navigator.clipboard.writeText(text);
  };

  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;
    const diff = e.changedTouches[0].clientX - touchStart.current;
    if (diff < -50) nextPart();
    else if (diff > 50) prevPart();
    touchStart.current = null;
  };

  const totalParts = current ? current.parts.length + 1 : 0;
  const currentPart = showReflect ? totalParts - 1 : partIdx;

  return (
    <div style={{ ...st.wrap, background: `linear-gradient(170deg, #0A0F1C 0%, ${current ? current.color + "15" : "#0A0F1C"} 50%, #0A0F1C 100%)` }}>
      <style>{css}</style>
      <div style={st.inner}>
        {/* Top */}
        <div style={st.topRow}>
          {onBack ? <button style={st.backBtn} onClick={onBack}>← Home</button> : <div />}
          <span style={st.topTitle}>Prophet Stories</span>
          <span style={st.seenCount}>{seen.length}/{ALL_STORIES.length}</span>
        </div>

        {/* Filter */}
        <div style={st.filterRow}>
          {PROPHETS.map(p => (
            <button key={p} style={{
              ...st.filterPill,
              ...(p === filter ? { background: "rgba(240,230,211,0.1)", borderColor: "rgba(240,230,211,0.25)", color: "#F0E6D3" } : {}),
            }} onClick={() => setFilter(p)}>
              {p === "All" ? "All" : p.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Story Card */}
        {current && (
          <div
            style={{
              ...st.card,
              borderColor: current.color + "25",
              opacity: anim ? 0 : 1,
              transform: anim === "next" ? "translateX(-20px)" : anim === "prev" ? "translateX(20px)" : "translateX(0)",
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Progress dots */}
            <div style={st.dots}>
              {Array.from({ length: totalParts }).map((_, i) => (
                <div key={i} style={{
                  ...st.dot,
                  background: i === currentPart ? current.color : "rgba(255,255,255,0.1)",
                  width: i === currentPart ? "20px" : "8px",
                }} />
              ))}
            </div>

            {!showReflect ? (
              <>
                <span style={st.cardEmoji}>{current.emoji}</span>
                <span style={{ ...st.prophetName, color: current.color }}>{current.prophet}</span>
                <h2 style={st.cardTitle}>{current.title}</h2>
                <p style={st.cardText}>{current.parts[partIdx]}</p>
              </>
            ) : (
              <div style={st.reflectBox}>
                <span style={st.reflectIcon}>🤔</span>
                <span style={st.reflectLabel}>Reflect</span>
                <p style={st.reflectText}>{current.reflect}</p>
                <div style={st.reflectActions}>
                  <button style={{ ...st.shareBtn, borderColor: current.color + "30", color: current.color }} onClick={shareStory}>
                    ↗ Share This Story
                  </button>
                  <button style={{ ...st.nextStoryBtn, background: current.color }} onClick={goNextStory}>
                    Next Story →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Nav */}
        <div style={st.navRow}>
          <button style={{ ...st.navBtn, opacity: (partIdx <= 0 && !showReflect) ? 0.25 : 1 }} onClick={prevPart}>← Back</button>
          <span style={st.swipeHint}>Swipe or tap</span>
          <button style={st.navBtn} onClick={nextPart}>
            {showReflect ? "Next Story →" : partIdx >= current.parts.length - 1 ? "Reflect →" : "Continue →"}
          </button>
        </div>

        {/* Story counter */}
        <div style={st.storyCounter}>
          <span style={st.counterText}>Story {idx + 1} of {stories.length}</span>
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
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
`;

const st = {
  wrap: { minHeight: "100vh", fontFamily: "'Outfit', sans-serif", transition: "background 0.5s" },
  inner: { maxWidth: "480px", margin: "0 auto", padding: "1.5rem 1.25rem", minHeight: "100vh", display: "flex", flexDirection: "column" },

  topRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" },
  backBtn: { background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" },
  topTitle: { fontFamily: "'Amiri', serif", fontSize: "1.3rem", color: "#F0E6D3", fontWeight: 700 },
  seenCount: { fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", fontWeight: 500 },

  filterRow: { display: "flex", gap: "0.35rem", overflowX: "auto", paddingBottom: "0.75rem", marginBottom: "0.5rem", scrollbarWidth: "none" },
  filterPill: {
    whiteSpace: "nowrap", padding: "0.3rem 0.7rem", borderRadius: "18px", fontSize: "0.7rem",
    fontWeight: 600, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)",
    color: "rgba(255,255,255,0.35)", flexShrink: 0,
  },

  card: {
    flex: 1, display: "flex", flexDirection: "column",
    background: "rgba(255,255,255,0.025)", border: "1px solid", borderRadius: "24px",
    padding: "1.5rem 1.25rem", transition: "all 0.2s ease", overflow: "hidden",
  },

  dots: { display: "flex", gap: "4px", justifyContent: "center", marginBottom: "1.25rem" },
  dot: { height: "4px", borderRadius: "2px", transition: "all 0.3s" },

  cardEmoji: { fontSize: "2.5rem", textAlign: "center", display: "block", marginBottom: "0.5rem", animation: "float 3s ease-in-out infinite" },
  prophetName: { fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", textAlign: "center", display: "block", marginBottom: "0.35rem" },
  cardTitle: { fontFamily: "'Amiri', serif", fontSize: "1.5rem", color: "#F0E6D3", textAlign: "center", marginBottom: "1.25rem", lineHeight: 1.3 },
  cardText: { fontFamily: "'Amiri', serif", fontSize: "1.05rem", color: "rgba(240,230,211,0.75)", lineHeight: 1.8, whiteSpace: "pre-line" },

  reflectBox: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", animation: "fadeUp 0.3s ease-out" },
  reflectIcon: { fontSize: "2.5rem", marginBottom: "0.75rem" },
  reflectLabel: { fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "0.75rem" },
  reflectText: { fontFamily: "'Amiri', serif", fontSize: "1.2rem", color: "#F0E6D3", lineHeight: 1.7, maxWidth: "350px", marginBottom: "2rem" },
  reflectActions: { display: "flex", flexDirection: "column", gap: "0.6rem", width: "100%" },
  shareBtn: { padding: "0.75rem", borderRadius: "12px", background: "none", border: "1px solid", fontSize: "0.85rem", fontWeight: 600 },
  nextStoryBtn: { padding: "0.8rem", borderRadius: "12px", border: "none", color: "#0A0F1C", fontSize: "0.95rem", fontWeight: 700 },

  navRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0" },
  navBtn: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#F0E6D3", padding: "0.6rem 1rem", borderRadius: "12px", fontSize: "0.8rem", fontWeight: 600 },
  swipeHint: { fontSize: "0.6rem", color: "rgba(255,255,255,0.12)" },

  storyCounter: { textAlign: "center", paddingTop: "0.25rem" },
  counterText: { fontSize: "0.65rem", color: "rgba(255,255,255,0.15)" },
};
