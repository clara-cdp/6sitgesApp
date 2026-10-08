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

  it('renders navigation buttons for El meu festival, Horari, and Apunts', () => {
    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>
    )

    const filmsLink = screen.getByRole('link', { name: /El meu festival/i })
    expect(filmsLink).toBeInTheDocument()
    expect(filmsLink).toHaveAttribute('href', '/films')

    const horariBtn = screen.getByRole('button', { name: /Horari/i })
    expect(horariBtn).toBeDisabled()

    const apuntsLink = screen.getByRole('link', { name: /Apunts/i })
    expect(apuntsLink).toBeInTheDocument()
    expect(apuntsLink).toHaveAttribute('href', '/apunts')
  })
})
