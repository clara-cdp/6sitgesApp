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
  it('renders all festival day section headers with arrows, collapsed by default', () => {
    render(
      <MemoryRouter>
        <HorariPage />
      </MemoryRouter>
    )

    const fridayHeader = screen.getByRole('button', { name: /Divendres 09/i })
    expect(fridayHeader).toBeInTheDocument()
    expect(fridayHeader).toHaveAttribute('aria-expanded', 'false')

    expect(screen.getByRole('button', { name: /Dissabte 10/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Diumenge 11/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Dilluns 12/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Dimarts 13/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Dijous 15/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Diumenge 18/i })).toBeInTheDocument()

    expect(
      screen.queryByText('Adolescencia, sexo y muerte en Campamento Miasma')
    ).not.toBeInTheDocument()
  })

  it('toggles a day dropdown open and closed when clicking the red day bar', () => {
    render(
      <MemoryRouter>
        <HorariPage />
      </MemoryRouter>
    )

    const fridayButton = screen.getByRole('button', { name: /Divendres 09/i })

    expect(fridayButton).toHaveAttribute('aria-expanded', 'false')
    expect(
      screen.queryByText('Adolescencia, sexo y muerte en Campamento Miasma')
    ).not.toBeInTheDocument()

    fireEvent.click(fridayButton)
    expect(fridayButton).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getByText('Adolescencia, sexo y muerte en Campamento Miasma')
    ).toBeInTheDocument()

    fireEvent.click(fridayButton)
    expect(fridayButton).toHaveAttribute('aria-expanded', 'false')
    expect(
      screen.queryByText('Adolescencia, sexo y muerte en Campamento Miasma')
    ).not.toBeInTheDocument()
  })

  it('renders film sessions with their schedule time, venue, and running time when expanded', () => {
    render(
      <MemoryRouter>
        <HorariPage />
      </MemoryRouter>
    )

    const days = [
      'Divendres 09',
      'Dissabte 10',
      'Diumenge 11',
      'Dilluns 12',
      'Dimarts 13',
      'Dijous 15',
      'Diumenge 18',
    ]
    days.forEach((dayName) => {
      fireEvent.click(screen.getByRole('button', { name: new RegExp(dayName, 'i') }))
    })

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

    fireEvent.click(screen.getByRole('button', { name: /Divendres 09/i }))

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

  it('renders Llegir Més links to film and marathon detail routes when days are expanded', () => {
    render(
      <MemoryRouter>
        <HorariPage />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: /Divendres 09/i }))
    fireEvent.click(screen.getByRole('button', { name: /Dissabte 10/i }))

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

    fireEvent.click(screen.getByRole('button', { name: /Divendres 09/i }))

    const filmTitle = screen.getByText('Leviticus')
    const filmCard = filmTitle.closest('.cursor-pointer')
    expect(filmCard).not.toBeNull()

    fireEvent.click(filmCard!)
    expect(mockNavigate).toHaveBeenCalledWith('/films/leviticus')
  })
})
