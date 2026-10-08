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
