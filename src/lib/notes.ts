const NOTES_KEY = 'sitges_apunts_notes'

export function getStoredNotes(): string {
  try {
    return localStorage.getItem(NOTES_KEY) || ''
  } catch (e) {
    console.error('Failed to load notes from localStorage:', e)
    return ''
  }
}

export function setStoredNotes(notes: string): void {
  try {
    localStorage.setItem(NOTES_KEY, notes)
  } catch (e) {
    console.error('Failed to save notes to localStorage:', e)
  }
}

const FILM_NOTES_KEY = 'sitges_film_notes'

export function getStoredFilmNotes(filmId: string): string {
  try {
    const raw = localStorage.getItem(FILM_NOTES_KEY)
    if (!raw) return ''
    const all = JSON.parse(raw) as Record<string, string>
    return all[filmId] || ''
  } catch (e) {
    console.error('Failed to load film notes from localStorage:', e)
    return ''
  }
}

export function setStoredFilmNotes(filmId: string, notes: string): void {
  try {
    const raw = localStorage.getItem(FILM_NOTES_KEY)
    const all: Record<string, string> = raw ? (JSON.parse(raw) as Record<string, string>) : {}
    if (!notes.trim()) {
      delete all[filmId]
    } else {
      all[filmId] = notes
    }
    localStorage.setItem(FILM_NOTES_KEY, JSON.stringify(all))
  } catch (e) {
    console.error('Failed to save film notes to localStorage:', e)
  }
}
