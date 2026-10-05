import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Header } from './Header'

describe('Header Component', () => {
  it('renders festival dates in the top bar', () => {
    render(<Header />)
    expect(screen.getByText('8-18 OCTUBRE 2026')).toBeInTheDocument()
  })

  it('renders the edition badge text "59A EDICIÓ"', () => {
    render(<Header />)
    expect(screen.getByText('59A EDICIÓ')).toBeInTheDocument()
  })

  it('renders the main SITGES festival title', () => {
    render(<Header />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('SITGES')
  })

  it('renders the festival subtitle text', () => {
    render(<Header />)
    expect(
      screen.getByText(/59È FESTIVAL INTERNACIONAL DE/i)
    ).toBeInTheDocument()
  })

  it('renders King Kong SVG vector logos', () => {
    const { container } = render(<Header />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThanOrEqual(2)
  })
})
