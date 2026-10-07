import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { WelcomePage } from './WelcomePage'

describe('WelcomePage Component', () => {
  it('renders welcome title', () => {
    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>
    )

    expect(
      screen.getByText(/Benvinguts al 59è festival internacional de cinema fantàstic de Sitges/i)
    ).toBeInTheDocument()
  })

  it('renders navigation buttons for Pel·lícules, Horari, and Apunts', () => {
    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>
    )

    const filmsLink = screen.getByRole('link', { name: /Pel·lícules/i })
    expect(filmsLink).toBeInTheDocument()
    expect(filmsLink).toHaveAttribute('href', '/films')

    const horariBtn = screen.getByRole('button', { name: /Horari/i })
    expect(horariBtn).toBeDisabled()

    const apuntsBtn = screen.getByRole('button', { name: /Apunts/i })
    expect(apuntsBtn).toBeDisabled()
  })
})
