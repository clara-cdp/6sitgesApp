import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { HorariPage } from './HorariPage'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('HorariPage', () => {
  it('renders all festival day section headers', () => {
    render(
      <MemoryRouter>
        <HorariPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Divendres 09')).toBeInTheDocument()
    expect(screen.getByText('Dissabte 10')).toBeInTheDocument()
    expect(screen.getByText('Diumenge 11')).toBeInTheDocument()
    expect(screen.getByText('Dilluns 12')).toBeInTheDocument()
    expect(screen.getByText('Dimarts 13')).toBeInTheDocument()
    expect(screen.getByText('Dijous 15')).toBeInTheDocument()
    expect(screen.getByText('Diumenge 18')).toBeInTheDocument()
  })

  it('renders film sessions with their schedule time, venue, and running time', () => {
    render(
      <MemoryRouter>
        <HorariPage />
      </MemoryRouter>
    )

    // Check titles from different days
    expect(
      screen.getByText('Adolescencia, sexo y muerte en Campamento Miasma')
    ).toBeInTheDocument()
    expect(screen.getByText('HALF')).toBeInTheDocument()
    expect(screen.getByText('Red Snow')).toBeInTheDocument()
    expect(screen.getByText('BRAINDEAD (1992) 4K')).toBeInTheDocument()
    expect(screen.getByText('La Nit + Zombi')).toBeInTheDocument()
    expect(screen.getByText('The Spiral')).toBeInTheDocument()
    expect(screen.getByText('Hope')).toBeInTheDocument()
    expect(screen.getByText('Marató Auditori')).toBeInTheDocument()

    // Check timings and venue details
    expect(screen.getByText('08:30 - 10:21')).toBeInTheDocument()
    expect(screen.getByText('Auditori Meliá · 111 min')).toBeInTheDocument()
    expect(screen.getAllByText('Tramuntana Meliá · 96 min')).toHaveLength(2)
    expect(screen.getByText('Casino Prado · 103 min')).toBeInTheDocument()
  })

  it('renders pause bars between movie sessions with the correct time and duration', () => {
    render(
      <MemoryRouter>
        <HorariPage />
      </MemoryRouter>
    )

    expect(
      screen.getByText("10:21 - 13:15 - PAUSA | 2h 54'")
    ).toBeInTheDocument()
    expect(
      screen.getByText("14:51 - 15:30 - PAUSA | 39'")
    ).toBeInTheDocument()
    expect(
      screen.getByText("16:58 - 17:30 - PAUSA | 32'")
    ).toBeInTheDocument()
    expect(
      screen.getByText("19:50 - 23:00 - PAUSA | 3h 10'")
    ).toBeInTheDocument()
  })

  it('renders Llegir Més links to film and marathon detail routes', () => {
    render(
      <MemoryRouter>
        <HorariPage />
      </MemoryRouter>
    )

    const links = screen.getAllByRole('link', { name: /LLEGIR MÉS/i })
    expect(links.length).toBeGreaterThan(0)

    const filmLink = links.find(
      (link) => link.getAttribute('href') === '/films/miasma'
    )
    expect(filmLink).toBeInTheDocument()

    const marathonLink = links.find(
      (link) => link.getAttribute('href') === '/marathon/nit-zombi'
    )
    expect(marathonLink).toBeInTheDocument()
  })

  it('navigates to film detail page when clicking on a film card', () => {
    mockNavigate.mockClear()

    render(
      <MemoryRouter>
        <HorariPage />
      </MemoryRouter>
    )

    const filmTitle = screen.getByText('Leviticus')
    const filmCard = filmTitle.closest('.cursor-pointer')
    expect(filmCard).not.toBeNull()

    fireEvent.click(filmCard!)
    expect(mockNavigate).toHaveBeenCalledWith('/films/leviticus')
  })
})
