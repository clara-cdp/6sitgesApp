import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { AllFilmsPage } from './pages/AllFilmsPage'
import { WelcomePage } from './pages/WelcomePage'

/**
 * Main App Component
 * 
 * Configures application routes with React Router:
 * - "/" -> WelcomePage (Welcome landing screen with navigation buttons)
 * - "/films" -> AllFilmsPage (Film list and marathon schedule)
 */
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#EFECE6] text-black font-['Montserrat'] flex flex-col justify-between">
        <Header />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/films" element={<AllFilmsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App