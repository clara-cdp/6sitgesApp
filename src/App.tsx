import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { AllFilmsPage } from './pages/AllFilmsPage'

function App() {
  return (
    <div className="min-h-screen bg-[#EFECE6] text-black font-['Montserrat'] flex flex-col justify-between">
      <Header />
      <main className="flex-1 w-full">
        <AllFilmsPage />
      </main>
      <Footer />
    </div>
  )
}

export default App