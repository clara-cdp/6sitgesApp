
import { createContext } from 'react'

export interface TicketAuthContextValue {
    isUnlocked: boolean
    password: string | null
    unlock: (password: string) => Promise<boolean>
    lock: () => void
}

export const TicketAuthContext =
    createContext<TicketAuthContextValue | null>(null)
