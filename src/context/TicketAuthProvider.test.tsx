
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useContext } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { TicketAuthContext } from './TicketAuthContext'
import { TicketAuthProvider } from './TicketAuthProvider'
import { decryptTicket } from '../lib/ticketCrypto'

vi.mock('../lib/ticketCrypto', () => ({
    decryptTicket: vi.fn(),
}))

function TestConsumer() {
    const auth = useContext(TicketAuthContext)

    if (!auth) return <p>Provider missing</p>

    return (
        <div>
            <p>{auth.isUnlocked ? 'Unlocked' : 'Locked'}</p>
            <button onClick={() => void auth.unlock('test-password')}>
                Unlock
            </button>
            <button onClick={() => auth.lock()}>
                Lock
            </button>
        </div>
    )
}

describe('TicketAuthProvider', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: true,
                arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(10)),
            }),
        )
    })

    it('starts locked', () => {
        render(
            <TicketAuthProvider>
                <TestConsumer />
            </TicketAuthProvider>,
        )

        expect(screen.getByText('Locked')).toBeInTheDocument()
    })

    it('unlocks when decryption succeeds', async () => {
        vi.mocked(decryptTicket).mockResolvedValue(
            new Blob(['PDF'], { type: 'application/pdf' }),
        )

        render(
            <TicketAuthProvider>
                <TestConsumer />
            </TicketAuthProvider>,
        )

        fireEvent.click(screen.getByRole('button', { name: 'Unlock' }))

        await waitFor(() => {
            expect(screen.getByText('Unlocked')).toBeInTheDocument()
        })

        expect(decryptTicket).toHaveBeenCalledWith(
            expect.any(ArrayBuffer),
            'test-password',
        )
    })

    it('stays locked when the password is incorrect', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

        vi.mocked(decryptTicket).mockRejectedValue(
            new Error('Incorrect password'),
        )

        render(
            <TicketAuthProvider>
                <TestConsumer />
            </TicketAuthProvider>,
        )

        fireEvent.click(screen.getByRole('button', { name: 'Unlock' }))

        await waitFor(() => {
            expect(decryptTicket).toHaveBeenCalled()
        })

        expect(screen.getByText('Locked')).toBeInTheDocument()

        consoleSpy.mockRestore()
    })

    it('locks the app again when lock() is called', async () => {
        vi.mocked(decryptTicket).mockResolvedValue(
            new Blob(['PDF'], { type: 'application/pdf' }),
        )

        render(
            <TicketAuthProvider>
                <TestConsumer />
            </TicketAuthProvider>,
        )

        fireEvent.click(screen.getByRole('button', { name: 'Unlock' }))

        await waitFor(() => {
            expect(screen.getByText('Unlocked')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByRole('button', { name: 'Lock' }))

        expect(screen.getByText('Locked')).toBeInTheDocument()
    })


    it('rejects an empty password without fetching a ticket', async () => {

        vi.mocked(decryptTicket).mockResolvedValue(
            new Blob(['PDF'], { type: 'application/pdf' }),
        )

        function EmptyPasswordConsumer() {
            const auth = useContext(TicketAuthContext)

            return (
                <button onClick={() => void auth?.unlock('')}>
                    Try empty password
                </button>
            )
        }

        render(
            <TicketAuthProvider>
                <EmptyPasswordConsumer />
            </TicketAuthProvider>,
        )

        fireEvent.click(
            screen.getByRole('button', { name: 'Try empty password' }),
        )
        expect(fetch).not.toHaveBeenCalled()
        expect(decryptTicket).not.toHaveBeenCalled()
    })

})
