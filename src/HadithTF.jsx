import { useState, useEffect, useCallback } from "react";

// ============================================
// HADITH TRUE/FALSE DATABASE - 80+ statements
// ============================================
const ALL_STATEMENTS = [
  // TRUE STATEMENTS
  { id: "h1", text: "The Prophet ﷺ said: 'Actions are judged by intentions.'", answer: true, source: "Bukhari & Muslim", info: "This is one of the most foundational hadith in Islam. Every deed is rewarded based on its intention." },
  { id: "h2", text: "The Prophet ﷺ said: 'The best of you are those who learn the Quran and teach it.'", answer: true, source: "Bukhari", info: "Learning and teaching the Quran is one of the most virtuous acts a Muslim can do." },
  { id: "h3", text: "The Prophet ﷺ said: 'Smiling at your brother is charity.'", answer: true, source: "Tirmidhi", info: "Even the smallest good deed, like a smile, counts as sadaqah in Islam." },
  { id: "h4", text: "The Prophet ﷺ said: 'None of you truly believes until he loves for his brother what he loves for himself.'", answer: true, source: "Bukhari & Muslim", info: "This hadith teaches the essence of brotherhood and selflessness in Islam." },
  { id: "h5", text: "The Prophet ﷺ said: 'Cleanliness is half of faith.'", answer: true, source: "Muslim", info: "Islam places great emphasis on both physical and spiritual purity." },
  { id: "h6", text: "The Prophet ﷺ said: 'The strong person is not the one who can wrestle, but the one who controls himself when angry.'", answer: true, source: "Bukhari & Muslim", info: "True strength in Islam is self-control, especially during moments of anger." },
  { id: "h7", text: "The Prophet ﷺ said: 'Whoever believes in Allah and the Last Day, let him speak good or remain silent.'", answer: true, source: "Bukhari & Muslim", info: "This hadith teaches Muslims to be mindful of their speech at all times." },
  { id: "h8", text: "The Prophet ﷺ said: 'The world is a prison for the believer and a paradise for the disbeliever.'", answer: true, source: "Muslim", info: "This means believers restrain themselves from unlawful things, while others indulge freely." },
  { id: "h9", text: "The Prophet ﷺ said: 'Make things easy, do not make things difficult.'", answer: true, source: "Bukhari", info: "The Prophet ﷺ always chose the easier path as long as it wasn't sinful." },
  { id: "h10", text: "The Prophet ﷺ said: 'The best among you are those who are best to their families.'", answer: true, source: "Tirmidhi", info: "Character starts at home — how you treat your family reflects your true nature." },
  { id: "h11", text: "The Prophet ﷺ said: 'Seeking knowledge is an obligation upon every Muslim.'", answer: true, source: "Ibn Majah", info: "Islam makes the pursuit of knowledge mandatory — not optional — for every Muslim." },
  { id: "h12", text: "The Prophet ﷺ said: 'A good word is charity.'", answer: true, source: "Bukhari & Muslim", info: "Kind speech is considered an act of worship and charity in Islam." },
  { id: "h13", text: "The Prophet ﷺ said: 'Removing a harmful thing from the road is charity.'", answer: true, source: "Bukhari & Muslim", info: "Even clearing a path for others is a rewarded act of goodness in Islam." },
  { id: "h14", text: "The Prophet ﷺ said: 'The one who eats and is grateful is like the one who fasts and is patient.'", answer: true, source: "Tirmidhi", info: "Gratitude for blessings can equal the reward of worship through patience." },
  { id: "h15", text: "The Prophet ﷺ said: 'Do not be angry, and Paradise will be yours.'", answer: true, source: "Tabarani", info: "Controlling anger is one of the paths to Paradise according to this hadith." },
  { id: "h16", text: "The Prophet ﷺ said: 'Whoever builds a mosque for Allah, Allah will build for him a house in Paradise.'", answer: true, source: "Bukhari & Muslim", info: "Contributing to places of worship carries immense reward in the hereafter." },
  { id: "h17", text: "The Prophet ﷺ said: 'Feed the hungry, visit the sick, and free the captives.'", answer: true, source: "Bukhari", info: "These three acts are core social responsibilities in Islam." },
  { id: "h18", text: "The Prophet ﷺ said: 'Every act of kindness is charity.'", answer: true, source: "Bukhari & Muslim", info: "Islam defines charity broadly — any good deed counts as sadaqah." },
  { id: "h19", text: "The Prophet ﷺ said: 'Allah does not look at your appearance or wealth, but at your hearts and deeds.'", answer: true, source: "Muslim", info: "What matters to Allah is sincerity of heart and righteous actions, not outward appearance." },
  { id: "h20", text: "The Prophet ﷺ said: 'The most beloved deeds to Allah are those done consistently, even if small.'", answer: true, source: "Bukhari & Muslim", info: "Consistency in good deeds is more beloved to Allah than occasional grand gestures." },
  { id: "h21", text: "The Prophet ﷺ said: 'Whoever follows a path seeking knowledge, Allah will make easy for him a path to Paradise.'", answer: true, source: "Muslim", info: "The pursuit of knowledge is directly linked to entering Paradise." },
  { id: "h22", text: "The Prophet ﷺ said: 'The supplication of a fasting person is never rejected.'", answer: true, source: "Ibn Majah", info: "Fasting is a special time when duas are more likely to be accepted." },
  { id: "h23", text: "The Prophet ﷺ said: 'Spread peace, feed others, pray at night, and you will enter Paradise in peace.'", answer: true, source: "Tirmidhi", info: "Four simple actions that can lead to Paradise according to this hadith." },
  { id: "h24", text: "The Prophet ﷺ said: 'A person is upon the religion of their close friend, so look at whom you befriend.'", answer: true, source: "Abu Dawud & Tirmidhi", info: "Your companions influence your character and faith — choose them wisely." },
  { id: "h25", text: "The Prophet ﷺ said: 'Modesty brings nothing but good.'", answer: true, source: "Bukhari & Muslim", info: "Haya (modesty/shyness) is always beneficial and is a branch of faith." },
  { id: "h26", text: "The Prophet ﷺ said: 'He who is not grateful to people is not grateful to Allah.'", answer: true, source: "Abu Dawud & Tirmidhi", info: "Thanking people is a prerequisite for thanking Allah properly." },
  { id: "h27", text: "The Prophet ﷺ said: 'When a person dies, their deeds end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for them.'", answer: true, source: "Muslim", info: "These three things continue earning reward even after death." },
  { id: "h28", text: "The Prophet ﷺ said: 'The best charity is giving water.'", answer: true, source: "Abu Dawud", info: "Providing water to those in need is considered the highest form of sadaqah." },
  { id: "h29", text: "The Prophet ﷺ said: 'Take advantage of five before five: your youth before your old age, your health before your sickness, your wealth before your poverty, your free time before your busyness, and your life before your death.'", answer: true, source: "Hakim", info: "This hadith urges Muslims to make the most of life's blessings before they pass." },
  { id: "h30", text: "The Prophet ﷺ said: 'Paradise lies at the feet of your mother.'", answer: true, source: "Nasai", info: "Honoring and serving one's mother is among the greatest paths to Paradise." },
  { id: "h31", text: "The Prophet ﷺ said: 'Whoever fasts Ramadan with faith and seeking reward, their past sins are forgiven.'", answer: true, source: "Bukhari & Muslim", info: "Sincere fasting during Ramadan is a means of having previous sins forgiven." },
  { id: "h32", text: "The Prophet ﷺ said: 'The best rows for men in prayer are the first rows, and the best rows for women are the last rows.'", answer: true, source: "Muslim", info: "This refers to the arrangement in the Prophet's ﷺ mosque during his time." },
  { id: "h33", text: "The Prophet ﷺ would break his fast with fresh dates before praying Maghrib.", answer: true, source: "Abu Dawud", info: "The Sunnah is to break the fast with ripe dates, or dried dates, or water if dates aren't available." },
  { id: "h34", text: "The Prophet ﷺ said: 'Verily, with hardship comes ease.'", answer: true, source: "Quran 94:6 (not hadith, but Quran)", info: "This is actually a Quranic verse (94:6), not a hadith — though the Prophet ﷺ conveyed it. Allah promises relief with every difficulty." },
  { id: "h35", text: "The Prophet ﷺ said: 'Give gifts to one another, for gifts remove ill feelings from the heart.'", answer: true, source: "Tirmidhi", info: "Gift-giving strengthens bonds and removes grudges between people." },

  // FALSE STATEMENTS
  { id: "h36", text: "The Prophet ﷺ said: 'Pray only when you feel spiritual, not out of routine.'", answer: false, source: "Fabricated", info: "This is false. Prayer is obligatory five times daily regardless of how one feels. Consistency is key in Islam." },
  { id: "h37", text: "The Prophet ﷺ said: 'Friday prayer is optional for men who are busy with work.'", answer: false, source: "Fabricated", info: "False. Jumu'ah prayer is obligatory for Muslim men. The Quran commands leaving trade for Friday prayer (62:9)." },
  { id: "h38", text: "The Prophet ﷺ said: 'Charity given in secret is worth less than charity given publicly.'", answer: false, source: "Fabricated", info: "False. The opposite is true — secret charity is generally more rewarded as it's more sincere and protects from showing off." },
  { id: "h39", text: "The Prophet ﷺ said: 'Knowledge is only for scholars, not for ordinary people.'", answer: false, source: "Fabricated", info: "False. The Prophet ﷺ said seeking knowledge is obligatory upon EVERY Muslim, not just scholars." },
  { id: "h40", text: "The Prophet ﷺ said: 'If you are wealthy, your prayers are worth more.'", answer: false, source: "Fabricated", info: "False. Wealth has no bearing on the value of prayer. Allah looks at hearts and deeds, not wealth." },
  { id: "h41", text: "The Prophet ﷺ said: 'Women are not allowed to enter mosques.'", answer: false, source: "Fabricated", info: "False. The Prophet ﷺ actually said: 'Do not prevent the female servants of Allah from the mosques of Allah.'" },
  { id: "h42", text: "The Prophet ﷺ said: 'It is permissible to lie if it benefits you financially.'", answer: false, source: "Fabricated", info: "False. Lying is forbidden in Islam except in very specific cases like reconciling between people or during war." },
  { id: "h43", text: "The Prophet ﷺ said: 'Only Arabs can truly understand Islam.'", answer: false, source: "Fabricated", info: "False. Islam is for all of humanity. The Prophet ﷺ said: 'No Arab has superiority over a non-Arab except by piety.'" },
  { id: "h44", text: "The Prophet ﷺ said: 'There is no need to be kind to animals.'", answer: false, source: "Fabricated", info: "False. The Prophet ﷺ taught great kindness to animals. A woman entered Hell for starving a cat, and a man was forgiven for giving water to a thirsty dog." },
  { id: "h45", text: "The Prophet ﷺ said: 'You can skip fasting in Ramadan if you simply don't want to.'", answer: false, source: "Fabricated", info: "False. Fasting is obligatory for able Muslims. Only the sick, travelers, elderly, pregnant, and nursing have valid exemptions." },
  { id: "h46", text: "The Prophet ﷺ said: 'Music is the food of the soul and always permissible.'", answer: false, source: "Fabricated", info: "False. This is not a hadith. The ruling on music is debated among scholars, but this quote is fabricated." },
  { id: "h47", text: "The Prophet ﷺ said: 'Hajj is only for the wealthy.'", answer: false, source: "Fabricated", info: "False. Hajj is obligatory only for those who are physically and financially able. It's not exclusive to the wealthy." },
  { id: "h48", text: "The Prophet ﷺ never did any household chores.", answer: false, source: "Fabricated", info: "False. Aisha (RA) reported that the Prophet ﷺ would help with housework, mend his shoes, and sew his clothes." },
  { id: "h49", text: "The Prophet ﷺ said: 'If your parents are not Muslim, you owe them nothing.'", answer: false, source: "Fabricated", info: "False. The Quran commands kindness to parents even if they are non-Muslim (31:15). Only obedience in sin is excluded." },
  { id: "h50", text: "The Prophet ﷺ said: 'The more you eat, the more blessed you are.'", answer: false, source: "Fabricated", info: "False. The Prophet ﷺ actually warned against overeating and said to fill one-third with food, one-third with drink, and one-third with air." },
  { id: "h51", text: "The Prophet ﷺ said: 'Dua (supplication) is useless if you are sinful.'", answer: false, source: "Fabricated", info: "False. Allah accepts dua from anyone who calls upon Him sincerely. Being sinful does not disqualify someone from making dua." },
  { id: "h52", text: "The Prophet ﷺ said: 'Zakat is only due on gold and silver.'", answer: false, source: "Fabricated", info: "False. Zakat applies to various forms of wealth including cash savings, business inventory, crops, livestock, and more." },
  { id: "h53", text: "The Prophet ﷺ said: 'A Muslim should never befriend a non-Muslim.'", answer: false, source: "Fabricated", info: "False. The Prophet ﷺ had respectful relationships with non-Muslims and showed them kindness. Islam encourages good character with all people." },
  { id: "h54", text: "The Prophet ﷺ said: 'You can only repent once for each sin.'", answer: false, source: "Fabricated", info: "False. There is no limit on repentance. Allah's mercy is infinite, and a person can repent as many times as needed." },
  { id: "h55", text: "The Prophet ﷺ said: 'Islam spread only by the sword.'", answer: false, source: "Fabricated", info: "False. This is a historical misconception. The Quran states 'There is no compulsion in religion' (2:256). Islam spread through trade, scholarship, and dawah as well." },
  { id: "h56", text: "The Prophet ﷺ said: 'Crying is a sign of weakness in a man.'", answer: false, source: "Fabricated", info: "False. The Prophet ﷺ himself cried — when his son Ibrahim died, when visiting graves, and during prayer. He said tears are a mercy from Allah." },
  { id: "h57", text: "The Prophet ﷺ said: 'The color black is always associated with evil in Islam.'", answer: false, source: "Fabricated", info: "False. There is no such teaching. The Black Stone (Hajr al-Aswad) at the Ka'bah is revered, and the Prophet ﷺ wore black garments." },
  { id: "h58", text: "The Prophet ﷺ said: 'Older people do not need to pray because they have already earned enough reward.'", answer: false, source: "Fabricated", info: "False. Prayer is obligatory until death for every Muslim who is conscious and able. There is no retirement from worship." },
  { id: "h59", text: "The Prophet ﷺ said: 'If you memorize the entire Quran, you are guaranteed Paradise.'", answer: false, source: "Fabricated", info: "False. While memorizing the Quran is greatly rewarded, Paradise is not guaranteed by any single act. It requires sincerity, faith, and good deeds." },
  { id: "h60", text: "The Prophet ﷺ said: 'You should never question or seek to understand your faith.'", answer: false, source: "Fabricated", info: "False. Islam encourages reflection and understanding. The Quran repeatedly asks 'Will you not think?' and 'Will you not reflect?'" },

  // TRICKY TRUE ONES
  { id: "h61", text: "The Prophet ﷺ said: 'A Muslim is the one from whose tongue and hands others are safe.'", answer: true, source: "Bukhari & Muslim", info: "A true Muslim doesn't harm others through words or actions." },
  { id: "h62", text: "The Prophet ﷺ said: 'The ink of a scholar is more sacred than the blood of a martyr.'", answer: false, source: "No authentic source", info: "This is a famous quote often attributed to the Prophet ﷺ but has no authentic chain of narration (isnad). It's widely considered fabricated." },
  { id: "h63", text: "The Prophet ﷺ said: 'Whoever recites Ayatul Kursi after every obligatory prayer, nothing prevents them from entering Paradise except death.'", answer: true, source: "Nasai", info: "Reciting Ayatul Kursi after each fard prayer is a highly recommended Sunnah with this incredible reward." },
  { id: "h64", text: "The Prophet ﷺ said: 'The two rak'ahs before Fajr are better than the world and everything in it.'", answer: true, source: "Muslim", info: "The Sunnah prayer before Fajr is extremely valuable — the Prophet ﷺ never left it even while traveling." },
  { id: "h65", text: "The Prophet ﷺ said: 'Allah is beautiful and loves beauty.'", answer: true, source: "Muslim", info: "This hadith encourages Muslims to appreciate beauty and present themselves well." },
  { id: "h66", text: "The Prophet ﷺ said: 'The most hated permissible thing to Allah is divorce.'", answer: true, source: "Abu Dawud", info: "While divorce is allowed in Islam, it is the last resort and most disliked of all permissible actions." },
  { id: "h67", text: "The Prophet ﷺ said: 'There is no disease that Allah has created except that He has also created its cure.'", answer: true, source: "Bukhari", info: "This hadith encourages seeking medical treatment and trusting that cures exist." },
  { id: "h68", text: "The Prophet ﷺ said: 'Whoever is kind to animals will be rewarded in the hereafter.'", answer: true, source: "Bukhari & Muslim", info: "The Prophet ﷺ told stories of people being forgiven for giving water to thirsty animals." },
  { id: "h69", text: "The Prophet ﷺ used to race with his wife Aisha.", answer: true, source: "Abu Dawud", info: "The Prophet ﷺ raced Aisha multiple times — she won once and he won once. He joked 'This one for that one!'" },
  { id: "h70", text: "The Prophet ﷺ said: 'Leave what makes you doubt for what does not make you doubt.'", answer: true, source: "Tirmidhi & Nasai", info: "When in doubt about whether something is permissible, choose the safer option." },
  { id: "h71", text: "The Prophet ﷺ said: 'Whoever guards their tongue and private parts, I guarantee them Paradise.'", answer: true, source: "Bukhari", info: "Controlling speech and desires are two keys to entering Paradise." },
  { id: "h72", text: "The Prophet ﷺ said: 'Do not let your last deeds be bad ones.'", answer: false, source: "No authentic source", info: "While the concept of ending well is Islamic, this exact phrasing is not an authentic hadith." },
  { id: "h73", text: "The Prophet ﷺ said: 'Part of the perfection of a person's Islam is leaving that which does not concern them.'", answer: true, source: "Tirmidhi", info: "Minding one's own business and avoiding gossip is a sign of strong faith." },
  { id: "h74", text: "The Prophet ﷺ said: 'The best dhikr is La ilaha illAllah.'", answer: true, source: "Tirmidhi", info: "The declaration of tawheed (monotheism) is the most virtuous form of remembrance of Allah." },
  { id: "h75", text: "The Prophet ﷺ said: 'Richness is not having many possessions, but richness is being content.'", answer: true, source: "Bukhari & Muslim", info: "True wealth in Islam is inner contentment with what Allah has given you." },
  { id: "h76", text: "The Prophet ﷺ never laughed.", answer: false, source: "Fabricated claim", info: "False. The Prophet ﷺ smiled often and sometimes laughed until his back teeth were visible. Companions described his cheerful nature." },
  { id: "h77", text: "The Prophet ﷺ said: 'Patience is illumination.'", answer: true, source: "Muslim", info: "Sabr (patience) is described as a light that guides a person through hardship." },
  { id: "h78", text: "The Prophet ﷺ said: 'The believer does not get stung from the same hole twice.'", answer: true, source: "Bukhari & Muslim", info: "A wise believer learns from their mistakes and doesn't repeat them." },
  { id: "h79", text: "The Prophet ﷺ said: 'Envy eats good deeds like fire eats wood.'", answer: true, source: "Abu Dawud", info: "Hasad (destructive envy) destroys one's own good deeds — a serious warning." },
  { id: "h80", text: "The Prophet ﷺ said: 'Allah has divided mercy into 100 parts. He kept 99 for the Day of Judgment and sent 1 to earth.'", answer: true, source: "Bukhari & Muslim", info: "All the mercy we see in the world — a mother's love for her child, compassion between creatures — is from just 1 part of Allah's mercy." },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const STORAGE_KEY = "deenscroll-hadith-tf";
function loadData() { try { const d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : null; } catch { return null; } }
function saveData(d) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch {} }
function getDefault() { return { seen: [], correct: [], wrong: [], streak: 0, bestStreak: 0, total: 0, totalCorrect: 0 }; }

