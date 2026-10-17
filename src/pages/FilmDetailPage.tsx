import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TicketButton } from '../components/TicketButton'
import programmeData from '../data/sitges-programme.json'
import type { Film } from '../types/film'
import type { ProgrammeData } from '../types/programme'
import { useOpenTicket } from '../hooks/useOpenTicket'
import { canRateFilm, getFilmRating, setFilmRating } from '../lib/ratings'

const programme: ProgrammeData = programmeData

export function FilmDetailPage() {
  const { id } = useParams<{ id: string }>()

  const openTicket = useOpenTicket()

  const film = programme.films.find((f: Film) => f.id === id)

  const [currentStillIndex, setCurrentStillIndex] = useState<number>(0)
  const [userRating, setUserRating] = useState<number>(() =>
    film ? getFilmRating(film.id) : 0
  )

  const canRate = film ? canRateFilm(film) : true

  const starsContainerRef = useRef<HTMLDivElement | null>(null)
  const isDraggingRef = useRef<boolean>(false)
  const pointerStartXRef = useRef<number>(0)
  const hasMovedRef = useRef<boolean>(false)

  const calculateRatingFromX = (clientX: number): number => {
    if (!starsContainerRef.current) return userRating
    const rect = starsContainerRef.current.getBoundingClientRect()
    const width = rect.width
    if (width <= 0) return userRating

    const offsetX = clientX - rect.left
    const clampedOffset = Math.max(0, Math.min(width, offsetX))
    const rawRating = (clampedOffset / width) * 5
    const snapped = Math.round(rawRating * 2) / 2
    return Math.max(0.5, Math.min(5, snapped))
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canRate) return
    isDraggingRef.current = true
    pointerStartXRef.current = e.clientX
    hasMovedRef.current = false

    if (e.currentTarget.setPointerCapture) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId)
      } catch {
        // Fallback for environments lacking pointer capture
      }
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canRate || !isDraggingRef.current) return

    if (!hasMovedRef.current) {
      if (Math.abs(e.clientX - pointerStartXRef.current) > 3) {
        hasMovedRef.current = true
      }
    }

    if (hasMovedRef.current) {
      const newRating = calculateRatingFromX(e.clientX)
      setUserRating(newRating)
      if (film) {
        setFilmRating(film.id, newRating)
      }
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false

    if (e.currentTarget.releasePointerCapture) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {
        // Fallback for environments lacking pointer capture
      }
    }

    if (hasMovedRef.current) {
      const newRating = calculateRatingFromX(e.clientX)
      setUserRating(newRating)
      if (film) {
        setFilmRating(film.id, newRating)
      }
      setTimeout(() => {
        hasMovedRef.current = false
      }, 50)
    }
  }

  const handlePointerCancel = () => {
    isDraggingRef.current = false
    hasMovedRef.current = false
  }

  const handleRate = (star: number) => {
    if (!canRate || hasMovedRef.current) return
    const newRating = userRating === star ? 0 : star
    setUserRating(newRating)
    if (film) {
      setFilmRating(film.id, newRating)
    }
  }

  if (!film) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center bg-black min-h-[60vh] flex flex-col justify-center items-center text-white font-['Montserrat']">
        <h2 className="text-2xl font-black text-[#FF0042] mb-3 uppercase tracking-wider">
          Pel·lícula no trobada
        </h2>
        <p className="text-sm text-neutral-400 mb-6">
          No s'ha pogut trobar la pel·lícula amb l'identificador "{id}".
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

  const primaryDirector = film.directors && film.directors.length > 0 ? film.directors[0] : null
  const directorNames = film.directors ? film.directors.map((d) => d.name).join(', ') : ''

  const stills = film.images && film.images.length > 0 ? film.images : [film.poster]
  const heroImage = stills[0] || film.poster

  const handlePrevStill = () => {
    setCurrentStillIndex((prev) => (prev === 0 ? stills.length - 1 : prev - 1))
  }

  const handleNextStill = () => {
    setCurrentStillIndex((prev) => (prev === stills.length - 1 ? 0 : prev + 1))
  }



  return (
    <div className="max-w-2xl mx-auto bg-black text-white font-['Montserrat'] min-h-screen relative flex flex-col justify-between selection:bg-[#FF0042] selection:text-white">
      {/* Hero Image Section - Edge-to-edge bleed */}
      <div className="relative w-full aspect-video sm:h-72 bg-neutral-900 overflow-hidden mb-4 shadow-lg">
        <img
          src={heroImage}
          alt={film.title}
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Overlay for Cinematic Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="px-4 sm:px-6 py-2">

        {/* PRESÈNCIA Tag & Title Header */}
        <div className="space-y-1.5 mb-4">
          {film.presence && (
            <div className="inline-flex items-center gap-1 bg-[#B78B4B] text-black font-extrabold text-[10px] sm:text-xs uppercase tracking-wider px-2 py-0.5 rounded-xs select-none">
              <span>★</span>
              <span>PRESÈNCIA</span>
            </div>
          )}

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight uppercase">
            {film.title}
          </h1>

          {directorNames && (
            <p className="text-[#FF0042] text-lg sm:text-xl font-bold leading-snug">
              {directorNames}
            </p>
          )}
        </div>

        {/* Venue & Section Details */}
        <div className="space-y-1.5 text-xs sm:text-sm text-neutral-300 font-medium mb-5">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5Z" />
            </svg>
            <span>
              {film.venue} | {film.duration}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-white shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span>{film.section}</span>
          </div>
        </div>

        {/* 3-Column Technical Info Grid */}
        <div className="grid grid-cols-3 gap-2 py-3.5 my-5 border-y border-neutral-800 text-left select-none">
          <div className="pr-1">
            <span className="block text-[10px] sm:text-xs text-neutral-400 uppercase font-bold tracking-wider leading-none">
              Països de producció
            </span>
            <span className="block text-xs sm:text-sm text-white font-semibold mt-1.5 leading-snug">
              {film.country}
            </span>
          </div>

          <div className="border-l border-neutral-800 pl-3 pr-1">
            <span className="block text-[10px] sm:text-xs text-neutral-400 uppercase font-bold tracking-wider leading-none">
              Idiomes
            </span>
            <span className="block text-xs sm:text-sm text-white font-semibold mt-1.5 leading-snug">
              {film.idioma}
            </span>
          </div>

          <div className="border-l border-neutral-800 pl-3">
            <span className="block text-[10px] sm:text-xs text-neutral-400 uppercase font-bold tracking-wider leading-none">
              Subtítols
            </span>
            <span className="block text-xs sm:text-sm text-white font-semibold mt-1.5 leading-snug">
              {film.subt}
            </span>
          </div>
        </div>

        {/* Fitxa Tècnica / Technical Crew Info */}
        {(film.guio || film.fotografia || film.muntatge || film.repartiment) && (
          <div className="grid grid-cols-2 gap-2 py-3.5 mb-5 border-b border-neutral-800 text-left select-none">
            {/* Left side: Guió & Fotografia */}
            <div className="space-y-3 pr-1">
              {film.guio && (
                <div>
                  <span className="block text-[10px] sm:text-xs text-neutral-400 uppercase font-bold tracking-wider leading-none">
                    Guió
                  </span>
                  <span className="block text-xs sm:text-sm text-white font-semibold mt-1.5 leading-snug">
                    {film.guio}
                  </span>
                </div>
              )}
              {film.fotografia && (
                <div>
                  <span className="block text-[10px] sm:text-xs text-neutral-400 uppercase font-bold tracking-wider leading-none">
                    Fotografia
                  </span>
                  <span className="block text-xs sm:text-sm text-white font-semibold mt-1.5 leading-snug">
                    {film.fotografia}
                  </span>
                </div>
              )}
            </div>

            {/* Right side: Muntatge & Repartiment */}
            <div className="space-y-3 border-l border-neutral-800 pl-3">
              {film.muntatge && (
                <div>
                  <span className="block text-[10px] sm:text-xs text-neutral-400 uppercase font-bold tracking-wider leading-none">
                    Muntatge
                  </span>
                  <span className="block text-xs sm:text-sm text-white font-semibold mt-1.5 leading-snug">
                    {film.muntatge}
                  </span>
                </div>
              )}
              {film.repartiment && (
                <div>
                  <span className="block text-[10px] sm:text-xs text-neutral-400 uppercase font-bold tracking-wider leading-none">
                    Repartiment
                  </span>
                  <span className="block text-xs sm:text-sm text-white font-semibold mt-1.5 leading-snug">
                    {film.repartiment}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Trailer Button */}
        {film.trailerUrl && (
          <div className="my-4">
            <a
              href={film.trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-white/70 hover:border-white text-white font-bold text-[11px] sm:text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full transition-all hover:bg-white/10 select-none"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>TRAILER</span>
            </a>
          </div>
        )}

        {/* Sinopsis Section */}
        <div className="my-6">
          <h2 className="text-[#FF0042] font-black text-sm sm:text-base uppercase tracking-wider mb-2">
            SINOPSIS
          </h2>
          <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
            {film.synopsis}
          </p>
        </div>

        {/* Director Info Red Box */}
        {primaryDirector && (
          <div className="bg-[#FF0042] text-black my-6 p-4 sm:p-5 rounded-none flex items-stretch gap-4 select-none shadow-md overflow-hidden">
            {primaryDirector.photo && (
              <img
                src={primaryDirector.photo}
                alt={primaryDirector.name}
                className="w-24 sm:w-28 object-cover shrink-0 -my-4 -ml-4 sm:-my-5 sm:-ml-5 self-stretch"
              />
            )}
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-black/80 leading-none">
                DIRECTOR
              </span>
              <h3 className="text-base sm:text-lg font-black text-black leading-tight mt-1 mb-1.5">
                {primaryDirector.name}
              </h3>
              {primaryDirector.bio && (
                <p className="text-xs text-black font-medium leading-snug">
                  {primaryDirector.bio}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Film Poster */}
      {film.poster && (
        <div className="w-full bg-black py-4 px-4 sm:px-6">
          <img
            src={film.poster}
            alt={`${film.title} Poster`}
            className="w-full max-w-md mx-auto block object-contain shadow-2xl"
          />
        </div>
      )}

      {/* Stills Gallery Section */}
      {stills.length > 0 && (
        <div className="bg-black py-6 px-4 sm:px-6 border-t border-neutral-900">
          {/* Main Still Image Display */}
          <div className="relative w-full aspect-video bg-neutral-900 overflow-hidden mb-3">
            <img
              src={stills[currentStillIndex]}
              alt={`${film.title} Still ${currentStillIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {stills.length > 1 && (
              <div className="absolute bottom-2 left-2 flex items-center gap-1 z-10">
                <button
                  type="button"
                  onClick={handlePrevStill}
                  aria-label="Previous image"
                  className="bg-black/80 hover:bg-black text-white w-7 h-7 flex items-center justify-center border border-white/30 cursor-pointer transition-colors"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={handleNextStill}
                  aria-label="Next image"
                  className="bg-black/80 hover:bg-black text-white w-7 h-7 flex items-center justify-center border border-white/30 cursor-pointer transition-colors"
                >
                  ›
                </button>
              </div>
            )}
          </div>

          {/* Stills Thumbnail Row */}
          {stills.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mb-2">
              {stills.map((still, idx) => (
                <button
                  key={still}
                  type="button"
                  onClick={() => setCurrentStillIndex(idx)}
                  className={`aspect-video overflow-hidden border-2 transition-all cursor-pointer ${currentStillIndex === idx ? 'border-[#FF0042] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                >
                  <img src={still} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Ticket Action Area */}
      {film.ticketId && (
        <div className="bg-black py-6 flex items-center justify-center border-t border-neutral-900">
          <TicketButton
            onClick={() => void openTicket(film.ticketId!)}
          />
        </div>
      )}

      {/* Interactive Star Rating */}
      <div className="bg-black py-6 select-none flex flex-col items-center justify-center gap-1 border-t border-neutral-900">
        <svg className="w-0 h-0 absolute">
          <defs>
            <linearGradient id="halfStarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="#B78B4B" />
              <stop offset="50%" stopColor="#525252" />
            </linearGradient>
          </defs>
        </svg>
        <div
          ref={starsContainerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          className={`flex justify-center items-center gap-2 touch-none py-1 ${canRate ? 'cursor-pointer' : 'cursor-not-allowed'
            }`}
        >
          {[1, 2, 3, 4, 5].map((starIndex) => {
            const isFull = userRating >= starIndex
            const isHalf = !isFull && userRating >= starIndex - 0.5
            return (
              <div
                key={starIndex}
                className={`relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-transform ${canRate ? 'active:scale-125 hover:scale-110' : 'opacity-40 cursor-not-allowed'
                  }`}
              >
                <svg className="w-full h-full pointer-events-none" viewBox="0 0 24 24">
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    fill={isFull ? '#B78B4B' : isHalf ? 'url(#halfStarGrad)' : '#525252'}
                  />
                </svg>
                <button
                  type="button"
                  disabled={!canRate}
                  onClick={() => handleRate(starIndex - 0.5)}
                  aria-label={`Rate ${starIndex - 0.5} stars`}
                  className={`absolute left-0 top-0 w-1/2 h-full focus:outline-none ${canRate ? 'cursor-pointer' : 'cursor-not-allowed'
                    }`}
                />
                <button
                  type="button"
                  disabled={!canRate}
                  onClick={() => handleRate(starIndex)}
                  aria-label={`Rate ${starIndex} stars`}
                  className={`absolute right-0 top-0 w-1/2 h-full focus:outline-none ${canRate ? 'cursor-pointer' : 'cursor-not-allowed'
                    }`}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Notes / Apunts Action Button */}
      <div className="bg-black py-6 flex items-center justify-center border-t border-neutral-900">
        <Link
          to={`/films/${film.id}/apunts`}
          style={{
            clipPath:
              'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)',
          }}
          aria-label="Apunts"
          className="inline-flex items-center gap-2 bg-[#FF0042] hover:bg-red-700 active:scale-[0.98] text-white text-xs sm:text-sm font-black tracking-widest uppercase px-5 py-2.5 transition-all shadow-md select-none cursor-pointer"
        >
          <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <span>APUNTS</span>
        </Link>
      </div>

      {/* Bottom Back Navigation Link */}
      <div className="bg-black/90 px-4 py-3 flex items-center border-t border-neutral-900 pb-10">
        <Link
          to="/films"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-300 hover:text-[#FF0042] uppercase tracking-wider transition-colors"
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

export default FilmDetailPage
