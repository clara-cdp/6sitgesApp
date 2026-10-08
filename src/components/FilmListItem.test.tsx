import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { FilmListItem } from './FilmListItem'
import type { Film } from '../types/film'
import type { Marathon } from '../types/marathon'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

describe('FilmListItem', () => {
  const mockNavigate = vi.fn()

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

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
  })

  it('renders a film item correctly', () => {
    render(
      <MemoryRouter>
        <FilmListItem item={mockFilm} />
      </MemoryRouter>
    )
    expect(screen.getByText('Adolescencia, sexo y muerte en Campamento Miasma')).toBeInTheDocument()
    expect(screen.getByText(/Auditori Meliá/i)).toBeInTheDocument()
    expect(screen.getByText('divendres')).toBeInTheDocument()
    expect(screen.getByText('9')).toBeInTheDocument()
    expect(screen.getByText('08:30')).toBeInTheDocument()
    expect(screen.getByText('TICKET')).toBeInTheDocument()
  })

  it('renders a marathon item correctly', () => {
    render(
      <MemoryRouter>
        <FilmListItem item={mockMarathon} />
      </MemoryRouter>
    )
    expect(screen.getByText('La nit + zombi')).toBeInTheDocument()
    expect(screen.getByText(/Auditori Meliá/i)).toBeInTheDocument()
    expect(screen.getByText('dissabte')).toBeInTheDocument()
    expect(screen.getByText('11')).toBeInTheDocument()
    expect(screen.getByText('01:30')).toBeInTheDocument()
    expect(screen.getByText('TICKET')).toBeInTheDocument()
  })

  it('navigates to film details page when film card is clicked', () => {
    render(
      <MemoryRouter>
        <FilmListItem item={mockFilm} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('Adolescencia, sexo y muerte en Campamento Miasma'))
    expect(mockNavigate).toHaveBeenCalledWith('/films/miasma')
  })

  it('triggers onTicketClick and stops propagation when ticket button is clicked', () => {
    const handleTicketClick = vi.fn()
    render(
      <MemoryRouter>
        <FilmListItem item={mockFilm} onTicketClick={handleTicketClick} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('TICKET'))
    expect(handleTicketClick).toHaveBeenCalledTimes(1)
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('renders star rating instead of ticket button when film has been rated', () => {
    localStorage.setItem('sitges_film_ratings', JSON.stringify({ miasma: 4.5 }))

    render(
      <MemoryRouter>
        <FilmListItem item={mockFilm} />
      </MemoryRouter>
    )

    expect(screen.queryByText('TICKET')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Rating: 4.5 out of 5 stars')).toBeInTheDocument()
  })
})
