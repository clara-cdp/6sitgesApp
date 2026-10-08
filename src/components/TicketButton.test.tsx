
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TicketButton } from './TicketButton'

describe('TicketButton', () => {
    it('renders a ticket button', () => {
        render(<TicketButton />)

        const button = screen.getByRole('button', { name: 'TICKET' })

        expect(button).toBeInTheDocument()
        expect(button).toHaveAttribute('type', 'button')
        expect(button).toBeEnabled()
    })

    it('calls onClick when clicked', () => {
        const handleClick = vi.fn()

        render(<TicketButton onClick={handleClick} />)

        fireEvent.click(screen.getByRole('button', { name: 'TICKET' }))

        expect(handleClick).toHaveBeenCalledOnce()
    })

    it('does not call onClick when disabled', () => {
        const handleClick = vi.fn()

        render(<TicketButton onClick={handleClick} disabled />)

        const button = screen.getByRole('button', { name: 'TICKET' })

        expect(button).toBeDisabled()

        fireEvent.click(button)

        expect(handleClick).not.toHaveBeenCalled()
    })

    it('preserves the chamfered button styling', () => {
        render(<TicketButton />)

        const button = screen.getByRole('button', { name: 'TICKET' })

        expect(button).toHaveClass('bg-[#B78B4B]')
        expect(button.style.clipPath).toContain('polygon(')
    })
})

