import { FilmListItem } from '../components/FilmListItem'
import programmeData from '../data/sitges-programme.json'
import type { Film } from '../types/film'
import type { Marathon } from '../types/marathon'
import type { ProgrammeData } from '../types/programme'

const programme: ProgrammeData = programmeData

export function AllFilmsPage() {

  const filteredFilms: Film[] = programme.films.filter(
    (film) => film.section !== 'Midnight X-Treme'
  )

  const allItems: (Film | Marathon)[] = [
    ...filteredFilms,
    ...programme.marathons,
  ]

  allItems.sort((a, b) => {
    const dateTimeA = `${a.date}T${a.time}`
    const dateTimeB = `${b.date}T${b.time}`
    return dateTimeA.localeCompare(dateTimeB)
  })

  return (
    <div className="max-w-2xl w-full mx-auto bg-[#EFECE6] min-h-screen">
      <div className="divide-y divide-gray-300">
        {allItems.map((item) => (
          <FilmListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
