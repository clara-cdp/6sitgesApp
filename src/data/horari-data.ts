import type { HorariDay } from '../types/horari'

export const horariData: HorariDay[] = [
  {
    date: '2026-10-09',
    dayLabel: 'Divendres 09',
    items: [
      {
        type: 'session',
        session: {
          id: 'miasma',
          title: 'Adolescencia, sexo y muerte en Campamento Miasma',
          venue: 'Auditori Meliá',
          startTime: '08:30',
          endTime: '10:21',
          duration: '111 min',
        },
      },
      {
        type: 'pausa',
        pausa: {
          startTime: '10:21',
          endTime: '13:15',
          duration: "2h 54'",
        },
      },
      {
        type: 'session',
        session: {
          id: 'half',
          title: 'HALF',
          venue: 'Tramuntana Meliá',
          startTime: '13:15',
          endTime: '14:51',
          duration: '96 min',
        },
      },
      {
        type: 'pausa',
        pausa: {
          startTime: '14:51',
          endTime: '15:30',
          duration: "39'",
        },
      },
      {
        type: 'session',
        session: {
          id: 'leviticus',
          title: 'Leviticus',
          venue: 'Auditori Meliá',
          startTime: '15:30',
          endTime: '16:58',
          duration: '88 min',
        },
      },
      {
        type: 'pausa',
        pausa: {
          startTime: '16:58',
          endTime: '17:30',
          duration: "32'",
        },
      },
      {
        type: 'session',
        session: {
          id: 'karma',
          title: 'Karma',
          venue: 'Auditori Meliá',
          startTime: '17:30',
          endTime: '19:50',
          duration: '140 min',
        },
      },
      {
        type: 'pausa',
        pausa: {
          startTime: '19:50',
          endTime: '23:00',
          duration: "3h 10'",
        },
      },
      {
        type: 'session',
        session: {
          id: 'apocalipsis',
          title: 'Apocalipsis Z: Nuevo mundo',
          venue: 'Tramuntana Meliá',
          startTime: '23:00',
          endTime: '00:36',
          duration: '96 min',
        },
      },
    ],
  },
  {
    date: '2026-10-10',
    dayLabel: 'Dissabte 10',
    items: [
      {
        type: 'session',
        session: {
          id: 'red',
          title: 'Red Snow',
          venue: 'Auditori Meliá',
          startTime: '12:45',
          endTime: '14:17',
          duration: '92 min',
        },
      },
      {
        type: 'pausa',
        pausa: {
          startTime: '14:17',
          endTime: '23:15',
          duration: "8h 58'",
        },
      },
      {
        type: 'session',
        session: {
          id: 'brain',
          title: 'BRAINDEAD (1992) 4K',
          venue: 'Auditori Meliá',
          startTime: '23:15',
          endTime: '01:30',
          duration: '135 min',
        },
      },
      {
        type: 'session',
        session: {
          id: 'nit-zombi',
          isMarathon: true,
          title: 'La Nit + Zombi',
          venue: 'Auditori Meliá',
          startTime: '01:30',
          endTime: '06:29',
          duration: '299 min',
        },
      },
    ],
  },
  {
    date: '2026-10-11',
    dayLabel: 'Diumenge 11',
    items: [
      {
        type: 'session',
        session: {
          id: 'tesis',
          title: 'Gala Méliès + Tesis (1996)',
          venue: 'Auditori Meliá',
          startTime: '12:15',
          endTime: '15:04',
          duration: '169 min',
        },
      },
      {
        type: 'pausa',
        pausa: {
          startTime: '15:04',
          endTime: '15:30',
          duration: "26'",
        },
      },
      {
        type: 'session',
        session: {
          id: 'oceano',
          title: 'Océano Titánico',
          venue: 'Auditori Meliá',
          startTime: '15:30',
          endTime: '17:47',
          duration: '137 min',
        },
      },
      {
        type: 'pausa',
        pausa: {
          startTime: '17:47',
          endTime: '22:40',
          duration: "4h 53'",
        },
      },
      {
        type: 'session',
        session: {
          id: 'devils',
          title: 'The Devils (1971)',
          venue: 'Auditori Meliá',
          startTime: '22:40',
          endTime: '00:39',
          duration: '119 min',
        },
      },
    ],
  },
  {
    date: '2026-10-12',
    dayLabel: 'Dilluns 12',
    items: [
      {
        type: 'session',
        session: {
          id: '11',
          title: '11',
          venue: 'Tramuntana Meliá',
          startTime: '08:15',
          endTime: '09:44',
          duration: '89 min',
        },
      },
      {
        type: 'pausa',
        pausa: {
          startTime: '09:44',
          endTime: '11:30',
          duration: "1h 46'",
        },
      },
      {
        type: 'session',
        session: {
          id: 'face',
          title: 'The Face of Horror',
          venue: 'Auditori Meliá',
          startTime: '11:30',
          endTime: '13:35',
          duration: '125 min',
        },
      },
      {
        type: 'pausa',
        pausa: {
          startTime: '13:35',
          endTime: '14:15',
          duration: "40'",
        },
      },
      {
        type: 'session',
        session: {
          id: 'girl',
          title: 'Girl in the Night',
          venue: 'Tramuntana Meliá',
          startTime: '14:15',
          endTime: '15:54',
          duration: '99 min',
        },
      },
    ],
  },
  {
    date: '2026-10-13',
    dayLabel: 'Dimarts 13',
    items: [
      {
        type: 'session',
        session: {
          id: 'sanguine',
          title: 'Sanguine',
          venue: 'Casino Prado',
          startTime: '10:15',
          endTime: '11:58',
          duration: '103 min',
        },
      },
      {
        type: 'pausa',
        pausa: {
          startTime: '11:58',
          endTime: '12:30',
          duration: "32'",
        },
      },
      {
        type: 'session',
        session: {
          id: 'buddy',
          title: 'Buddy',
          venue: 'Auditori Meliá',
          startTime: '12:30',
          endTime: '14:05',
          duration: '95 min',
        },
      },
      {
        type: 'pausa',
        pausa: {
          startTime: '14:05',
          endTime: '14:30',
          duration: "25'",
        },
      },
      {
        type: 'session',
        session: {
          id: 'wicked',
          title: 'No Rest for the Wicked',
          venue: 'Auditori Meliá',
          startTime: '14:30',
          endTime: '16:18',
          duration: '108 min',
        },
      },
      {
        type: 'pausa',
        pausa: {
          startTime: '16:18',
          endTime: '16:30',
          duration: "12'",
        },
      },
      {
        type: 'session',
        session: {
          id: 'after-dark',
          title: 'Never After Dark',
          venue: 'Auditori Meliá',
          startTime: '16:30',
          endTime: '18:20',
          duration: '110 min',
        },
      },
    ],
  },
  {
    date: '2026-10-15',
    dayLabel: 'Dijous 15',
    items: [
      {
        type: 'session',
        session: {
          id: 'spiral',
          title: 'The Spiral',
          venue: 'Auditori Meliá',
          startTime: '11:00',
          endTime: '13:00',
          duration: '120 min',
        },
      },
      {
        type: 'pausa',
        pausa: {
          startTime: '13:00',
          endTime: '14:45',
          duration: "1h 45'",
        },
      },
      {
        type: 'session',
        session: {
          id: 'no-way',
          title: 'No Way Down',
          venue: 'Casino Prado',
          startTime: '14:45',
          endTime: '16:26',
          duration: '101 min',
        },
      },
      {
        type: 'pausa',
        pausa: {
          startTime: '16:26',
          endTime: '16:45',
          duration: "19'",
        },
      },
      {
        type: 'session',
        session: {
          id: 'salmokji',
          title: 'Salmokji: Whispering Water',
          venue: 'Casino Prado',
          startTime: '16:45',
          endTime: '18:25',
          duration: '100 min',
        },
      },
      {
        type: 'pausa',
        pausa: {
          startTime: '18:25',
          endTime: '19:00',
          duration: "35'",
        },
      },
      {
        type: 'session',
        session: {
          id: 'drag',
          title: 'Drag',
          venue: 'Auditori Meliá',
          startTime: '19:00',
          endTime: '20:46',
          duration: '106 min',
        },
      },
      {
        type: 'pausa',
        pausa: {
          startTime: '20:46',
          endTime: '21:15',
          duration: "29'",
        },
      },
      {
        type: 'session',
        session: {
          id: 'victorian',
          title: 'Victorian Psycho',
          venue: 'Auditori Meliá',
          startTime: '21:15',
          endTime: '23:17',
          duration: '122 min',
        },
      },
    ],
  },
  {
    date: '2026-10-18',
    dayLabel: 'Diumenge 18',
    items: [
      {
        type: 'session',
        session: {
          id: 'hope',
          title: 'Hope',
          venue: 'Auditori Meliá',
          startTime: '10:00',
          endTime: '12:40',
          duration: '160 min',
        },
      },
      {
        type: 'pausa',
        pausa: {
          startTime: '12:40',
          endTime: '15:30',
          duration: "2h 50'",
        },
      },
      {
        type: 'session',
        session: {
          id: 'marato',
          isMarathon: true,
          title: 'Marató Auditori',
          venue: 'Auditori Meliá',
          startTime: '15:30',
          endTime: '21:30',
          duration: '6 h aprox.',
        },
      },
    ],
  },
]
