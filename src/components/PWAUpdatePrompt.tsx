import { useRegisterSW } from 'virtual:pwa-register/react'

export function PWAUpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      if (r) {
        console.log('SW Registered:', r)
      }
    },
    onRegisterError(error) {
      console.error('SW registration error:', error)
    },
  })

  if (!needRefresh) {
    return null
  }

  return (
    <div
      role="alert"
      className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto bg-neutral-950 text-white p-4 rounded-md shadow-2xl border border-neutral-700 flex items-center justify-between gap-3 font-['Montserrat'] select-none"
    >
      <div className="text-xs sm:text-sm font-semibold text-neutral-200">
        Nova versió disponible de l'aplicació.
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => updateServiceWorker(true)}
          className="bg-[#FF0042] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-xs transition-colors cursor-pointer"
        >
          Actualitzar
        </button>
        <button
          type="button"
          onClick={() => setNeedRefresh(false)}
          className="text-neutral-400 hover:text-white text-xs font-bold px-2 py-1.5 cursor-pointer transition-colors"
        >
          Tancar
        </button>
      </div>
    </div>
  )
}

export default PWAUpdatePrompt
