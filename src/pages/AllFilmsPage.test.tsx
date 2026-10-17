import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useOpenTicket } from '../hooks/useOpenTicket'
import { AllFilmsPage } from './AllFilmsPage'

vi.mock('../hooks/useOpenTicket', () => ({
  useOpenTicket: vi.fn(),
}))

describe('AllFilmsPage', () => {
  const mockOpenTicket = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useOpenTicket).mockReturnValue(mockOpenTicket)
  })

  it('renders all films and marathons by default', () => {
    render(
      <MemoryRouter>
        <AllFilmsPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByText('Adolescencia, sexo y muerte en Campamento Miasma'),
    ).toBeInTheDocument()

    expect(screen.getByText(/half/i)).toBeInTheDocument()
    expect(screen.getByText('La nit + zombi')).toBeInTheDocument()
    expect(screen.getByText('Marató Sorpresa')).toBeInTheDocument()
  })

  it('filters items when a specific date key is selected from dropdown', () => {
    render(
      <MemoryRouter>
        <AllFilmsPage isFilterOpen={true} setIsFilterOpen={vi.fn()} />
      </MemoryRouter>,
    )

    const fridayOption = screen.getByRole('button', {
      name: 'Divendres 9',
    })

    fireEvent.click(fridayOption)

    expect(
      screen.getByText('Adolescencia, sexo y muerte en Campamento Miasma'),
    ).toBeInTheDocument()

    expect(screen.getByText(/half/i)).toBeInTheDocument()

    expect(screen.queryByText('Red Snow')).not.toBeInTheDocument()
    expect(screen.queryByText('Marató Sorpresa')).not.toBeInTheDocument()
  })

  it('displays Midnight X-Treme section films inside their marathon item', () => {
    render(
      <MemoryRouter>
        <AllFilmsPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('Black Sheeps')).toBeInTheDocument()
    expect(screen.getByText('Unholy Night')).toBeInTheDocument()
    expect(screen.getByText('Get Undressed')).toBeInTheDocument()
  })

  it('opens Braindead ticket from the film list', () => {

    render(
      <MemoryRouter>
        <AllFilmsPage />
      </MemoryRouter>,
    )

    const filmTitle = screen.getByText('Braindead (1992) 4K')

    const filmCard = filmTitle.closest('.group')

    expect(filmCard).not.toBeNull()

    const ticketButton = within(filmCard as HTMLElement)
      .getByRole('button', { name: 'TICKET' })

    fireEvent.click(ticketButton)

    expect(mockOpenTicket).toHaveBeenCalledExactlyOnceWith('ticket-brain')
  })



})
