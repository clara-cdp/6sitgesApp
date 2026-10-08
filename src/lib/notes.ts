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
