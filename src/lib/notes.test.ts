import { beforeEach, describe, expect, it } from 'vitest'
import {
  getStoredFilmNotes,
  getStoredNotes,
  setStoredFilmNotes,
  setStoredNotes,
} from './notes'

describe('notes module', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns empty string when no notes stored', () => {
    expect(getStoredNotes()).toBe('')
    expect(getStoredFilmNotes('miasma')).toBe('')
  })

  it('saves and retrieves general notes from localStorage', () => {
    setStoredNotes('Pel·lícules per veure: Miasma, Braindead')
    expect(getStoredNotes()).toBe('Pel·lícules per veure: Miasma, Braindead')
  })

  it('saves and retrieves per-film notes from localStorage', () => {
    setStoredFilmNotes('miasma', 'Molt bona atmosfera!')
    expect(getStoredFilmNotes('miasma')).toBe('Molt bona atmosfera!')
    expect(getStoredFilmNotes('brain')).toBe('')

    setStoredFilmNotes('brain', 'Un clàssic del gore.')
    expect(getStoredFilmNotes('brain')).toBe('Un clàssic del gore.')
    expect(getStoredFilmNotes('miasma')).toBe('Molt bona atmosfera!')
  })

  it('removes film notes when set to empty string', () => {
    setStoredFilmNotes('miasma', 'Nota temporal')
    expect(getStoredFilmNotes('miasma')).toBe('Nota temporal')

    setStoredFilmNotes('miasma', '   ')
    expect(getStoredFilmNotes('miasma')).toBe('')
  })
})
