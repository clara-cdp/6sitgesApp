
import { useEffect, useState, type ReactNode } from 'react'
import { TicketAuthContext } from './TicketAuthContext'
import { decryptTicket } from '../lib/ticketCrypto'
import { tickets } from '../data/tickets'
import { validatePassword } from '../lib/validatePassword'

interface TicketAuthProviderProps {
    children: ReactNode
}

export function TicketAuthProvider({ children }: TicketAuthProviderProps) {

    const [password, setPassword] = useState<string | null>(null)

    const isUnlocked = password !== null

    useEffect(() => {
        // Pre-fetch verification ticket silently so it is cached for offline authentication
        fetch(tickets['ticket-brain']).catch(() => {
            // Ignore fetch error when offline
        })
    }, [])

    const unlock = async (attempt: string): Promise<boolean> => {
        const validationError = validatePassword(attempt)

        if (validationError) {
            return false
        }


        try {
            const response = await fetch(tickets['ticket-brain'])

            if (!response.ok) {
                throw new Error('Could not load verification ticket')
            }

            const encryptedFile = await response.arrayBuffer()

            await decryptTicket(encryptedFile, attempt)

            setPassword(attempt)
            return true
        } catch (error) {
            console.error('Could not unlock ticket access:', error)
            return false
        }
    }

    const lock = () => {
        setPassword(null)
    }

    return (
        <TicketAuthContext.Provider
            value={{ isUnlocked, password, unlock, lock }}
        >
            {children}
        </TicketAuthContext.Provider>
    )
}
