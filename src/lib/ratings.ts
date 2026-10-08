const RATINGS_KEY = 'sitges_film_ratings'

export function getStoredRatings(): Record<string, number> {
  try {
    const raw = localStorage.getItem(RATINGS_KEY)
    return raw ? (JSON.parse(raw) as Record<string, number>) : {}
  } catch (e) {
    console.error('Failed to parse film ratings from localStorage:', e)
    return {}
  }
}

export function getFilmRating(filmId: string): number {
  const ratings = getStoredRatings()
  return ratings[filmId] || 0
}

export function setFilmRating(filmId: string, rating: number): void {
  try {
    const ratings = getStoredRatings()
    if (rating <= 0) {
      delete ratings[filmId]
    } else {
      ratings[filmId] = rating
    }
    localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings))
  } catch (e) {
    console.error('Failed to save film rating to localStorage:', e)
  }
}

export function canRateFilm(
  film: { date?: string; time?: string },
  now: Date = new Date()
): boolean {
  if (!film || !film.date || !film.time) return true
  const [year, month, day] = film.date.split('-').map(Number)
  const [hours, minutes] = film.time.split(':').map(Number)
  if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hours) || isNaN(minutes)) {
    return true
  }
  const filmStart = new Date(year, month - 1, day, hours, minutes, 0)
  const allowedTime = filmStart.getTime() + 60 * 60 * 1000
  return now.getTime() >= allowedTime
}

export function getRatingUnlockTime(film: { date?: string; time?: string }): string | null {
  if (!film || !film.date || !film.time) return null
  const [year, month, day] = film.date.split('-').map(Number)
  const [hours, minutes] = film.time.split(':').map(Number)
  if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hours) || isNaN(minutes)) {
    return null
  }
  const filmStart = new Date(year, month - 1, day, hours, minutes, 0)
  const unlock = new Date(filmStart.getTime() + 60 * 60 * 1000)
  const unlockHours = unlock.getHours().toString().padStart(2, '0')
  const unlockMins = unlock.getMinutes().toString().padStart(2, '0')
  return `${unlockHours}:${unlockMins}`
}
