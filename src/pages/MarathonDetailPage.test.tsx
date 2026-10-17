import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { MarathonDetailPage } from './MarathonDetailPage'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useOpenTicket } from '../hooks/useOpenTicket'

vi.mock('../hooks/useOpenTicket', () => ({
  useOpenTicket: vi.fn(),
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('MarathonDetailPage', () => {
  const mockOpenTicket = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useOpenTicket).mockReturnValue(mockOpenTicket)
  })

  it('renders marathon details and lists associated films linking to their detail pages', () => {
    render(
      <MemoryRouter initialEntries={['/marathon/nit-zombi']}>
        <Routes>
          <Route path="/marathon/:id" element={<MarathonDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('La nit + zombi')
    expect(screen.getByText(/Auditori Meliá | 293'/i)).toBeInTheDocument()

    expect(screen.getByText('Black Sheeps')).toBeInTheDocument()
    expect(screen.getByText('The Theater of the Living Dead')).toBeInTheDocument()
    expect(screen.getByText('Unholy Night')).toBeInTheDocument()
    expect(screen.getByText('Get Undressed')).toBeInTheDocument()

    const filmLinks = screen.getAllByRole('link', { name: /LLEGIR MÉS/i })
    expect(filmLinks.length).toBe(4)
    expect(filmLinks[0]).toHaveAttribute('href', '/films/sheeps')
  })

  it('renders marathon details and lists associated films for Marató Auditori', () => {
    render(
      <MemoryRouter initialEntries={['/marathon/marato']}>
        <Routes>
          <Route path="/marathon/:id" element={<MarathonDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Marató Sorpresa')
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('Casey Affleck')).toBeInTheDocument()

    const filmLinks = screen.getAllByRole('link', { name: /LLEGIR MÉS/i })
    expect(filmLinks[0]).toHaveAttribute('href', '/films/company')
  })

  it('renders not found message when marathon id is invalid', () => {
    render(
      <MemoryRouter initialEntries={['/marathon/invalid-marathon']}>
        <Routes>
          <Route path="/marathon/:id" element={<MarathonDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Marató no trobada')).toBeInTheDocument()
    expect(screen.getByText('← Tornar a la llista')).toBeInTheDocument()
  })

  it('opens the correct ticket from Marató Sorpresa', () => {
    render(
      <MemoryRouter initialEntries={['/marathon/marato']}>
        <Routes>
          <Route path="/marathon/:id" element={<MarathonDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: 'TICKET' }))

    expect(mockOpenTicket).toHaveBeenCalledExactlyOnceWith('ticket-marato')
  })
})