export default function HadithTF({ onBack }) {
  const [screen, setScreen] = useState("home");
  const [progress, setProgress] = useState(getDefault());
  const [queue, setQueue] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [session, setSession] = useState({ correct: 0, total: 0 });
  const [anim, setAnim] = useState(false);

  useEffect(() => { const s = loadData(); if (s) setProgress(s); }, []);

  const buildQueue = useCallback(() => {
    const unseen = ALL_STATEMENTS.filter(s => !progress.seen.includes(s.id));
    const wrongRetry = ALL_STATEMENTS.filter(s => progress.wrong.includes(s.id) && !unseen.find(u => u.id === s.id));
    const rest = ALL_STATEMENTS.filter(s => !unseen.find(u => u.id === s.id) && !wrongRetry.find(w => w.id === s.id));
    const ordered = [...shuffle(unseen), ...shuffle(wrongRetry), ...shuffle(rest)];
    return ordered.length > 0 ? ordered : shuffle(ALL_STATEMENTS);
  }, [progress]);

  const startGame = () => {
    setQueue(buildQueue());
    setIdx(0);
    setSelected(null);
    setSession({ correct: 0, total: 0 });
    setScreen("game");
  };

  const currentS = queue[idx];

  const handleAnswer = (answer) => {
    if (selected !== null) return;
    setSelected(answer);
    const isCorrect = answer === currentS.answer;
    setSession(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));

    const np = { ...progress };
    if (!np.seen.includes(currentS.id)) np.seen = [...np.seen, currentS.id];
    np.total += 1;
    if (isCorrect) {
      np.totalCorrect += 1;
      np.streak += 1;
      np.wrong = np.wrong.filter(id => id !== currentS.id);
      if (!np.correct.includes(currentS.id)) np.correct = [...np.correct, currentS.id];
      if (np.streak > np.bestStreak) np.bestStreak = np.streak;
    } else {
      np.streak = 0;
      if (!np.wrong.includes(currentS.id)) np.wrong = [...np.wrong, currentS.id];
      np.correct = np.correct.filter(id => id !== currentS.id);
    }
    setProgress(np);
    saveData(np);
  };

  const nextQ = () => {
    setAnim(true);
    setTimeout(() => {
      if (idx + 1 >= queue.length) setScreen("results");
      else { setIdx(idx + 1); setSelected(null); }
      setAnim(false);
    }, 250);
  };

  const resetProgress = () => { const d = getDefault(); setProgress(d); saveData(d); setScreen("home"); };

  // ============================================
  // HOME
  // ============================================
  if (screen === "home") {
    const pct = progress.total > 0 ? Math.round((progress.totalCorrect / progress.total) * 100) : 0;
    return (
      <div style={st.wrap}>
        <style>{css}</style>
        <div style={st.inner}>
          {onBack && <button style={st.backLink} onClick={onBack}>← DeenScroll Home</button>}
          <div style={st.homeHero}>
            <span style={st.heroIcon}>⚖️</span>
            <h1 style={st.heroTitle}>True or False</h1>
            <p style={st.heroBadge}>Hadith Edition</p>
            <p style={st.heroSub}>
              Can you tell authentic hadith from fabricated ones?
              Tap True or False — learn the Sunnah one statement at a time.
            </p>
          </div>

          <div style={st.statsRow}>
            <div style={st.statBox}><span style={st.statNum}>{progress.bestStreak}</span><span style={st.statLbl}>🔥 Best</span></div>
            <div style={st.statDiv} />
            <div style={st.statBox}><span style={st.statNum}>{progress.seen.length}</span><span style={st.statLbl}>Played</span></div>
            <div style={st.statDiv} />
            <div style={st.statBox}><span style={st.statNum}>{pct}%</span><span style={st.statLbl}>Accuracy</span></div>
          </div>

          <div style={st.progressSection}>
            <div style={st.progressOuter}>
              <div style={{ ...st.progressFill, width: `${(progress.seen.length / ALL_STATEMENTS.length) * 100}%` }} />
            </div>
            <span style={st.progressText}>{progress.seen.length} / {ALL_STATEMENTS.length} statements explored</span>
          </div>

          <button style={st.playBtn} onClick={startGame}>
            Start Playing
          </button>

          {progress.total > 0 && <button style={st.resetBtn} onClick={resetProgress}>Reset Progress</button>}

          <p style={st.homeVerse}>"Whoever tells a lie against me, let them take their seat in the Fire." — Prophet ﷺ</p>
        </div>
      </div>
    );
  }

  // ============================================
  // GAME
  // ============================================
  if (screen === "game" && currentS) {
    const isCorrect = selected !== null ? selected === currentS.answer : null;
    return (
      <div style={st.wrap}>
        <style>{css}</style>
        <div style={st.inner}>
          <div style={st.topBar}>
            <button style={st.closeBtn} onClick={() => setScreen("home")}>✕</button>
            <div style={st.progBar}><div style={{ ...st.progFill, width: `${((idx + 1) / queue.length) * 100}%` }} /></div>
            <span style={st.counter}>{idx + 1}/{queue.length}</span>
          </div>

          <div style={{
            ...st.card,
            opacity: anim ? 0 : 1,
            transform: anim ? "translateY(-20px)" : "translateY(0)",
          }}>
            {/* Statement */}
            <div style={st.statementBox}>
              <span style={st.quoteOpen}>"</span>
              <p style={st.statementText}>{currentS.text}</p>
            </div>

            {/* True / False Buttons */}
            {selected === null ? (
              <div style={st.tfRow}>
                <button style={st.trueBtn} onClick={() => handleAnswer(true)}>
                  <span style={st.tfIcon}>✓</span>
                  <span style={st.tfLabel}>TRUE</span>
                </button>
                <button style={st.falseBtn} onClick={() => handleAnswer(false)}>
                  <span style={st.tfIcon}>✗</span>
                  <span style={st.tfLabel}>FALSE</span>
                </button>
              </div>
            ) : (
              <div style={st.tfRow}>
                <div style={{
                  ...st.trueBtn,
                  ...(currentS.answer === true ? st.btnCorrectActive : st.btnDimmed),
                  ...(selected === true && currentS.answer !== true ? st.btnWrongActive : {}),
                }}>
                  <span style={st.tfIcon}>{currentS.answer === true ? "✓" : selected === true ? "✗" : "✓"}</span>
                  <span style={st.tfLabel}>TRUE</span>
                </div>
                <div style={{
                  ...st.falseBtn,
                  ...(currentS.answer === false ? st.btnCorrectActive : st.btnDimmed),
                  ...(selected === false && currentS.answer !== false ? st.btnWrongActive : {}),
                }}>
                  <span style={st.tfIcon}>{currentS.answer === false ? "✓" : selected === false ? "✗" : "✗"}</span>
                  <span style={st.tfLabel}>FALSE</span>
                </div>
              </div>
            )}

            {/* Result Banner */}
            {selected !== null && (
              <div style={{ ...st.resultBanner, background: isCorrect ? "rgba(52,211,153,0.08)" : "rgba(255,107,107,0.08)", borderColor: isCorrect ? "rgba(52,211,153,0.2)" : "rgba(255,107,107,0.2)" }}>
                <span style={{ ...st.resultLabel, color: isCorrect ? "#34D399" : "#FF6B6B" }}>
                  {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                </span>
                <span style={st.sourceTag}>{currentS.source}</span>
                <p style={st.infoText}>{currentS.info}</p>
                <button style={{ ...st.nextBtn, background: isCorrect ? "#34D399" : "#FF6B6B" }} onClick={nextQ}>
                  {idx + 1 >= queue.length ? "See Results" : "Next →"}
                </button>
              </div>
            )}
          </div>

          {/* Session score */}
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
    if (pct >= 90) msg = "Masha'Allah! You know your hadith! 🌟";
    else if (pct >= 70) msg = "Alhamdulillah, strong knowledge! 💪";
    else if (pct >= 50) msg = "Good effort — keep learning the Sunnah! 📚";
    else msg = "The Prophet ﷺ said: seeking knowledge is obligatory! 🤲";

    return (
      <div style={st.wrap}>
        <style>{css}</style>
        <div style={st.resultsInner}>
          <span style={st.rMoon}>🌙</span>
          <h1 style={st.rTitle}>Session Complete</h1>
          <p style={st.rMsg}>{msg}</p>
          <div style={st.rRing}>
            <svg width="150" height="150" viewBox="0 0 150 150">
              <circle cx="75" cy="75" r="64" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9" />
              <circle cx="75" cy="75" r="64" fill="none" stroke={pct >= 70 ? "#34D399" : pct >= 50 ? "#FFD93D" : "#FF6B6B"} strokeWidth="9" strokeDasharray={`${(pct / 100) * 402} 402`} strokeLinecap="round" transform="rotate(-90 75 75)" />
            </svg>
            <div style={st.rRingInner}><span style={st.rPct}>{pct}%</span></div>
          </div>
          <div style={st.rStats}>
            <div style={st.rStat}><span style={{ ...st.rStatNum, color: "#34D399" }}>{session.correct}</span><span style={st.rStatLbl}>Correct</span></div>
            <div style={st.rStat}><span style={{ ...st.rStatNum, color: "#FF6B6B" }}>{session.total - session.correct}</span><span style={st.rStatLbl}>Missed</span></div>
            <div style={st.rStat}><span style={{ ...st.rStatNum, color: "#FFD93D" }}>{progress.bestStreak}</span><span style={st.rStatLbl}>🔥 Best</span></div>
          </div>
          <button style={st.rPlayBtn} onClick={startGame}>Play Again</button>
          <button style={st.rHomeBtn} onClick={() => setScreen("home")}>← Back</button>
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
  @keyframes glow { 0%,100%{box-shadow:0 0 8px rgba(255,217,61,0.3)} 50%{box-shadow:0 0 20px rgba(255,217,61,0.5)} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }
`;

const st = {
  wrap: {
    minHeight: "100vh",
    background: "linear-gradient(170deg, #0A0F1C 0%, #1C1207 40%, #0D2818 70%, #0A0F1C 100%)",
    fontFamily: "'Outfit', sans-serif",
  },
  inner: { maxWidth: "480px", margin: "0 auto", padding: "1.5rem 1.25rem", minHeight: "100vh", display: "flex", flexDirection: "column" },

  backLink: { background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", padding: "0.5rem 0", display: "block", marginBottom: "0.5rem" },

  homeHero: { textAlign: "center", marginBottom: "1.5rem" },
  heroIcon: { fontSize: "3.5rem", display: "block", marginBottom: "0.5rem", animation: "float 3s ease-in-out infinite" },
  heroTitle: { fontFamily: "'Amiri', serif", fontSize: "2.5rem", color: "#F0E6D3", fontWeight: 700 },
  heroBadge: { display: "inline-block", marginTop: "0.4rem", padding: "0.25rem 0.9rem", borderRadius: "20px", background: "rgba(255,217,61,0.1)", color: "#FFD93D", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" },
  heroSub: { fontSize: "0.95rem", color: "rgba(240,230,211,0.45)", lineHeight: 1.6, marginTop: "1rem", maxWidth: "340px", margin: "1rem auto 0" },

  statsRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: "1.25rem", background: "rgba(255,255,255,0.03)", borderRadius: "16px", padding: "1rem", border: "1px solid rgba(255,255,255,0.05)", marginBottom: "1.25rem" },
  statBox: { display: "flex", flexDirection: "column", alignItems: "center", gap: "0.15rem" },
  statNum: { fontSize: "1.5rem", fontWeight: 700, color: "#F0E6D3" },
  statLbl: { fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" },
  statDiv: { width: "1px", height: "28px", background: "rgba(255,255,255,0.06)" },

  progressSection: { marginBottom: "1.5rem" },
  progressOuter: { height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden", marginBottom: "0.4rem" },
  progressFill: { height: "100%", background: "linear-gradient(90deg, #FFD93D, #F97316)", borderRadius: "3px", transition: "width 0.4s" },
  progressText: { fontSize: "0.7rem", color: "rgba(255,255,255,0.25)" },

  playBtn: { background: "linear-gradient(135deg, #FFD93D, #F97316)", color: "#0A0F1C", border: "none", padding: "1rem", borderRadius: "14px", fontSize: "1.05rem", fontWeight: 700, width: "100%", marginBottom: "0.75rem", boxShadow: "0 0 30px rgba(255,217,61,0.2)" },
  resetBtn: { display: "block", margin: "0 auto", background: "none", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)", padding: "0.55rem 1.25rem", borderRadius: "25px", fontSize: "0.75rem", marginBottom: "1.5rem" },
  homeVerse: { fontFamily: "'Amiri', serif", fontSize: "0.8rem", color: "rgba(240,230,211,0.2)", textAlign: "center", fontStyle: "italic", marginTop: "auto", paddingTop: "1rem" },

  // GAME
  topBar: { display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" },
  closeBtn: { background: "rgba(255,255,255,0.05)", border: "none", color: "#F0E6D3", width: "34px", height: "34px", borderRadius: "50%", fontSize: "0.95rem", display: "flex", alignItems: "center", justifyContent: "center" },
  progBar: { flex: 1, height: "5px", background: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden" },
  progFill: { height: "100%", background: "linear-gradient(90deg, #FFD93D, #F97316)", borderRadius: "3px", transition: "width 0.4s" },
  counter: { fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", fontWeight: 500, minWidth: "2.5rem", textAlign: "right" },

  card: { flex: 1, display: "flex", flexDirection: "column", transition: "all 0.25s ease" },

  statementBox: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", padding: "2rem 1.5rem", marginBottom: "1.5rem", position: "relative", minHeight: "160px", display: "flex", alignItems: "center", justifyContent: "center" },
  quoteOpen: { position: "absolute", top: "12px", left: "18px", fontFamily: "'Amiri', serif", fontSize: "4rem", color: "rgba(255,217,61,0.15)", lineHeight: 1 },
  statementText: { fontFamily: "'Amiri', serif", fontSize: "1.2rem", color: "#F0E6D3", lineHeight: 1.7, textAlign: "center", position: "relative", zIndex: 1 },

  tfRow: { display: "flex", gap: "0.75rem", marginBottom: "1rem" },
  trueBtn: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem", padding: "1.25rem", borderRadius: "16px", border: "2px solid rgba(52,211,153,0.25)", background: "rgba(52,211,153,0.06)", color: "#34D399", fontSize: "1rem", fontWeight: 700, transition: "all 0.2s" },
  falseBtn: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem", padding: "1.25rem", borderRadius: "16px", border: "2px solid rgba(255,107,107,0.25)", background: "rgba(255,107,107,0.06)", color: "#FF6B6B", fontSize: "1rem", fontWeight: 700, transition: "all 0.2s" },
  tfIcon: { fontSize: "1.5rem", fontWeight: 800 },
  tfLabel: { fontSize: "0.85rem", letterSpacing: "0.15em" },

  btnCorrectActive: { borderColor: "#34D399", background: "rgba(52,211,153,0.15)", color: "#34D399", boxShadow: "0 0 20px rgba(52,211,153,0.2)" },
  btnWrongActive: { borderColor: "#FF6B6B", background: "rgba(255,107,107,0.15)", color: "#FF6B6B", animation: "shake 0.35s" },
  btnDimmed: { opacity: 0.3, borderColor: "rgba(255,255,255,0.05)" },

  resultBanner: { padding: "1.25rem", borderRadius: "16px", border: "1px solid", animation: "fadeUp 0.3s ease-out" },
  resultLabel: { fontSize: "1.1rem", fontWeight: 700, display: "block", marginBottom: "0.35rem" },
  sourceTag: { display: "inline-block", padding: "0.2rem 0.6rem", borderRadius: "8px", background: "rgba(255,217,61,0.08)", color: "#FFD93D", fontSize: "0.7rem", fontWeight: 600, marginBottom: "0.6rem" },
  infoText: { fontSize: "0.85rem", color: "rgba(240,230,211,0.55)", lineHeight: 1.6, marginBottom: "1rem" },
  nextBtn: { width: "100%", padding: "0.8rem", borderRadius: "12px", border: "none", color: "#0A0F1C", fontSize: "0.95rem", fontWeight: 700 },

  sessionBar: { display: "flex", justifyContent: "center", alignItems: "center", gap: "0.65rem", padding: "0.75rem", fontSize: "0.85rem", fontWeight: 600 },
  streakPill: { padding: "0.2rem 0.5rem", borderRadius: "10px", background: "rgba(255,217,61,0.1)", color: "#FFD93D", fontSize: "0.75rem", fontWeight: 600, animation: "glow 2s ease-in-out infinite" },

  // RESULTS
  resultsInner: { maxWidth: "400px", margin: "0 auto", padding: "3rem 1.5rem", textAlign: "center", animation: "fadeUp 0.5s ease-out" },
  rMoon: { fontSize: "3rem", display: "block", marginBottom: "0.5rem" },
  rTitle: { fontFamily: "'Amiri', serif", fontSize: "2rem", color: "#F0E6D3" },
  rMsg: { fontSize: "0.95rem", color: "rgba(240,230,211,0.5)", marginTop: "0.5rem", marginBottom: "2rem" },
  rRing: { position: "relative", display: "inline-block", marginBottom: "2rem" },
  rRingInner: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" },
  rPct: { fontSize: "2.5rem", fontWeight: 800, color: "#F0E6D3" },
  rStats: { display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "2rem" },
  rStat: { display: "flex", flexDirection: "column", alignItems: "center", gap: "0.15rem" },
  rStatNum: { fontSize: "1.4rem", fontWeight: 700 },
  rStatLbl: { fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" },
  rPlayBtn: { width: "100%", padding: "0.85rem", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #FFD93D, #F97316)", color: "#0A0F1C", fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.65rem" },
  rHomeBtn: { width: "100%", padding: "0.75rem", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(240,230,211,0.5)", fontSize: "0.85rem", fontWeight: 500 },
};
