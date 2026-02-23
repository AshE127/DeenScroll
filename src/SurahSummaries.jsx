import { useState, useMemo } from "react";
import { useAuth } from "./AuthContext.jsx";

const SURAHS = [
  { num: 1, name: "Al-Fatiha", en: "The Opening", ayahs: 7, type: "Meccan", summary: "The foundation of every prayer. It praises Allah, affirms His sovereignty, and asks for guidance to the straight path. Known as the 'Mother of the Quran' (Umm al-Quran).", themes: ["Praise", "Guidance", "Worship"] },
  { num: 2, name: "Al-Baqarah", en: "The Cow", ayahs: 286, type: "Medinan", summary: "The longest surah, covering laws of worship, social conduct, and stories of past nations. Includes Ayatul Kursi (2:255), the greatest verse.", themes: ["Law", "Guidance", "Stories", "Faith"] },
  { num: 3, name: "Ali 'Imran", en: "The Family of Imran", ayahs: 200, type: "Medinan", summary: "Discusses the family of Maryam, the birth of Isa, and the Battle of Uhud. Emphasizes steadfastness in faith.", themes: ["Isa (Jesus)", "Patience", "Battle of Uhud"] },
  { num: 4, name: "An-Nisa", en: "The Women", ayahs: 176, type: "Medinan", summary: "Addresses women's rights, inheritance laws, marriage regulations, and justice for orphans.", themes: ["Women's Rights", "Inheritance", "Justice"] },
  { num: 5, name: "Al-Ma'idah", en: "The Table Spread", ayahs: 120, type: "Medinan", summary: "Covers dietary laws, criminal justice, and completing the religion. Contains: 'Today I have perfected your religion for you.'", themes: ["Halal & Haram", "Justice", "Covenants"] },
  { num: 6, name: "Al-An'am", en: "The Cattle", ayahs: 165, type: "Meccan", summary: "Focuses on Tawheed and refutes polytheism. Discusses Allah's creation, the stories of prophets, and the futility of idol worship.", themes: ["Tawheed", "Creation", "Prophets"] },
  { num: 7, name: "Al-A'raf", en: "The Heights", ayahs: 206, type: "Meccan", summary: "Named after the barrier between Paradise and Hell. Recounts stories of Adam, Nuh, Hud, Salih, Lut, Shu'ayb, and Musa.", themes: ["Prophets", "History", "Consequences"] },
  { num: 8, name: "Al-Anfal", en: "The Spoils of War", ayahs: 75, type: "Medinan", summary: "Revealed after the Battle of Badr. Discusses distribution of war spoils, ethics of warfare, and trust in Allah.", themes: ["Battle of Badr", "Trust in Allah", "Ethics of War"] },
  { num: 9, name: "At-Tawbah", en: "The Repentance", ayahs: 129, type: "Medinan", summary: "The only surah without Bismillah. Deals with treaties, the expedition to Tabuk, and exposes hypocrites.", themes: ["Repentance", "Hypocrisy", "Jihad"] },
  { num: 10, name: "Yunus", en: "Jonah", ayahs: 109, type: "Meccan", summary: "Named after Prophet Yunus. Emphasizes that the Quran is from Allah and discusses fate and free will.", themes: ["Faith", "Quran's Origin", "Prophet Yunus"] },
  { num: 11, name: "Hud", en: "Hud", ayahs: 123, type: "Meccan", summary: "Contains stories of Nuh, Hud, Salih, Ibrahim, Lut, and Shu'ayb — all warning about rejecting messengers.", themes: ["Prophets", "Warnings", "Patience"] },
  { num: 12, name: "Yusuf", en: "Joseph", ayahs: 111, type: "Meccan", summary: "The most detailed narrative in the Quran — Prophet Yusuf from childhood dream to becoming a leader in Egypt.", themes: ["Patience", "Dreams", "Forgiveness", "Trust in Allah"] },
  { num: 13, name: "Ar-Ra'd", en: "The Thunder", ayahs: 43, type: "Medinan", summary: "Named after thunder that glorifies Allah. Discusses signs in nature and the contrast between truth and falsehood.", themes: ["Signs in Nature", "Truth vs Falsehood", "Allah's Power"] },
  { num: 14, name: "Ibrahim", en: "Abraham", ayahs: 52, type: "Meccan", summary: "Contains Ibrahim's famous dua for Makkah and his children. Discusses gratitude and consequences of ingratitude.", themes: ["Gratitude", "Ibrahim's Duas", "Prophets"] },
  { num: 15, name: "Al-Hijr", en: "The Rocky Tract", ayahs: 99, type: "Meccan", summary: "Contains the promise of Quran's preservation (15:9), the story of Iblis, and stories of destroyed nations.", themes: ["Quran Preservation", "Iblis", "Destroyed Nations"] },
  { num: 16, name: "An-Nahl", en: "The Bee", ayahs: 128, type: "Meccan", summary: "Named after the bee whose honey heals. Catalogues Allah's countless blessings. Calls for gratitude and justice.", themes: ["Blessings", "Gratitude", "Nature"] },
  { num: 17, name: "Al-Isra", en: "The Night Journey", ayahs: 111, type: "Meccan", summary: "Opens with the Night Journey from Makkah to Jerusalem. Contains a comprehensive code of ethics.", themes: ["Night Journey", "Ethics", "Bani Isra'il"] },
  { num: 18, name: "Al-Kahf", en: "The Cave", ayahs: 110, type: "Meccan", summary: "Four powerful stories: People of the Cave, two gardens, Musa and Khidr, Dhul-Qarnayn. Read on Fridays.", themes: ["Faith Trials", "Wealth", "Knowledge", "Power"] },
  { num: 19, name: "Maryam", en: "Mary", ayahs: 98, type: "Meccan", summary: "The miraculous birth of Yahya and Isa. Emphasizes Allah's mercy and the stories of several prophets.", themes: ["Mercy", "Miracles", "Prophets"] },
  { num: 20, name: "Ta-Ha", en: "Ta-Ha", ayahs: 135, type: "Meccan", summary: "Detailed account of Musa — the burning bush, confronting Pharaoh, the golden calf. The Quran is not meant to cause distress.", themes: ["Musa", "Pharaoh", "Reassurance"] },
  { num: 21, name: "Al-Anbiya", en: "The Prophets", ayahs: 112, type: "Meccan", summary: "Mentions more prophets than almost any other surah. Emphasizes their shared message of Tawheed.", themes: ["Prophets", "Tawheed", "Day of Judgment"] },
  { num: 22, name: "Al-Hajj", en: "The Pilgrimage", ayahs: 78, type: "Medinan", summary: "Describes Hajj rituals, the Day of Judgment's earthquake, and permission for self-defense. Has two sajdahs.", themes: ["Hajj", "Day of Judgment", "Self-Defense"] },
  { num: 23, name: "Al-Mu'minun", en: "The Believers", ayahs: 118, type: "Meccan", summary: "Opens with qualities of successful believers: humility in prayer, avoiding vain talk, paying zakat.", themes: ["Qualities of Believers", "Success", "Prophets"] },
  { num: 24, name: "An-Nur", en: "The Light", ayahs: 64, type: "Medinan", summary: "Contains the 'Light Verse' (24:35). Establishes laws on modesty, hijab, slander, and lowering the gaze.", themes: ["Modesty", "Light of Allah", "Social Laws"] },
  { num: 25, name: "Al-Furqan", en: "The Criterion", ayahs: 77, type: "Meccan", summary: "Describes the qualities of 'Servants of the Most Merciful' — humble, peaceful, moderate, and devoted.", themes: ["Right vs Wrong", "Qualities of the Righteous", "Prophethood"] },
  { num: 26, name: "Ash-Shu'ara", en: "The Poets", ayahs: 227, type: "Meccan", summary: "Stories of Musa, Ibrahim, Nuh, Hud, Salih, Lut, Shu'ayb. Distinguishes idle poets from divine truth.", themes: ["Prophets", "Truth vs Poetry", "Warnings"] },
  { num: 27, name: "An-Naml", en: "The Ant", ayahs: 93, type: "Meccan", summary: "The ant warning its colony about Sulayman. Features Sulayman, Queen of Sheba, and Musa.", themes: ["Sulayman", "Queen of Sheba", "Signs in Nature"] },
  { num: 28, name: "Al-Qasas", en: "The Stories", ayahs: 88, type: "Meccan", summary: "Most detailed account of Musa's early life. Also tells Qarun's wealth and downfall.", themes: ["Musa's Life", "Qarun", "Allah's Plan"] },
  { num: 29, name: "Al-Ankabut", en: "The Spider", ayahs: 69, type: "Meccan", summary: "False deities compared to a spider's web. Discusses trials as tests of faith and encourages perseverance.", themes: ["Trials", "False Worship", "Perseverance"] },
  { num: 30, name: "Ar-Rum", en: "The Romans", ayahs: 60, type: "Meccan", summary: "Prophecy about Romans defeating Persians — which came true. Signs of Allah in creation.", themes: ["Prophecy", "Signs of Allah", "Civilizations"] },
  { num: 31, name: "Luqman", en: "Luqman", ayahs: 34, type: "Meccan", summary: "Luqman's timeless advice to his son: Tawheed, honor parents, pray, enjoin good, forbid evil, be patient.", themes: ["Wisdom", "Parenting", "Advice"] },
  { num: 32, name: "As-Sajdah", en: "The Prostration", ayahs: 30, type: "Meccan", summary: "Creation, resurrection, believers vs disbelievers. The Prophet ﷺ recited it every Friday Fajr.", themes: ["Creation", "Resurrection", "Friday Surah"] },
  { num: 33, name: "Al-Ahzab", en: "The Combined Forces", ayahs: 73, type: "Medinan", summary: "Battle of the Trench, laws for the Prophet's household, the verse of hijab, social reforms.", themes: ["Battle of Trench", "Hijab", "Prophet's Household"] },
  { num: 34, name: "Saba", en: "Sheba", ayahs: 54, type: "Meccan", summary: "The kingdom of Sheba's blessings and destruction due to ingratitude. Dawud and Sulayman.", themes: ["Sheba", "Gratitude", "Dawud & Sulayman"] },
  { num: 35, name: "Fatir", en: "The Originator", ayahs: 45, type: "Meccan", summary: "Allah the Creator of heavens, earth, and angels with wings. Contrasts blind and seeing, darkness and light.", themes: ["Creation", "Angels", "Contrasts"] },
  { num: 36, name: "Ya-Sin", en: "Ya-Sin", ayahs: 83, type: "Meccan", summary: "The 'Heart of the Quran.' Resurrection, signs of Allah, fate of those who reject. Recited for the deceased.", themes: ["Resurrection", "Signs of Allah", "Prophethood"] },
  { num: 37, name: "As-Saffat", en: "Those in Ranks", ayahs: 182, type: "Meccan", summary: "Angels in rows. Stories of Nuh, Ibrahim's sacrifice, Musa, Harun, Ilyas, Lut, Yunus.", themes: ["Angels", "Ibrahim's Sacrifice", "Prophets"] },
  { num: 38, name: "Sad", en: "Sad", ayahs: 88, type: "Meccan", summary: "Dawud's justice, Sulayman's kingdom, Ayyub's patience, Iblis refusing to prostrate to Adam.", themes: ["Dawud", "Sulayman", "Ayyub", "Iblis"] },
  { num: 39, name: "Az-Zumar", en: "The Crowds", ayahs: 75, type: "Meccan", summary: "Sincerity in worship. People driven to Paradise or Hell in crowds. 'Do not despair of Allah's mercy.'", themes: ["Sincerity", "Tawheed", "Mercy"] },
  { num: 40, name: "Ghafir", en: "The Forgiver", ayahs: 85, type: "Meccan", summary: "A secret believer in Pharaoh's family defends Musa. Allah's forgiveness and fate of the arrogant.", themes: ["Forgiveness", "Secret Believer", "Pharaoh"] },
  { num: 41, name: "Fussilat", en: "Explained in Detail", ayahs: 54, type: "Meccan", summary: "The Quran explained in detail. Creation in six periods. Your own skin testifies on Judgment Day.", themes: ["Quran", "Creation", "Good vs Evil"] },
  { num: 42, name: "Ash-Shura", en: "The Consultation", ayahs: 53, type: "Meccan", summary: "The principle of shura. Unity of religion across prophets. Decision-making through consultation.", themes: ["Consultation", "Unity of Religion", "Revelation"] },
  { num: 43, name: "Az-Zukhruf", en: "The Gold Adornment", ayahs: 89, type: "Meccan", summary: "Don't be deceived by worldly wealth. Refutes Isa's divinity. Real value lies in faith.", themes: ["Wealth", "Isa", "True Value"] },
  { num: 44, name: "Ad-Dukhan", en: "The Smoke", ayahs: 59, type: "Meccan", summary: "Smoke as a sign before Judgment Day. Pharaoh's destruction. Punishment for the arrogant.", themes: ["Day of Judgment", "Pharaoh", "Signs"] },
  { num: 45, name: "Al-Jathiyah", en: "The Kneeling", ayahs: 37, type: "Meccan", summary: "All nations kneeling before Allah on Judgment Day. Signs in creation. Warning to mockers of truth.", themes: ["Judgment Day", "Signs of Allah", "Accountability"] },
  { num: 46, name: "Al-Ahqaf", en: "The Sand Dunes", ayahs: 35, type: "Meccan", summary: "Kindness to parents. Jinn who accepted Islam after hearing the Quran. The people of 'Ad.", themes: ["Parents", "Jinn", "People of 'Ad"] },
  { num: 47, name: "Muhammad", en: "Muhammad", ayahs: 38, type: "Medinan", summary: "The only surah named after the Prophet ﷺ. Rules of warfare, supporting Allah's cause, exposing hypocrites.", themes: ["Prophet Muhammad", "Warfare", "Hypocrisy"] },
  { num: 48, name: "Al-Fath", en: "The Victory", ayahs: 29, type: "Medinan", summary: "Treaty of Hudaybiyyah — seemed like setback, was a clear victory. Promises future conquests.", themes: ["Victory", "Treaty of Hudaybiyyah", "Companions"] },
  { num: 49, name: "Al-Hujurat", en: "The Rooms", ayahs: 18, type: "Medinan", summary: "Social etiquette manual. Verify news, no mockery or backbiting. Most honored = most righteous.", themes: ["Etiquette", "Brotherhood", "Equality"] },
  { num: 50, name: "Qaf", en: "Qaf", ayahs: 45, type: "Meccan", summary: "Resurrection and afterlife. Allah is closer than your jugular vein (50:16). The recording angels.", themes: ["Resurrection", "Allah's Nearness", "Recording Angels"] },
  { num: 51, name: "Adh-Dhariyat", en: "The Winds", ayahs: 60, type: "Meccan", summary: "Ibrahim's guests, destruction of past nations. Jinn and humans created only to worship Allah.", themes: ["Worship", "Prophets", "Purpose of Creation"] },
  { num: 52, name: "At-Tur", en: "The Mount", ayahs: 49, type: "Meccan", summary: "Mount Sinai. Bliss of Paradise. Challenges disbelievers to produce something like the Quran.", themes: ["Mount Sinai", "Paradise", "Patience"] },
  { num: 53, name: "An-Najm", en: "The Star", ayahs: 62, type: "Meccan", summary: "The Prophet's ﷺ Mi'raj. Jibreel in true form. Refutes worship of Al-Lat, Al-Uzza, Manat.", themes: ["Mi'raj", "Jibreel", "False Idols"] },
  { num: 54, name: "Al-Qamar", en: "The Moon", ayahs: 55, type: "Meccan", summary: "Splitting of the moon. 'We have made the Quran easy to remember' — repeated four times.", themes: ["Miracles", "Quran Easy to Remember", "Destroyed Nations"] },
  { num: 55, name: "Ar-Rahman", en: "The Most Merciful", ayahs: 78, type: "Medinan", summary: "The 'Beauty of the Quran.' 'Which of the favors of your Lord would you deny?' Paradise described.", themes: ["Gratitude", "Blessings", "Paradise"] },
  { num: 56, name: "Al-Waqi'ah", en: "The Event", ayahs: 96, type: "Meccan", summary: "Three groups: forerunners, people of the right, people of the left. Reciting it prevents poverty.", themes: ["Day of Judgment", "Provision", "Afterlife"] },
  { num: 57, name: "Al-Hadid", en: "The Iron", ayahs: 29, type: "Medinan", summary: "Iron 'sent down' by Allah. Spend in Allah's cause. Worldly life vs Hereafter.", themes: ["Iron", "Charity", "Worldly vs Hereafter"] },
  { num: 58, name: "Al-Mujadila", en: "The Pleading Woman", ayahs: 22, type: "Medinan", summary: "A woman's complaint about unjust divorce — Allah heard her. Rules against secret conspiracies.", themes: ["Women's Rights", "Justice", "Etiquette"] },
  { num: 59, name: "Al-Hashr", en: "The Gathering", ayahs: 24, type: "Medinan", summary: "Exile of Banu Nadir. Ends with the most beautiful names of Allah (59:22-24).", themes: ["Names of Allah", "Banu Nadir", "Hereafter"] },
  { num: 60, name: "Al-Mumtahina", en: "The Examined Woman", ayahs: 13, type: "Medinan", summary: "Relations with non-Muslims during conflict. Examination of emigrant women to Madinah.", themes: ["Alliances", "Emigration", "Relations with Non-Muslims"] },
  { num: 61, name: "As-Saff", en: "The Ranks", ayahs: 14, type: "Medinan", summary: "Stand united. Isa prophesied the coming of Ahmad (Muhammad ﷺ). Don't say what you don't do.", themes: ["Unity", "Isa's Prophecy", "Sincerity"] },
  { num: 62, name: "Al-Jumu'ah", en: "Friday", ayahs: 11, type: "Medinan", summary: "Friday prayer obligation. Don't leave the sermon for trade. The Prophet ﷺ as teacher.", themes: ["Friday Prayer", "Knowledge", "Trade vs Worship"] },
  { num: 63, name: "Al-Munafiqun", en: "The Hypocrites", ayahs: 11, type: "Medinan", summary: "Exposing hypocrites in Madinah. Their appearances deceive but Allah knows what they conceal.", themes: ["Hypocrisy", "Deception", "Charity"] },
  { num: 64, name: "At-Taghabun", en: "Mutual Loss & Gain", ayahs: 18, type: "Medinan", summary: "Day of mutual loss and gain. Wealth and children can be trials. Fear Allah, give charity.", themes: ["Trials", "Charity", "Day of Judgment"] },
  { num: 65, name: "At-Talaq", en: "The Divorce", ayahs: 12, type: "Medinan", summary: "Detailed divorce rules — waiting periods, housing, maintenance. Fear Allah and trust His provision.", themes: ["Divorce", "Taqwa", "Allah's Provision"] },
  { num: 66, name: "At-Tahrim", en: "The Prohibition", ayahs: 12, type: "Medinan", summary: "Incident in Prophet's ﷺ household. Examples: righteous women (Maryam, Pharaoh's wife) vs wicked.", themes: ["Family", "Righteous Women", "Repentance"] },
  { num: 67, name: "Al-Mulk", en: "The Sovereignty", ayahs: 30, type: "Meccan", summary: "Allah's dominion. Life and death as a test. Intercedes for its reader. Recite before sleeping.", themes: ["Sovereignty", "Life as Test", "Protection"] },
  { num: 68, name: "Al-Qalam", en: "The Pen", ayahs: 52, type: "Meccan", summary: "Oath by the pen. Defends Prophet's ﷺ character. Story of garden owners who refused to share.", themes: ["The Pen", "Good Character", "Generosity"] },
  { num: 69, name: "Al-Haqqah", en: "The Inevitable", ayahs: 52, type: "Meccan", summary: "Judgment Day as inevitable reality. Destruction of Thamud, 'Ad, Pharaoh. Record books right or left.", themes: ["Day of Judgment", "Destroyed Nations", "Record Books"] },
  { num: 70, name: "Al-Ma'arij", en: "The Ascending Ways", ayahs: 44, type: "Meccan", summary: "Angels ascending to Allah. Human impatience. Qualities of those who enter Paradise.", themes: ["Angels", "Human Nature", "Paradise"] },
  { num: 71, name: "Nuh", en: "Noah", ayahs: 28, type: "Meccan", summary: "Entirely about Prophet Nuh's centuries-long mission. His patient calling, their rejection, his final prayer.", themes: ["Nuh", "Da'wah", "Patience", "The Flood"] },
  { num: 72, name: "Al-Jinn", en: "The Jinn", ayahs: 28, type: "Meccan", summary: "Jinn who heard the Quran and accepted Islam. They have free will. Only Allah knows the unseen.", themes: ["Jinn", "Unseen", "Faith"] },
  { num: 73, name: "Al-Muzzammil", en: "The Wrapped One", ayahs: 20, type: "Meccan", summary: "Stand in night prayer (tahajjud). Recite Quran slowly. The spiritual power of night worship.", themes: ["Night Prayer", "Quran Recitation", "Spiritual Devotion"] },
  { num: 74, name: "Al-Muddathir", en: "The Cloaked One", ayahs: 56, type: "Meccan", summary: "Rise and warn humanity. One of the earliest revelations. 19 angels guarding Hell.", themes: ["Early Revelation", "Warning", "Hellfire"] },
  { num: 75, name: "Al-Qiyamah", en: "The Resurrection", ayahs: 40, type: "Meccan", summary: "Resurrection in vivid detail. Moon eclipsed, no refuge. Allah swears by the self-reproaching soul.", themes: ["Resurrection", "Conscience", "Accountability"] },
  { num: 76, name: "Al-Insan", en: "Man", ayahs: 31, type: "Medinan", summary: "Human creation. Paradise for the righteous — silk, silver, spring of Salsabil. Friday Fajr surah.", themes: ["Creation", "Paradise", "Righteous Deeds"] },
  { num: 77, name: "Al-Mursalat", en: "Those Sent Forth", ayahs: 50, type: "Meccan", summary: "Oaths by the winds. 'Woe that Day to the deniers!' — repeated throughout.", themes: ["Day of Judgment", "Warnings", "Denial"] },
  { num: 78, name: "An-Naba", en: "The News", ayahs: 40, type: "Meccan", summary: "Opens Juz' Amma. The great news of resurrection. Signs of Allah's power as proof.", themes: ["Resurrection", "Signs in Creation"] },
  { num: 79, name: "An-Nazi'at", en: "Those Who Pull Out", ayahs: 46, type: "Meccan", summary: "Angels extracting souls. Musa and Pharaoh. 'Are you harder to create, or the heaven?'", themes: ["Angels", "Musa & Pharaoh", "Resurrection"] },
  { num: 80, name: "Abasa", en: "He Frowned", ayahs: 42, type: "Meccan", summary: "Prophet ﷺ frowned at a blind man. Spiritual worth matters more than social status.", themes: ["Humility", "Equality", "Spiritual Worth"] },
  { num: 81, name: "At-Takwir", en: "The Folding Up", ayahs: 29, type: "Meccan", summary: "Sun folded, stars scattered, mountains moved, seas on fire. Quran brought by Jibreel.", themes: ["Day of Judgment", "Cosmic Events", "Jibreel"] },
  { num: 82, name: "Al-Infitar", en: "The Cleaving", ayahs: 19, type: "Meccan", summary: "Sky splitting. Angels recording everything. 'What has deceived you about your Lord?'", themes: ["Day of Judgment", "Recording Angels", "Self-Deception"] },
  { num: 83, name: "Al-Mutaffifin", en: "The Defrauders", ayahs: 36, type: "Meccan", summary: "Warning to cheaters in weights. Record books: wicked in Sijjin, righteous in Illiyyun.", themes: ["Honesty", "Cheating", "Record Books"] },
  { num: 84, name: "Al-Inshiqaq", en: "The Splitting", ayahs: 25, type: "Meccan", summary: "Sky splitting, earth stretching. Books in right hand or behind back. Life journeys back to Allah.", themes: ["Day of Judgment", "Journey to Allah", "Record Books"] },
  { num: 85, name: "Al-Buruj", en: "The Great Stars", ayahs: 22, type: "Meccan", summary: "People of the Trench — believers burned alive for faith. Allah's knowledge and Quran's preservation.", themes: ["Persecution", "Faith Under Trial", "Allah's Knowledge"] },
  { num: 86, name: "At-Tariq", en: "The Night Visitor", ayahs: 17, type: "Meccan", summary: "The pulsating star. Humble creation from fluid. Allah can bring you back. Quran is decisive.", themes: ["Stars", "Creation", "Quran as Decisive"] },
  { num: 87, name: "Al-A'la", en: "The Most High", ayahs: 19, type: "Meccan", summary: "Glorify Allah. The ease He provides. Earlier scriptures of Ibrahim and Musa. Eid/Friday surah.", themes: ["Glorification", "Ease", "Earlier Scriptures"] },
  { num: 88, name: "Al-Ghashiyah", en: "The Overwhelming", ayahs: 26, type: "Meccan", summary: "Overwhelming Judgment Day. Humiliated vs joyful faces. Camel, sky, mountains, earth as signs.", themes: ["Day of Judgment", "Signs in Creation", "Paradise & Hell"] },
  { num: 89, name: "Al-Fajr", en: "The Dawn", ayahs: 30, type: "Meccan", summary: "Oath by dawn. 'Ad, Thamud, Pharaoh destroyed. Excessive love of wealth criticized. Soul at peace returns to Allah.", themes: ["Dawn", "Destroyed Nations", "Soul at Peace"] },
  { num: 90, name: "Al-Balad", en: "The City", ayahs: 20, type: "Meccan", summary: "Oath by Makkah. Life is struggle. Steep path: free slaves, feed the hungry, be patient.", themes: ["Makkah", "Struggle", "Compassion"] },
  { num: 91, name: "Ash-Shams", en: "The Sun", ayahs: 15, type: "Meccan", summary: "Oaths by sun, moon, day, night. Success = purifying the soul. Thamud killed the she-camel.", themes: ["Soul Purification", "Oaths", "Thamud"] },
  { num: 92, name: "Al-Layl", en: "The Night", ayahs: 21, type: "Meccan", summary: "Generous and God-fearing = eased toward ease. Stingy and denying = eased toward hardship.", themes: ["Generosity", "Night", "Ease vs Hardship"] },
  { num: 93, name: "Ad-Duha", en: "The Morning Hours", ayahs: 11, type: "Meccan", summary: "Comfort during paused revelation. Allah has not abandoned you. Beautiful reminder during hardship.", themes: ["Comfort", "Hope", "Gratitude"] },
  { num: 94, name: "Ash-Sharh", en: "The Relief", ayahs: 8, type: "Meccan", summary: "Allah expanded his chest, removed his burden, raised his mention. 'With hardship comes ease' — twice.", themes: ["Relief", "Hardship & Ease", "Gratitude"] },
  { num: 95, name: "At-Tin", en: "The Fig", ayahs: 8, type: "Meccan", summary: "By the fig, olive, Sinai, Makkah. Humans created in best form but can sink lowest without faith.", themes: ["Human Creation", "Best Form", "Faith & Deeds"] },
  { num: 96, name: "Al-Alaq", en: "The Clot", ayahs: 19, type: "Meccan", summary: "First revelation. 'Iqra!' (Read!). Importance of knowledge and reading. Warning against arrogance.", themes: ["First Revelation", "Knowledge", "Humility"] },
  { num: 97, name: "Al-Qadr", en: "The Night of Power", ayahs: 5, type: "Meccan", summary: "Laylatul Qadr — better than a thousand months. Quran first revealed. Angels descend with peace.", themes: ["Laylatul Qadr", "Quran Revelation", "Peace"] },
  { num: 98, name: "Al-Bayyinah", en: "The Clear Evidence", ayahs: 8, type: "Medinan", summary: "Clear evidence came — the Prophet ﷺ reciting purified scriptures. Best and worst of creation.", themes: ["Clear Evidence", "People of the Book", "Best of Creation"] },
  { num: 99, name: "Az-Zalzalah", en: "The Earthquake", ayahs: 8, type: "Medinan", summary: "Earth reveals everything on Judgment Day. An atom's weight of good or evil — you will see it.", themes: ["Earthquake", "Accountability", "Atom's Weight"] },
  { num: 100, name: "Al-Adiyat", en: "The War Horses", ayahs: 11, type: "Meccan", summary: "Oaths by charging horses. Human ingratitude and love of wealth. Graves scattered, secrets exposed.", themes: ["War Horses", "Ingratitude", "Day of Judgment"] },
  { num: 101, name: "Al-Qari'ah", en: "The Striking Hour", ayahs: 11, type: "Meccan", summary: "People like scattered moths, mountains like wool. Heavy scales = bliss, light scales = the Abyss.", themes: ["Day of Judgment", "Scales of Deeds", "Calamity"] },
  { num: 102, name: "At-Takathur", en: "The Rivalry", ayahs: 8, type: "Meccan", summary: "Competition for wealth distracts until death. You will see Hell and be questioned about every blessing.", themes: ["Materialism", "Distraction", "Accountability"] },
  { num: 103, name: "Al-Asr", en: "The Declining Day", ayahs: 3, type: "Meccan", summary: "Imam Shafi'i said this alone would suffice. Formula for success: faith, good deeds, truth, patience.", themes: ["Time", "Success", "Faith & Action"] },
  { num: 104, name: "Al-Humazah", en: "The Slanderer", ayahs: 9, type: "Meccan", summary: "Warning to mockers and wealth hoarders. Al-Hutamah — the Crusher — a fire consuming hearts.", themes: ["Slander", "Wealth Hoarding", "Hellfire"] },
  { num: 105, name: "Al-Fil", en: "The Elephant", ayahs: 5, type: "Meccan", summary: "Abraha's army destroyed trying to demolish the Ka'bah. Birds with stones of baked clay.", themes: ["Ka'bah", "Abraha", "Allah's Protection"] },
  { num: 106, name: "Quraysh", en: "Quraysh", ayahs: 4, type: "Meccan", summary: "Safe trade journeys winter and summer. Worship the Lord of the Ka'bah who feeds and secures.", themes: ["Quraysh", "Blessings", "Worship"] },
  { num: 107, name: "Al-Ma'un", en: "Small Kindnesses", ayahs: 7, type: "Meccan", summary: "Praying for show but denying the needy. Denying religion = pushing away orphans, not feeding the poor.", themes: ["Hypocrisy", "Charity", "Orphans"] },
  { num: 108, name: "Al-Kawthar", en: "The Abundance", ayahs: 3, type: "Meccan", summary: "Shortest surah. Al-Kawthar — river in Paradise. Pray and sacrifice. His enemy is the one cut off.", themes: ["Abundance", "Prayer", "River of Paradise"] },
  { num: 109, name: "Al-Kafirun", en: "The Disbelievers", ayahs: 6, type: "Meccan", summary: "'You have your religion, and I have mine.' Religious freedom. Faith cannot be forced.", themes: ["Religious Freedom", "Tolerance", "Firm Faith"] },
  { num: 110, name: "An-Nasr", en: "The Divine Support", ayahs: 3, type: "Medinan", summary: "Last surah revealed. Victory, conquest of Makkah. Seek forgiveness. Hinted at Prophet's ﷺ departure.", themes: ["Victory", "Conquest of Makkah", "Seeking Forgiveness"] },
  { num: 111, name: "Al-Masad", en: "The Palm Fiber", ayahs: 5, type: "Meccan", summary: "Abu Lahab and wife condemned for opposing Islam. Wealth won't save them. Rope of palm fiber.", themes: ["Abu Lahab", "Opposition to Islam", "Consequence"] },
  { num: 112, name: "Al-Ikhlas", en: "The Sincerity", ayahs: 4, type: "Meccan", summary: "Pure Tawheed in four verses. Equals one-third of the Quran. Allah is One, Eternal, no equal.", themes: ["Tawheed", "Oneness of Allah"] },
  { num: 113, name: "Al-Falaq", en: "The Daybreak", ayahs: 5, type: "Meccan", summary: "Protective surah. Refuge from evil of creation, darkness, sorcery, and envy. Morning and evening.", themes: ["Protection", "Refuge in Allah"] },
  { num: 114, name: "An-Nas", en: "Mankind", ayahs: 6, type: "Meccan", summary: "Final surah. Refuge from whispers of Shaytan. Recited with Al-Falaq for daily protection.", themes: ["Protection", "Shaytan", "Refuge in Allah"] },
];

export default function SurahSummaries({ onBack }) {
  const { isPremium } = useAuth();
  const [mode, setMode] = useState("browse");
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

        <p style={st.subtitle}>All {SURAHS.length} surahs with summaries, themes & context</p>

        <input
          style={st.search}
          placeholder="Search by name, number, or theme..."
          value={search}
          onChange={e => { setSearch(e.target.value); setSelected(null); setMode("browse"); }}
        />

        {mode === "random" && selected && (
          <div style={st.randomCard}>
            <div style={st.randomHeader}>
              <span style={st.randomLabel}>🎲 Random Surah</span>
              <button style={st.randomAgain} onClick={randomSurah}>Another →</button>
            </div>
            <SurahCard s={selected} />
          </div>
        )}

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
