import { useState } from 'react'
import Landing from './Landing.jsx'
import Trivia from './Trivia.jsx'
import SurahMatch from './SurahMatch.jsx'

export default function App() {
  const [page, setPage] = useState('landing')

  const navigate = (p) => {
    setPage(p)
    window.scrollTo(0, 0)
  }

  if (page === 'trivia') return <Trivia onBack={() => navigate('landing')} />
  if (page === 'surah-match') return <SurahMatch onBack={() => navigate('landing')} />
  return <Landing onNavigate={navigate} />
}
