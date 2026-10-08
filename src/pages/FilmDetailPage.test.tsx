import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { FilmDetailPage } from './FilmDetailPage'

describe('FilmDetailPage', () => {
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
})
