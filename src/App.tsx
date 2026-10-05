import { Header } from './components/Header'

function App() {
  return (
    <div className="min-h-screen bg-[#EFECE6] text-black font-['Montserrat'] flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 text-center flex flex-col items-center justify-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Benvinguts al 59è festival internacional de cinema fantàstic de Catalunya
        </h2>
      </main>
    </div>
  )
}

export default App