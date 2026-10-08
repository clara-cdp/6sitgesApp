
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useOpenTicket } from './useOpenTicket'
import { useTicketAuth } from '../context/useTicketAuth'
import { openTicket } from '../lib/openTicket'

vi.mock('../context/useTicketAuth', () => ({
    useTicketAuth: vi.fn(),
}))

vi.mock('../lib/openTicket', () => ({
    openTicket: vi.fn(),
}))

describe('useOpenTicket', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.mocked(useTicketAuth).mockReturnValue({
            isUnlocked: true,
            password: 'test-password',
            unlock: vi.fn(),
            lock: vi.fn(),
        })
    })

    it('opens a ticket using the verified password', async () => {

        const { result } = renderHook(() => useOpenTicket())

        await act(async () => {
            await result.current('ticket-brain')
        })

        expect(openTicket).toHaveBeenCalledExactlyOnceWith(
            'ticket-brain',
            'test-password',
        )
    })

    it('rejects ticket access when the app is locked', async () => {

        vi.mocked(useTicketAuth).mockReturnValue({
            isUnlocked: false,
            password: null,
            unlock: vi.fn(),
            lock: vi.fn(),
        })

        const { result } = renderHook(() => useOpenTicket())

        await expect(
            result.current('ticket-brain'),
        ).rejects.toThrow('Ticket access is locked')

        expect(openTicket).not.toHaveBeenCalled()
    })
})
