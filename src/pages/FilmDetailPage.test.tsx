import { render, screen } from '@testing-library/react'
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

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Adolescencia, sexo y muerte en Campamento Miasma'
    )
    expect(screen.getByText(/Tornar a la llista/i)).toBeInTheDocument()
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
    expect(screen.getByText('Tornar a les pel·lícules')).toBeInTheDocument()
  })
})
