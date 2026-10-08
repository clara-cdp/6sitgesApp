import { beforeEach, describe, expect, it } from 'vitest'
import { canRateFilm, getFilmRating, getRatingUnlockTime, getStoredRatings, setFilmRating } from './ratings'

describe('ratings module', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns 0 for unrated film', () => {
    expect(getFilmRating('miasma')).toBe(0)
    expect(getStoredRatings()).toEqual({})
  })

  it('saves and retrieves film ratings from localStorage', () => {
    setFilmRating('miasma', 5)
    expect(getFilmRating('miasma')).toBe(5)
    expect(getStoredRatings()).toEqual({ miasma: 5 })

    setFilmRating('brain', 4)
    expect(getFilmRating('brain')).toBe(4)
    expect(getStoredRatings()).toEqual({ miasma: 5, brain: 4 })
  })

  it('saves and retrieves half-star film ratings', () => {
    setFilmRating('miasma', 3.5)
    expect(getFilmRating('miasma')).toBe(3.5)
    expect(getStoredRatings()).toEqual({ miasma: 3.5 })
  })

  it('removes rating when set to 0', () => {
    setFilmRating('miasma', 5)
    expect(getFilmRating('miasma')).toBe(5)

    setFilmRating('miasma', 0)
    expect(getFilmRating('miasma')).toBe(0)
    expect(getStoredRatings()).toEqual({})
  })

  it('prevents rating until 1 hour after film start time', () => {
    const film = { date: '2026-10-09', time: '08:30' }
    // 30 mins after start (09:00) -> false
    const nowBefore = new Date(2026, 9, 9, 9, 0, 0)
    expect(canRateFilm(film, nowBefore)).toBe(false)

    // 1 hour after start (09:30) -> true
    const nowAfter = new Date(2026, 9, 9, 9, 30, 0)
    expect(canRateFilm(film, nowAfter)).toBe(true)
  })

  it('computes correct rating unlock time string', () => {
    const film = { date: '2026-10-09', time: '08:30' }
    expect(getRatingUnlockTime(film)).toBe('09:30')
  })
})
