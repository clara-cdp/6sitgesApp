import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { ApuntsPage } from './ApuntsPage'

describe('ApuntsPage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders Apunts dashboard overview and loads empty state', () => {
    render(
      <MemoryRouter>
        <ApuntsPage />
      </MemoryRouter>
    )

    expect(screen.getAllByText('Apunts').length).toBeGreaterThan(0)
    expect(screen.getByText('Cap apunt creat')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Afegir apunt' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Pel·lícules' })).toBeInTheDocument()
  })

  it('creates a new note using the floating (+) button and persists to localStorage', () => {
    render(
      <MemoryRouter>
        <ApuntsPage />
      </MemoryRouter>
    )

    // Click the (+) floating button
    const addBtn = screen.getByRole('button', { name: 'Afegir apunt' })
    fireEvent.click(addBtn)

    // Notepad editor should open with textarea
    const textarea = screen.getByRole('textbox', { name: 'Festival Notes' })
    expect(textarea).toBeInTheDocument()

    // Type notes content with title and body
    fireEvent.change(textarea, {
      target: { value: 'Títol de la nota\nCos de la primera nota del festival' },
    })

    // Verify localStorage persistence
    expect(localStorage.getItem('sitges_apunts_notes')).toContain('Títol de la nota')
    expect(localStorage.getItem('sitges_user_notes_list')).toContain('Títol de la nota')

    // Click back button to return to dashboard
    const backBtn = screen.getByRole('button', { name: /Tornar/i })
    fireEvent.click(backBtn)

    // The note card should now be visible on the dashboard
    expect(screen.getByText('Títol de la nota')).toBeInTheDocument()
    expect(screen.getByText(/Cos de la primera nota del festival/)).toBeInTheDocument()
  })

  it('switches between Apunts and Pel·lícules tabs', () => {
    // Pre-populate film note
    localStorage.setItem(
      'sitges_film_notes',
      JSON.stringify({ miasma: 'Impressionant fotografia i ambientació retro!' })
    )

    render(
      <MemoryRouter>
        <ApuntsPage />
      </MemoryRouter>
    )

    // Switch to Pel·lícules tab
    const filmsTabBtn = screen.getByRole('button', { name: 'Pel·lícules' })
    fireEvent.click(filmsTabBtn)

    // Check that the film note is displayed
    expect(
      screen.getByText('Adolescencia, sexo y muerte en Campamento Miasma')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Impressionant fotografia i ambientació retro!')
    ).toBeInTheDocument()
  })

  it('allows deleting an existing user note', () => {
    // Pre-populate user notes
    localStorage.setItem(
      'sitges_user_notes_list',
      JSON.stringify([
        {
          id: 'test-note-1',
          title: 'Nota per esborrar',
          content: 'Contingut de prova',
          updatedAt: 'Avui',
        },
      ])
    )

    render(
      <MemoryRouter>
        <ApuntsPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Nota per esborrar')).toBeInTheDocument()

    // Click delete button
    const deleteBtn = screen.getByRole('button', { name: 'Eliminar apunt' })
    fireEvent.click(deleteBtn)

    // Should now show empty state
    expect(screen.queryByText('Nota per esborrar')).not.toBeInTheDocument()
    expect(screen.getByText('Cap apunt creat')).toBeInTheDocument()
  })

  it('switches tabs on mobile touch swipe gestures', () => {
    render(
      <MemoryRouter>
        <ApuntsPage />
      </MemoryRouter>
    )

    const slideContainer = screen.getByText('Cap apunt creat').closest('.overflow-hidden')
    expect(slideContainer).toBeInTheDocument()

    // Swipe left (diffX = -60) to switch to Pel·lícules
    fireEvent.touchStart(slideContainer!, {
      touches: [{ clientX: 100, clientY: 100 }],
    })
    fireEvent.touchEnd(slideContainer!, {
      changedTouches: [{ clientX: 40, clientY: 100 }],
    })

    // Now swipe right (diffX = +60) to switch back to Apunts
    fireEvent.touchStart(slideContainer!, {
      touches: [{ clientX: 40, clientY: 100 }],
    })
    fireEvent.touchEnd(slideContainer!, {
      changedTouches: [{ clientX: 100, clientY: 100 }],
    })
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
