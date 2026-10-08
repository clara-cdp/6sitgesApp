
import { useState, type ReactNode } from 'react'
import { TicketAuthContext } from './TicketAuthContext'
import { decryptTicket } from '../lib/ticketCrypto'
import { tickets } from '../data/tickets'

interface TicketAuthProviderProps {
    children: ReactNode
}

export function TicketAuthProvider({ children }: TicketAuthProviderProps) {

    const [password, setPassword] = useState<string | null>(null)

    const isUnlocked = password !== null

    const unlock = async (attempt: string): Promise<boolean> => {
        if (!attempt) return false

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
