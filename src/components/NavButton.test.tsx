import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { NavButton } from './NavButton'

describe('NavButton Component', () => {
  it('renders a link button when `to` prop is provided', () => {
    render(
      <MemoryRouter>
        <NavButton label="Pel·lícules" to="/films" />
      </MemoryRouter>
    )

    const link = screen.getByRole('link', { name: /Pel·lícules/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/films')
  })

  it('renders a disabled button when `disabled` prop is true', () => {
    render(<NavButton label="Horari" disabled />)

    const button = screen.getByRole('button', { name: /Horari/i })
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  it('handles click events when enabled', () => {
    const handleClick = vi.fn()
    render(<NavButton label="Click Me" onClick={handleClick} />)

    const button = screen.getByRole('button', { name: /Click Me/i })
    button.click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
