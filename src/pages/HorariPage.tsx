import { useNavigate } from 'react-router-dom'
import { horariData } from '../data/horari-data'
import { LlegirMesButton } from '../components/LlegirMesButton'
import { FilmIcon } from '../components/FilmIcon'
import type { HorariSession, HorariPausa } from '../types/horari'

function ClockIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={`${className} shrink-0`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  )
}

function PinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={`${className} shrink-0`}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5Z"
      />
    </svg>
  )
}

function FilmCard({ session }: { session: HorariSession }) {
  const navigate = useNavigate()
  const detailUrl = session.isMarathon ? `/marathon/${session.id}` : `/films/${session.id}`

  return (
    <div
      onClick={() => navigate(detailUrl)}
      className="bg-white px-4 py-4 sm:py-4.5 flex items-center justify-between gap-3 cursor-pointer group hover:bg-[#FAF9F6] transition-colors select-none"
    >
      <div className="flex-1 min-w-0 pr-2">
        {/* Time row */}
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-black">
          <ClockIcon className="w-4 h-4 text-black" />
          <span>
            {session.startTime} - {session.endTime}
          </span>
        </div>

        {/* Title row */}
        <div className="flex items-start gap-2.5 my-1.5">
          <FilmIcon className="h-4 sm:h-4.5 w-auto text-black mt-1" />
          <h3 className="font-extrabold text-base sm:text-xl text-black leading-snug group-hover:text-[#FF0042] transition-colors">
            {session.title}
          </h3>
        </div>

        {/* Venue & Running Time row */}
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-800 font-medium">
          <PinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
          <span className="truncate">
            {session.venue} · {session.duration}
          </span>
        </div>
      </div>

      {/* LLEGIR MÉS Button*/}
      <div className="shrink-0 ml-1">
        <LlegirMesButton
          to={detailUrl}
          variant="dark"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  )
}

function PausaBar({ pausa }: { pausa: HorariPausa }) {
  return (
    <div className="bg-[#4BB0B7] text-white px-4 py-2 sm:py-2.5 flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wide select-none">
      <ClockIcon className="w-4 h-4 text-white" />
      <span>
        {pausa.startTime} - {pausa.endTime} - PAUSA | {pausa.duration}
      </span>
    </div>
  )
}

export function HorariPage() {
  return (
    <div className="w-full flex-1 bg-[#EFECE6] font-['Montserrat'] pb-16">
      <div className="max-w-2xl mx-auto w-full px-3 py-4">
        {horariData.map((day) => (
          <div
            key={day.date}
            className="mb-6 shadow-sm border border-neutral-300/80 bg-white overflow-hidden"
          >
            {/* Red Day Header */}
            <div className="bg-[#FF0042] text-black px-4 py-2.5 sm:py-3 font-black text-lg sm:text-xl uppercase tracking-wider select-none">
              {day.dayLabel}
            </div>

            {/* List of Sessions and Pauses */}
            <div className="divide-y divide-neutral-200/60">
              {day.items.map((item, index) => {
                if (item.type === 'session') {
                  return (
                    <FilmCard
                      key={`${day.date}-session-${item.session.id}-${index}`}
                      session={item.session}
                    />
                  )
                }
                return (
                  <PausaBar
                    key={`${day.date}-pausa-${item.pausa.startTime}-${index}`}
                    pausa={item.pausa}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HorariPage
