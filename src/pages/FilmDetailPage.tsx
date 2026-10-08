import { Link, useParams } from 'react-router-dom'
import programmeData from '../data/sitges-programme.json'
import type { Film } from '../types/film'
import type { Marathon } from '../types/marathon'
import type { ProgrammeData } from '../types/programme'

const programme: ProgrammeData = programmeData

export function FilmDetailPage() {
  const { id } = useParams<{ id: string }>()

  const film = programme.films.find((f: Film) => f.id === id)
  const marathon = !film ? programme.marathons.find((m: Marathon) => m.id === id) : null
  const item = film || marathon

  if (!item) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Pel·lícula no trobada</h2>
        <Link to="/films" className="text-black font-semibold underline">
          Tornar a les pel·lícules
        </Link>
      </div>
    )
  }

  const poster = 'poster' in item ? item.poster : undefined
  const synopsis = 'synopsis' in item ? item.synopsis : undefined

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Link
        to="/films"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider mb-4 hover:opacity-75"
      >
        ← Tornar a la llista
      </Link>
      <div className="bg-white p-6 rounded shadow-xs">
        <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
        {poster && (
          <img
            src={poster}
            alt={item.title}
            className="w-full max-h-96 object-cover my-4 rounded"
          />
        )}
        {synopsis && <p className="text-sm text-gray-700">{synopsis}</p>}
      </div>
    </div>
  )
}

export default FilmDetailPage
