import { useState, useEffect } from 'react'

export default function Landing({ onNavigate }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { setVisible(true) }, [])

  return (
    <div style={styles.container}>
      <style>{css}</style>

      {/* Nav */}
      <nav style={styles.nav}>
        <span style={styles.navLogo}>DeenScroll</span>
        <div style={styles.navLinks}>
          <button style={styles.navLink} onClick={() => onNavigate('trivia')}>Trivia</button>
          <button style={styles.navLink} onClick={() => onNavigate('surah-match')}>Surah Match</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        ...styles.hero,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
      }}>
        <div style={styles.heroMoon}>🌙</div>
        <h1 style={styles.heroTitle}>Scroll Less,<br/>Deen More.</h1>
        <p style={styles.heroSub}>
          Bite-sized Islamic knowledge that replaces your doomscroll.
          Learn your deen one swipe at a time.
        </p>
        <div style={styles.heroBtns}>
          <button style={styles.heroPrimary} onClick={() => onNavigate('trivia')}>
            Play Islamic Trivia
          </button>
          <button style={styles.heroSecondary} onClick={() => onNavigate('surah-match')}>
            Try Surah Match
          </button>
        </div>
        <p style={styles.heroNote}>Free. No sign-up required.</p>
      </section>

      {/* What is DeenScroll */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <span style={styles.sectionLabel}>What is DeenScroll?</span>
          <h2 style={styles.sectionTitle}>Your doomscroll replacement</h2>
          <p style={styles.sectionText}>
            We spend hours scrolling through content that doesn't benefit us.
            DeenScroll replaces that habit with engaging Islamic knowledge —
            trivia, surah matching, and more — designed to feel just as
            addictive, but actually good for your akhirah.
          </p>
        </div>
      </section>

      {/* Features */}
      <section style={styles.featuresSection}>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>🧠</span>
            <h3 style={styles.featureTitle}>Islamic Trivia</h3>
            <p style={styles.featureDesc}>
              150+ questions across Quran, Seerah, Prophets, Fiqh, History, and Ramadan.
              Smart spaced repetition so you actually retain what you learn.
            </p>
            <button style={styles.featureBtn} onClick={() => onNavigate('trivia')}>
              Play Now →
            </button>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>📖</span>
            <h3 style={styles.featureTitle}>Surah Match</h3>
            <p style={styles.featureDesc}>
              Match Arabic surah names to their English meanings.
              All 114 surahs with transliteration to help you learn pronunciation.
            </p>
            <button style={styles.featureBtn} onClick={() => onNavigate('surah-match')}>
              Play Now →
            </button>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>🔥</span>
            <h3 style={styles.featureTitle}>Daily Streaks</h3>
            <p style={styles.featureDesc}>
              Build a learning habit with daily streak tracking.
              Come back every day and watch your knowledge grow.
            </p>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>🌙</span>
            <h3 style={styles.featureTitle}>Ramadan Ready</h3>
            <p style={styles.featureDesc}>
              Perfect for Ramadan — dedicate just 10 minutes of your screen time
              to learning instead of scrolling.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof / CTA */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaInner}>
          <span style={styles.ctaVerse}>
            "Read in the name of your Lord who created." — 96:1
          </span>
          <h2 style={styles.ctaTitle}>Ready to scroll with purpose?</h2>
          <p style={styles.ctaText}>
            Start learning right now. No account needed. No downloads. Just tap and go.
          </p>
          <div style={styles.ctaBtns}>
            <button style={styles.heroPrimary} onClick={() => onNavigate('trivia')}>
              Start Islamic Trivia
            </button>
            <button style={styles.heroSecondary} onClick={() => onNavigate('surah-match')}>
              Try Surah Match
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <span style={styles.footerLogo}>DeenScroll</span>
        <span style={styles.footerTagline}>Scroll Less, Deen More.</span>
        <span style={styles.footerCopy}>© 2025 DeenScroll. All rights reserved.</span>
      </footer>

      {/* BG */}
      <div style={styles.bgPattern} />
    </div>
  )
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Amiri:wght@400;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  body { background: #0A0F1C; }
  button { cursor: pointer; font-family: 'Outfit', sans-serif; }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  html { scroll-behavior: smooth; }
`

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(170deg, #0A0F1C 0%, #0B1A2E 30%, #0D2818 60%, #0A0F1C 100%)',
    fontFamily: "'Outfit', sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },

  // NAV
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '1.25rem 1.5rem', maxWidth: '900px', margin: '0 auto',
  },
  navLogo: {
    fontFamily: "'Amiri', serif", fontSize: '1.4rem', color: '#F0E6D3', fontWeight: 700,
  },
  navLinks: { display: 'flex', gap: '0.5rem' },
  navLink: {
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
    color: 'rgba(240,230,211,0.6)', padding: '0.45rem 1rem', borderRadius: '25px',
    fontSize: '0.8rem', fontWeight: 500,
  },

  // HERO
  hero: {
    textAlign: 'center', padding: '4rem 1.5rem 3rem', maxWidth: '700px', margin: '0 auto',
    transition: 'all 0.8s ease-out',
  },
  heroMoon: { fontSize: '4rem', marginBottom: '1.25rem', animation: 'float 3s ease-in-out infinite' },
  heroTitle: {
    fontFamily: "'Amiri', serif", fontSize: 'clamp(2.5rem, 8vw, 4rem)',
    color: '#F0E6D3', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.01em',
  },
  heroSub: {
    fontSize: '1.1rem', color: 'rgba(240,230,211,0.5)', lineHeight: 1.6,
    maxWidth: '480px', margin: '1.25rem auto 2rem',
  },
  heroBtns: {
    display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap',
  },
  heroPrimary: {
    background: 'linear-gradient(135deg, #34D399, #059669)', color: '#0A0F1C',
    border: 'none', padding: '0.9rem 2rem', borderRadius: '50px',
    fontSize: '1rem', fontWeight: 700, boxShadow: '0 0 30px rgba(52,211,153,0.25)',
  },
  heroSecondary: {
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
    color: '#F0E6D3', padding: '0.9rem 2rem', borderRadius: '50px',
    fontSize: '1rem', fontWeight: 500,
  },
  heroNote: {
    fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', marginTop: '1rem',
  },

  // SECTION
  section: {
    padding: '3rem 1.5rem', maxWidth: '700px', margin: '0 auto',
  },
  sectionInner: { textAlign: 'center' },
  sectionLabel: {
    fontSize: '0.7rem', color: '#34D399', textTransform: 'uppercase',
    letterSpacing: '0.2em', fontWeight: 600,
  },
  sectionTitle: {
    fontFamily: "'Amiri', serif", fontSize: '2rem', color: '#F0E6D3',
    marginTop: '0.5rem', marginBottom: '1rem',
  },
  sectionText: {
    fontSize: '1rem', color: 'rgba(240,230,211,0.45)', lineHeight: 1.7,
    maxWidth: '520px', margin: '0 auto',
  },

  // FEATURES
  featuresSection: {
    padding: '2rem 1.5rem 4rem', maxWidth: '900px', margin: '0 auto',
  },
  featuresGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1rem',
  },
  featureCard: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '20px', padding: '1.75rem 1.25rem',
    display: 'flex', flexDirection: 'column', gap: '0.5rem',
  },
  featureIcon: { fontSize: '2rem' },
  featureTitle: { fontSize: '1.1rem', fontWeight: 700, color: '#F0E6D3' },
  featureDesc: { fontSize: '0.85rem', color: 'rgba(240,230,211,0.4)', lineHeight: 1.6, flex: 1 },
  featureBtn: {
    background: 'none', border: 'none', color: '#34D399', fontSize: '0.85rem',
    fontWeight: 600, textAlign: 'left', padding: '0.5rem 0 0', marginTop: 'auto',
  },

  // CTA
  ctaSection: {
    padding: '4rem 1.5rem', maxWidth: '700px', margin: '0 auto', textAlign: 'center',
  },
  ctaInner: {},
  ctaVerse: {
    fontFamily: "'Amiri', serif", fontSize: '0.95rem', color: 'rgba(240,230,211,0.25)',
    fontStyle: 'italic', display: 'block', marginBottom: '1.5rem',
  },
  ctaTitle: {
    fontFamily: "'Amiri', serif", fontSize: '2rem', color: '#F0E6D3', marginBottom: '0.75rem',
  },
  ctaText: {
    fontSize: '1rem', color: 'rgba(240,230,211,0.4)', lineHeight: 1.6,
    maxWidth: '450px', margin: '0 auto 2rem',
  },
  ctaBtns: {
    display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap',
  },

  // FOOTER
  footer: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
    padding: '3rem 1.5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.04)',
  },
  footerLogo: {
    fontFamily: "'Amiri', serif", fontSize: '1.2rem', color: 'rgba(240,230,211,0.3)', fontWeight: 700,
  },
  footerTagline: {
    fontSize: '0.65rem', color: 'rgba(52,211,153,0.3)', textTransform: 'uppercase', letterSpacing: '0.2em',
  },
  footerCopy: {
    fontSize: '0.7rem', color: 'rgba(255,255,255,0.15)', marginTop: '0.5rem',
  },

  bgPattern: {
    position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.015,
    backgroundImage: 'repeating-linear-gradient(45deg, #F0E6D3 0px, #F0E6D3 1px, transparent 1px, transparent 24px)',
  },
}
