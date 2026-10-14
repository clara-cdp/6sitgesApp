import { useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { useParams } from 'react-router-dom'
import { AllFilmsPage } from './pages/AllFilmsPage'
import { FilmDetailPage } from './pages/FilmDetailPage'
import { MarathonDetailPage } from './pages/MarathonDetailPage'
import { WelcomePage } from './pages/WelcomePage'
import { ApuntsPage } from './pages/ApuntsPage'
import { HorariPage } from './pages/HorariPage'
import programmeData from './data/sitges-programme.json'
import { TicketAuthProvider } from './context/TicketAuthProvider'
import { useTicketAuth } from './context/useTicketAuth'
import { PasswordScreen } from './components/PasswordScreen'
import { PWAUpdatePrompt } from './components/PWAUpdatePrompt'

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
        <AppContent />
        <PWAUpdatePrompt />
      </BrowserRouter>
    </TicketAuthProvider>
  )
}

export default App