import { useContext } from 'react'
import { TicketAuthContext } from './TicketAuthContext'

export function useTicketAuth() {
    const context = useContext(TicketAuthContext)

    if (!context) {
        throw new Error(
            'useTicketAuth must be used within a TicketAuthProvider',
        )
    }

    return context
}
