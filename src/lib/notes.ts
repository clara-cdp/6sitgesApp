const NOTES_KEY = 'sitges_apunts_notes'
const USER_NOTES_KEY = 'sitges_user_notes_list'
const FILM_NOTES_KEY = 'sitges_film_notes'

export interface UserNote {
  id: string
  title: string
  content: string
  updatedAt: string
}

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
    const list = getStoredUserNotes()
    if (list.length > 0) {
      list[0].content = notes
      const firstLine = notes.split('\n')[0].trim().slice(0, 35)
      list[0].title = firstLine || 'Nota general'
      list[0].updatedAt = new Date().toLocaleDateString('ca-ES', { day: 'numeric', month: 'short' })
      localStorage.setItem(USER_NOTES_KEY, JSON.stringify(list))
    } else if (notes.trim()) {
      const firstLine = notes.split('\n')[0].trim().slice(0, 35)
      const newNote: UserNote = {
        id: `note-${Date.now()}`,
        title: firstLine || 'Nota general',
        content: notes,
        updatedAt: new Date().toLocaleDateString('ca-ES', { day: 'numeric', month: 'short' }),
      }
      localStorage.setItem(USER_NOTES_KEY, JSON.stringify([newNote]))
    }
  } catch (e) {
    console.error('Failed to save notes to localStorage:', e)
  }
}

export function getStoredUserNotes(): UserNote[] {
  try {
    const raw = localStorage.getItem(USER_NOTES_KEY)
    if (raw) {
      return JSON.parse(raw) as UserNote[]
    }
    const legacy = localStorage.getItem(NOTES_KEY)
    if (legacy && legacy.trim()) {
      const firstLine = legacy.split('\n')[0].trim().slice(0, 35)
      return [
        {
          id: 'note-default',
          title: firstLine || 'Apunts del festival',
          content: legacy,
          updatedAt: 'Festival 2026',
        },
      ]
    }
    return []
  } catch (e) {
    console.error('Failed to load user notes list:', e)
    return []
  }
}

export function saveUserNote(note: UserNote): void {
  try {
    const list = getStoredUserNotes()
    const index = list.findIndex((n) => n.id === note.id)
    if (index >= 0) {
      list[index] = note
    } else {
      list.unshift(note)
    }
    localStorage.setItem(USER_NOTES_KEY, JSON.stringify(list))
    if (list.length > 0) {
      localStorage.setItem(NOTES_KEY, list[0].content)
    }
  } catch (e) {
    console.error('Failed to save user note:', e)
  }
}

export function deleteUserNote(id: string): void {
  try {
    const list = getStoredUserNotes().filter((n) => n.id !== id)
    localStorage.setItem(USER_NOTES_KEY, JSON.stringify(list))
    localStorage.setItem(NOTES_KEY, list.length > 0 ? list[0].content : '')
  } catch (e) {
    console.error('Failed to delete user note:', e)
  }
}

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

export function getAllStoredFilmNotes(): Record<string, string> {
  try {
    const raw = localStorage.getItem(FILM_NOTES_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Record<string, string>
  } catch (e) {
    console.error('Failed to load all film notes from localStorage:', e)
    return {}
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
