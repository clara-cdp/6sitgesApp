
import { webcrypto } from 'node:crypto'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { decryptTicket } from './ticketCrypto'

const password = 'test-password-only'
const encoder = new TextEncoder()

async function createEncryptedFixture(): Promise<ArrayBuffer> {
    const salt = webcrypto.getRandomValues(new Uint8Array(16))
    const iv = webcrypto.getRandomValues(new Uint8Array(12))

    const baseKey = await webcrypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        'PBKDF2',
        false,
        ['deriveKey'],
    )

    const key = await webcrypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt,
            iterations: 600_000,
            hash: 'SHA-256',
        },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt'],
    )

    const encrypted = await webcrypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        encoder.encode('%PDF-1.4 test content'),
    )

    const result = new Uint8Array(32 + encrypted.byteLength)

    result.set(encoder.encode('STG1'), 0)
    result.set(salt, 4)
    result.set(iv, 20)
    result.set(new Uint8Array(encrypted), 32)

    return result.buffer
}

describe('Ticket decryption', () => {
    beforeAll(() => {
        vi.stubGlobal('crypto', webcrypto)
    })

    afterAll(() => {
        vi.unstubAllGlobals()
    })

    it('decrypts a ticket with the correct password', async () => {
        const encrypted = await createEncryptedFixture()

        const pdf = await decryptTicket(encrypted, password)

        expect(pdf.type).toBe('application/pdf')
        expect(await pdf.text()).toBe('%PDF-1.4 test content')
    })

    it('rejects an incorrect password', async () => {
        const encrypted = await createEncryptedFixture()

        await expect(
            decryptTicket(encrypted, 'wrong-password'),
        ).rejects.toThrow()
    })

    it('rejects tampered encrypted data', async () => {
        const encrypted = await createEncryptedFixture()
        const bytes = new Uint8Array(encrypted)

        bytes[40] ^= 0xff

        await expect(
            decryptTicket(encrypted, password),
        ).rejects.toThrow()
    })

    it('rejects an invalid file header', async () => {
        const invalid = encoder.encode('NOT-A-TICKET').buffer

        await expect(
            decryptTicket(invalid, password),
        ).rejects.toThrow('Invalid ticket file format')
    })
})
