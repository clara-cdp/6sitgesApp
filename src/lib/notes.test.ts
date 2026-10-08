import { beforeEach, describe, expect, it } from 'vitest'
import { getStoredNotes, setStoredNotes } from './notes'

describe('notes module', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns empty string when no notes stored', () => {
    expect(getStoredNotes()).toBe('')
  })

  it('saves and retrieves notes from localStorage', () => {
    setStoredNotes('Pel·lícules per veure: Miasma, Braindead')
    expect(getStoredNotes()).toBe('Pel·lícules per veure: Miasma, Braindead')
  })
})
