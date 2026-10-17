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

  it('renders films included in the marathon and displays their ratings when at least one is rated', () => {
    localStorage.setItem('sitges_film_ratings', JSON.stringify({ 'black-sheeps': 4 }))

    render(
      <MemoryRouter>
        <FilmListItem item={mockMarathon} />
      </MemoryRouter>
    )

    expect(screen.getByText('Black Sheeps')).toBeInTheDocument()
    expect(screen.getByText('Unholy Night')).toBeInTheDocument()

    expect(screen.queryByText('TICKET')).not.toBeInTheDocument()

    expect(screen.getByLabelText('Rating: 4 out of 5 stars')).toBeInTheDocument()
    expect(screen.getByLabelText('Rating: 0 out of 5 stars')).toBeInTheDocument()
  })

  it('navigates to individual film detail when an included marathon film is clicked', () => {
    render(
      <MemoryRouter>
        <FilmListItem item={mockMarathon} />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText('Black Sheeps'))
    expect(mockNavigate).toHaveBeenCalledWith('/films/black-sheeps')
  })

  it('renders rating stars as display-only without interactive buttons in the main list', () => {
    localStorage.setItem('sitges_film_ratings', JSON.stringify({ miasma: 4 }))

    render(
      <MemoryRouter>
        <FilmListItem item={mockFilm} />
      </MemoryRouter>
    )

    const ratingContainer = screen.getByLabelText('Rating: 4 out of 5 stars')
    expect(ratingContainer).toBeInTheDocument()
    expect(ratingContainer.querySelectorAll('button')).toHaveLength(0)
  })

  it('renders a fine black divider between marathon header and sub-films', () => {
    const { container } = render(
      <MemoryRouter>
        <FilmListItem item={mockMarathon} />
      </MemoryRouter>
    )

    const divider = container.querySelector('.border-t.border-black')
    expect(divider).toBeInTheDocument()
  })

  it('renders a gold PRESÈNCIA badge when film has presence: true', () => {
    render(
      <MemoryRouter>
        <FilmListItem item={mockFilm} />
      </MemoryRouter>
    )

    const badge = screen.getByText('PRESÈNCIA')
    expect(badge).toBeInTheDocument()
    expect(badge.parentElement).toHaveClass('bg-[#B78B4B]')
  })

  it('does not render PRESÈNCIA badge when film has presence: false', () => {
    render(
      <MemoryRouter>
        <FilmListItem item={{ ...mockFilm, presence: false }} />
      </MemoryRouter>
    )

    expect(screen.queryByText('PRESÈNCIA')).not.toBeInTheDocument()
  })

  it('renders a single PRESÈNCIA badge on top for a marathon when an included film has presence: true', () => {
    const marathonWithPresence: Marathon = {
      ...mockMarathon,
      filmIds: ['miasma', 'black-sheeps'],
    }

    render(
      <MemoryRouter>
        <FilmListItem item={marathonWithPresence} />
      </MemoryRouter>
    )

    const badges = screen.getAllByText('PRESÈNCIA')
    expect(badges).toHaveLength(1)
    expect(badges[0].parentElement).toHaveClass('bg-[#B78B4B]')
  })

  it('does not render PRESÈNCIA badge for a marathon when no included films have presence', () => {
    render(
      <MemoryRouter>
        <FilmListItem item={mockMarathon} />
      </MemoryRouter>
    )

    expect(screen.queryByText('PRESÈNCIA')).not.toBeInTheDocument()
  })

  it('for marato, shows ticket and hides film ratings when other films are rated but company is not rated', () => {
    localStorage.setItem('sitges_film_ratings', JSON.stringify({ half: 4.5, drag: 4 }))

    const mockMarato: Marathon = {
      id: 'marato',
      title: 'Marató Sorpresa',
      date: '2026-10-18',
      programmeDate: '2026-10-18',
      dayLabel: 'diumenge',
      time: '15:30',
      venue: 'Auditori Meliá',
      ticketId: 'ticket-marato',
      filmIds: ['company', 'half', 'drag'],
      duration: "361'",
    }

    render(
      <MemoryRouter>
        <FilmListItem item={mockMarato} onTicketClick={vi.fn()} />
      </MemoryRouter>
    )

    expect(screen.getByText('TICKET')).toBeInTheDocument()
    expect(screen.queryByLabelText(/Rating:/i)).not.toBeInTheDocument()
  })

  it('for marato, hides ticket and reveals film ratings once company is rated', () => {
    localStorage.setItem('sitges_film_ratings', JSON.stringify({ company: 5, half: 4.5 }))

    const mockMarato: Marathon = {
      id: 'marato',
      title: 'Marató Sorpresa',
      date: '2026-10-18',
      programmeDate: '2026-10-18',
      dayLabel: 'diumenge',
      time: '15:30',
      venue: 'Auditori Meliá',
      ticketId: 'ticket-marato',
      filmIds: ['company', 'half'],
      duration: "361'",
    }

    render(
      <MemoryRouter>
        <FilmListItem item={mockMarato} onTicketClick={vi.fn()} />
      </MemoryRouter>
    )

    expect(screen.queryByText('TICKET')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Rating: 5 out of 5 stars')).toBeInTheDocument()
    expect(screen.getByLabelText('Rating: 4.5 out of 5 stars')).toBeInTheDocument()
  })
})

