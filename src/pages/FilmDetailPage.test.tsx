import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { FilmDetailPage } from './FilmDetailPage'
import { useOpenTicket } from '../hooks/useOpenTicket'

vi.mock('../hooks/useOpenTicket', () => ({
  useOpenTicket: vi.fn(),
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('FilmDetailPage', () => {

  const mockOpenTicket = vi.fn()

  afterEach(() => {
    vi.useRealTimers()
  })

  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 9, 9, 23, 59, 59))
    vi.mocked(useOpenTicket).mockReturnValue(mockOpenTicket)
  })

  it('renders film details when a valid film id is provided in the route', () => {
    render(
      <MemoryRouter initialEntries={['/films/miasma']}>
        <Routes>
          <Route path="/films/:id" element={<FilmDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', { level: 1, name: /Adolescencia, sexo y muerte/i })
    ).toBeInTheDocument()
    expect(screen.getAllByText('Jane Schoenbrun')[0]).toBeInTheDocument()
    expect(screen.getByText(/Auditori Meliá | 111'/i)).toBeInTheDocument()
    expect(screen.getByText('SOF - Sitges Collection')).toBeInTheDocument()
    expect(screen.getByText('PRESÈNCIA')).toBeInTheDocument()
    expect(screen.getByText('Estats Units Canadà')).toBeInTheDocument()
    expect(screen.getByText('TRAILER')).toBeInTheDocument()
    expect(screen.getByText('TICKET')).toBeInTheDocument()
  })

  it('toggles synopsis truncation when clicking ...més and ...menys', () => {
    render(
      <MemoryRouter initialEntries={['/films/miasma']}>
        <Routes>
          <Route path="/films/:id" element={<FilmDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    const synopsisToggle = screen.getAllByText('...més')[0]
    expect(synopsisToggle).toBeInTheDocument()

    fireEvent.click(synopsisToggle)
    expect(screen.getByText('...menys')).toBeInTheDocument()

    fireEvent.click(screen.getByText('...menys'))
    expect(screen.getAllByText('...més')[0]).toBeInTheDocument()
  })

  it('renders film details for classic film (e.g. Braindead / id: brain)', () => {
    render(
      <MemoryRouter initialEntries={['/films/brain']}>
        <Routes>
          <Route path="/films/:id" element={<FilmDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', { level: 1, name: /Braindead/i })
    ).toBeInTheDocument()
    expect(screen.getAllByText('Peter Jackson')[0]).toBeInTheDocument()
    expect(screen.getByText('Sitges Clàssics')).toBeInTheDocument()
  })

  it('allows navigating gallery stills using next and previous buttons', () => {
    render(
      <MemoryRouter initialEntries={['/films/miasma']}>
        <Routes>
          <Route path="/films/:id" element={<FilmDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    const nextBtn = screen.getByRole('button', { name: 'Next image' })
    const prevBtn = screen.getByRole('button', { name: 'Previous image' })

    expect(nextBtn).toBeInTheDocument()
    expect(prevBtn).toBeInTheDocument()

    fireEvent.click(nextBtn)
    fireEvent.click(prevBtn)
  })

  it('renders not found message when film id is invalid', () => {
    render(
      <MemoryRouter initialEntries={['/films/non-existent-film']}>
        <Routes>
          <Route path="/films/:id" element={<FilmDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Pel·lícula no trobada')).toBeInTheDocument()
    expect(screen.getByText('← Tornar a la llista de pel·lícules')).toBeInTheDocument()
  })


  it('opens the correct ticket from Braindead detail page', () => {

    render(
      <MemoryRouter initialEntries={['/films/brain']}>
        <Routes>
          <Route path="/films/:id" element={<FilmDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: 'TICKET' }))

    expect(mockOpenTicket).toHaveBeenCalledExactlyOnceWith('ticket-brain')
  })

  it('persists star rating in localStorage when clicked', () => {
    localStorage.clear()

    render(
      <MemoryRouter initialEntries={['/films/miasma']}>
        <Routes>
          <Route path="/films/:id" element={<FilmDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    const star5 = screen.getByRole('button', { name: 'Rate 5 stars' })
    fireEvent.click(star5)

    expect(localStorage.getItem('sitges_film_ratings')).toContain('"miasma":5')
  })

  it('persists half-star rating in localStorage when clicked', () => {
    localStorage.clear()

    render(
      <MemoryRouter initialEntries={['/films/miasma']}>
        <Routes>
          <Route path="/films/:id" element={<FilmDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    const star3Half = screen.getByRole('button', { name: 'Rate 3.5 stars' })
    fireEvent.click(star3Half)

    expect(localStorage.getItem('sitges_film_ratings')).toContain('"miasma":3.5')
  })

  it('renders the interactive star rating section down and after the ticket button', () => {
    render(
      <MemoryRouter initialEntries={['/films/miasma']}>
        <Routes>
          <Route path="/films/:id" element={<FilmDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    const ticketButton = screen.getByRole('button', { name: 'TICKET' })
    const star5Button = screen.getByRole('button', { name: 'Rate 5 stars' })

    // Verify star rating button appears after ticket button in DOM order
    expect(
      ticketButton.compareDocumentPosition(star5Button) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
  })

  it('renders the star rating section even when film has no ticketId', () => {
    render(
      <MemoryRouter initialEntries={['/films/sheeps']}>
        <Routes>
          <Route path="/films/:id" element={<FilmDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.queryByRole('button', { name: 'TICKET' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Rate 5 stars' })).toBeInTheDocument()
  })

  it('disables rating buttons if less than 1 hour has passed since film start time', () => {
    // Film miasma starts at 2026-10-09 08:30. At 09:00 it is only 30 mins after start (< 1 hour).
    vi.setSystemTime(new Date(2026, 9, 9, 9, 0, 0))

    render(
      <MemoryRouter initialEntries={['/films/miasma']}>
        <Routes>
          <Route path="/films/:id" element={<FilmDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    const star5 = screen.getByRole('button', { name: 'Rate 5 stars' })
    expect(star5).toBeDisabled()

    fireEvent.click(star5)
    expect(localStorage.getItem('sitges_film_ratings')).toBeNull()
  })

  it('toggles rating back to 0 when clicking the same rating again', () => {
    localStorage.clear()

    render(
      <MemoryRouter initialEntries={['/films/miasma']}>
        <Routes>
          <Route path="/films/:id" element={<FilmDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    const star4 = screen.getByRole('button', { name: 'Rate 4 stars' })
    fireEvent.click(star4)
    expect(localStorage.getItem('sitges_film_ratings')).toContain('"miasma":4')

    fireEvent.click(star4)
    expect(localStorage.getItem('sitges_film_ratings')).toBe('{}')
  })

  it('updates rating when dragging / sliding fingers across the stars container', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/films/miasma']}>
        <Routes>
          <Route path="/films/:id" element={<FilmDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    const starsContainer = container.querySelector('.touch-none') as HTMLDivElement
    expect(starsContainer).toBeInTheDocument()

    // Mock getBoundingClientRect: width 200px, starting at x = 0
    vi.spyOn(starsContainer, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      right: 200,
      bottom: 40,
      width: 200,
      height: 40,
      x: 0,
      y: 0,
      toJSON: () => {},
    })

    // Pointer down at x=0
    fireEvent.pointerDown(starsContainer, { clientX: 0, pointerId: 1 })
    // Slide finger to x=140 (70% of 200px -> 3.5 stars)
    fireEvent.pointerMove(starsContainer, { clientX: 140, pointerId: 1 })
    // Pointer up at x=140
    fireEvent.pointerUp(starsContainer, { clientX: 140, pointerId: 1 })

    expect(localStorage.getItem('sitges_film_ratings')).toContain('"miasma":3.5')
  })

  it('updates rating to 5 stars when slid to the far right', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/films/miasma']}>
        <Routes>
          <Route path="/films/:id" element={<FilmDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    const starsContainer = container.querySelector('.touch-none') as HTMLDivElement
    expect(starsContainer).toBeInTheDocument()

    vi.spyOn(starsContainer, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      right: 200,
      bottom: 40,
      width: 200,
      height: 40,
      x: 0,
      y: 0,
      toJSON: () => {},
    })

    fireEvent.pointerDown(starsContainer, { clientX: 0, pointerId: 1 })
    fireEvent.pointerMove(starsContainer, { clientX: 200, pointerId: 1 })
    fireEvent.pointerUp(starsContainer, { clientX: 200, pointerId: 1 })

    expect(localStorage.getItem('sitges_film_ratings')).toContain('"miasma":5')
  })

  it('renders a clickable notes button at the end of film details linking to film notes page', () => {
    render(
      <MemoryRouter initialEntries={['/films/miasma']}>
        <Routes>
          <Route path="/films/:id" element={<FilmDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    const notesButton = screen.getByRole('link', { name: /apunts/i })
    expect(notesButton).toBeInTheDocument()
    expect(notesButton).toHaveAttribute('href', '/films/miasma/apunts')
  })
})
