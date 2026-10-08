import { useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { AllFilmsPage } from './pages/AllFilmsPage'
import { FilmDetailPage } from './pages/FilmDetailPage'
import { WelcomePage } from './pages/WelcomePage'

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
          <Route path="/films/:id" element={<FilmDetailPage />} />
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