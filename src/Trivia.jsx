import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "./AuthContext.jsx";

// ============================================
// QUESTION BANK - 180+ questions across 6 categories
// ============================================
const QUESTIONS = [
  // ===== QURAN =====
  { id: "q1", cat: "Quran", q: "How many surahs are in the Quran?", opts: ["114", "120", "99", "110"], ans: 0, info: "The Quran contains 114 surahs, revealed over approximately 23 years." },
  { id: "q2", cat: "Quran", q: "What is the longest surah in the Quran?", opts: ["Al-Imran", "Al-Baqarah", "An-Nisa", "Al-Ma'idah"], ans: 1, info: "Surah Al-Baqarah has 286 verses, making it the longest surah." },
  { id: "q3", cat: "Quran", q: "What is the shortest surah in the Quran?", opts: ["Al-Asr", "Al-Kawthar", "Al-Ikhlas", "An-Nas"], ans: 1, info: "Surah Al-Kawthar has only 3 verses." },
  { id: "q4", cat: "Quran", q: "In which surah is Ayatul Kursi found?", opts: ["Al-Imran", "Al-Baqarah", "An-Nisa", "Al-Ma'idah"], ans: 1, info: "Ayatul Kursi is verse 255 of Surah Al-Baqarah." },
  { id: "q5", cat: "Quran", q: "Which surah is known as the 'Heart of the Quran'?", opts: ["Al-Mulk", "Ar-Rahman", "Ya-Sin", "Al-Waqi'ah"], ans: 2, info: "The Prophet ﷺ referred to Surah Ya-Sin as the heart of the Quran." },
  { id: "q6", cat: "Quran", q: "How many juz (parts) is the Quran divided into?", opts: ["25", "30", "28", "32"], ans: 1, info: "The Quran is divided into 30 equal parts called juz." },
  { id: "q7", cat: "Quran", q: "Which surah begins with 'Alif Lam Mim'?", opts: ["Al-Fatiha", "Al-Baqarah", "Al-Ikhlas", "An-Nas"], ans: 1, info: "Al-Baqarah is one of several surahs beginning with these letters." },
  { id: "q8", cat: "Quran", q: "What was the first word revealed of the Quran?", opts: ["Bismillah", "Alhamdulillah", "Iqra", "Qul"], ans: 2, info: "'Iqra' means 'Read' — the first revelation to Prophet Muhammad ﷺ." },
  { id: "q9", cat: "Quran", q: "Which surah is recited in every unit of prayer?", opts: ["Al-Ikhlas", "Al-Fatiha", "Al-Falaq", "An-Nas"], ans: 1, info: "Al-Fatiha is obligatory in every rak'ah of salah." },
  { id: "q10", cat: "Quran", q: "Which surah is named after a day of the week?", opts: ["Al-Jumu'ah", "Al-Qadr", "Al-Asr", "Al-Fajr"], ans: 0, info: "Al-Jumu'ah means 'Friday' — the blessed day for Muslims." },
  { id: "q11", cat: "Quran", q: "How many times is the name 'Muhammad' mentioned in the Quran?", opts: ["4", "7", "10", "25"], ans: 0, info: "The name Muhammad appears 4 times in the Quran." },
  { id: "q12", cat: "Quran", q: "Which surah mentions the story of the People of the Cave?", opts: ["Al-Kahf", "Al-Hijr", "Al-Anbiya", "Taha"], ans: 0, info: "Surah Al-Kahf (The Cave) tells the story of youth who slept for centuries." },
  { id: "q13", cat: "Quran", q: "Which surah is equivalent to one-third of the Quran in reward?", opts: ["Al-Fatiha", "Al-Falaq", "Al-Ikhlas", "Ya-Sin"], ans: 2, info: "The Prophet ﷺ said reciting Al-Ikhlas equals one-third of the Quran." },
  { id: "q14", cat: "Quran", q: "In which city was the majority of the Quran revealed?", opts: ["Madinah", "Makkah", "Ta'if", "Jerusalem"], ans: 1, info: "About 86 of the 114 surahs were revealed in Makkah." },
  { id: "q15", cat: "Quran", q: "Which surah was revealed completely at once?", opts: ["Al-Baqarah", "Al-Fatiha", "Al-An'am", "Al-Mulk"], ans: 2, info: "Surah Al-An'am was revealed in its entirety at once." },
  { id: "q16", cat: "Quran", q: "What does 'Quran' literally mean?", opts: ["The Book", "The Recitation", "The Light", "The Truth"], ans: 1, info: "Quran comes from the Arabic root 'qara'a' meaning to read/recite." },
  { id: "q17", cat: "Quran", q: "Which angel brought the Quran to Prophet Muhammad ﷺ?", opts: ["Mikail", "Israfil", "Jibreel", "Azrael"], ans: 2, info: "Angel Jibreel (Gabriel) delivered Allah's revelations to the Prophet ﷺ." },
  { id: "q18", cat: "Quran", q: "Which surah does not begin with Bismillah?", opts: ["Al-Tawbah", "Al-Anfal", "Al-Baqarah", "Al-Fatiha"], ans: 0, info: "Surah At-Tawbah is the only surah that doesn't start with Bismillah." },
  { id: "q19", cat: "Quran", q: "How many verses (ayat) are in the Quran approximately?", opts: ["5,000", "6,236", "7,000", "4,500"], ans: 1, info: "The Quran contains 6,236 verses according to the standard count." },
  { id: "q20", cat: "Quran", q: "Which surah mentions Bismillah twice?", opts: ["Al-Fatiha", "An-Naml", "Al-Baqarah", "Al-Mulk"], ans: 1, info: "An-Naml has Bismillah at the start and in verse 30 (Solomon's letter)." },
  { id: "q21", cat: "Quran", q: "Which companion is known for compiling the Quran into one book?", opts: ["Umar ibn Al-Khattab", "Uthman ibn Affan", "Abu Bakr As-Siddiq", "Ali ibn Abi Talib"], ans: 2, info: "Abu Bakr ordered the compilation; Uthman later standardized the copies." },
  { id: "q22", cat: "Quran", q: "Which surah is called 'The Sovereignty'?", opts: ["Al-Mulk", "Al-Malik", "Ar-Rahman", "Al-Waqiah"], ans: 0, info: "Surah Al-Mulk (chapter 67) protects from the punishment of the grave." },
  { id: "q23", cat: "Quran", q: "What is the last surah revealed in the Quran?", opts: ["An-Nasr", "Al-Ma'idah", "At-Tawbah", "Al-Ikhlas"], ans: 0, info: "Surah An-Nasr is widely considered the last complete surah revealed." },
  { id: "q24", cat: "Quran", q: "Which prophet is mentioned most in the Quran?", opts: ["Muhammad ﷺ", "Ibrahim (AS)", "Musa (AS)", "Isa (AS)"], ans: 2, info: "Prophet Musa (Moses) is mentioned by name about 136 times." },
  { id: "q25", cat: "Quran", q: "Which woman is mentioned by name in the Quran?", opts: ["Khadijah", "Maryam", "Aisha", "Hajar"], ans: 1, info: "Maryam (Mary) is the only woman mentioned by name in the Quran." },

  // ===== SEERAH (Prophet's Life) =====
  { id: "s1", cat: "Seerah", q: "In which year was Prophet Muhammad ﷺ born?", opts: ["570 CE", "580 CE", "560 CE", "590 CE"], ans: 0, info: "Known as the Year of the Elephant, when Abraha tried to attack the Ka'bah." },
  { id: "s2", cat: "Seerah", q: "What was the name of the Prophet's ﷺ mother?", opts: ["Halimah", "Aminah", "Khadijah", "Fatimah"], ans: 1, info: "Aminah bint Wahb passed away when the Prophet ﷺ was about 6 years old." },
  { id: "s3", cat: "Seerah", q: "Who was the Prophet's ﷺ first wife?", opts: ["Aisha", "Khadijah", "Hafsa", "Sawda"], ans: 1, info: "Khadijah bint Khuwaylid was 15 years his senior and his biggest supporter." },
  { id: "s4", cat: "Seerah", q: "How old was the Prophet ﷺ when he received the first revelation?", opts: ["25", "30", "40", "35"], ans: 2, info: "He received the first revelation in the Cave of Hira at age 40." },
  { id: "s5", cat: "Seerah", q: "What was the name of the cave where the first revelation came?", opts: ["Cave of Thawr", "Cave of Hira", "Cave of Kahf", "Cave of Uhud"], ans: 1, info: "The Cave of Hira is located on Jabal al-Noor near Makkah." },
  { id: "s6", cat: "Seerah", q: "Who was the first man to accept Islam?", opts: ["Umar ibn Al-Khattab", "Ali ibn Abi Talib", "Abu Bakr As-Siddiq", "Uthman ibn Affan"], ans: 2, info: "Abu Bakr immediately accepted Islam when invited by the Prophet ﷺ." },
  { id: "s7", cat: "Seerah", q: "What year did the Hijrah (migration to Madinah) occur?", opts: ["620 CE", "622 CE", "625 CE", "630 CE"], ans: 1, info: "622 CE marks the start of the Islamic calendar (Hijri)." },
  { id: "s8", cat: "Seerah", q: "What was the Prophet's ﷺ grandfather's name?", opts: ["Abu Talib", "Abdul Muttalib", "Abu Lahab", "Hashim"], ans: 1, info: "Abdul Muttalib raised the Prophet ﷺ after his mother passed away." },
  { id: "s9", cat: "Seerah", q: "In which battle did Muslims achieve their first major victory?", opts: ["Uhud", "Badr", "Khandaq", "Hunayn"], ans: 1, info: "The Battle of Badr (624 CE) — 313 Muslims defeated about 1,000 Quraysh." },
  { id: "s10", cat: "Seerah", q: "What was the Prophet's ﷺ profession before prophethood?", opts: ["Farmer", "Carpenter", "Merchant/Trader", "Shepherd only"], ans: 2, info: "He was known as Al-Amin (The Trustworthy) for his honest trading." },
  { id: "s11", cat: "Seerah", q: "How many children did the Prophet ﷺ have?", opts: ["4", "5", "6", "7"], ans: 3, info: "He had 3 sons and 4 daughters — 7 children total." },
  { id: "s12", cat: "Seerah", q: "What was the name of the Prophet's ﷺ uncle who protected him?", opts: ["Abu Lahab", "Abu Talib", "Abbas", "Hamza"], ans: 1, info: "Abu Talib protected the Prophet ﷺ though he never accepted Islam." },
  { id: "s13", cat: "Seerah", q: "What event is Isra and Mi'raj?", opts: ["Migration to Madinah", "Night Journey & Ascension", "Conquest of Makkah", "Treaty of Hudaybiyyah"], ans: 1, info: "The Prophet ﷺ traveled from Makkah to Jerusalem and ascended to the heavens." },
  { id: "s14", cat: "Seerah", q: "At what age did Prophet Muhammad ﷺ pass away?", opts: ["60", "63", "65", "70"], ans: 1, info: "He passed away in 632 CE in Madinah at the age of 63." },
  { id: "s15", cat: "Seerah", q: "Who was the Prophet's ﷺ foster mother?", opts: ["Aminah", "Barakah", "Halimah", "Sumayyah"], ans: 2, info: "Halimah As-Sa'diyyah nursed and raised him in the desert as an infant." },
  { id: "s16", cat: "Seerah", q: "What was the Treaty of Hudaybiyyah?", opts: ["Trade agreement", "Peace treaty with Quraysh", "Alliance with Romans", "Marriage contract"], ans: 1, info: "A 10-year peace treaty signed in 628 CE, a strategic victory for Muslims." },
  { id: "s17", cat: "Seerah", q: "When was the Conquest of Makkah?", opts: ["628 CE", "630 CE", "632 CE", "626 CE"], ans: 1, info: "Makkah was peacefully conquered with 10,000 Muslims, and the Ka'bah was cleansed of idols." },
  { id: "s18", cat: "Seerah", q: "What was the Prophet's ﷺ title before Islam?", opts: ["Al-Mukhtar", "Al-Amin", "As-Sadiq", "Al-Rashid"], ans: 1, info: "Al-Amin means 'The Trustworthy' — given for his exceptional character." },
  { id: "s19", cat: "Seerah", q: "Who hid in the Cave of Thawr during the Hijrah?", opts: ["Prophet ﷺ and Ali", "Prophet ﷺ and Abu Bakr", "Prophet ﷺ and Umar", "Prophet ﷺ alone"], ans: 1, info: "Abu Bakr accompanied the Prophet ﷺ, and Allah sent a spider and dove to conceal them." },
  { id: "s20", cat: "Seerah", q: "What was the first mosque built by the Prophet ﷺ?", opts: ["Al-Aqsa", "Masjid An-Nabawi", "Masjid Quba", "Masjid Al-Haram"], ans: 2, info: "Masjid Quba was built upon arrival in the outskirts of Madinah during the Hijrah." },
  { id: "s21", cat: "Seerah", q: "What did the Prophet ﷺ say when he entered Makkah victorious?", opts: ["\"Makkah is mine\"", "\"No blame on you today\"", "\"Surrender or perish\"", "\"Justice has arrived\""], ans: 1, info: "He showed mercy and forgave the people of Makkah, echoing Prophet Yusuf's words." },
  { id: "s22", cat: "Seerah", q: "Who was the first martyr in Islam?", opts: ["Hamza", "Bilal", "Sumayyah", "Yasir"], ans: 2, info: "Sumayyah bint Khayyat was killed by Abu Jahl for refusing to renounce Islam." },
  { id: "s23", cat: "Seerah", q: "What was the name of the Prophet's ﷺ daughter who married Ali?", opts: ["Zainab", "Ruqayyah", "Umm Kulthum", "Fatimah"], ans: 3, info: "Fatimah (RA) married Ali (RA) and they had Hasan and Husayn." },
  { id: "s24", cat: "Seerah", q: "Which companion was known for his beautiful voice in calling the Adhan?", opts: ["Abu Bakr", "Umar", "Bilal", "Uthman"], ans: 2, info: "Bilal ibn Rabah was the first mu'adhin (caller to prayer) in Islam." },
  { id: "s25", cat: "Seerah", q: "Where is the Prophet ﷺ buried?", opts: ["Makkah", "Jerusalem", "Madinah", "Ta'if"], ans: 2, info: "He is buried in Madinah, in what was Aisha's room, now part of Masjid An-Nabawi." },

  // ===== PROPHETS =====
  { id: "p1", cat: "Prophets", q: "How many prophets are mentioned by name in the Quran?", opts: ["20", "25", "30", "35"], ans: 1, info: "25 prophets are mentioned by name in the Quran." },
  { id: "p2", cat: "Prophets", q: "Which prophet built the Ka'bah?", opts: ["Muhammad ﷺ", "Musa (AS)", "Ibrahim (AS)", "Nuh (AS)"], ans: 2, info: "Ibrahim (AS) and his son Ismail (AS) raised the foundations of the Ka'bah." },
  { id: "p3", cat: "Prophets", q: "Which prophet was swallowed by a whale?", opts: ["Musa (AS)", "Yunus (AS)", "Ayyub (AS)", "Idris (AS)"], ans: 1, info: "Prophet Yunus (Jonah) was swallowed after leaving his people without Allah's permission." },
  { id: "p4", cat: "Prophets", q: "Which prophet could speak to animals?", opts: ["Dawud (AS)", "Sulayman (AS)", "Yusuf (AS)", "Ibrahim (AS)"], ans: 1, info: "Sulayman (Solomon) was given power over jinn, animals, and the wind." },
  { id: "p5", cat: "Prophets", q: "Which prophet was known for his incredible patience?", opts: ["Ayyub (AS)", "Yusuf (AS)", "Nuh (AS)", "Ibrahim (AS)"], ans: 0, info: "Ayyub (Job) endured severe illness and loss with unwavering patience." },
  { id: "p6", cat: "Prophets", q: "Who was the first prophet in Islam?", opts: ["Ibrahim (AS)", "Nuh (AS)", "Adam (AS)", "Idris (AS)"], ans: 2, info: "Adam (AS) was the first human and the first prophet." },
  { id: "p7", cat: "Prophets", q: "Which prophet's story involves a colorful garment?", opts: ["Musa (AS)", "Yusuf (AS)", "Dawud (AS)", "Sulayman (AS)"], ans: 1, info: "Yusuf's (Joseph's) brothers were jealous partly because of a special garment from their father." },
  { id: "p8", cat: "Prophets", q: "Which prophet had the ability to interpret dreams?", opts: ["Ibrahim (AS)", "Yusuf (AS)", "Musa (AS)", "Isa (AS)"], ans: 1, info: "Yusuf (AS) was gifted dream interpretation, which saved Egypt from famine." },
  { id: "p9", cat: "Prophets", q: "Which prophet was raised to the heavens alive?", opts: ["Muhammad ﷺ", "Isa (AS)", "Idris (AS)", "Ilyas (AS)"], ans: 1, info: "Isa (Jesus) was raised to Allah and will return before the Day of Judgment." },
  { id: "p10", cat: "Prophets", q: "Which prophet built the Ark?", opts: ["Ibrahim (AS)", "Musa (AS)", "Nuh (AS)", "Hud (AS)"], ans: 2, info: "Nuh (Noah) built the Ark on Allah's command before the great flood." },
  { id: "p11", cat: "Prophets", q: "How long did Nuh (AS) call his people to Islam?", opts: ["500 years", "750 years", "950 years", "1000 years"], ans: 2, info: "The Quran states he remained among them for 950 years (29:14)." },
  { id: "p12", cat: "Prophets", q: "Which prophet was given the Zabur (Psalms)?", opts: ["Musa (AS)", "Isa (AS)", "Dawud (AS)", "Ibrahim (AS)"], ans: 2, info: "Dawud (David) was given the Zabur and had a beautiful voice." },
  { id: "p13", cat: "Prophets", q: "Which prophet was thrown into a fire?", opts: ["Musa (AS)", "Ibrahim (AS)", "Ismail (AS)", "Lut (AS)"], ans: 1, info: "Ibrahim was thrown into fire by Nimrod, but Allah made it cool and safe." },
  { id: "p14", cat: "Prophets", q: "Which prophet parted the sea?", opts: ["Nuh (AS)", "Musa (AS)", "Sulayman (AS)", "Yunus (AS)"], ans: 1, info: "Musa (Moses) struck the sea with his staff and it parted by Allah's will." },
  { id: "p15", cat: "Prophets", q: "Which prophet was tested with sacrificing his son?", opts: ["Nuh (AS)", "Yaqub (AS)", "Ibrahim (AS)", "Musa (AS)"], ans: 2, info: "Ibrahim was commanded to sacrifice Ismail, and Allah replaced him with a ram." },
  { id: "p16", cat: "Prophets", q: "Which prophet could cure the blind and lepers?", opts: ["Sulayman (AS)", "Musa (AS)", "Ibrahim (AS)", "Isa (AS)"], ans: 3, info: "Isa (Jesus) performed miracles by Allah's permission, including healing." },
  { id: "p17", cat: "Prophets", q: "Which prophet was born without a father?", opts: ["Adam (AS)", "Isa (AS)", "Yahya (AS)", "Idris (AS)"], ans: 1, info: "Isa (Jesus) was born to Maryam through a miraculous birth." },
  { id: "p18", cat: "Prophets", q: "Which two prophets were father and son who built the Ka'bah?", opts: ["Nuh & Ibrahim", "Ibrahim & Ismail", "Ibrahim & Ishaq", "Dawud & Sulayman"], ans: 1, info: "Ibrahim and Ismail raised the foundations together, praying for acceptance." },
  { id: "p19", cat: "Prophets", q: "Which prophet was given the Torah?", opts: ["Dawud (AS)", "Isa (AS)", "Ibrahim (AS)", "Musa (AS)"], ans: 3, info: "Musa (Moses) received the Torah (Tawrat) on Mount Sinai." },
  { id: "p20", cat: "Prophets", q: "Which prophet is the father of Yusuf (AS)?", opts: ["Ibrahim (AS)", "Ishaq (AS)", "Yaqub (AS)", "Ismail (AS)"], ans: 2, info: "Yaqub (Jacob), also known as Israel, had 12 sons including Yusuf." },
  { id: "p21", cat: "Prophets", q: "Which prophet was sent to the people of 'Ad?", opts: ["Salih (AS)", "Hud (AS)", "Shu'ayb (AS)", "Lut (AS)"], ans: 1, info: "Hud was sent to 'Ad — a powerful ancient civilization destroyed for their arrogance." },
  { id: "p22", cat: "Prophets", q: "Which prophet's people were destroyed by a she-camel miracle?", opts: ["Hud (AS)", "Salih (AS)", "Lut (AS)", "Shu'ayb (AS)"], ans: 1, info: "Salih's people of Thamud killed the miraculous she-camel and were destroyed." },
  { id: "p23", cat: "Prophets", q: "Who is known as Khalilullah (Friend of Allah)?", opts: ["Muhammad ﷺ", "Musa (AS)", "Ibrahim (AS)", "Nuh (AS)"], ans: 2, info: "Ibrahim (AS) was honored with the title Khalilullah." },
  { id: "p24", cat: "Prophets", q: "Which prophet made iron soft in his hands?", opts: ["Sulayman (AS)", "Dawud (AS)", "Musa (AS)", "Dhul-Kifl (AS)"], ans: 1, info: "Dawud (David) was given the ability to mold iron to make armor." },
  { id: "p25", cat: "Prophets", q: "Who is the last prophet in Islam?", opts: ["Isa (AS)", "Ibrahim (AS)", "Musa (AS)", "Muhammad ﷺ"], ans: 3, info: "Muhammad ﷺ is the Seal of the Prophets — no prophet comes after him." },

  // ===== FIQH (Islamic Jurisprudence) =====
  { id: "f1", cat: "Fiqh", q: "How many daily obligatory prayers are there in Islam?", opts: ["3", "4", "5", "7"], ans: 2, info: "Fajr, Dhuhr, Asr, Maghrib, and Isha — five daily prayers." },
  { id: "f2", cat: "Fiqh", q: "What percentage of savings must be given as Zakat?", opts: ["1%", "2.5%", "5%", "10%"], ans: 1, info: "2.5% of savings held for one lunar year above the Nisab threshold." },
  { id: "f3", cat: "Fiqh", q: "What is the Nisab for gold Zakat?", opts: ["50 grams", "85 grams", "100 grams", "75 grams"], ans: 1, info: "The Nisab for gold is 85 grams (approximately 7.5 tola)." },
  { id: "f4", cat: "Fiqh", q: "How many rak'ahs are in Fajr prayer?", opts: ["2", "3", "4", "1"], ans: 0, info: "Fajr consists of 2 rak'ahs of fard (obligatory) prayer." },
  { id: "f5", cat: "Fiqh", q: "What breaks your wudu (ablution)?", opts: ["Eating", "Sleeping deeply", "Touching water", "Speaking"], ans: 1, info: "Deep sleep, using the bathroom, and passing wind break wudu." },
  { id: "f6", cat: "Fiqh", q: "Which pillar of Islam involves fasting?", opts: ["Salah", "Hajj", "Sawm", "Zakat"], ans: 2, info: "Sawm (fasting during Ramadan) is the fourth pillar of Islam." },
  { id: "f7", cat: "Fiqh", q: "What is the minimum amount of people for Jumu'ah (Friday) prayer?", opts: ["2", "3", "12", "Varies by school"], ans: 3, info: "Different scholars say different numbers — Hanafi say 3, others say more." },
  { id: "f8", cat: "Fiqh", q: "What is Tayammum?", opts: ["Washing with water", "Dry ablution with earth", "Bathing for Jumu'ah", "Ritual shower"], ans: 1, info: "Tayammum uses clean earth/sand when water is unavailable or harmful." },
  { id: "f9", cat: "Fiqh", q: "How many pillars of Islam are there?", opts: ["4", "5", "6", "7"], ans: 1, info: "Shahada, Salah, Zakat, Sawm, and Hajj are the five pillars." },
  { id: "f10", cat: "Fiqh", q: "What direction do Muslims face when praying?", opts: ["East", "West", "Toward the Ka'bah", "Toward Madinah"], ans: 2, info: "Muslims face the Qiblah — the direction of the Ka'bah in Makkah." },
  { id: "f11", cat: "Fiqh", q: "What is Ghusl?", opts: ["Partial washing", "Full body ritual bath", "Foot washing", "Hand washing"], ans: 1, info: "Ghusl is a full body purification required after certain states." },
  { id: "f12", cat: "Fiqh", q: "How many Takbirs are in the Eid prayer?", opts: ["4", "6 or 7", "12 or 13", "2"], ans: 2, info: "12 or 13 depending on the school of thought — extra Takbirs are said." },
  { id: "f13", cat: "Fiqh", q: "What is Sadaqah?", opts: ["Obligatory charity", "Voluntary charity", "Tax on land", "Inheritance"], ans: 1, info: "Sadaqah is any voluntary act of charity, even a smile." },
  { id: "f14", cat: "Fiqh", q: "Who is eligible to receive Zakat?", opts: ["Only family", "Only orphans", "8 categories mentioned in Quran", "Anyone in need"], ans: 2, info: "Surah At-Tawbah (9:60) lists 8 categories of Zakat recipients." },
  { id: "f15", cat: "Fiqh", q: "What is the Sunnah prayer before Fajr called?", opts: ["Tahajjud", "Sunnah Mu'akkadah", "Ishraq", "Witr"], ans: 1, info: "The 2 rak'ahs before Fajr are a confirmed Sunnah the Prophet ﷺ never left." },
  { id: "f16", cat: "Fiqh", q: "What invalidates your fast during Ramadan?", opts: ["Sleeping", "Eating intentionally", "Smelling food", "Brushing teeth"], ans: 1, info: "Intentional eating, drinking, or intimate relations break the fast." },
  { id: "f17", cat: "Fiqh", q: "How many times do you circle the Ka'bah during Tawaf?", opts: ["3", "5", "7", "10"], ans: 2, info: "Tawaf consists of 7 circuits around the Ka'bah counterclockwise." },
  { id: "f18", cat: "Fiqh", q: "What is I'tikaf?", opts: ["Pilgrimage", "Seclusion in a mosque", "Night prayer", "Charity fund"], ans: 1, info: "I'tikaf is secluding oneself in a mosque for worship, especially in the last 10 days of Ramadan." },
  { id: "f19", cat: "Fiqh", q: "Which prayer has 4 rak'ahs fard?", opts: ["Fajr", "Maghrib", "Dhuhr", "Witr"], ans: 2, info: "Dhuhr, Asr, and Isha all have 4 rak'ahs fard." },
  { id: "f20", cat: "Fiqh", q: "What is Fidyah?", opts: ["Penalty for breaking an oath", "Compensation for missed fasts", "Tax on gold", "Charity for orphans"], ans: 1, info: "Fidyah is paid by those who cannot fast due to chronic illness or old age." },
  { id: "f21", cat: "Fiqh", q: "What is Sujud as-Sahw?", opts: ["Extra prayer", "Prostration for forgetfulness", "Prayer for rain", "Funeral prayer"], ans: 1, info: "Two extra prostrations at the end of prayer if you made an error." },
  { id: "f22", cat: "Fiqh", q: "How many days should one fast during Shawwal?", opts: ["3", "6", "10", "15"], ans: 1, info: "Fasting 6 days of Shawwal after Ramadan equals a full year of fasting." },
  { id: "f23", cat: "Fiqh", q: "What is Wudu?", opts: ["Full bath", "Partial ablution", "Dry cleaning", "Mental preparation"], ans: 1, info: "Wudu involves washing face, arms, wiping head, and washing feet." },
  { id: "f24", cat: "Fiqh", q: "What is Kaffarah for breaking a Ramadan fast deliberately?", opts: ["Pray 2 rak'ahs", "Fast 60 consecutive days", "Give Zakat", "Read 1 juz"], ans: 1, info: "One must fast 60 consecutive days or feed 60 poor people." },
  { id: "f25", cat: "Fiqh", q: "What is the prayer for the deceased called?", opts: ["Salat al-Istikhara", "Salat al-Janazah", "Salat al-Hajah", "Salat at-Tawbah"], ans: 1, info: "Salat al-Janazah is a communal obligation performed standing, with no ruku or sujud." },

  // ===== ISLAMIC HISTORY =====
  { id: "h1", cat: "History", q: "Who was the first Caliph of Islam?", opts: ["Umar", "Uthman", "Abu Bakr", "Ali"], ans: 2, info: "Abu Bakr As-Siddiq led the Muslim community after the Prophet ﷺ passed away." },
  { id: "h2", cat: "History", q: "What is the Islamic calendar based on?", opts: ["Solar cycle", "Lunar cycle", "Star positions", "Seasons"], ans: 1, info: "The Hijri calendar follows lunar months, about 354 days per year." },
  { id: "h3", cat: "History", q: "Which city is known as the City of the Prophet?", opts: ["Makkah", "Jerusalem", "Madinah", "Damascus"], ans: 2, info: "Madinah is called Madinat an-Nabi — the City of the Prophet ﷺ." },
  { id: "h4", cat: "History", q: "What was the first Islamic university?", opts: ["Al-Azhar", "University of al-Qarawiyyin", "University of Bologna", "Al-Nizamiyyah"], ans: 1, info: "Founded in 859 CE in Fez, Morocco by Fatima al-Fihri." },
  { id: "h5", cat: "History", q: "Who introduced the Hijri calendar?", opts: ["Abu Bakr", "Umar ibn Al-Khattab", "Uthman", "Ali"], ans: 1, info: "Umar established it during his caliphate, starting from the year of Hijrah." },
  { id: "h6", cat: "History", q: "Which battle is known as the 'Battle of the Trench'?", opts: ["Badr", "Uhud", "Khandaq", "Tabuk"], ans: 2, info: "Khandaq (627 CE) — Salman al-Farisi suggested digging a defensive trench." },
  { id: "h7", cat: "History", q: "Who was known as 'The Sword of Allah'?", opts: ["Ali ibn Abi Talib", "Khalid ibn Al-Walid", "Hamza", "Sa'd ibn Abi Waqqas"], ans: 1, info: "The Prophet ﷺ gave Khalid ibn Al-Walid this title for his military brilliance." },
  { id: "h8", cat: "History", q: "Which Muslim scientist is known as the 'Father of Algebra'?", opts: ["Ibn Sina", "Al-Khwarizmi", "Al-Biruni", "Ibn Rushd"], ans: 1, info: "Al-Khwarizmi wrote 'Al-Jabr' in the 9th century, giving algebra its name." },
  { id: "h9", cat: "History", q: "What was the Abbasid capital?", opts: ["Damascus", "Baghdad", "Cairo", "Cordoba"], ans: 1, info: "Baghdad was the center of the Islamic Golden Age under the Abbasids." },
  { id: "h10", cat: "History", q: "Which Muslim explorer traveled over 75,000 miles?", opts: ["Ibn Khaldun", "Ibn Battuta", "Al-Idrisi", "Zheng He"], ans: 1, info: "Ibn Battuta's journeys spanned nearly 30 years across Africa, Asia, and Europe." },
  { id: "h11", cat: "History", q: "When was Al-Aqsa Mosque first built?", opts: ["After the Prophet ﷺ", "40 years after the Ka'bah", "During the Crusades", "By the Romans"], ans: 1, info: "A hadith states it was built 40 years after the Ka'bah, likely by Ibrahim or Adam." },
  { id: "h12", cat: "History", q: "Who conquered Constantinople for the Muslims?", opts: ["Salahuddin", "Tariq ibn Ziyad", "Sultan Muhammad al-Fatih", "Khalid ibn Al-Walid"], ans: 2, info: "Ottoman Sultan Mehmed II conquered it in 1453 CE, fulfilling a prophecy." },
  { id: "h13", cat: "History", q: "Which dynasty built the Alhambra in Spain?", opts: ["Abbasids", "Umayyads", "Nasrids", "Ottomans"], ans: 2, info: "The Nasrid dynasty built the Alhambra palace in Granada, Spain." },
  { id: "h14", cat: "History", q: "Who is known as 'The Father of Medicine' in Islam?", opts: ["Al-Khwarizmi", "Ibn Sina", "Al-Razi", "Ibn Rushd"], ans: 1, info: "Ibn Sina (Avicenna) wrote 'The Canon of Medicine,' used in Europe for centuries." },
  { id: "h15", cat: "History", q: "What was the first direction of Qiblah for Muslims?", opts: ["Ka'bah", "Masjid An-Nabawi", "Al-Aqsa / Jerusalem", "No fixed direction"], ans: 2, info: "Muslims first prayed toward Jerusalem before the Qiblah changed to Makkah." },
  { id: "h16", cat: "History", q: "Who led the Muslim forces during the Crusades to recapture Jerusalem?", opts: ["Khalid ibn Al-Walid", "Tariq ibn Ziyad", "Salahuddin Al-Ayyubi", "Muhammad al-Fatih"], ans: 2, info: "Salahuddin recaptured Jerusalem in 1187 CE and was known for his mercy." },
  { id: "h17", cat: "History", q: "Which Muslim commander conquered Spain?", opts: ["Khalid ibn Al-Walid", "Tariq ibn Ziyad", "Salahuddin", "Musa ibn Nusayr"], ans: 1, info: "Tariq ibn Ziyad crossed the strait in 711 CE — Gibraltar is named after him." },
  { id: "h18", cat: "History", q: "What was the Umayyad capital?", opts: ["Baghdad", "Cairo", "Damascus", "Cordoba"], ans: 2, info: "Damascus was the Umayyad capital from 661-750 CE." },
  { id: "h19", cat: "History", q: "Who was the second Caliph of Islam?", opts: ["Abu Bakr", "Uthman", "Ali", "Umar ibn Al-Khattab"], ans: 3, info: "Umar's caliphate saw massive expansion and many administrative innovations." },
  { id: "h20", cat: "History", q: "What does 'Al-Andalus' refer to?", opts: ["North Africa", "Muslim Spain", "Central Asia", "Ottoman Empire"], ans: 1, info: "Al-Andalus was Muslim-ruled Iberia, a center of learning for nearly 800 years." },
  { id: "h21", cat: "History", q: "Which Muslim scientist pioneered optics?", opts: ["Al-Khwarizmi", "Ibn al-Haytham", "Al-Biruni", "Jabir ibn Hayyan"], ans: 1, info: "Ibn al-Haytham's 'Book of Optics' revolutionized understanding of light and vision." },
  { id: "h22", cat: "History", q: "What year did the Ottoman Empire end?", opts: ["1918", "1922", "1924", "1930"], ans: 2, info: "The Ottoman sultanate was abolished in 1922, caliphate in 1924." },
  { id: "h23", cat: "History", q: "Who compiled Sahih al-Bukhari?", opts: ["Imam Muslim", "Imam Malik", "Imam Bukhari", "Imam Ahmad"], ans: 2, info: "Imam Al-Bukhari spent 16 years compiling it from over 600,000 narrations." },
  { id: "h24", cat: "History", q: "What is the significance of the number 786?", opts: ["Quran verse count", "Numerical value of Bismillah", "Year of a battle", "Number of prophets"], ans: 1, info: "In Abjad numerals, the letters of Bismillah ir-Rahman ir-Rahim equal 786." },
  { id: "h25", cat: "History", q: "Which Muslim polymath wrote 'The Muqaddimah'?", opts: ["Ibn Sina", "Al-Ghazali", "Ibn Khaldun", "Ibn Rushd"], ans: 2, info: "Ibn Khaldun's Muqaddimah is considered a founding text of sociology and historiography." },

  // ===== RAMADAN =====
  { id: "r1", cat: "Ramadan", q: "In which month of the Islamic calendar is Ramadan?", opts: ["8th", "9th", "10th", "11th"], ans: 1, info: "Ramadan is the 9th month of the Hijri calendar." },
  { id: "r2", cat: "Ramadan", q: "What is the pre-dawn meal called?", opts: ["Iftar", "Suhoor/Sehri", "Walimah", "Aqeeqah"], ans: 1, info: "Eating Suhoor is a blessed Sunnah that provides energy for fasting." },
  { id: "r3", cat: "Ramadan", q: "What is the meal at sunset to break the fast called?", opts: ["Suhoor", "Iftar", "Walimah", "Sadaqah"], ans: 1, info: "Iftar is typically broken with dates and water, following the Prophet's ﷺ Sunnah." },
  { id: "r4", cat: "Ramadan", q: "What is Laylatul Qadr?", opts: ["First night of Ramadan", "Night of Power", "Night of Eid", "Night of Isra"], ans: 1, info: "Laylatul Qadr is better than 1,000 months — the night the Quran was first revealed." },
  { id: "r5", cat: "Ramadan", q: "In which of the last 10 nights is Laylatul Qadr most likely?", opts: ["21st, 23rd, 25th, 27th, 29th", "20th, 22nd, 24th, 26th, 28th", "Any of the 30 nights", "Only the 27th"], ans: 0, info: "The odd nights of the last 10 are most likely, with the 27th being most commonly cited." },
  { id: "r6", cat: "Ramadan", q: "What special prayer is performed in Ramadan at night?", opts: ["Salat al-Istikhara", "Tahajjud only", "Taraweeh", "Salat al-Hajah"], ans: 2, info: "Taraweeh prayers are offered in congregation after Isha during Ramadan." },
  { id: "r7", cat: "Ramadan", q: "What is Zakat al-Fitr?", opts: ["Annual wealth tax", "Charity given before Eid prayer", "Tax on business", "Optional donation"], ans: 1, info: "Zakat al-Fitr purifies the fast and must be given before the Eid prayer." },
  { id: "r8", cat: "Ramadan", q: "What is the recommended food to break your fast with?", opts: ["Rice", "Bread", "Dates", "Meat"], ans: 2, info: "The Prophet ﷺ would break his fast with fresh dates, or dried dates, or water." },
  { id: "r9", cat: "Ramadan", q: "What is I'tikaf during Ramadan?", opts: ["Extra fasting", "Seclusion in the mosque", "Night shopping", "Community feast"], ans: 1, info: "The Prophet ﷺ would observe I'tikaf in the last 10 days of Ramadan." },
  { id: "r10", cat: "Ramadan", q: "How many rak'ahs of Taraweeh are commonly prayed?", opts: ["8 or 20", "10 or 12", "6 or 8", "20 or 30"], ans: 0, info: "8 and 20 are both common — scholars differ, and both are valid." },
  { id: "r11", cat: "Ramadan", q: "Does accidentally eating break your fast?", opts: ["Yes, always", "No, the fast continues", "Only if it's a lot", "Only after noon"], ans: 1, info: "If you eat or drink forgetfully, your fast is still valid — it's from Allah." },
  { id: "r12", cat: "Ramadan", q: "What dua is recommended when breaking the fast?", opts: ["Bismillah only", "Dhahaba adh-dhama'...", "Al-Fatiha", "Ayatul Kursi"], ans: 1, info: "'The thirst has gone, the veins are moistened, and the reward is assured, if Allah wills.'" },
  { id: "r13", cat: "Ramadan", q: "Who is exempt from fasting in Ramadan?", opts: ["Students", "The sick and travelers", "Workers", "Everyone must fast"], ans: 1, info: "The sick, travelers, pregnant/nursing women, elderly, and children are exempt." },
  { id: "r14", cat: "Ramadan", q: "What event occurred on the 17th of Ramadan?", opts: ["Birth of the Prophet ﷺ", "Battle of Badr", "Conquest of Makkah", "Treaty of Hudaybiyyah"], ans: 1, info: "The Battle of Badr took place on 17th Ramadan, 2 AH (624 CE)." },
  { id: "r15", cat: "Ramadan", q: "What happens on Eid al-Fitr?", opts: ["Start of Hajj", "Celebration after Ramadan", "Mid-Ramadan feast", "New Year celebration"], ans: 1, info: "Eid al-Fitr marks the end of Ramadan with prayer, charity, and celebration." },
  { id: "r16", cat: "Ramadan", q: "Is using a miswak (tooth stick) allowed while fasting?", opts: ["No, it breaks the fast", "Yes, it's Sunnah", "Only before noon", "Only with water"], ans: 1, info: "The Prophet ﷺ encouraged using the miswak, and scholars agree it's permitted while fasting." },
  { id: "r17", cat: "Ramadan", q: "What is the reward of feeding a fasting person?", opts: ["10 good deeds", "Same reward as their fast", "Extra Hajj reward", "70 good deeds"], ans: 1, info: "The Prophet ﷺ said whoever feeds a fasting person gets the same reward." },
  { id: "r18", cat: "Ramadan", q: "What is the gate of Paradise called for those who fast?", opts: ["Bab as-Salah", "Bab ar-Rayyan", "Bab al-Jihad", "Bab as-Sadaqah"], ans: 1, info: "Ar-Rayyan is a gate through which only those who fasted will enter." },
  { id: "r19", cat: "Ramadan", q: "In which year was fasting in Ramadan made obligatory?", opts: ["1 AH", "2 AH", "3 AH", "5 AH"], ans: 1, info: "Fasting was made obligatory in 2 AH (624 CE), the second year after Hijrah." },
  { id: "r20", cat: "Ramadan", q: "Can you brush your teeth while fasting?", opts: ["No", "Yes, but don't swallow", "Only with miswak", "Only before Dhuhr"], ans: 1, info: "Most scholars allow brushing teeth as long as you don't swallow toothpaste." },
  { id: "r21", cat: "Ramadan", q: "What charity is given specifically at the end of Ramadan?", opts: ["Zakat al-Mal", "Zakat al-Fitr", "Sadaqah Jariyah", "Khums"], ans: 1, info: "Zakat al-Fitr is a specific charity given before Eid prayer to purify the fast." },
  { id: "r22", cat: "Ramadan", q: "What does the word 'Ramadan' come from?", opts: ["Mercy", "Scorching heat", "Moon", "Fasting"], ans: 1, info: "'Ramada' means scorching heat — Ramadan fell in hot months when it was named." },
  { id: "r23", cat: "Ramadan", q: "How is the start of Ramadan determined?", opts: ["Fixed date every year", "Sighting of the new moon", "Government decree", "After 30 days of Sha'ban always"], ans: 1, info: "Ramadan begins with the sighting of the crescent moon of the 9th month." },
  { id: "r24", cat: "Ramadan", q: "What surah mentions fasting was prescribed for believers?", opts: ["Al-Imran", "Al-Baqarah", "An-Nisa", "Al-Ma'idah"], ans: 1, info: "Verse 2:183 — 'O you who believe, fasting is prescribed for you...'" },
  { id: "r25", cat: "Ramadan", q: "What are the last 10 nights of Ramadan known for?", opts: ["Eid preparation", "Seeking Laylatul Qadr", "Community dinners", "Traveling"], ans: 1, info: "The Prophet ﷺ would intensify worship and perform I'tikaf in the last 10 nights." },
];

