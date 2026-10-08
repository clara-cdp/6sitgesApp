import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
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
    expect(screen.getByText('Sitges 2026')).toBeInTheDocument()
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
})
