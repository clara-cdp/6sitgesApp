
import { useState, type FormEvent } from 'react'
import { useTicketAuth } from '../context/useTicketAuth'
import { validatePassword } from '../lib/validatePassword'
import { NavButton } from './NavButton'

export function PasswordScreen() {
    const { unlock } = useTicketAuth()

    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    // Handle both clicking ENTRAR and pressing Enter.
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Validate locally before trying to decrypt a ticket.
        const validationError = validatePassword(password)

        if (validationError) {
            setError(validationError)
            return
        }

        setError(null)
        setIsLoading(true)

        try {
            const success = await unlock(password)

            if (!success) {
                setError('Contrasenya incorrecta o no s’ha pogut verificar.')
            }
        } catch {
            setError('Hi ha hagut un error. Torna-ho a provar.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex-1 bg-black text-white flex flex-col items-center justify-center px-6 py-12 font-['Montserrat']">            <div className="w-full max-w-sm flex flex-col items-center gap-6">

            {/* Welcome message */}
            <div className="text-center">
                <h1 className="text-2xl font-black uppercase tracking-wide">
                    Benvinguts al 59è Festival internacional de cinema fantàstic de Sitges, 2026
                </h1>
            </div>

            {/* Gold lock icon */}
            <svg
                className="w-12 h-12 text-[#B78B4B]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
            >
                <rect x="4" y="10" width="16" height="11" rx="1" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                <circle cx="12" cy="15" r="1" fill="currentColor" />
                <path d="M12 16v2" />
            </svg>

            {/* Password form */}
            <form
                onSubmit={(event) => void handleSubmit(event)}
                className="w-full flex flex-col gap-4"
            >
                <label
                    htmlFor="ticket-password"
                    className="text-xs font-bold uppercase tracking-widest text-center"
                >
                    CONTRASENYA
                </label>

                <input
                    id="ticket-password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value)
                        setError(null)
                    }}
                    maxLength={257}
                    disabled={isLoading}
                    className="w-full bg-[#EFECE6] text-black text-center px-4 py-3 outline-none focus:ring-2 focus:ring-[#B78B4B]"
                    style={{
                        clipPath:
                            'polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)',
                    }}
                />

                {/* Error message */}
                {error && (
                    <p role="alert" className="text-[#FF0042] text-xs text-center">
                        {error}
                    </p>
                )}

                <NavButton
                    label={isLoading ? 'VERIFICANT...' : 'ENTRAR'}
                    type="submit"
                    disabled={isLoading}
                />

            </form>
        </div>
        </div>
    )
}
