
import { describe, expect, it } from 'vitest'
import programmeData from './sitges-programme.json'
import { tickets } from './tickets'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

describe('Ticket mappings', () => {
    it('has a mapping for every programme ticketId', () => {
        const items = [
            ...programmeData.films,
            ...programmeData.marathons,
        ]

        for (const item of items) {
            if (item.ticketId) {
                expect(
                    tickets,
                    `Missing mapping for ${item.title}: ${item.ticketId}`,
                ).toHaveProperty(item.ticketId)
            }
        }
    })

    it('maps tickets to encrypted files', () => {
        for (const path of Object.values(tickets)) {
            expect(path).toMatch(/^\/tickets\/.+\.enc$/)
        }
    })

    it('does not reuse ticket IDs', () => {
        const ids = Object.keys(tickets)
        expect(new Set(ids).size).toBe(ids.length)
    })

    it.each(Object.entries(tickets))(
        'has an encrypted file for %s',
        (ticketId, ticketPath) => {

            const filePath = resolve(
                process.cwd(),
                'public',
                ticketPath.replace(/^\/tickets\//, 'tickets/'),
            )

            expect(
                existsSync(filePath),
                `Missing encrypted file for ${ticketId}: ${ticketPath}`,
            ).toBe(true)
        },
    )
})



