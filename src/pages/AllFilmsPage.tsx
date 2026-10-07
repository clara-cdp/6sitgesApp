import { useState } from 'react'
import { DateFilterDropdown } from '../components/DateFilterDropdown'
import { FilmListItem } from '../components/FilmListItem'
import programmeData from '../data/sitges-programme.json'
import type { Film } from '../types/film'
import type { Marathon } from '../types/marathon'
import type { ProgrammeData } from '../types/programme'

const programme: ProgrammeData = programmeData

interface AllFilmsPageProps {
  isFilterOpen?: boolean
  setIsFilterOpen?: (open: boolean) => void
}

export function AllFilmsPage({ isFilterOpen = false, setIsFilterOpen }: AllFilmsPageProps) {
  const [selectedDateKey, setSelectedDateKey] = useState<string>('ALL')

  const filteredFilms: Film[] = programme.films.filter(
    (film) => film.section !== 'Midnight X-Treme'
  )

  const allItems: (Film | Marathon)[] = [
    ...filteredFilms,
    ...programme.marathons,
  ]

  const displayedItems = allItems.filter((item) => {
    if (selectedDateKey === 'ALL') return true
    return item.programmeDate === selectedDateKey || item.date === selectedDateKey
  })

  displayedItems.sort((a, b) => {
    const dateTimeA = `${a.date}T${a.time}`
    const dateTimeB = `${b.date}T${b.time}`
    return dateTimeA.localeCompare(dateTimeB)
  })

  return (
    <div className="relative max-w-2xl w-full mx-auto bg-[#EFECE6] min-h-screen px-3 py-4">
      <DateFilterDropdown
        selectedKey={selectedDateKey}
        onSelectKey={(key) => setSelectedDateKey(key)}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen && setIsFilterOpen(false)}
      />

      <div className="space-y-2">
        {displayedItems.map((item) => (
          <FilmListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
