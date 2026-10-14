import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { PasswordScreen } from './components/PasswordScreen'
import { PWAUpdatePrompt } from './components/PWAUpdatePrompt'
import { TicketAuthProvider } from './context/TicketAuthProvider'
import { useTicketAuth } from './context/useTicketAuth'
import programmeData from './data/sitges-programme.json'
import { AllFilmsPage } from './pages/AllFilmsPage'
import { ApuntsPage } from './pages/ApuntsPage'
import { FilmDetailPage } from './pages/FilmDetailPage'
import { HorariPage } from './pages/HorariPage'
import { MarathonDetailPage } from './pages/MarathonDetailPage'
import { WelcomePage } from './pages/WelcomePage'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function DetailRoute() {
  const { id } = useParams<{ id: string }>()
  const isMarathon = programmeData.marathons.some((m) => m.id === id)

  if (isMarathon) {
    return <MarathonDetailPage />
  }

  return <FilmDetailPage />
}

function AppContent() {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const location = useLocation()
  const isFilmsPage = location.pathname === '/films'
  const { isUnlocked } = useTicketAuth()

  return (
    <div className="min-h-screen bg-[#EFECE6] text-black font-['Montserrat'] flex flex-col justify-between">
      <Header
        showFilterToggle={isFilmsPage}
        onToggleFilter={() => setIsFilterOpen((prev) => !prev)}
      />
      <main className="flex-1 w-full flex flex-col">
        {!isUnlocked ? (
          <PasswordScreen />
        ) : (
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route
              path="/films"
              element={
                <AllFilmsPage
                  isFilterOpen={isFilterOpen}
                  setIsFilterOpen={setIsFilterOpen}
                />
              }
            />
            <Route path="/films/:id" element={<DetailRoute />} />
            <Route path="/films/:id/apunts" element={<ApuntsPage />} />
            <Route path="/films/:id/notes" element={<ApuntsPage />} />
            <Route path="/marathon/:id" element={<MarathonDetailPage />} />
            <Route path="/marathons/:id" element={<MarathonDetailPage />} />
            <Route path="/horari" element={<HorariPage />} />
            <Route path="/schedule" element={<HorariPage />} />
            <Route path="/apunts" element={<ApuntsPage />} />
            <Route path="/notes" element={<ApuntsPage />} />
          </Routes>
        )}
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <TicketAuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
        <PWAUpdatePrompt />
      </BrowserRouter>
    </TicketAuthProvider>
  )
}

export default App