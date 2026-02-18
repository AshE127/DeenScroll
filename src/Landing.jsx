import { useState, useEffect } from 'react'
import UserButton from './UserButton.jsx'
import { useAuth } from './AuthContext.jsx'

export default function Landing({ onNavigate }) {
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [gamesOpen, setGamesOpen] = useState(false)
  const [premContentOpen, setPremContentOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const { getRemainingPlays, isPremium, user, signInWithGoogle } = useAuth()
  useEffect(() => { setVisible(true) }, [])

  const freeGames = [
    { id: 'trivia', name: 'Islamic Trivia', emoji: '🧠', limit: 10, desc: '150+ questions, 6 categories' },
    { id: 'surah-match', name: 'Surah Match', emoji: '📖', limit: 3, desc: 'Match 114 surahs' },
    { id: 'emoji', name: 'Guess the Emoji', emoji: '🤔', limit: 5, desc: '64 Islamic puzzles' },
    { id: 'hadith', name: 'True or False', emoji: '⚖️', limit: 10, desc: '80 hadith statements' },
    { id: 'bingo', name: 'Islamic Bingo', emoji: '🎯', limit: null, desc: 'Daily & weekly deeds' },
  ]

  const premiumContent = [
    { id: 'facts', name: 'Fun Islamic Facts', emoji: '💡', desc: '90+ swipeable facts, 9 categories' },
    { id: 'stories', name: 'Prophet Stories', emoji: '📜', desc: '20 powerful stories with reflections' },
    { id: 'mood', name: 'Mood Reminders', emoji: '🤲', desc: '12 moods, personalized ayahs & duas' },
  ]

  const nav = (id) => { setMenuOpen(false); onNavigate(id) }

  return (
    <div style={s.container}>
      <style>{css}</style>

      {/* NAV */}
      <nav style={s.nav}>
        <span style={s.logo}>DeenScroll</span>
        <div style={s.navRight}>
          <UserButton />
          <button style={s.burger} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* MENU OVERLAY */}
      {menuOpen && (
        <div style={s.menuOverlay} onClick={() => setMenuOpen(false)}>
          <div style={s.menu} onClick={e => e.stopPropagation()}>

            {/* GAMES - collapsible */}
            <div style={s.menuSection}>
              <button style={s.menuToggle} onClick={() => setGamesOpen(!gamesOpen)}>
                <span style={s.menuLabel}>🎮 Games</span>
                <span style={s.menuArrow}>{gamesOpen ? '▾' : '▸'}</span>
              </button>
              {gamesOpen && (
                <div style={s.menuItems}>
                  {freeGames.map(g => (
                    <button key={g.id} style={s.menuItem} onClick={() => nav(g.id)}>
                      <span>{g.emoji} {g.name}</span>
                      {!isPremium && g.limit && <span style={s.menuBadge}>{getRemainingPlays(g.id)} left</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PREMIUM CONTENT - collapsible */}
            <div style={s.menuSection}>
              <button style={s.menuToggle} onClick={() => setPremContentOpen(!premContentOpen)}>
                <span style={s.menuLabel}>{isPremium ? '✨ Content' : '🔒 Premium Content'}</span>
                <span style={s.menuArrow}>{premContentOpen ? '▾' : '▸'}</span>
              </button>
              {premContentOpen && (
                <div style={s.menuItems}>
                  {premiumContent.map(g => (
                    <button key={g.id} style={s.menuItem} onClick={() => {
                      if (!isPremium) {
                        if (!user) signInWithGoogle()
                        else window.open(`https://buy.stripe.com/aFaeVe2jt6Wb9IG3pi28800?client_reference_id=${user?.uid || 'guest'}`, '_blank')
                        return
                      }
                      nav(g.id)
                    }}>
                      <span>{g.emoji} {g.name}</span>
                      {!isPremium && <span style={s.menuLock}>⭐</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ACCOUNT - collapsible */}
            <div style={s.menuSection}>
              <button style={s.menuToggle} onClick={() => setAccountOpen(!accountOpen)}>
                <span style={s.menuLabel}>👤 Account</span>
                <span style={s.menuArrow}>{accountOpen ? '▾' : '▸'}</span>
              </button>
              {accountOpen && (
                <div style={s.menuItems}>
                  {user ? (
                    <>
                      <div style={s.menuAccount}>
                        <span style={s.menuAccountName}>{user.displayName || user.email}</span>
                        <span style={s.menuAccountStatus}>
                          {isPremium ? '⭐ Premium Member' : '🆓 Free Plan'}
                        </span>
                      </div>
                      <button style={s.menuItem} onClick={() => nav('account')}>
                        <span>⚙️ Settings & Membership</span>
                        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }}>→</span>
                      </button>
                      {!isPremium && (
                        <button style={s.menuUpgrade} onClick={() => {
                          setMenuOpen(false)
                          window.open(`https://buy.stripe.com/aFaeVe2jt6Wb9IG3pi28800?client_reference_id=${user?.uid || 'guest'}`, '_blank')
                        }}>
                          ⭐ Upgrade to Premium — $5/mo
                        </button>
                      )}
                    </>
                  ) : (
                    <button style={s.menuSignIn} onClick={signInWithGoogle}>
                      Sign in with Google
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* ABOUT - direct link */}
            <div style={s.menuSection}>
              <button style={s.menuToggle} onClick={() => nav('about')}>
                <span style={s.menuLabel}>ℹ️ About</span>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }}>→</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* HERO */}
      <section style={{
        ...s.hero,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
      }}>
        <div style={s.heroMoon}>🌙</div>
        <h1 style={s.heroTitle}>Scroll Less,<br/>Deen More.</h1>
        <p style={s.heroSub}>
          Bite-sized Islamic knowledge that replaces your doomscroll.
          Learn your deen one swipe at a time.
        </p>
        {!isPremium && (
          <div style={s.freeBanner}>
            <span style={s.freeLabel}>🆓 FREE PLAN</span>
            <span style={s.freeText}>Limited daily plays • Upgrade for unlimited access</span>
            <button style={s.freeUpgradeBtn} onClick={() => {
              if (!user) signInWithGoogle();
              else window.open(`https://buy.stripe.com/aFaeVe2jt6Wb9IG3pi28800?client_reference_id=${user?.uid || 'guest'}`, '_blank');
            }}>
              🌙 Unlock All Access — More Deen, No Limits
            </button>
          </div>
        )}
        {isPremium && (
          <div style={s.premBanner}>
            <span style={s.premLabel}>⭐ PREMIUM</span>
            <span style={s.premText}>Unlimited access to all games & content</span>
          </div>
        )}
      </section>

      {/* FREE GAMES */}
      <section style={s.section}>
        <div style={s.sectionHeader}>
          <span style={s.sectionIcon}>🎮</span>
          <div>
            <h2 style={s.sectionTitle}>{isPremium ? 'All Games' : 'Free Games'}</h2>
            <p style={s.sectionSub}>{isPremium ? 'Unlimited access' : 'Daily limits apply'}</p>
          </div>
        </div>
        <div style={s.gameGrid}>
          {freeGames.map(g => {
            const remaining = getRemainingPlays(g.id)
            const atLimit = !isPremium && g.limit && remaining <= 0
            return (
              <button key={g.id} style={{ ...s.gameCard, opacity: atLimit ? 0.5 : 1 }} onClick={() => onNavigate(g.id)}>
                <span style={s.gameEmoji}>{g.emoji}</span>
                <span style={s.gameName}>{g.name}</span>
                <span style={s.gameDesc}>{g.desc}</span>
                {!isPremium && g.limit ? (
                  <span style={{
                    ...s.gameLimit,
                    color: remaining <= 2 ? '#FF6B6B' : remaining <= 5 ? '#FFD93D' : '#34D399',
                  }}>
                    {atLimit ? '🔒 Limit reached' : `${remaining}/${g.limit} plays left`}
                  </span>
                ) : (
                  <span style={{ ...s.gameLimit, color: '#34D399' }}>
                    {isPremium ? '∞ Unlimited' : '✓ Free'}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </section>

      {/* PREMIUM CONTENT */}
      <section style={s.section}>
        <div style={s.sectionHeader}>
          <span style={s.sectionIcon}>{isPremium ? '📚' : '🔒'}</span>
          <div>
            <h2 style={s.sectionTitle}>{isPremium ? 'Premium Content' : 'Premium Content'}</h2>
            <p style={s.sectionSub}>{isPremium ? 'Your exclusive content' : 'Upgrade to unlock'}</p>
          </div>
        </div>
        <div style={s.gameGrid}>
          {premiumContent.map(g => (
            <button key={g.id} style={s.gameCard} onClick={() => {
              if (isPremium) { onNavigate(g.id) }
              else {
                if (!user) signInWithGoogle()
                window.open(`https://buy.stripe.com/aFaeVe2jt6Wb9IG3pi28800?client_reference_id=${user?.uid || 'guest'}`, '_blank')
              }
            }}>
              <span style={s.gameEmoji}>{g.emoji}</span>
              <span style={s.gameName}>{g.name}</span>
              <span style={s.gameDesc}>{g.desc}</span>
              {isPremium ? (
                <span style={{ ...s.gameLimit, color: '#FFD93D' }}>⭐ Premium</span>
              ) : (
                <span style={{ ...s.gameLimit, color: '#A78BFA' }}>🔒 Premium Only</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* PREMIUM UPSELL (free users only) */}
      {!isPremium && (
        <section style={s.upsell}>
          <div style={s.upsellInner}>
            <span style={s.upsellIcon}>⭐</span>
            <h2 style={s.upsellTitle}>Go Premium</h2>
            <p style={s.upsellText}>
              Unlimited plays on all games, full access to Fun Facts,
              Prophet Stories, Mood Reminders, ad-free experience, and early access to new content.
            </p>
            <div style={s.upsellPrice}>
              <span style={s.priceAmount}>$5</span>
              <span style={s.pricePer}>/month</span>
            </div>
            <div style={s.upsellPerks}>
              <span style={s.perk}>✓ Unlimited game plays</span>
              <span style={s.perk}>✓ 3 exclusive content sections</span>
              <span style={s.perk}>✓ Ad-free experience</span>
              <span style={s.perk}>✓ Full stats dashboard</span>
              <span style={s.perk}>✓ Cancel anytime</span>
            </div>
            <button style={s.upsellBtn} onClick={() => {
              if (!user) signInWithGoogle()
              window.open(`https://buy.stripe.com/aFaeVe2jt6Wb9IG3pi28800?client_reference_id=${user?.uid || 'guest'}`, '_blank')
            }}>
              {user ? 'Upgrade Now ⭐' : 'Sign In & Upgrade ⭐'}
            </button>
          </div>
        </section>
      )}

      {/* WHAT IS DEENSCROLL */}
      <section style={s.aboutSection}>
        <span style={s.aboutLabel}>What is DeenScroll?</span>
        <h2 style={s.aboutTitle}>Your doomscroll replacement</h2>
        <p style={s.aboutText}>
          We spend hours scrolling through content that doesn't benefit us.
          DeenScroll replaces that habit with engaging Islamic knowledge —
          trivia, stories, and more — designed to feel just as
          addictive, but actually good for your akhirah.
        </p>
      </section>

      {/* FOOTER */}
      <footer style={s.footer}>
        <span style={s.footerLogo}>DeenScroll</span>
        <span style={s.footerTagline}>Scroll Less, Deen More.</span>
        <span style={s.footerCopy}>© 2026 DeenScroll. All rights reserved.</span>
      </footer>

      <div style={s.bgPattern} />
    </div>
  )
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Amiri:wght@400;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  body { background: #0A0F1C; }
  button { cursor: pointer; font-family: 'Outfit', sans-serif; }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideIn { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
  html { scroll-behavior: smooth; }
`

const s = {
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
    padding: '1rem 1.25rem', maxWidth: '600px', margin: '0 auto',
  },
  logo: { fontFamily: "'Amiri', serif", fontSize: '1.4rem', color: '#F0E6D3', fontWeight: 700 },
  navRight: { display: 'flex', alignItems: 'center', gap: '0.6rem' },
  burger: {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#F0E6D3', width: '38px', height: '38px', borderRadius: '10px',
    fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },

  // MENU
  menuOverlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.7)', zIndex: 100,
  },
  menu: {
    position: 'fixed', top: 0, right: 0, bottom: 0, width: '85%', maxWidth: '340px',
    background: 'linear-gradient(180deg, #141A2E 0%, #0F1522 100%)',
    padding: '1.5rem', overflowY: 'auto', animation: 'slideIn 0.25s ease-out',
    borderLeft: '1px solid rgba(255,255,255,0.06)',
  },
  menuSection: { marginBottom: '0.5rem' },
  menuToggle: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    width: '100%', padding: '0.7rem 0.5rem', background: 'none', border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer',
  },
  menuArrow: { fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' },
  menuItems: { padding: '0.3rem 0 0.3rem 0.5rem' },
  menuLabel: {
    fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase',
    letterSpacing: '0.12em', fontWeight: 700,
  },
  menuItem: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    width: '100%', padding: '0.7rem 0.5rem', background: 'none', border: 'none',
    color: '#F0E6D3', fontSize: '0.9rem', fontWeight: 500, textAlign: 'left',
    borderRadius: '8px',
  },
  menuBadge: {
    fontSize: '0.65rem', color: '#34D399', background: 'rgba(52,211,153,0.1)',
    padding: '0.15rem 0.5rem', borderRadius: '8px', fontWeight: 600,
  },
  menuLock: { fontSize: '0.7rem' },
  menuAccount: {
    padding: '0.6rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '0.2rem',
  },
  menuAccountName: { fontSize: '0.9rem', color: '#F0E6D3', fontWeight: 600 },
  menuAccountStatus: { fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' },
  menuSignIn: {
    width: '100%', padding: '0.7rem', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
    color: '#F0E6D3', fontSize: '0.85rem', fontWeight: 600,
  },
  menuUpgrade: {
    width: '100%', padding: '0.75rem', marginTop: '0.5rem', borderRadius: '10px', border: 'none',
    background: 'linear-gradient(135deg, #FFD93D, #F97316)', color: '#0A0F1C',
    fontSize: '0.85rem', fontWeight: 700,
  },

  // HERO
  hero: {
    textAlign: 'center', padding: '2.5rem 1.25rem 1.5rem', maxWidth: '600px', margin: '0 auto',
    transition: 'all 0.8s ease-out',
  },
  heroMoon: { fontSize: '3.5rem', marginBottom: '1rem', animation: 'float 3s ease-in-out infinite' },
  heroTitle: {
    fontFamily: "'Amiri', serif", fontSize: 'clamp(2.2rem, 8vw, 3.5rem)',
    color: '#F0E6D3', fontWeight: 700, lineHeight: 1.1,
  },
  heroSub: {
    fontSize: '1rem', color: 'rgba(240,230,211,0.45)', lineHeight: 1.6,
    maxWidth: '420px', margin: '1rem auto 1.25rem',
  },
  freeBanner: {
    display: 'inline-flex', flexDirection: 'column', gap: '0.2rem',
    padding: '0.6rem 1.25rem', borderRadius: '14px',
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
  },
  freeLabel: { fontSize: '0.7rem', fontWeight: 700, color: '#34D399', letterSpacing: '0.1em' },
  freeText: { fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' },
  freeUpgradeBtn: {
    marginTop: '0.6rem', padding: '0.55rem 1.2rem', borderRadius: '10px', border: 'none',
    background: 'linear-gradient(135deg, rgba(255,217,61,0.15), rgba(249,115,22,0.15))',
    color: '#FFD93D', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.02em',
    cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
  },
  premBanner: {
    display: 'inline-flex', flexDirection: 'column', gap: '0.2rem',
    padding: '0.6rem 1.25rem', borderRadius: '14px',
    background: 'rgba(255,217,61,0.06)', border: '1px solid rgba(255,217,61,0.15)',
  },
  premLabel: { fontSize: '0.7rem', fontWeight: 700, color: '#FFD93D', letterSpacing: '0.1em' },
  premText: { fontSize: '0.65rem', color: 'rgba(255,217,61,0.4)' },

  // SECTIONS
  section: { padding: '1.5rem 1.25rem', maxWidth: '600px', margin: '0 auto' },
  sectionHeader: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' },
  sectionIcon: { fontSize: '1.5rem' },
  sectionTitle: { fontFamily: "'Amiri', serif", fontSize: '1.4rem', color: '#F0E6D3', fontWeight: 700 },
  sectionSub: { fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)' },

  // GAME GRID
  gameGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.6rem' },
  gameCard: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
    padding: '1.1rem 0.75rem', borderRadius: '16px',
    background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)',
    textAlign: 'center', transition: 'all 0.2s',
  },
  gameEmoji: { fontSize: '1.8rem' },
  gameName: { fontSize: '0.85rem', fontWeight: 700, color: '#F0E6D3' },
  gameDesc: { fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', lineHeight: 1.3 },
  gameLimit: { fontSize: '0.6rem', fontWeight: 600, marginTop: '0.2rem' },

  // UPSELL
  upsell: { padding: '2rem 1.25rem', maxWidth: '600px', margin: '0 auto' },
  upsellInner: {
    background: 'linear-gradient(135deg, rgba(255,217,61,0.04), rgba(249,115,22,0.04))',
    border: '1px solid rgba(255,217,61,0.12)', borderRadius: '24px',
    padding: '2rem 1.5rem', textAlign: 'center',
  },
  upsellIcon: { fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' },
  upsellTitle: { fontFamily: "'Amiri', serif", fontSize: '1.8rem', color: '#F0E6D3', marginBottom: '0.5rem' },
  upsellText: { fontSize: '0.85rem', color: 'rgba(240,230,211,0.4)', lineHeight: 1.6, maxWidth: '350px', margin: '0 auto 1rem' },
  upsellPrice: { marginBottom: '1rem' },
  priceAmount: { fontSize: '2.5rem', fontWeight: 800, color: '#F0E6D3' },
  pricePer: { fontSize: '1rem', color: 'rgba(240,230,211,0.4)' },
  upsellPerks: { display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.5rem' },
  perk: { fontSize: '0.8rem', color: 'rgba(240,230,211,0.5)' },
  upsellBtn: {
    width: '100%', padding: '0.9rem', borderRadius: '14px', border: 'none',
    background: 'linear-gradient(135deg, #FFD93D, #F97316)', color: '#0A0F1C',
    fontSize: '1rem', fontWeight: 700, boxShadow: '0 0 30px rgba(255,217,61,0.15)',
  },

  // ABOUT
  aboutSection: { padding: '2rem 1.25rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' },
  aboutLabel: {
    fontSize: '0.65rem', color: '#34D399', textTransform: 'uppercase',
    letterSpacing: '0.2em', fontWeight: 600,
  },
  aboutTitle: {
    fontFamily: "'Amiri', serif", fontSize: '1.6rem', color: '#F0E6D3',
    marginTop: '0.4rem', marginBottom: '0.75rem',
  },
  aboutText: {
    fontSize: '0.9rem', color: 'rgba(240,230,211,0.4)', lineHeight: 1.7,
    maxWidth: '450px', margin: '0 auto',
  },

  // FOOTER
  footer: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
    padding: '2.5rem 1.5rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.04)',
  },
  footerLogo: { fontFamily: "'Amiri', serif", fontSize: '1.1rem', color: 'rgba(240,230,211,0.25)', fontWeight: 700 },
  footerTagline: { fontSize: '0.6rem', color: 'rgba(52,211,153,0.25)', textTransform: 'uppercase', letterSpacing: '0.2em' },
  footerCopy: { fontSize: '0.65rem', color: 'rgba(255,255,255,0.12)', marginTop: '0.4rem' },

  bgPattern: {
    position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.015,
    backgroundImage: 'repeating-linear-gradient(45deg, #F0E6D3 0px, #F0E6D3 1px, transparent 1px, transparent 24px)',
  },
}
