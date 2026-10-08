
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
        vi.stubGlobal('alert', vi.fn())
        vi.stubGlobal('prompt', vi.fn())

        vi.stubGlobal('URL', {
            ...URL,
            createObjectURL: vi.fn().mockReturnValue('blob:test-ticket'),
        })
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('fetches and decrypts the correct ticket', async () => {
        const encrypted = new ArrayBuffer(10)
        const pdf = new Blob(['%PDF-test'], { type: 'application/pdf' })

        vi.mocked(window.prompt).mockReturnValue('test-password')

        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            arrayBuffer: vi.fn().mockResolvedValue(encrypted),
        } as unknown as Response)

        vi.mocked(decryptTicket).mockResolvedValue(pdf)

        await openTicket('ticket-brain')

        expect(fetch).toHaveBeenCalledWith('/tickets/7-BRAINDED.enc')
        expect(decryptTicket).toHaveBeenCalledWith(encrypted, 'test-password')
        expect(URL.createObjectURL).toHaveBeenCalledWith(pdf)
    })

    it('does not fetch when the password prompt is cancelled', async () => {
        vi.mocked(window.prompt).mockReturnValue(null)

        await openTicket('ticket-brain')

        expect(fetch).not.toHaveBeenCalled()
        expect(decryptTicket).not.toHaveBeenCalled()
    })

    it('handles an unknown ticket ID', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

        await openTicket('unknown-ticket')

        expect(consoleSpy).toHaveBeenCalledWith(
            'Ticket not found: unknown-ticket',
        )
        expect(fetch).not.toHaveBeenCalled()

        consoleSpy.mockRestore()
    })

    it('handles a failed ticket download', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

        vi.mocked(window.prompt).mockReturnValue('test-password')

        vi.mocked(fetch).mockResolvedValue({
            ok: false,
        } as Response)

        await openTicket('ticket-brain')

        expect(decryptTicket).not.toHaveBeenCalled()
        expect(window.alert).toHaveBeenCalledWith(
            'Could not open ticket. Check the password or connection.',
        )

        consoleSpy.mockRestore()
    })

    it('handles an incorrect password', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

        vi.mocked(window.prompt).mockReturnValue('wrong-password')

        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(10)),
        } as unknown as Response)

        vi.mocked(decryptTicket).mockRejectedValue(
            new Error('Decryption failed'),
        )

        await openTicket('ticket-brain')

        expect(window.alert).toHaveBeenCalled()
        expect(URL.createObjectURL).not.toHaveBeenCalled()

        consoleSpy.mockRestore()
    })
})

