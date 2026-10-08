
import { describe, expect, it } from 'vitest'
import { validatePassword } from './validatePassword'

describe('validatePassword', () => {

    it('rejects an empty password', () => {
        expect(validatePassword('')).toBe('Introdueix la contrasenya.')
    })

    it('accepts a valid password', () => {
        expect(validatePassword('MySecurePassword123!')).toBeNull()
    })

    it('rejects passwords longer than 256 characters', () => {
        const password = 'a'.repeat(257)

        expect(validatePassword(password)).toBe(
            'La contrasenya és massa llarga.',
        )
    })

    it('accepts passwords of exactly 256 characters', () => {
        expect(validatePassword('a'.repeat(256))).toBeNull()
    })

    it('accepts HTML-like strings without executing them', () => {
        expect(validatePassword('<script>alert(1)</script>')).toBeNull()
    })

    it('accepts emojis and accented characters', () => {
        expect(validatePassword('Fantàstic🎬2026!')).toBeNull()
    })
    it('accepts passwords containing spaces', () => {
        expect(validatePassword('  my password  ')).toBeNull()
    })
})
