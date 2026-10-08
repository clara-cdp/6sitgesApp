import { Link, useParams } from 'react-router-dom'
import { TicketButton } from '../components/TicketButton'
import programmeData from '../data/sitges-programme.json'
import type { Film } from '../types/film'
import type { Marathon } from '../types/marathon'
import type { ProgrammeData } from '../types/programme'
import { useOpenTicket } from '../hooks/useOpenTicket'

const programme: ProgrammeData = programmeData

export function MarathonDetailPage() {
  const { id } = useParams<{ id: string }>()

  const openTicket = useOpenTicket()

  const marathon = programme.marathons.find((m: Marathon) => m.id === id)

  if (!marathon) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center bg-black min-h-[60vh] flex flex-col justify-center items-center text-white font-['Montserrat']">
        <h2 className="text-2xl font-black text-[#FF0042] mb-3 uppercase tracking-wider">
          Marató no trobada
        </h2>
        <p className="text-sm text-neutral-400 mb-6">
          No s'ha pogut trobar la marató amb l'identificador "{id}".
        </p>
        <Link
          to="/films"
          className="inline-block bg-[#FF0042] hover:bg-red-700 text-white text-xs font-extrabold uppercase tracking-widest px-5 py-2.5 transition-colors"
        >
          ← Tornar a la llista
        </Link>
      </div>
    )
  }

  // Retrieve full film data for all filmIds in this marathon
  const marathonFilms: Film[] = marathon.filmIds
    .map((filmId) => programme.films.find((f: Film) => f.id === filmId))
    .filter((f): f is Film => f !== undefined)

  return (
    <div className="max-w-2xl mx-auto bg-black text-white font-['Montserrat'] min-h-screen relative flex flex-col justify-between selection:bg-[#FF0042] selection:text-white">
      {/* Top Back Navigation Bar */}
      <div className="bg-black/90 px-4 py-2 flex items-center border-b border-neutral-900">
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

      <div>
        {/* Hero Image Section */}
        <div className="relative w-full aspect-video sm:h-72 bg-neutral-900 overflow-hidden mb-6">
          <img
            src="/images/Marathon.webp"
            alt={marathon.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-4 sm:p-6">
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-none tracking-wide uppercase mb-2">
              {marathon.title}
            </h1>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-300 font-medium">
              <svg className="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5Z" />
              </svg>
              <span>
                {marathon.venue} | {marathon.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Films List Section */}
        <div className="px-4 sm:px-6 py-4 space-y-6">
          {marathonFilms.length > 0 ? (
            marathonFilms.map((film) => {
              const directorName = film.directors && film.directors.length > 0 ? film.directors[0].name : ''

              return (
                <div
                  key={film.id}
                  className="flex items-center justify-between gap-4 py-4 border-b border-neutral-800/80 last:border-0"
                >
                  {/* Left Info: Title, Director, Year & Duration */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/films/${film.id}`}
                      className="block group"
                    >
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight group-hover:text-[#FF0042] transition-colors">
                        {film.title}
                      </h3>
                    </Link>

                    {directorName && (
                      <p className="text-[#FF0042] text-sm sm:text-base font-semibold mt-0.5">
                        {directorName}
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-neutral-400 font-medium mt-1">
                      {film.year ? `${film.year} | ` : ''}{film.duration}
                    </p>
                  </div>

                  {/* Right Button: LLEGIR MÉS -> links to film detail page */}
                  <div className="shrink-0">
                    <Link
                      to={`/films/${film.id}`}
                      className="inline-block border border-white hover:bg-white hover:text-black text-white font-bold text-[11px] sm:text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full transition-all select-none"
                    >
                      LLEGIR MÉS
                    </Link>
                  </div>
                </div>
              )
            })
          ) : (
            /* Marathon with no details yet */
            <div className="py-12 px-6 text-center border border-neutral-800 rounded-sm bg-neutral-950/50 my-6">
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wider">
                Detalls pròximament
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto mb-6">
                Els títols d'aquesta marató es revelaran pròximament.
              </p>
              <Link
                to="/films"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-300 hover:text-[#FF0042] uppercase tracking-wider transition-colors border border-neutral-700 hover:border-[#FF0042] px-4 py-2 rounded-xs select-none"
              >
                ← Tornar
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Ticket Button Section */}
      {marathon.ticketId && (
        <div className="bg-black py-8 flex items-center justify-center border-t border-neutral-900 mt-6">
          <TicketButton
            onClick={() => void openTicket(marathon.ticketId!)}
          />
        </div>
      )}
    </div>
  )
}

export default MarathonDetailPage
