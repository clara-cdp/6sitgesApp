import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { LlegirMesButton } from './LlegirMesButton'

describe('LlegirMesButton', () => {
  it('renders a button with default label "LLEGIR MÉS"', () => {
    render(<LlegirMesButton />)

    const button = screen.getByRole('button', { name: /LLEGIR MÉS/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'button')
  })

  it('renders a link when `to` prop is provided', () => {
    render(
      <MemoryRouter>
        <LlegirMesButton to="/films/leviticus" />
      </MemoryRouter>
    )

    const link = screen.getByRole('link', { name: /LLEGIR MÉS/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/films/leviticus')
  })

  it('renders a custom label when `label` prop is passed', () => {
    render(<LlegirMesButton label="MÉS INFORMACIÓ" />)

    expect(screen.getByRole('button', { name: /MÉS INFORMACIÓ/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked as a button', () => {
    const handleClick = vi.fn()
    render(<LlegirMesButton onClick={handleClick} />)

    const button = screen.getByRole('button', { name: /LLEGIR MÉS/i })
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('preserves the chamfered cut corners styling', () => {
    render(<LlegirMesButton />)

    const button = screen.getByRole('button', { name: /LLEGIR MÉS/i })
    expect(button.style.clipPath).toContain('polygon(')
  })

  it('applies dark variant classes by default and light variant classes when specified', () => {
    const { rerender } = render(<LlegirMesButton variant="dark" />)
    const darkButton = screen.getByRole('button', { name: /LLEGIR MÉS/i })
    expect(darkButton).toHaveClass('bg-black')

    rerender(<LlegirMesButton variant="light" />)
    const lightButton = screen.getByRole('button', { name: /LLEGIR MÉS/i })
    expect(lightButton).toHaveClass('bg-white')
  })
})