const CATEGORIES = ["All", "Quran", "Seerah", "Prophets", "Fiqh", "History", "Ramadan"];
const CAT_ICONS = { All: "✦", Quran: "📖", Seerah: "🕌", Prophets: "🌟", Fiqh: "⚖️", History: "🏛️", Ramadan: "🌙" };
const CAT_COLORS = { Quran: "#4ECDC4", Seerah: "#FFD93D", Prophets: "#FF6B6B", Fiqh: "#A78BFA", History: "#F97316", Ramadan: "#34D399" };

// ============================================
// STORAGE HELPERS
// ============================================
const STORAGE_KEY = "deenscroll-progress";

async function loadProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

async function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Storage save failed:", e);
  }
}

function getDefaultProgress() {
  return {
    seen: [],
    correct: [],
    wrong: [],
    streak: 0,
    bestStreak: 0,
    totalAnswered: 0,
    totalCorrect: 0,
    lastPlayedDate: null,
    currentSessionCorrect: 0,
    currentSessionTotal: 0,
  };
}

// ============================================
// SHUFFLE
// ============================================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ============================================
// MAIN APP
// ============================================
export default function DeenScroll({ onBack }) {
  const { checkPlayLimit, recordPlay } = useAuth();
  const [screen, setScreen] = useState("splash");
  const [progress, setProgress] = useState(getDefaultProgress());
  const [loaded, setLoaded] = useState(false);
  const [category, setCategory] = useState("All");
  const [queue, setQueue] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [animDir, setAnimDir] = useState(null);
  const [sessionScore, setSessionScore] = useState({ correct: 0, total: 0 });
  const touchStartY = useRef(null);

  // Load on mount
  useEffect(() => {
    (async () => {
      const saved = await loadProgress();
      if (saved) setProgress(saved);
      setLoaded(true);
    })();
  }, []);

  // Update streak on load
  useEffect(() => {
    if (!loaded) return;
    const today = new Date().toISOString().split("T")[0];
    if (progress.lastPlayedDate && progress.lastPlayedDate !== today) {
      const last = new Date(progress.lastPlayedDate);
      const now = new Date(today);
      const diff = Math.floor((now - last) / 86400000);
      if (diff > 1) {
        setProgress(p => ({ ...p, streak: 0 }));
      }
    }
  }, [loaded]);

  // Build queue when category changes or game starts
  const buildQueue = useCallback((cat) => {
    const pool = cat === "All" ? QUESTIONS : QUESTIONS.filter(q => q.cat === cat);
    // Prioritize: unseen first, then wrong answers (spaced repetition), then seen
    const unseen = pool.filter(q => !progress.seen.includes(q.id));
    const wrongRetry = pool.filter(q => progress.wrong.includes(q.id) && !unseen.find(u => u.id === q.id));
    const rest = pool.filter(q => !unseen.find(u => u.id === q.id) && !wrongRetry.find(w => w.id === q.id));
    const ordered = [...shuffle(unseen), ...shuffle(wrongRetry), ...shuffle(rest)];
    return ordered.length > 0 ? ordered : shuffle(pool);
  }, [progress]);

  const startGame = (cat) => {
    if (!checkPlayLimit('trivia')) return;
    setCategory(cat);
    const q = buildQueue(cat);
    setQueue(q);
    setCurrentIdx(0);
    setSelected(null);
    setShowInfo(false);
    setSessionScore({ correct: 0, total: 0 });
    setScreen("game");
  };

  const currentQ = queue[currentIdx];

  const handleAnswer = async (idx) => {
    if (selected !== null) return;
    recordPlay('trivia');
    setSelected(idx);
    setShowInfo(true);

    const isCorrect = idx === currentQ.ans;
    const today = new Date().toISOString().split("T")[0];

    setSessionScore(s => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1
    }));

    const newProgress = { ...progress };
    if (!newProgress.seen.includes(currentQ.id)) {
      newProgress.seen = [...newProgress.seen, currentQ.id];
    }
    newProgress.totalAnswered += 1;
    if (isCorrect) {
      newProgress.totalCorrect += 1;
      newProgress.wrong = newProgress.wrong.filter(id => id !== currentQ.id);
      if (!newProgress.correct.includes(currentQ.id)) {
        newProgress.correct = [...newProgress.correct, currentQ.id];
      }
    } else {
      if (!newProgress.wrong.includes(currentQ.id)) {
        newProgress.wrong = [...newProgress.wrong, currentQ.id];
      }
      newProgress.correct = newProgress.correct.filter(id => id !== currentQ.id);
    }

    if (newProgress.lastPlayedDate !== today) {
      const last = newProgress.lastPlayedDate ? new Date(newProgress.lastPlayedDate) : null;
      const now = new Date(today);
      if (last && Math.floor((now - last) / 86400000) === 1) {
        newProgress.streak += 1;
      } else if (!last || Math.floor((now - last) / 86400000) > 1) {
        newProgress.streak = 1;
      }
    }
    newProgress.lastPlayedDate = today;
    if (newProgress.streak > newProgress.bestStreak) {
      newProgress.bestStreak = newProgress.streak;
    }
    setProgress(newProgress);
    await saveProgress(newProgress);
  };

  const nextQuestion = () => {
    if (!checkPlayLimit('trivia')) return;
    setAnimDir("next");
    setTimeout(() => {
      if (currentIdx + 1 >= queue.length) {
        setScreen("results");
      } else {
        setCurrentIdx(currentIdx + 1);
        setSelected(null);
        setShowInfo(false);
      }
      setAnimDir(null);
    }, 250);
  };

  const handleSwipe = (e) => {
    if (!showInfo) return;
    if (e.type === "touchstart") {
      touchStartY.current = e.touches[0].clientY;
    }
    if (e.type === "touchend" && touchStartY.current !== null) {
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (diff > 50) nextQuestion();
      touchStartY.current = null;
    }
  };

  const resetProgress = async () => {
    const def = getDefaultProgress();
    setProgress(def);
    await saveProgress(def);
    setScreen("home");
  };

  // ============================================
  // SPLASH
  // ============================================
  if (screen === "splash") {
    return (
      <div style={styles.splashContainer}>
        <style>{globalCSS}</style>
        <div style={styles.splashInner}>
          <div style={styles.splashMoon}>🌙</div>
          <h1 style={styles.splashTitle}>DeenScroll</h1>
          <p style={styles.splashTagline}>Scroll Less, Deen More.</p>
          <div style={styles.splashDivider} />
          <p style={styles.splashSub}>Bite-sized Islamic knowledge<br/>that replaces your doomscroll</p>
          <button style={styles.splashBtn} onClick={() => setScreen("home")}>
            Begin Your Journey
          </button>
          {onBack && <button style={{...styles.splashBtn, background: 'rgba(255,255,255,0.06)', color: '#F0E6D3', boxShadow: 'none', marginTop: '0.75rem', animation: 'none', border: '1px solid rgba(255,255,255,0.1)'}} onClick={onBack}>
            ← Back to DeenScroll
          </button>}
          <p style={styles.splashVerse}>
            "Read in the name of your Lord who created." — 96:1
          </p>
        </div>
        <div style={styles.splashPattern} />
      </div>
    );
  }

  // ============================================
  // HOME
  // ============================================
  if (screen === "home") {
    const pct = progress.totalAnswered > 0 ? Math.round((progress.totalCorrect / progress.totalAnswered) * 100) : 0;
    return (
      <div style={styles.homeContainer}>
        <style>{globalCSS}</style>
        <div style={styles.homeHeader}>
          <h1 style={styles.homeLogo}>DeenScroll</h1>
          <p style={styles.homeTagline}>Scroll Less, Deen More.</p>
        </div>

        {/* Stats Bar */}
        <div style={styles.statsBar}>
          <div style={styles.statItem}>
            <span style={styles.statNum}>{progress.streak}</span>
            <span style={styles.statLabel}>🔥 Streak</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statItem}>
            <span style={styles.statNum}>{progress.totalAnswered}</span>
            <span style={styles.statLabel}>Answered</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statItem}>
            <span style={styles.statNum}>{pct}%</span>
            <span style={styles.statLabel}>Accuracy</span>
          </div>
        </div>

        {/* Progress Ring */}
        <div style={styles.progressSection}>
          <div style={styles.progressRing}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
              <circle cx="60" cy="60" r="52" fill="none" stroke="#34D399" strokeWidth="8"
                strokeDasharray={`${(progress.seen.length / QUESTIONS.length) * 327} 327`}
                strokeLinecap="round" transform="rotate(-90 60 60)" style={{ transition: "stroke-dasharray 0.5s" }} />
            </svg>
            <div style={styles.progressInner}>
              <span style={styles.progressNum}>{progress.seen.length}</span>
              <span style={styles.progressOf}>/{QUESTIONS.length}</span>
            </div>
          </div>
          <p style={styles.progressLabel}>Questions Explored</p>
        </div>

        {/* Categories */}
        <div style={styles.catSection}>
          <h2 style={styles.catTitle}>Choose a Topic</h2>
          <div style={styles.catGrid}>
            {CATEGORIES.map(cat => {
              const count = cat === "All" ? QUESTIONS.length : QUESTIONS.filter(q => q.cat === cat).length;
              const seenCount = cat === "All" ? progress.seen.length : QUESTIONS.filter(q => q.cat === cat && progress.seen.includes(q.id)).length;
              return (
                <button key={cat} style={{
                  ...styles.catCard,
                  borderColor: cat === "All" ? "rgba(255,255,255,0.15)" : CAT_COLORS[cat] + "40",
                  background: cat === "All" ? "rgba(255,255,255,0.05)" : CAT_COLORS[cat] + "10",
                }} onClick={() => startGame(cat)}>
                  <span style={styles.catIcon}>{CAT_ICONS[cat]}</span>
                  <span style={styles.catName}>{cat}</span>
                  <span style={styles.catCount}>{seenCount}/{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {progress.totalAnswered > 0 && (
          <button style={styles.resetBtn} onClick={resetProgress}>Reset Progress</button>
        )}
      </div>
    );
  }

  // ============================================
  // GAME
  // ============================================
  if (screen === "game" && currentQ) {
    const qNum = currentIdx + 1;
    const total = queue.length;
    const catColor = CAT_COLORS[currentQ.cat] || "#34D399";
    return (
      <div style={styles.gameContainer} onTouchStart={handleSwipe} onTouchEnd={handleSwipe}>
        <style>{globalCSS}</style>
        {/* Top Bar */}
        <div style={styles.gameTopBar}>
          <button style={styles.backBtn} onClick={() => setScreen("home")}>✕</button>
          <div style={styles.gameProgress}>
            <div style={{ ...styles.gameProgressFill, width: `${(qNum / total) * 100}%`, background: catColor }} />
          </div>
          <span style={styles.gameCount}>{qNum}/{total}</span>
        </div>

        {/* Card */}
        <div style={{
          ...styles.card,
          opacity: animDir ? 0 : 1,
          transform: animDir ? "translateY(-30px)" : "translateY(0)",
        }}>
          <div style={{ ...styles.cardCatBadge, background: catColor + "20", color: catColor }}>
            {CAT_ICONS[currentQ.cat]} {currentQ.cat}
          </div>
          <h2 style={styles.cardQuestion}>{currentQ.q}</h2>

          <div style={styles.optionsContainer}>
            {currentQ.opts.map((opt, i) => {
              let optStyle = { ...styles.optionBtn };
              if (selected !== null) {
                if (i === currentQ.ans) {
                  optStyle = { ...optStyle, ...styles.optionCorrect };
                } else if (i === selected && i !== currentQ.ans) {
                  optStyle = { ...optStyle, ...styles.optionWrong };
                } else {
                  optStyle = { ...optStyle, opacity: 0.4 };
                }
              }
              return (
                <button key={i} style={optStyle} onClick={() => handleAnswer(i)}>
                  <span style={styles.optLetter}>{["A", "B", "C", "D"][i]}</span>
                  <span style={styles.optText}>{opt}</span>
                  {selected !== null && i === currentQ.ans && <span style={styles.checkMark}>✓</span>}
                  {selected === i && i !== currentQ.ans && <span style={styles.crossMark}>✗</span>}
                </button>
              );
            })}
          </div>

          {/* Info */}
          {showInfo && (
            <div style={styles.infoBox}>
              <p style={styles.infoText}>{currentQ.info}</p>
              <button style={{ ...styles.nextBtn, background: catColor }} onClick={nextQuestion}>
                {currentIdx + 1 >= queue.length ? "See Results" : "Next Question →"}
              </button>
              <p style={styles.swipeHint}>or swipe up</p>
            </div>
          )}
        </div>

        {/* Session Score */}
        <div style={styles.sessionBar}>
          <span style={{ color: "#34D399" }}>✓ {sessionScore.correct}</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
          <span style={{ color: "#FF6B6B" }}>✗ {sessionScore.total - sessionScore.correct}</span>
        </div>
      </div>
    );
  }

  // ============================================
  // RESULTS
  // ============================================
  if (screen === "results") {
    const pct = sessionScore.total > 0 ? Math.round((sessionScore.correct / sessionScore.total) * 100) : 0;
    let message = "";
    if (pct >= 90) message = "Masha'Allah! Incredible knowledge! 🌟";
    else if (pct >= 70) message = "Alhamdulillah, great work! Keep going! 💪";
    else if (pct >= 50) message = "Good effort! Every question is a learning opportunity. 📚";
    else message = "Keep learning — the reward is in the effort! 🤲";

    return (
      <div style={styles.resultsContainer}>
        <style>{globalCSS}</style>
        <div style={styles.resultsInner}>
          <div style={styles.resultsMoon}>🌙</div>
          <h1 style={styles.resultsTitle}>Session Complete</h1>
          <p style={styles.resultsMessage}>{message}</p>

          <div style={styles.resultsScoreRing}>
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="68" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
              <circle cx="80" cy="80" r="68" fill="none"
                stroke={pct >= 70 ? "#34D399" : pct >= 50 ? "#FFD93D" : "#FF6B6B"}
                strokeWidth="10"
                strokeDasharray={`${(pct / 100) * 427} 427`}
                strokeLinecap="round" transform="rotate(-90 80 80)" />
            </svg>
            <div style={styles.resultsScoreInner}>
              <span style={styles.resultsScorePct}>{pct}%</span>
            </div>
          </div>

          <div style={styles.resultsStats}>
            <div style={styles.resultsStat}>
              <span style={{ ...styles.resultsStatNum, color: "#34D399" }}>{sessionScore.correct}</span>
              <span style={styles.resultsStatLabel}>Correct</span>
            </div>
            <div style={styles.resultsStat}>
              <span style={{ ...styles.resultsStatNum, color: "#FF6B6B" }}>{sessionScore.total - sessionScore.correct}</span>
              <span style={styles.resultsStatLabel}>Missed</span>
            </div>
            <div style={styles.resultsStat}>
              <span style={{ ...styles.resultsStatNum, color: "#FFD93D" }}>{progress.streak}</span>
              <span style={styles.resultsStatLabel}>🔥 Streak</span>
            </div>
          </div>

          <button style={styles.resultsPlayBtn} onClick={() => startGame(category)}>
            Play Again — {category}
          </button>
          <button style={styles.resultsHomeBtn} onClick={() => setScreen("home")}>
            ← Back to Topics
          </button>
        </div>
      </div>
    );
  }

  return null;
}

// ============================================
// GLOBAL CSS
// ============================================
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Amiri:wght@400;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  body { background: #0A0F1C; overflow-x: hidden; }
  button { cursor: pointer; font-family: 'Outfit', sans-serif; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
`;

// ============================================
// STYLES
// ============================================
const styles = {
  // SPLASH
  splashContainer: {
    minHeight: "100vh", background: "linear-gradient(165deg, #0A0F1C 0%, #0D2818 50%, #0A0F1C 100%)",
    display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit', sans-serif",
    position: "relative", overflow: "hidden",
  },
  splashInner: {
    textAlign: "center", zIndex: 2, padding: "2rem", animation: "fadeUp 0.8s ease-out",
  },
  splashMoon: {
    fontSize: "4rem", marginBottom: "1rem", animation: "float 3s ease-in-out infinite",
  },
  splashTitle: {
    fontFamily: "'Amiri', serif", fontSize: "3.5rem", fontWeight: 700, color: "#F0E6D3",
    letterSpacing: "0.02em", lineHeight: 1,
  },
  splashTagline: {
    fontSize: "1.15rem", color: "#34D399", fontWeight: 500, marginTop: "0.5rem", letterSpacing: "0.15em", textTransform: "uppercase",
  },
  splashDivider: {
    width: "60px", height: "2px", background: "linear-gradient(90deg, transparent, #34D399, transparent)",
    margin: "1.5rem auto",
  },
  splashSub: {
    fontSize: "1rem", color: "rgba(240,230,211,0.6)", lineHeight: 1.6, marginBottom: "2.5rem",
  },
  splashBtn: {
    background: "linear-gradient(135deg, #34D399, #059669)", color: "#0A0F1C",
    border: "none", padding: "1rem 2.5rem", borderRadius: "60px", fontSize: "1.1rem",
    fontWeight: 700, letterSpacing: "0.03em", animation: "pulse 2s ease-in-out infinite",
    boxShadow: "0 0 40px rgba(52,211,153,0.3)",
  },
  splashVerse: {
    fontFamily: "'Amiri', serif", fontSize: "0.9rem", color: "rgba(240,230,211,0.35)",
    marginTop: "2.5rem", fontStyle: "italic",
  },
  splashPattern: {
    position: "absolute", inset: 0, zIndex: 1, opacity: 0.03,
    backgroundImage: "repeating-linear-gradient(45deg, #F0E6D3 0px, #F0E6D3 1px, transparent 1px, transparent 20px)",
  },

  // HOME
  homeContainer: {
    minHeight: "100vh", background: "#0A0F1C", fontFamily: "'Outfit', sans-serif",
    padding: "2rem 1.25rem", maxWidth: "480px", margin: "0 auto",
  },
  homeHeader: {
    textAlign: "center", marginBottom: "1.5rem",
  },
  homeLogo: {
    fontFamily: "'Amiri', serif", fontSize: "2rem", color: "#F0E6D3", fontWeight: 700,
  },
  homeTagline: {
    fontSize: "0.75rem", color: "#34D399", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "0.2rem",
  },

  // STATS
  statsBar: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: "1.25rem",
    background: "rgba(255,255,255,0.04)", borderRadius: "16px", padding: "1rem",
    border: "1px solid rgba(255,255,255,0.06)", marginBottom: "1.5rem",
  },
  statItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem" },
  statNum: { fontSize: "1.5rem", fontWeight: 700, color: "#F0E6D3" },
  statLabel: { fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" },
  statDivider: { width: "1px", height: "30px", background: "rgba(255,255,255,0.08)" },

  // PROGRESS RING
  progressSection: { textAlign: "center", marginBottom: "2rem" },
  progressRing: { position: "relative", display: "inline-block" },
  progressInner: {
    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
    display: "flex", alignItems: "baseline", gap: "2px",
  },
  progressNum: { fontSize: "1.8rem", fontWeight: 700, color: "#F0E6D3" },
  progressOf: { fontSize: "0.9rem", color: "rgba(255,255,255,0.3)" },
  progressLabel: { fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginTop: "0.5rem" },

  // CATEGORIES
  catSection: { marginBottom: "2rem" },
  catTitle: { fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", fontWeight: 500, marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" },
  catGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" },
  catCard: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem",
    padding: "1rem 0.5rem", borderRadius: "16px", border: "1px solid",
    background: "rgba(255,255,255,0.03)", transition: "all 0.2s",
  },
  catIcon: { fontSize: "1.5rem" },
  catName: { fontSize: "0.9rem", fontWeight: 600, color: "#F0E6D3" },
  catCount: { fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" },

  resetBtn: {
    display: "block", margin: "0 auto", background: "none", border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.3)", padding: "0.6rem 1.5rem", borderRadius: "30px",
    fontSize: "0.8rem",
  },

  // GAME
  gameContainer: {
    minHeight: "100vh", background: "#0A0F1C", fontFamily: "'Outfit', sans-serif",
    padding: "1rem 1.25rem", maxWidth: "480px", margin: "0 auto",
    display: "flex", flexDirection: "column",
  },
  gameTopBar: {
    display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem",
  },
  backBtn: {
    background: "rgba(255,255,255,0.06)", border: "none", color: "#F0E6D3",
    width: "36px", height: "36px", borderRadius: "50%", fontSize: "1rem",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  gameProgress: {
    flex: 1, height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden",
  },
  gameProgressFill: {
    height: "100%", borderRadius: "3px", transition: "width 0.4s ease",
  },
  gameCount: { fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", fontWeight: 500, minWidth: "3rem", textAlign: "right" },

  // CARD
  card: {
    flex: 1, display: "flex", flexDirection: "column", transition: "all 0.25s ease",
  },
  cardCatBadge: {
    display: "inline-flex", alignItems: "center", gap: "0.35rem",
    padding: "0.35rem 0.85rem", borderRadius: "20px", fontSize: "0.75rem",
    fontWeight: 600, alignSelf: "flex-start", marginBottom: "1rem",
  },
  cardQuestion: {
    fontSize: "1.35rem", fontWeight: 600, color: "#F0E6D3", lineHeight: 1.4, marginBottom: "1.5rem",
  },
  optionsContainer: { display: "flex", flexDirection: "column", gap: "0.6rem" },
  optionBtn: {
    display: "flex", alignItems: "center", gap: "0.75rem", width: "100%",
    padding: "1rem 1.1rem", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)", color: "#F0E6D3", fontSize: "0.95rem",
    textAlign: "left", transition: "all 0.2s", position: "relative",
  },
  optionCorrect: {
    background: "rgba(52,211,153,0.12)", borderColor: "#34D399", color: "#34D399",
  },
  optionWrong: {
    background: "rgba(255,107,107,0.12)", borderColor: "#FF6B6B", color: "#FF6B6B",
  },
  optLetter: {
    width: "28px", height: "28px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(255,255,255,0.06)", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0,
  },
  optText: { flex: 1, fontWeight: 500 },
  checkMark: { fontSize: "1.2rem", fontWeight: 700, color: "#34D399" },
  crossMark: { fontSize: "1.2rem", fontWeight: 700, color: "#FF6B6B" },

  // INFO
  infoBox: {
    marginTop: "1.25rem", padding: "1.25rem", borderRadius: "16px",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
    animation: "fadeUp 0.3s ease-out",
  },
  infoText: {
    fontSize: "0.9rem", color: "rgba(240,230,211,0.7)", lineHeight: 1.6, marginBottom: "1rem",
  },
  nextBtn: {
    width: "100%", padding: "0.85rem", borderRadius: "12px", border: "none",
    color: "#0A0F1C", fontSize: "1rem", fontWeight: 700,
  },
  swipeHint: { textAlign: "center", fontSize: "0.7rem", color: "rgba(255,255,255,0.2)", marginTop: "0.5rem" },

  // SESSION BAR
  sessionBar: {
    display: "flex", justifyContent: "center", gap: "0.75rem", padding: "0.75rem",
    fontSize: "0.85rem", fontWeight: 600, fontFamily: "'Outfit', sans-serif",
  },

  // RESULTS
  resultsContainer: {
    minHeight: "100vh", background: "linear-gradient(165deg, #0A0F1C 0%, #0D2818 50%, #0A0F1C 100%)",
    fontFamily: "'Outfit', sans-serif", display: "flex", alignItems: "center", justifyContent: "center",
  },
  resultsInner: {
    textAlign: "center", padding: "2rem", animation: "fadeUp 0.6s ease-out", maxWidth: "400px",
  },
  resultsMoon: { fontSize: "3rem", marginBottom: "0.5rem" },
  resultsTitle: {
    fontFamily: "'Amiri', serif", fontSize: "2rem", color: "#F0E6D3", marginBottom: "0.5rem",
  },
  resultsMessage: { fontSize: "1rem", color: "rgba(240,230,211,0.6)", marginBottom: "2rem" },
  resultsScoreRing: { position: "relative", display: "inline-block", marginBottom: "2rem" },
  resultsScoreInner: {
    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
  },
  resultsScorePct: { fontSize: "2.5rem", fontWeight: 800, color: "#F0E6D3" },
  resultsStats: {
    display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "2rem",
  },
  resultsStat: { display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem" },
  resultsStatNum: { fontSize: "1.5rem", fontWeight: 700 },
  resultsStatLabel: { fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" },
  resultsPlayBtn: {
    width: "100%", padding: "1rem", borderRadius: "14px", border: "none",
    background: "linear-gradient(135deg, #34D399, #059669)", color: "#0A0F1C",
    fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem",
  },
  resultsHomeBtn: {
    width: "100%", padding: "0.85rem", borderRadius: "14px",
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#F0E6D3", fontSize: "0.9rem", fontWeight: 500,
  },
};
