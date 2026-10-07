import type { Film } from '../types/film'
import type { Marathon } from '../types/marathon'

interface FilmListItemProps {
  item: Film | Marathon
}

export function FilmListItem({ item }: FilmListItemProps) {
  const dayNumber = item.date ? parseInt(item.date.split('-')[2], 10) : ''

  return (
    <div className="flex items-center justify-between border-b border-gray-300 py-2.5 px-3 bg-[#EFECE6] hover:bg-[#E5E1D7] transition-colors cursor-pointer">
      <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
        {/* Red Date Block */}
        <div className="bg-[#FF0042] text-white rounded-sm w-16 h-16 sm:w-20 sm:h-20 flex flex-col justify-center items-center flex-shrink-0 p-1 shadow-xs">
          <span className="text-[10px] sm:text-xs font-medium lowercase tracking-tight leading-none">
            {item.dayLabel}
          </span>
          <span className="text-xl sm:text-2xl font-black leading-tight my-0.5">
            {dayNumber}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold leading-none">
            {item.time}
          </span>
        </div>

        {/* Info Block */}
        <div className="text-left min-w-0 pr-2">
          <h3 className="font-bold text-sm sm:text-base text-black truncate leading-snug">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-1">
            {item.venue}
          </p>
        </div>
      </div>

      {/* Ticket Badge */}
      <div className="flex-shrink-0 ml-2">
        <span className="inline-block bg-[#B78B4B] text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-xs shadow-xs">
          TICKET
        </span>
      </div>
    </div>
  )
}
