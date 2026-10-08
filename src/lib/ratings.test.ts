import { beforeEach, describe, expect, it } from 'vitest'
import { getFilmRating, getStoredRatings, setFilmRating } from './ratings'

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
})
