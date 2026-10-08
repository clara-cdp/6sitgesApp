import { useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { useParams } from 'react-router-dom'
import { AllFilmsPage } from './pages/AllFilmsPage'
import { FilmDetailPage } from './pages/FilmDetailPage'
import { MarathonDetailPage } from './pages/MarathonDetailPage'
import { WelcomePage } from './pages/WelcomePage'
import programmeData from './data/sitges-programme.json'

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

  return (
    <div className="min-h-screen bg-[#EFECE6] text-black font-['Montserrat'] flex flex-col justify-between">
      <Header
        showFilterToggle={isFilmsPage}
        onToggleFilter={() => setIsFilterOpen((prev) => !prev)}
      />
      <main className="flex-1 w-full">
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
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App