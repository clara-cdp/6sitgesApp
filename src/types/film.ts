import type { Director } from './director'

export type Film = {
    id: string
    title: string
    directors: Director[]
    year: string
    country: string
    idioma: string
    subt: string
    date: string
    programmeDate: string
    dayLabel: string
    time: string
    venue: string
    duration: string
    synopsis: string
    presence: boolean
    sitgesUrl: string
    trailerUrl?: string
    ticketId: string | null
    images?: string[]
    section: string
    poster: string
}

