import { useNavigate } from 'react-router-dom'
import { TicketButton } from './TicketButton'
import type { Film } from '../types/film'
import type { Marathon } from '../types/marathon'

interface FilmListItemProps {
  item: Film | Marathon
  onTicketClick?: () => void
}

export function FilmListItem({ item, onTicketClick }: FilmListItemProps) {
  const navigate = useNavigate()
  const dayNumber = item.date ? parseInt(item.date.split('-')[2], 10) : ''

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

      {/* 2. Middle Info & Ticket Button */}
      <div className="flex-1 p-3.5 sm:p-4.5 flex items-center justify-between gap-3 min-w-0">
        {/* Info Block */}
        <div className="text-left min-w-0 pr-2 flex-1 block">
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
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5Z" />
            </svg>
            <span className="truncate">
              {item.venue}{item.duration ? ` | ${item.duration}` : ''}
            </span>
          </div>
        </div>

        {/* Reusable Ticket Button */}
        <div
          className="shrink-0 ml-1"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <TicketButton onClick={onTicketClick} />
        </div>
      </div>
    </div>
  )
}
