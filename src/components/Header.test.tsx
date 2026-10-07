import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { Header } from './Header'

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('Header Component', () => {
  it('renders festival dates in the top bar', () => {
    renderWithRouter(<Header />)
    expect(screen.getByText('8-18 OCTUBRE 2026')).toBeInTheDocument()
  })

  it('renders the edition badge text "59A EDICIÓ"', () => {
    renderWithRouter(<Header />)
    expect(screen.getByText('59A EDICIÓ')).toBeInTheDocument()
  })

  it('renders the main SITGES festival title', () => {
    renderWithRouter(<Header />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('SITGES')
  })

  it('renders the festival subtitle text', () => {
    renderWithRouter(<Header />)
    expect(
      screen.getByText(/59È FESTIVAL INTERNACIONAL DE/i)
    ).toBeInTheDocument()
  })

  it('renders King Kong SVG vector logos', () => {
    const { container } = renderWithRouter(<Header />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThanOrEqual(2)
  })

  it('renders the header element with sticky positioning classes', () => {
    const { container } = renderWithRouter(<Header />)
    const headerElement = container.querySelector('header')
    expect(headerElement).toBeInTheDocument()
    expect(headerElement).toHaveClass('sticky')
    expect(headerElement).toHaveClass('top-0')
    expect(headerElement).toHaveClass('z-50')
  })
})
