import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getStoredNotes, setStoredNotes } from '../lib/notes'

export function ApuntsPage() {
  const [notes, setNotes] = useState<string>(() => getStoredNotes())
  const [isSaved, setIsSaved] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setNotes(val)
    setStoredNotes(val)
    setIsSaved(true)
  }

  useEffect(() => {
    if (isSaved) {
      const timer = setTimeout(() => setIsSaved(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isSaved])

  return (
    <div className="max-w-2xl mx-auto w-full min-h-screen bg-[#F5F0E6] text-neutral-900 font-['Montserrat'] px-4 py-6 flex flex-col justify-between relative overflow-hidden select-text selection:bg-[#FF0042] selection:text-white">
      {/* Left Red Margin Rule Line */}
      <div className="absolute top-0 bottom-0 left-8 sm:left-12 w-0.5 bg-red-300/60 pointer-events-none z-10" />

      <div>
        {/* Cream Page Header */}
        <div className="mb-4 pl-8 sm:pl-10 flex items-center justify-between border-b border-neutral-300/80 pb-3">
          <h1 className="text-base sm:text-xl font-black uppercase tracking-wider text-neutral-900">
            Apunts
          </h1>
          <span className="text-xs sm:text-sm font-bold text-neutral-500 tracking-widest uppercase">
            Sitges 2026
          </span>
        </div>

        {/* Ruled Lines Notepad Textarea */}
        <div
          className="w-full relative pl-8 sm:pl-10 min-h-[65vh]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(transparent, transparent 31px, #FFFFFF 31px, #FFFFFF 32px)',
            backgroundAttachment: 'local',
          }}
        >
          <textarea
            value={notes}
            onChange={handleChange}
            placeholder="Escriu aquí els teus apunts, comentaris o impressions sobre les pel·lícules..."
            className="w-full h-full min-h-[60vh] bg-transparent text-neutral-900 font-medium text-sm sm:text-base leading-[32px] border-none outline-none resize-none placeholder:text-neutral-400 focus:ring-0 focus:outline-none"
            style={{ lineHeight: '32px' }}
            aria-label="Festival Notes"
          />
        </div>
      </div>

      {/* Bottom Modest Back Link */}
      <div className="py-6 flex justify-center border-t border-neutral-300/80 mt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-700 hover:text-[#FF0042] uppercase tracking-wider transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
          Tornar
        </Link>
      </div>
    </div>
  )
}

export default ApuntsPage
