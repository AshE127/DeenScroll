import { useState, useEffect } from 'react'
import Landing from './Landing.jsx'
import Trivia from './Trivia.jsx'
import SurahMatch from './SurahMatch.jsx'
import EmojiGame from './EmojiGame.jsx'
import HadithTF from './HadithTF.jsx'
import FunFacts from './FunFacts.jsx'
import ProphetStories from './ProphetStories.jsx'
import MoodReminders from './MoodReminders.jsx'
import IslamicBingo from './IslamicBingo.jsx'

export default function App() {
  const [page, setPage] = useState('landing')

  useEffect(() => {
    const handlePop = () => {
      setPage('landing')
    }
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  const navigate = (p) => {
    if (p !== 'landing') {
      window.history.pushState({ page: p }, '', '/' + p)
    } else {
      window.history.pushState({ page: 'landing' }, '', '/')
    }
    setPage(p)
    window.scrollTo(0, 0)
  }

  if (page === 'trivia') return <Trivia onBack={() => navigate('landing')} />
  if (page === 'surah-match') return <SurahMatch onBack={() => navigate('landing')} />
  if (page === 'emoji') return <EmojiGame onBack={() => navigate('landing')} />
  if (page === 'hadith') return <HadithTF onBack={() => navigate('landing')} />
  if (page === 'facts') return <FunFacts onBack={() => navigate('landing')} />
  if (page === 'stories') return <ProphetStories onBack={() => navigate('landing')} />
  if (page === 'mood') return <MoodReminders onBack={() => navigate('landing')} />
  if (page === 'bingo') return <IslamicBingo onBack={() => navigate('landing')} />
  return <Landing onNavigate={navigate} />
}
