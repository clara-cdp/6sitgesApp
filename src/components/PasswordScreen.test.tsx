
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PasswordScreen } from './PasswordScreen'
import { useTicketAuth } from '../context/useTicketAuth'

vi.mock('../context/useTicketAuth', () => ({
    useTicketAuth: vi.fn(),
}))

describe('PasswordScreen', () => {
    const mockUnlock = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
        mockUnlock.mockResolvedValue(true)

        vi.mocked(useTicketAuth).mockReturnValue({
            isUnlocked: false,
            password: null,
            unlock: mockUnlock,
            lock: vi.fn(),
        })
    })

    it('renders the password form', () => {
        render(<PasswordScreen />)

        expect(screen.getByRole('heading', { name: 'Benvinguts al 59è Festival internacional de cinema fantàstic de Sitges, 2026' }))
            .toBeInTheDocument()

        expect(screen.getByLabelText('CONTRASENYA')).toHaveAttribute(
            'type',
            'password',
        )

        expect(screen.getByRole('button', { name: 'ENTRAR' }))
            .toBeEnabled()
    })

    it('shows an error for an empty password', () => {
        render(<PasswordScreen />)

        fireEvent.click(screen.getByRole('button', { name: 'ENTRAR' }))

        expect(screen.getByRole('alert'))
            .toHaveTextContent('Introdueix la contrasenya.')

        expect(mockUnlock).not.toHaveBeenCalled()
    })

    it('calls unlock with the exact password entered', async () => {
        render(<PasswordScreen />)

        fireEvent.change(screen.getByLabelText('CONTRASENYA'), {
            target: { value: '  MyPassword🎬  ' },
        })

        fireEvent.click(screen.getByRole('button', { name: 'ENTRAR' }))

        await waitFor(() => {
            expect(mockUnlock).toHaveBeenCalledExactlyOnceWith(
                '  MyPassword🎬  ',
            )
        })
    })

    it('shows an error when the password is incorrect', async () => {
        mockUnlock.mockResolvedValue(false)

        render(<PasswordScreen />)

        fireEvent.change(screen.getByLabelText('CONTRASENYA'), {
            target: { value: 'wrong-password' },
        })

        fireEvent.click(screen.getByRole('button', { name: 'ENTRAR' }))

        expect(await screen.findByRole('alert')).toHaveTextContent(
            'Contrasenya incorrecta o no s’ha pogut verificar.',
        )
    })

    it('disables the submit button while verifying', async () => {
        let finishUnlock!: (value: boolean) => void

        mockUnlock.mockImplementation(
            () =>
                new Promise<boolean>((resolve) => {
                    finishUnlock = resolve
                }),
        )

        render(<PasswordScreen />)

        fireEvent.change(screen.getByLabelText('CONTRASENYA'), {
            target: { value: 'test-password' },
        })

        fireEvent.click(screen.getByRole('button', { name: 'ENTRAR' }))

        expect(screen.getByRole('button', { name: 'VERIFICANT...' }))
            .toBeDisabled()

        finishUnlock(true)

        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'ENTRAR' }))
                .toBeEnabled()
        })
    })
})
