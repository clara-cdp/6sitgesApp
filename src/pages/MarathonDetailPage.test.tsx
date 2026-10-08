import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { MarathonDetailPage } from './MarathonDetailPage'

describe('MarathonDetailPage', () => {
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

  it('renders unrevealed marathon state when filmIds is empty', () => {
    render(
      <MemoryRouter initialEntries={['/marathon/marato']}>
        <Routes>
          <Route path="/marathon/:id" element={<MarathonDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Marató Auditori')
    expect(screen.getByText('Detalls pròximament')).toBeInTheDocument()
    expect(
      screen.getByText("Els títols d'aquesta marató es revelaran pròximament.")
    ).toBeInTheDocument()
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
})
