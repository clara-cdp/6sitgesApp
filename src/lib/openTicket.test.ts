
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { openTicket } from './openTicket'
import { decryptTicket } from './ticketCrypto'

vi.mock('./ticketCrypto', () => ({
    decryptTicket: vi.fn(),
}))

describe('openTicket', () => {
    beforeEach(() => {
        vi.clearAllMocks()

        vi.stubGlobal('fetch', vi.fn())
        vi.spyOn(window, 'alert').mockImplementation(() => { })

        vi.spyOn(URL, 'createObjectURL')
            .mockReturnValue('blob:test-ticket')
    })

    afterEach(() => {
        vi.restoreAllMocks()
        vi.unstubAllGlobals()
    })

    it('fetches and decrypts the correct ticket', async () => {

        const encrypted = new ArrayBuffer(10)
        const pdf = new Blob(['%PDF-test'], { type: 'application/pdf' })

        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            arrayBuffer: vi.fn().mockResolvedValue(encrypted),
        } as unknown as Response)

        vi.mocked(decryptTicket).mockResolvedValue(pdf)

        await openTicket('ticket-brain', 'test-password')

        expect(fetch).toHaveBeenCalledWith('/tickets/7-BRAINDED.enc')
        expect(decryptTicket).toHaveBeenCalledWith(
            encrypted,
            'test-password',
        )
        expect(URL.createObjectURL).toHaveBeenCalledWith(pdf)
    })

    it('handles an unknown ticket ID', async () => {
        const consoleSpy = vi.spyOn(console, 'error')
            .mockImplementation(() => { })

        await openTicket('unknown-ticket', 'test-password')

        expect(consoleSpy).toHaveBeenCalledWith(
            'Ticket not found: unknown-ticket',
        )
        expect(fetch).not.toHaveBeenCalled()
    })

    it('handles a failed ticket download', async () => {
        vi.spyOn(console, 'error').mockImplementation(() => { })

        vi.mocked(fetch).mockResolvedValue({
            ok: false,
        } as Response)

        await openTicket('ticket-brain', 'test-password')

        expect(decryptTicket).not.toHaveBeenCalled()
        expect(window.alert).toHaveBeenCalledWith(
            'Could not open ticket. Check the password or connection.',
        )
    })

    it('handles an incorrect password', async () => {
        vi.spyOn(console, 'error').mockImplementation(() => { })

        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(10)),
        } as unknown as Response)

        vi.mocked(decryptTicket).mockRejectedValue(
            new Error('Decryption failed'),
        )

        await openTicket('ticket-brain', 'wrong-password')

        expect(decryptTicket).toHaveBeenCalledWith(
            expect.any(ArrayBuffer),
            'wrong-password',
        )
        expect(window.alert).toHaveBeenCalled()
        expect(URL.createObjectURL).not.toHaveBeenCalled()
    })
})
