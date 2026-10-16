import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TicketButton } from './TicketButton'
import type { Film } from '../types/film'
import type { Marathon } from '../types/marathon'
import { getFilmRating } from '../lib/ratings'
import programmeData from '../data/sitges-programme.json'

interface FilmListItemProps {
  item: Film | Marathon
  onTicketClick?: () => void
}

export function FilmListItem({ item, onTicketClick }: FilmListItemProps) {
  const navigate = useNavigate()
  const [, setRatingsVersion] = useState(0)

  useEffect(() => {
    const handleStorage = () => setRatingsVersion((v) => v + 1)
    window.addEventListener('storage', handleStorage)
    window.addEventListener('focus', handleStorage)
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('focus', handleStorage)
    }
  }, [])

  const dayNumber = item.date ? parseInt(item.date.split('-')[2], 10) : ''
  const isMarathon = 'filmIds' in item
  const rating = !isMarathon ? getFilmRating(item.id) : 0

  // Retrieve full film data for all filmIds in this marathon
  const marathonFilms = isMarathon
    ? (item as Marathon).filmIds.map((id) => {
        const found = programmeData.films.find((f) => f.id === id)
        return (
          found || {
            id,
            title: id
              .split('-')
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(' '),
          }
        )
      })
    : []

  const anyMarathonFilmRated = isMarathon
    ? marathonFilms.some((film) => getFilmRating(film.id) > 0)
    : false

  const hasPresence = isMarathon
    ? Boolean((item as { presence?: boolean }).presence) ||
      marathonFilms.some((film) => 'presence' in film && Boolean(film.presence))
    : Boolean((item as Film).presence)

  const handleCardClick = () => {
    navigate(`/films/${item.id}`)
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-white my-2.5 shadow-xs border border-gray-200/70 flex items-stretch overflow-hidden hover:border-gray-300 transition-colors cursor-pointer group"
    >
      {/* 1. Left Red Date Block */}
      <div className="bg-[#FF0042] text-black w-20 sm:w-24 flex flex-col justify-center items-center p-2.5 shrink-0 select-none group-hover:opacity-90 transition-opacity">
        <span className="text-xs sm:text-sm font-bold lowercase tracking-tight leading-none text-black">
          {item.dayLabel}
        </span>
        <span className="text-2xl sm:text-3xl font-black leading-tight my-0.5 text-black">
          {dayNumber}
        </span>
        <span className="text-xs sm:text-sm font-bold leading-none text-black">
          {item.time}
        </span>
      </div>

      {/* 2. Middle Info & Ticket Button / Rating */}
      <div className="flex-1 p-3.5 sm:p-4.5 flex flex-col justify-center min-w-0">
        {/* Top Header Row: Title & Venue on left, TicketButton / StarRating on right */}
        <div className="flex items-center justify-between gap-3 min-w-0">
          <div className="text-left min-w-0 pr-2 flex-1 block">
            {hasPresence && (
              <div className="mb-1">
                <span className="inline-flex items-center gap-1 bg-[#B78B4B] text-black font-extrabold text-[10px] sm:text-xs uppercase tracking-wider px-2 py-0.5 rounded-xs select-none">
                  <span>★</span>
                  <span>PRESÈNCIA</span>
                </span>
              </div>
            )}
            <h3 className="font-bold text-base sm:text-lg text-black truncate leading-snug group-hover:text-[#FF0042] transition-colors">
              {item.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-800 font-medium mt-1 min-w-0">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5Z"
                />
              </svg>
              <span className="truncate">
                {item.venue}
                {item.duration ? ` | ${item.duration}` : ''}
              </span>
            </div>
          </div>

          {/* Action on top right: Ticket Button or Star Rating */}
          {isMarathon ? (
            !anyMarathonFilmRated && (
              <div
                className="shrink-0 ml-1"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <TicketButton onClick={onTicketClick} />
              </div>
            )
          ) : rating > 0 ? (
            <div
              className="shrink-0 ml-1 flex items-center gap-0.5"
              aria-label={`Rating: ${rating} out of 5 stars`}
            >
              <svg className="w-0 h-0 absolute">
                <defs>
                  <linearGradient id={`halfStarGrad-${item.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="50%" stopColor="#B78B4B" />
                    <stop offset="50%" stopColor="#d4d4d4" />
                  </linearGradient>
                </defs>
              </svg>
              {[1, 2, 3, 4, 5].map((starIndex) => {
                const isFull = rating >= starIndex
                const isHalf = !isFull && rating >= starIndex - 0.5
                return (
                  <svg key={starIndex} className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      fill={isFull ? '#B78B4B' : isHalf ? `url(#halfStarGrad-${item.id})` : '#d4d4d4'}
                    />
                  </svg>
                )
              })}
            </div>
          ) : (
            <div
              className="shrink-0 ml-1"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <TicketButton onClick={onTicketClick} />
            </div>
          )}
        </div>

        {/* If Marathon: List of included films */}
        {isMarathon && marathonFilms.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-black space-y-2">
            {marathonFilms.map((film) => {
              const filmRating = getFilmRating(film.id)

              return (
                <div
                  key={film.id}
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/films/${film.id}`)
                  }}
                  className="flex items-center justify-between gap-3 text-xs sm:text-sm text-neutral-800 hover:text-black cursor-pointer group/film"
                >
                  <span className="font-medium truncate group-hover/film:text-[#FF0042] transition-colors">
                    {film.title}
                  </span>

                  {/* Rating stars if at least one movie in the marathon is rated (display only) */}
                  {anyMarathonFilmRated && (
                    <div
                      className="shrink-0 flex items-center gap-0.5 select-none pointer-events-none"
                      aria-label={`Rating: ${filmRating} out of 5 stars`}
                    >
                      <svg className="w-0 h-0 absolute">
                        <defs>
                          <linearGradient
                            id={`marathonHalfStarGrad-${film.id}`}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="50%" stopColor="#B78B4B" />
                            <stop offset="50%" stopColor="#d4d4d4" />
                          </linearGradient>
                        </defs>
                      </svg>
                      {[1, 2, 3, 4, 5].map((starIndex) => {
                        const isFull = filmRating >= starIndex
                        const isHalf = !isFull && filmRating >= starIndex - 0.5

                        return (
                          <svg
                            key={starIndex}
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                              fill={
                                isFull
                                  ? '#B78B4B'
                                  : isHalf
                                  ? `url(#marathonHalfStarGrad-${film.id})`
                                  : '#d4d4d4'
                              }
                            />
                          </svg>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default FilmListItem
