export interface HorariSession {
  id: string
  title: string
  venue: string
  startTime: string
  endTime: string
  duration: string
  isMarathon?: boolean
}

export interface HorariPausa {
  startTime: string
  endTime: string
  duration: string
}

export type HorariItem =
  | { type: 'session'; session: HorariSession }
  | { type: 'pausa'; pausa: HorariPausa }

export interface HorariDay {
  date: string
  dayLabel: string
  items: HorariItem[]
}
