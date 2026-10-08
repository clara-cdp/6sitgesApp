
import { tickets } from '../data/tickets'
import { decryptTicket } from './ticketCrypto'

export async function openTicket(ticketId: string) {
    const ticketPath = tickets[ticketId]

    if (!ticketPath) {
        console.error(`Ticket not found: ${ticketId}`)
        return
    }

    // Temporary password prompt until we implement the lock screen
    const password = window.prompt('Enter ticket password')

    if (!password) return

    try {
        const response = await fetch(ticketPath)

        if (!response.ok) {
            throw new Error('Could not load encrypted ticket')
        }

        const encryptedFile = await response.arrayBuffer()
        const pdf = await decryptTicket(encryptedFile, password)

        const pdfUrl = URL.createObjectURL(pdf)
        window.location.href = pdfUrl
    } catch (error) {
        console.error('Could not open ticket:', error)
        window.alert('Could not open ticket. Check the password or connection.')
    }
}
