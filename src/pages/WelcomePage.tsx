import { NavButton } from '../components/NavButton'

export function WelcomePage() {
  return (
    <div className="flex-1 max-w-md w-full mx-auto px-6 py-12 text-center flex flex-col items-center justify-center min-h-[calc(100vh-250px)]">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-black mb-8 leading-tight">
        Benvinguts al 59è festival internacional de cinema fantàstic de Sitges
      </h2>

      <div className="w-full max-w-xs space-y-4">
        <NavButton label="El meu festival" to="/films" />
        <NavButton label="Horari" disabled />
        <NavButton label="Apunts" disabled />
      </div>
    </div>
  )
}
