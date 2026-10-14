import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  getStoredFilmNotes,
  getStoredNotes,
  setStoredFilmNotes,
  setStoredNotes,
} from '../lib/notes'
import programmeData from '../data/sitges-programme.json'
import type { Film } from '../types/film'
import type { ProgrammeData } from '../types/programme'

const programme: ProgrammeData = programmeData

export function ApuntsPage() {
  const { id } = useParams<{ id?: string }>()
  const film = id ? programme.films.find((f: Film) => f.id === id) : null

  const [notes, setNotes] = useState<string>(() =>
    film ? getStoredFilmNotes(film.id) : getStoredNotes()
  )
  const [isSaved, setIsSaved] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setNotes(val)
    if (film) {
      setStoredFilmNotes(film.id, val)
    } else {
      setStoredNotes(val)
    }
    setIsSaved(true)
  }

  useEffect(() => {
    if (isSaved) {
      const timer = setTimeout(() => setIsSaved(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isSaved])

  if (id && !film) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center bg-black min-h-[60vh] flex flex-col justify-center items-center text-white font-['Montserrat']">
        <h2 className="text-2xl font-black text-[#FF0042] mb-3 uppercase tracking-wider">
          Pel·lícula no trobada
        </h2>
        <p className="text-sm text-neutral-400 mb-6">
          No s'han pogut trobar els apunts de la pel·lícula amb l'identificador "{id}".
        </p>
        <Link
          to="/films"
          className="inline-block bg-[#FF0042] hover:bg-red-700 text-white text-xs font-extrabold uppercase tracking-widest px-5 py-2.5 transition-colors"
        >
          ← Tornar a la llista de pel·lícules
        </Link>
      </div>
    )
  }

  const backLink = film ? `/films/${film.id}` : '/'
  const backLabel = 'Tornar'

  return (
    <div className="max-w-2xl mx-auto w-full min-h-screen bg-[#F5F0E6] text-neutral-900 font-['Montserrat'] px-4 py-6 flex flex-col justify-between relative overflow-hidden select-text selection:bg-[#FF0042] selection:text-white">
      {/* Left Red Margin Rule Line */}
      <div className="absolute top-0 bottom-0 left-8 sm:left-12 w-0.5 bg-red-300/60 pointer-events-none z-10" />

      <div>
        {/* Cream Page Header */}
        <div className="mb-4 pl-8 sm:pl-10 flex items-center justify-between border-b border-neutral-300/80 pb-3">
          <div className="min-w-0 pr-2">
            {film && (
              <span className="text-[10px] sm:text-xs font-bold text-[#FF0042] tracking-widest uppercase block">
                Apunts de la pel·lícula
              </span>
            )}
            <h1 className="text-base sm:text-xl font-black uppercase tracking-wider text-neutral-900 truncate">
              {film ? film.title : 'Apunts'}
            </h1>
          </div>
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
            placeholder={
              film
                ? `Escriu aquí els teus apunts sobre "${film.title}"...`
                : 'Escriu aquí els teus apunts, comentaris o impressions sobre les pel·lícules...'
            }
            className="w-full h-full min-h-[60vh] bg-transparent text-neutral-900 font-medium text-sm sm:text-base leading-[32px] border-none outline-none resize-none placeholder:text-neutral-400 focus:ring-0 focus:outline-none"
            style={{ lineHeight: '32px' }}
            aria-label={film ? `Notes for ${film.title}` : 'Festival Notes'}
          />
        </div>
      </div>

      {/* Bottom Back Navigation Link */}
      <div className="px-4 py-3 flex items-center border-t border-neutral-300/80 mt-6 pb-10">
        <Link
          to={backLink}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-700 hover:text-[#FF0042] uppercase tracking-wider transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
          {backLabel}
        </Link>
      </div>
    </div>
  )
}

export default ApuntsPage
