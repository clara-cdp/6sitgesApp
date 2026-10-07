import { Footer } from './components/Footer'
import { Header } from './components/Header'
import programmeData from './data/sitges-programme.json'
import type { ProgrammeData } from './types/programme'

const programme: ProgrammeData = programmeData

function App() {
  return (
    <div className="min-h-screen bg-[#EFECE6] text-black font-['Montserrat'] flex flex-col justify-between">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 text-center flex flex-col items-center justify-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Benvinguts al 59è festival internacional de cinema fantàstic de Catalunya
        </h2>
        <p>{programme.films.length} films loaded</p>
        <p>{programme.marathons.length} marathons loaded</p>
      </main>
      <Footer />
    </div>
  )
}

export default App