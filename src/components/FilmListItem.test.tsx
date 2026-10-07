import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FilmListItem } from './FilmListItem'
import type { Film } from '../types/film'
import type { Marathon } from '../types/marathon'

describe('FilmListItem', () => {
  const mockFilm: Film = {
    id: 'miasma',
    title: 'Adolescencia, sexo y muerte en Campamento Miasma',
    directors: [],
    year: '2026',
    country: 'Estats Units Canadà',
    idioma: 'Anglès',
    subt: 'Anglès',
    date: '2026-10-09',
    programmeDate: '2026-10-09',
    dayLabel: 'divendres',
    time: '08:30',
    venue: 'Auditori Meliá',
    duration: "111'",
    synopsis: 'Synopsis text',
    presence: true,
    sitgesUrl: '',
    ticketId: null,
    images: [],
    section: 'SOF - Sitges Collection',
    poster: '/images/films/miasma_poster.jpg',
  }

  const mockMarathon: Marathon = {
    id: 'nit-zombi',
    title: 'La nit + zombi',
    date: '2026-10-11',
    programmeDate: '2026-10-10',
    dayLabel: 'dissabte',
    time: '01:30',
    venue: 'Auditori Meliá',
    ticketId: null,
    filmIds: ['black-sheeps', 'unholy-night'],
    duration: "293'",
  }

  it('renders a film item correctly', () => {
    render(<FilmListItem item={mockFilm} />)
    expect(screen.getByText('Adolescencia, sexo y muerte en Campamento Miasma')).toBeInTheDocument()
    expect(screen.getByText(/Auditori Meliá/i)).toBeInTheDocument()
    expect(screen.getByText('divendres')).toBeInTheDocument()
    expect(screen.getByText('9')).toBeInTheDocument()
    expect(screen.getByText('08:30')).toBeInTheDocument()
    expect(screen.getByText('TICKET')).toBeInTheDocument()
  })

  it('renders a marathon item correctly', () => {
    render(<FilmListItem item={mockMarathon} />)
    expect(screen.getByText('La nit + zombi')).toBeInTheDocument()
    expect(screen.getByText(/Auditori Meliá/i)).toBeInTheDocument()
    expect(screen.getByText('dissabte')).toBeInTheDocument()
    expect(screen.getByText('11')).toBeInTheDocument()
    expect(screen.getByText('01:30')).toBeInTheDocument()
    expect(screen.getByText('TICKET')).toBeInTheDocument()
  })
})
