import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { ApuntsPage } from './ApuntsPage'

describe('ApuntsPage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders cream notepad UI and loads initial empty state', () => {
    render(
      <MemoryRouter>
        <ApuntsPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Apunts')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Escriu aquí els teus apunts/i)).toBeInTheDocument()
  })

  it('updates notes in textarea and persists to localStorage', () => {
    render(
      <MemoryRouter>
        <ApuntsPage />
      </MemoryRouter>
    )

    const textarea = screen.getByRole('textbox', { name: 'Festival Notes' })
    fireEvent.change(textarea, { target: { value: 'Gran pel·lícula Miasma!' } })

    expect(localStorage.getItem('sitges_apunts_notes')).toBe('Gran pel·lícula Miasma!')
  })

  it('renders film-specific notes page with film title and persists to film notes storage', () => {
    render(
      <MemoryRouter initialEntries={['/films/miasma/apunts']}>
        <Routes>
          <Route path="/films/:id/apunts" element={<ApuntsPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(
      screen.getByText('Adolescencia, sexo y muerte en Campamento Miasma')
    ).toBeInTheDocument()
    expect(screen.getByText('Apunts de la pel·lícula')).toBeInTheDocument()

    const backLink = screen.getByRole('link', { name: /Tornar/i })
    expect(backLink).toHaveAttribute('href', '/films/miasma')

    const textarea = screen.getByRole('textbox', {
      name: 'Notes for Adolescencia, sexo y muerte en Campamento Miasma',
    })
    fireEvent.change(textarea, { target: { value: 'Impressionant fotografia retro!' } })

    expect(localStorage.getItem('sitges_film_notes')).toContain(
      '"miasma":"Impressionant fotografia retro!"'
    )
  })

  it('renders not found state when film id does not exist', () => {
    render(
      <MemoryRouter initialEntries={['/films/non-existent/apunts']}>
        <Routes>
          <Route path="/films/:id/apunts" element={<ApuntsPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Pel·lícula no trobada')).toBeInTheDocument()
  })
})
