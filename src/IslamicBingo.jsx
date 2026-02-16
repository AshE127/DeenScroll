import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";

// ============================================
// DEED POOLS
// ============================================
const DAILY_DEEDS = [
  { id: "dd1", text: "Said Bismillah before eating", emoji: "🍽️" },
  { id: "dd2", text: "Drank water with right hand", emoji: "💧" },
  { id: "dd3", text: "Smiled at someone", emoji: "😊" },
  { id: "dd4", text: "Said Alhamdulillah after a meal", emoji: "🤲" },
  { id: "dd5", text: "Made one dua", emoji: "💫" },
  { id: "dd6", text: "Said SubhanAllah 10 times", emoji: "📿" },
  { id: "dd7", text: "Entered home with salam", emoji: "🚪" },
  { id: "dd8", text: "Said Alhamdulillah after sneezing", emoji: "🤧" },
  { id: "dd9", text: "Prayed at least one salah", emoji: "🕌" },
  { id: "dd10", text: "Avoided backbiting", emoji: "🤐" },
  { id: "dd11", text: "Spoke a kind word", emoji: "💬" },
  { id: "dd12", text: "Ate with right hand", emoji: "🤚" },
  { id: "dd13", text: "Read even 1 ayah of Quran", emoji: "📖" },
  { id: "dd14", text: "Said Astaghfirullah 10 times", emoji: "🙏" },
  { id: "dd15", text: "Controlled your temper", emoji: "😤" },
  { id: "dd16", text: "Helped someone", emoji: "🤝" },
  { id: "dd17", text: "Said morning or evening adhkar", emoji: "🌅" },
  { id: "dd18", text: "Made wudu mindfully", emoji: "💧" },
  { id: "dd19", text: "Thanked someone sincerely", emoji: "❤️" },
  { id: "dd20", text: "Listened to Quran", emoji: "🎧" },
  { id: "dd21", text: "Slept on your right side", emoji: "😴" },
  { id: "dd22", text: "Said Salawat on Prophet ﷺ", emoji: "💚" },
  { id: "dd23", text: "Showed patience today", emoji: "⏳" },
  { id: "dd24", text: "Avoided complaining", emoji: "🤫" },
  { id: "dd25", text: "Said Bismillah before a task", emoji: "✨" },
  { id: "dd26", text: "Gave someone a compliment", emoji: "🌟" },
  { id: "dd27", text: "Used miswak or brushed teeth", emoji: "🪥" },
  { id: "dd28", text: "Sat down while drinking water", emoji: "🪑" },
  { id: "dd29", text: "Forgave someone in your heart", emoji: "🕊️" },
  { id: "dd30", text: "Said Alhamdulillah for a blessing", emoji: "🌿" },
  { id: "dd31", text: "Checked on a friend or family", emoji: "📞" },
  { id: "dd32", text: "Removed something harmful from a path", emoji: "🧹" },
];

const WEEKLY_DEEDS = [
  { id: "wd1", text: "Went to Jummah prayer", emoji: "🕌" },
  { id: "wd2", text: "Prayed all 5 salah in a day", emoji: "🧎" },
  { id: "wd3", text: "Read a full page of Quran", emoji: "📖" },
  { id: "wd4", text: "Gave sadaqah / charity", emoji: "💰" },
  { id: "wd5", text: "Called a family member", emoji: "📞" },
  { id: "wd6", text: "Memorized a new ayah or dua", emoji: "🧠" },
  { id: "wd7", text: "Fasted a voluntary day", emoji: "🌙" },
  { id: "wd8", text: "Prayed Tahajjud / night prayer", emoji: "🌃" },
  { id: "wd9", text: "Watched an Islamic lecture", emoji: "🎓" },
  { id: "wd10", text: "Taught someone something Islamic", emoji: "🗣️" },
  { id: "wd11", text: "Visited or helped a sick person", emoji: "🏥" },
  { id: "wd12", text: "Made dua for the ummah", emoji: "🌍" },
  { id: "wd13", text: "Read Surah Al-Kahf on Friday", emoji: "📜" },
  { id: "wd14", text: "Prayed all sunnah prayers for a day", emoji: "⭐" },
  { id: "wd15", text: "Fed someone or shared a meal", emoji: "🥘" },
  { id: "wd16", text: "Learned about a Prophet's story", emoji: "📚" },
  { id: "wd17", text: "Did istighfar 100 times in a day", emoji: "🤲" },
  { id: "wd18", text: "Read Ayatul Kursi after every salah for a day", emoji: "✨" },
  { id: "wd19", text: "Went a full day without backbiting", emoji: "🤐" },
  { id: "wd20", text: "Prayed 2 extra rak'ahs of nafl", emoji: "🕌" },
  { id: "wd21", text: "Made dua at a recommended time", emoji: "⏰" },
  { id: "wd22", text: "Reconciled with someone", emoji: "🤝" },
  { id: "wd23", text: "Donated clothes or items", emoji: "👕" },
  { id: "wd24", text: "Learned a new Arabic word", emoji: "🇸🇦" },
  { id: "wd25", text: "Completed morning AND evening adhkar", emoji: "🌅" },
];

