
import { useTicketAuth } from '../context/useTicketAuth'
import { openTicket } from '../lib/openTicket'

export function useOpenTicket() {
    const { password } = useTicketAuth()

    return async (ticketId: string) => {

        if (password === null) {
            throw new Error('Ticket access is locked')
        }

        await openTicket(ticketId, password)
    }
}
