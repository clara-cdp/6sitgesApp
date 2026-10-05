import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Footer } from './Footer'

describe('Footer Component', () => {
  it('renders the footer element with sticky positioning classes', () => {
    const { container } = render(<Footer />)
    const footerElement = container.querySelector('footer')
    expect(footerElement).toBeInTheDocument()
    expect(footerElement).toHaveClass('sticky')
    expect(footerElement).toHaveClass('bottom-0')
    expect(footerElement).toHaveClass('z-50')
  })

  it('renders the link to official Sitges Film Festival site', () => {
    render(<Footer />)
    const link = screen.getByRole('link', { name: /sitgesfilmfestival.com/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://sitgesfilmfestival.com/ca')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders King Kong SVG logo', () => {
    const { container } = render(<Footer />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders Sitges Cathedral SVG image', () => {
    render(<Footer />)
    const cathedralImg = screen.getByAltText(/Sitges Cathedral/i)
    expect(cathedralImg).toBeInTheDocument()
    expect(cathedralImg).toHaveAttribute('src', '/catedral.svg')
  })
})
