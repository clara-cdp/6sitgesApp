import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
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

  it('renders filter toggle button when showFilterToggle is true and triggers onToggleFilter', () => {
    const handleToggle = vi.fn()
    renderWithRouter(<Header showFilterToggle={true} onToggleFilter={handleToggle} />)

    const toggleBtn = screen.getByRole('button', { name: /toggle filter menu/i })
    expect(toggleBtn).toBeInTheDocument()

    fireEvent.click(toggleBtn)
    expect(handleToggle).toHaveBeenCalledTimes(1)
  })
})