// ============================================
// HELPERS
// ============================================
function getDayId() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getWeekId() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now - start) / 86400000 + start.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${String(week).padStart(2, "0")}`;
}

function seededRandom(seed) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

function hashStr(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = ((h << 5) - h) + str.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}

function seededShuffle(arr, seed) {
  const a = [...arr];
  const rand = seededRandom(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildGrid(pool, id) {
  const seed = hashStr(id);
  const shuffled = seededShuffle(pool, seed);
  const picked = shuffled.slice(0, 8);
  const grid = [];
  let idx = 0;
  for (let r = 0; r < 3; r++) {
    const row = [];
    for (let c = 0; c < 3; c++) {
      if (r === 1 && c === 1) {
        row.push({ id: "free", text: "FREE", emoji: "⭐", isFree: true });
      } else {
        row.push({ ...picked[idx], isFree: false });
        idx++;
      }
    }
    grid.push(row);
  }
  return grid;
}

function checkBingos(checked) {
  const lines = [
    ["0-0","0-1","0-2"], ["1-0","1-1","1-2"], ["2-0","2-1","2-2"],
    ["0-0","1-0","2-0"], ["0-1","1-1","2-1"], ["0-2","1-2","2-2"],
    ["0-0","1-1","2-2"], ["0-2","1-1","2-0"],
  ];
  return lines.filter(line => line.every(pos => checked.includes(pos)));
}

function getDaysLeftInWeek() {
  const d = new Date().getDay();
  return d === 0 ? 0 : 7 - d;
}

const STORAGE_KEY = "deenscroll-bingo-v2";
function loadData() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; } }
function saveData(d) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch {} }

// ============================================
// COMPONENT
// ============================================
export default function IslamicBingo({ onBack }) {
  const { checkPlayLimit, recordPlay, isPremium, signInWithGoogle, user } = useAuth();
  const [tab, setTab] = useState("weekly");
  const [dayId] = useState(getDayId());
  const [weekId] = useState(getWeekId());
  const [dailyGrid] = useState(() => buildGrid(DAILY_DEEDS, getDayId()));
  const [weeklyGrid] = useState(() => buildGrid(WEEKLY_DEEDS, getWeekId()));
  const [dailyChecked, setDailyChecked] = useState(["1-1"]);
  const [weeklyChecked, setWeeklyChecked] = useState(["1-1"]);
  const [confirm, setConfirm] = useState(null);
  const [justChecked, setJustChecked] = useState(null);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [weeklyStreak, setWeeklyStreak] = useState(0);

  // Load saved state
  useEffect(() => {
    const data = loadData();
    if (data.daily && data.daily[dayId]) setDailyChecked(data.daily[dayId].checked || ["1-1"]);
    if (data.weekly && data.weekly[weekId]) setWeeklyChecked(data.weekly[weekId].checked || ["1-1"]);
    setDailyStreak(data.dailyStreak || 0);
    setWeeklyStreak(data.weeklyStreak || 0);
  }, [dayId, weekId]);

  // Save on change
  useEffect(() => {
    const data = loadData();
    if (!data.daily) data.daily = {};
    if (!data.weekly) data.weekly = {};
    const db = checkBingos(dailyChecked);
    const wb = checkBingos(weeklyChecked);
    data.daily[dayId] = { checked: dailyChecked, bingos: db.length, total: dailyChecked.length };
    data.weekly[weekId] = { checked: weeklyChecked, bingos: wb.length, total: weeklyChecked.length };
    data.dailyStreak = dailyStreak;
    data.weeklyStreak = weeklyStreak;
    saveData(data);
  }, [dailyChecked, weeklyChecked, dailyStreak, weeklyStreak]);

  const grid = tab === "daily" ? dailyGrid : weeklyGrid;
  const checked = tab === "daily" ? dailyChecked : weeklyChecked;
  const setChecked = tab === "daily" ? setDailyChecked : setWeeklyChecked;
  const bingos = checkBingos(checked);
  const isBlackout = checked.length === 9;

  const tapCell = (r, c) => {
    const pos = `${r}-${c}`;
    if (pos === "1-1") return;
    if (checked.includes(pos)) {
      setChecked(ch => ch.filter(p => p !== pos));
    } else {
      setConfirm({ r, c, pos, deed: grid[r][c] });
    }
  };

  const confirmDeed = () => {
    if (!confirm) return;
    setChecked(ch => [...ch, confirm.pos]);
    setJustChecked(confirm.pos);
    setTimeout(() => setJustChecked(null), 500);
    setConfirm(null);
  };

  const shareCard = () => {
    const label = tab === "daily" ? `Daily Bingo — ${dayId}` : `Weekly Bingo — ${weekId}`;
    const gridVis = grid.map((row, r) =>
      row.map((_, c) => checked.includes(`${r}-${c}`) ? "✅" : "⬜").join("")
    ).join("\n");
    const text = `🌙 Islamic ${label}\n\n${gridVis}\n\n${checked.length}/9 deeds • ${bingos.length} bingo${bingos.length !== 1 ? "s" : ""}\n\nScroll Less, Deen More.\ndeenscroll.com`;
    if (navigator.share) navigator.share({ text });
    else if (navigator.clipboard) navigator.clipboard.writeText(text);
  };

  const streak = tab === "daily" ? dailyStreak : weeklyStreak;
  const bingoLines = bingos.flat();

  return (
    <div style={st.wrap}>
      <style>{css}</style>
      <div style={st.inner}>
        {/* Header */}
        <div style={st.topRow}>
          {onBack ? <button style={st.backBtn} onClick={onBack}>← Home</button> : <div />}
          <h1 style={st.title}>Islamic Bingo</h1>
          <div />
        </div>

        {/* Tabs */}
        <div style={st.tabs}>
          <button style={{ ...st.tab, ...(tab === "daily" ? st.tabActive : {}), ...(!isPremium ? { opacity: 0.5 } : {}) }} onClick={() => {
            if (!isPremium) {
              if (!user) signInWithGoogle();
              else window.open(`https://buy.stripe.com/aFaeVe2jt6Wb9IG3pi28800?client_reference_id=${user?.uid || 'guest'}`, '_blank');
              return;
            }
            setTab("daily");
          }}>
            ☀️ Daily {!isPremium && "🔒"}
          </button>
          <button style={{ ...st.tab, ...(tab === "weekly" ? st.tabActiveW : {}) }} onClick={() => setTab("weekly")}>
            📅 Weekly {!isPremium && "🆓"}
          </button>
        </div>

        {/* Premium upsell for daily */}
        {!isPremium && tab === "weekly" && (
          <div style={st.dailyLock}>
            <span style={st.dailyLockText}>☀️ Daily Bingo is a Premium feature — <strong style={{ color: "#FFD93D" }}>upgrade for $5/mo</strong> to unlock daily challenges</span>
          </div>
        )}

        {/* Info bar */}
        <div style={st.infoBar}>
          <span style={st.infoLabel}>
            {tab === "daily" ? `Today — ${dayId}` : `${weekId} • ${getDaysLeftInWeek()} days left`}
          </span>
          {streak > 0 && <span style={st.streakBadge}>🔥 {streak} {tab === "daily" ? "day" : "week"} streak</span>}
        </div>

        {/* Stats */}
        <div style={st.statsRow}>
          <div style={st.stat}>
            <span style={st.statNum}>{checked.length - 1}</span>
            <span style={st.statLbl}>Done</span>
          </div>
          <div style={st.statDiv} />
          <div style={st.stat}>
            <span style={{ ...st.statNum, color: bingos.length > 0 ? "#FFD93D" : "#F0E6D3" }}>{bingos.length}</span>
            <span style={st.statLbl}>Bingos</span>
          </div>
          <div style={st.statDiv} />
          <div style={st.stat}>
            <span style={st.statNum}>{8 - (checked.length - 1)}</span>
            <span style={st.statLbl}>Left</span>
          </div>
        </div>

        {/* Banners */}
        {isBlackout && (
          <div style={st.banner}>
            <span>🏆</span>
            <span style={{ color: "#FFD93D", fontWeight: 700, fontSize: "0.85rem" }}>BLACKOUT! All deeds done! MashaAllah!</span>
          </div>
        )}
        {bingos.length > 0 && !isBlackout && (
          <div style={{ ...st.banner, background: "rgba(52,211,153,0.08)", borderColor: "rgba(52,211,153,0.2)" }}>
            <span>🎉</span>
            <span style={{ color: "#34D399", fontWeight: 700, fontSize: "0.85rem" }}>
              {bingos.length} Bingo{bingos.length > 1 ? "s" : ""}! Keep going!
            </span>
          </div>
        )}

        {/* 3x3 Grid */}
        <div style={st.grid}>
          {grid.map((row, r) => row.map((cell, c) => {
            const pos = `${r}-${c}`;
            const done = checked.includes(pos);
            const inBingo = bingoLines.includes(pos);
            const popped = justChecked === pos;
            const isDaily = tab === "daily";
            const accent = isDaily ? "#34D399" : "#A78BFA";

            return (
              <button key={pos} style={{
                ...st.cell,
                background: done
                  ? cell.isFree ? "rgba(255,217,61,0.12)" : accent + "12"
                  : "rgba(255,255,255,0.02)",
                borderColor: done
                  ? inBingo ? "#FFD93D50" : accent + "30"
                  : "rgba(255,255,255,0.06)",
                transform: popped ? "scale(0.88)" : "scale(1)",
                boxShadow: inBingo && done ? `0 0 12px ${accent}25` : "none",
              }} onClick={() => tapCell(r, c)}>
                {done && !cell.isFree && <span style={st.checkIcon}>✓</span>}
                <span style={{ fontSize: cell.isFree ? "1.8rem" : "1.5rem", opacity: done && !cell.isFree ? 0.4 : 1, lineHeight: 1 }}>{cell.emoji}</span>
                <span style={{
                  ...st.cellText,
                  color: done ? accent : "rgba(240,230,211,0.6)",
                  textDecoration: done && !cell.isFree ? "line-through" : "none",
                  opacity: done && !cell.isFree ? 0.5 : 1,
                }}>{cell.text}</span>
              </button>
            );
          }))}
        </div>

        {/* Hint */}
        <p style={st.hint}>
          {tab === "daily"
            ? "Tap a deed when you've done it today. Resets tomorrow."
            : "Tap a deed when you've done it this week. Resets Monday."}
        </p>
        <p style={st.honor}>This is between you and Allah. Be honest.</p>

        {/* Share */}
        <button style={{
          ...st.shareBtn,
          background: tab === "daily" ? "rgba(52,211,153,0.08)" : "rgba(167,139,250,0.08)",
          borderColor: tab === "daily" ? "rgba(52,211,153,0.2)" : "rgba(167,139,250,0.2)",
          color: tab === "daily" ? "#34D399" : "#A78BFA",
        }} onClick={shareCard}>
          📤 Share My {tab === "daily" ? "Daily" : "Weekly"} Card
        </button>

        {/* Confirm Modal */}
        {confirm && (
          <div style={st.overlay} onClick={() => setConfirm(null)}>
            <div style={st.modal} onClick={e => e.stopPropagation()}>
              <span style={st.modalEmoji}>{confirm.deed.emoji}</span>
              <p style={st.modalText}>{confirm.deed.text}</p>
              <p style={st.modalSub}>Did you complete this deed?</p>
              <p style={st.modalHonor}>Between you and Allah 🤲</p>
              <div style={st.modalBtns}>
                <button style={st.cancelBtn} onClick={() => setConfirm(null)}>Not Yet</button>
                <button style={{
                  ...st.confirmBtn,
                  background: tab === "daily"
                    ? "linear-gradient(135deg, #34D399, #059669)"
                    : "linear-gradient(135deg, #A78BFA, #7C3AED)",
                }} onClick={confirmDeed}>Yes, Alhamdulillah ✓</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// STYLES
// ============================================
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Amiri:wght@400;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  body { background: #0A0F1C; }
  button { cursor: pointer; font-family: 'Outfit', sans-serif; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes popIn { from { opacity:0; transform:scale(0.85); } to { opacity:1; transform:scale(1); } }
  @keyframes glow { 0%,100%{box-shadow:0 0 8px rgba(255,217,61,0.2)} 50%{box-shadow:0 0 20px rgba(255,217,61,0.4)} }
  @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.03)} }
`;

const st = {
  wrap: {
    minHeight: "100vh",
    background: "linear-gradient(170deg, #0A0F1C 0%, #12102A 40%, #0D1B2A 70%, #0A0F1C 100%)",
    fontFamily: "'Outfit', sans-serif",
  },
  inner: { maxWidth: "420px", margin: "0 auto", padding: "1.25rem 1rem", minHeight: "100vh", display: "flex", flexDirection: "column" },

  topRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" },
  backBtn: { background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" },
  title: { fontFamily: "'Amiri', serif", fontSize: "1.6rem", color: "#F0E6D3", fontWeight: 700 },

  tabs: { display: "flex", gap: "0.5rem", marginBottom: "0.75rem" },
  tab: {
    flex: 1, padding: "0.65rem", borderRadius: "12px", fontSize: "0.85rem", fontWeight: 600,
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.35)", transition: "all 0.2s",
  },
  tabActive: { background: "rgba(52,211,153,0.1)", borderColor: "rgba(52,211,153,0.3)", color: "#34D399" },
  tabActiveW: { background: "rgba(167,139,250,0.1)", borderColor: "rgba(167,139,250,0.3)", color: "#A78BFA" },

  infoBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" },
  infoLabel: { fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", fontWeight: 500 },
  streakBadge: { fontSize: "0.7rem", color: "#FFD93D", fontWeight: 600, padding: "0.2rem 0.5rem", background: "rgba(255,217,61,0.08)", borderRadius: "10px" },

  statsRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: "1.25rem", marginBottom: "0.75rem", padding: "0.6rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.04)" },
  stat: { display: "flex", flexDirection: "column", alignItems: "center", gap: "0.1rem" },
  statNum: { fontSize: "1.4rem", fontWeight: 700, color: "#F0E6D3" },
  statLbl: { fontSize: "0.55rem", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em" },
  statDiv: { width: "1px", height: "24px", background: "rgba(255,255,255,0.06)" },

  banner: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
    padding: "0.6rem", background: "rgba(255,217,61,0.08)", border: "1px solid rgba(255,217,61,0.2)",
    borderRadius: "12px", marginBottom: "0.75rem", animation: "pulse 1.5s ease-in-out 2",
  },

  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px", marginBottom: "0.75rem" },
  cell: {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    aspectRatio: "1", borderRadius: "14px", border: "1.5px solid",
    padding: "6px", position: "relative", transition: "all 0.2s ease",
    gap: "4px",
  },
  checkIcon: { position: "absolute", top: "5px", right: "7px", fontSize: "0.65rem", color: "#34D399", fontWeight: 800 },
  cellText: { fontSize: "0.6rem", fontWeight: 600, textAlign: "center", lineHeight: 1.25, transition: "all 0.2s" },

  hint: { fontSize: "0.65rem", color: "rgba(255,255,255,0.2)", textAlign: "center", marginBottom: "0.15rem" },
  honor: { fontSize: "0.6rem", color: "rgba(255,217,61,0.3)", textAlign: "center", fontStyle: "italic", marginBottom: "0.75rem" },

  shareBtn: {
    width: "100%", padding: "0.75rem", borderRadius: "12px", border: "1px solid",
    fontSize: "0.85rem", fontWeight: 600, marginTop: "auto",
  },

  dailyLock: {
    padding: "0.5rem 0.75rem", borderRadius: "10px",
    background: "rgba(255,217,61,0.04)", border: "1px solid rgba(255,217,61,0.1)",
    marginBottom: "0.25rem",
  },
  dailyLockText: { fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 },

  // Modal
  overlay: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 100, padding: "1.5rem",
  },
  modal: {
    background: "#161B2E", borderRadius: "22px", padding: "2rem 1.5rem",
    maxWidth: "320px", width: "100%", textAlign: "center",
    border: "1px solid rgba(255,255,255,0.08)", animation: "popIn 0.2s ease-out",
  },
  modalEmoji: { fontSize: "3rem", display: "block", marginBottom: "0.75rem" },
  modalText: { fontFamily: "'Amiri', serif", fontSize: "1.2rem", color: "#F0E6D3", marginBottom: "0.75rem", lineHeight: 1.5 },
  modalSub: { fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.25rem" },
  modalHonor: { fontSize: "0.7rem", color: "rgba(255,217,61,0.4)", fontStyle: "italic", marginBottom: "1.5rem" },
  modalBtns: { display: "flex", gap: "0.6rem" },
  cancelBtn: {
    flex: 1, padding: "0.75rem", borderRadius: "12px",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", fontWeight: 600,
  },
  confirmBtn: {
    flex: 1.5, padding: "0.75rem", borderRadius: "12px", border: "none",
    color: "#0A0F1C", fontSize: "0.85rem", fontWeight: 700,
  },
};
