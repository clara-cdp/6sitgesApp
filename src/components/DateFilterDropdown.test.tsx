import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { DateFilterDropdown, DATE_OPTIONS } from './DateFilterDropdown'

describe('DateFilterDropdown Component', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <DateFilterDropdown
        selectedKey="ALL"
        onSelectKey={vi.fn()}
        isOpen={false}
        onClose={vi.fn()}
      />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders all date options when isOpen is true', () => {
    render(
      <DateFilterDropdown
        selectedKey="ALL"
        onSelectKey={vi.fn()}
        isOpen={true}
        onClose={vi.fn()}
      />
    )

    DATE_OPTIONS.forEach((option) => {
      expect(screen.getByRole('button', { name: option.label })).toBeInTheDocument()
    })
  })

  it('calls onSelectKey and onClose when an option is clicked', () => {
    const handleSelectKey = vi.fn()
    const handleClose = vi.fn()

    render(
      <DateFilterDropdown
        selectedKey="ALL"
        onSelectKey={handleSelectKey}
        isOpen={true}
        onClose={handleClose}
      />
    )

    const fridayBtn = screen.getByRole('button', { name: 'Divendres 9' })
    fireEvent.click(fridayBtn)

    expect(handleSelectKey).toHaveBeenCalledWith('2026-10-09')
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when backdrop is clicked', () => {
    const handleClose = vi.fn()

    const { container } = render(
      <DateFilterDropdown
        selectedKey="ALL"
        onSelectKey={vi.fn()}
        isOpen={true}
        onClose={handleClose}
      />
    )

    const backdrop = container.querySelector('div[aria-hidden="true"]')
    if (backdrop) {
      fireEvent.click(backdrop)
    }

    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
