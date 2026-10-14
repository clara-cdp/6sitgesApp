import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  deleteUserNote,
  getAllStoredFilmNotes,
  getStoredFilmNotes,
  getStoredNotes,
  getStoredUserNotes,
  saveUserNote,
  setStoredFilmNotes,
  setStoredNotes,
  type UserNote,
} from '../lib/notes'
import programmeData from '../data/sitges-programme.json'
import type { Film } from '../types/film'
import type { ProgrammeData } from '../types/programme'

const programme: ProgrammeData = programmeData

export function ApuntsPage() {
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const film = id ? programme.films.find((f: Film) => f.id === id) : null

  const isFilmSpecific = Boolean(id)

  const [filmNoteText, setFilmNoteText] = useState<string>(() =>
    film ? getStoredFilmNotes(film.id) : ''
  )

  const [activeTab, setActiveTab] = useState<'notes' | 'films'>('notes')
  const [userNotes, setUserNotes] = useState<UserNote[]>(() => getStoredUserNotes())
  const [editingNote, setEditingNote] = useState<UserNote | null>(null)
  const [isSaved, setIsSaved] = useState<boolean>(false)

  const touchStartXRef = useRef<number | null>(null)
  const touchStartYRef = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX
    touchStartYRef.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY
    const diffX = touchEndX - touchStartXRef.current
    const diffY = touchEndY - touchStartYRef.current


    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX < 0 && activeTab === 'notes') {
        setActiveTab('films')
      } else if (diffX > 0 && activeTab === 'films') {
        setActiveTab('notes')
      }
    }
    touchStartXRef.current = null
    touchStartYRef.current = null
  }

  useEffect(() => {
    setUserNotes(getStoredUserNotes())
  }, [editingNote])


  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [id, editingNote])

  useEffect(() => {
    if (isSaved) {
      const timer = setTimeout(() => setIsSaved(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isSaved])

  const handleFilmNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setFilmNoteText(val)
    if (film) {
      setStoredFilmNotes(film.id, val)
    }
    setIsSaved(true)
  }

  const handleGeneralNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    if (!editingNote) return

    const firstLine = val.split('\n')[0].trim().slice(0, 35)
    const updated: UserNote = {
      ...editingNote,
      content: val,
      title: firstLine || 'Apunts',
      updatedAt: 'Avui',
    }
    setEditingNote(updated)
    saveUserNote(updated)
    setStoredNotes(val)
    setIsSaved(true)
  }

  const handleCreateNote = () => {
    const newNote: UserNote = {
      id: `note-${Date.now()}`,
      title: '',
      content: '',
      updatedAt: 'Avui',
    }
    setEditingNote(newNote)
  }

  const handleDeleteUserNote = (noteId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    deleteUserNote(noteId)
    setUserNotes(getStoredUserNotes())
  }

  if (id && !film) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center bg-black min-h-[60vh] flex flex-col justify-center items-center text-white font-['Montserrat']">
        <h2 className="text-2xl font-black text-[#FF0042] mb-3 uppercase tracking-wider">
          Pel·lícula no trobada
        </h2>
        <p className="text-sm text-neutral-400 mb-6">
          No s'han pogut trobar els apunts de la pel·lícula amb l'identificador "{id}".
        </p>
        <Link
          to="/films"
          className="inline-block bg-[#FF0042] hover:bg-red-700 text-white text-xs font-extrabold uppercase tracking-widest px-5 py-2.5 transition-colors"
        >
          ← Tornar a la llista de pel·lícules
        </Link>
      </div>
    )
  }

  if (isFilmSpecific && film) {
    return (
      <div className="max-w-2xl mx-auto w-full min-h-screen bg-[#F5F0E6] text-neutral-900 font-['Montserrat'] px-4 py-6 flex flex-col justify-between relative overflow-hidden select-text selection:bg-[#FF0042] selection:text-white">
        <div className="absolute top-0 bottom-0 left-8 sm:left-12 w-0.5 bg-red-300/60 pointer-events-none z-10" />

        <div>
          {/* Header */}
          <div className="mb-4 pl-8 sm:pl-10 flex items-center justify-between border-b border-neutral-300/80 pb-3">
            <div className="min-w-0 pr-2">
              <span className="text-[10px] sm:text-xs font-bold text-[#FF0042] tracking-widest uppercase block">
                Apunts de la pel·lícula
              </span>
              <h1 className="text-base sm:text-xl font-black uppercase tracking-wider text-neutral-900 truncate">
                {film.title}
              </h1>
            </div>
          </div>

          {/* Notepad Textarea */}
          <div
            className="w-full relative pl-8 sm:pl-10 min-h-[65vh]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(transparent, transparent 31px, #FFFFFF 31px, #FFFFFF 32px)',
              backgroundAttachment: 'local',
            }}
          >
            <textarea
              value={filmNoteText}
              onChange={handleFilmNoteChange}
              placeholder={`Escriu aquí els teus apunts sobre "${film.title}"...`}
              className="w-full h-full min-h-[60vh] bg-transparent text-neutral-900 font-medium text-sm sm:text-base leading-[32px] border-none outline-none resize-none placeholder:text-neutral-400 focus:ring-0 focus:outline-none"
              style={{ lineHeight: '32px' }}
              aria-label={`Notes for ${film.title}`}
            />
          </div>
        </div>

        {/* Bottom Back Navigation */}
        <div className="px-4 py-3 flex items-center border-t border-neutral-300/80 mt-6 pb-10">
          <Link
            to={`/films/${film.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-700 hover:text-[#FF0042] uppercase tracking-wider transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
            Tornar
          </Link>
        </div>
      </div>
    )
  }

  if (editingNote) {
    return (
      <div className="max-w-2xl mx-auto w-full min-h-screen bg-[#F5F0E6] text-neutral-900 font-['Montserrat'] px-4 py-6 flex flex-col justify-between relative overflow-hidden select-text selection:bg-[#FF0042] selection:text-white">
        <div className="absolute top-0 bottom-0 left-8 sm:left-12 w-0.5 bg-red-300/60 pointer-events-none z-10" />

        <div>
          {/* Header */}
          <div className="mb-4 pl-8 sm:pl-10 flex items-center justify-between border-b border-neutral-300/80 pb-3">
            <h1 className="text-base sm:text-xl font-black uppercase tracking-wider text-neutral-900 truncate">
              {editingNote.title ? editingNote.title : 'Apunts'}
            </h1>
          </div>

          {/* Notepad Textarea */}
          <div
            className="w-full relative pl-8 sm:pl-10 min-h-[65vh]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(transparent, transparent 31px, #FFFFFF 31px, #FFFFFF 32px)',
              backgroundAttachment: 'local',
            }}
          >
            <textarea
              value={editingNote.content}
              onChange={handleGeneralNoteChange}
              placeholder="Escriu aquí els teus apunts, comentaris o impressions sobre les pel·lícules..."
              className="w-full h-full min-h-[60vh] bg-transparent text-neutral-900 font-medium text-sm sm:text-base leading-[32px] border-none outline-none resize-none placeholder:text-neutral-400 focus:ring-0 focus:outline-none"
              style={{ lineHeight: '32px' }}
              aria-label="Festival Notes"
              autoFocus
            />
          </div>
        </div>

        {/* Back Link returns to Overview Dashboard */}
        <div className="px-4 py-3 flex items-center border-t border-neutral-300/80 mt-6 pb-10">
          <button
            type="button"
            onClick={() => setEditingNote(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-700 hover:text-[#FF0042] uppercase tracking-wider transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
            Tornar
          </button>
        </div>
      </div>
    )
  }

  const storedFilmNotesMap = getAllStoredFilmNotes()
  const filmNotesList: { film: Film; noteContent: string }[] = Object.entries(storedFilmNotesMap)
    .map(([filmId, noteContent]) => {
      const foundFilm = programme.films.find((f: Film) => f.id === filmId)
      return foundFilm ? { film: foundFilm, noteContent } : null
    })
    .filter((item): item is { film: Film; noteContent: string } => item !== null)

  return (
    <div
      className="max-w-2xl mx-auto w-full min-h-screen bg-black text-white font-['Montserrat'] flex flex-col justify-between relative pb-28 selection:bg-[#FF0042] selection:text-white"
    >
      {/* Top Navigation Bar */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-neutral-900/80 bg-black/90 sticky top-0 z-20 backdrop-blur-md">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-300 hover:text-[#FF0042] uppercase tracking-wider transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
          Tornar
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF0042]">
            {activeTab === 'notes' ? 'Apunts' : 'Pel·lícules'}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className="flex-1 w-full overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex w-[200%] transition-transform duration-300 ease-out"
          style={{
            transform: activeTab === 'notes' ? 'translateX(0%)' : 'translateX(-50%)',
          }}
        >
          {/* Tab 1: General User Notes */}
          <div className="w-1/2 flex-shrink-0 px-4 py-5 min-h-[65vh] flex flex-col justify-between">
            <div>
              <div className="mb-5 flex items-baseline justify-between">
                <div>
                  <h1 className="text-3xl font-black uppercase tracking-tight text-white">
                    Apunts
                  </h1>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {userNotes.length} {userNotes.length === 1 ? 'apunt' : 'apunts'}
                  </p>
                </div>

                {/* Tab slide pills */}
                <div className="flex items-center gap-1.5 bg-neutral-900/80 px-2.5 py-1 rounded-full border border-neutral-800 text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-[#FF0042]">Apunts</span>
                  <span className="text-neutral-600">·</span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('films')}
                    className="text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                  >
                    Pel·lícules →
                  </button>
                </div>
              </div>

              {userNotes.length > 0 ? (
                <div className="grid grid-cols-2 gap-3.5">
                  {userNotes.map((note) => (
                    <div
                      key={note.id}
                      onClick={() => setEditingNote(note)}
                      className="bg-[#F5F0E6] text-neutral-900 rounded-2xl p-4 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between min-h-[140px] relative overflow-hidden group select-none border border-neutral-300/40"
                    >
                      <div className="absolute top-0 bottom-0 left-2.5 w-0.5 bg-red-400/50 pointer-events-none" />
                      <div className="pl-2">
                        <h3 className="font-extrabold text-sm text-neutral-900 line-clamp-2 leading-snug group-hover:text-[#FF0042] transition-colors">
                          {note.title || 'Sense títol'}
                        </h3>
                        <p className="text-xs text-neutral-600 line-clamp-4 mt-1.5 leading-relaxed font-medium">
                          {note.content ? note.content : <span className="italic text-neutral-400">Sense text</span>}
                        </p>
                      </div>
                      <div className="pl-2 pt-3 flex items-center justify-between text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                        <span>{note.updatedAt || 'Festival'}</span>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteUserNote(note.id, e)}
                          aria-label="Eliminar apunt"
                          className="text-neutral-400 hover:text-[#FF0042] p-1 transition-colors cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center border border-neutral-800 rounded-xl bg-neutral-950/60 p-6">
                  <svg className="w-12 h-12 mx-auto text-neutral-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <h3 className="text-base font-bold text-white uppercase tracking-wider mb-1">
                    Cap apunt creat
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-xs mx-auto mb-5">
                    Fes clic al botó "+" per escriure el teu primer apunt del festival.
                  </p>
                  <button
                    type="button"
                    onClick={handleCreateNote}
                    className="inline-block bg-[#FF0042] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full cursor-pointer transition-colors"
                  >
                    Crea un apunt
                  </button>
                </div>
              )}
            </div>

            {/* Back Button */}
            <div className="px-4 py-3 flex items-center border-t border-neutral-900 mt-8 mb-4">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-300 hover:text-[#FF0042] uppercase tracking-wider transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
                Tornar
              </Link>
            </div>
          </div>

          {/* Tab 2: Film Specific Notes */}
          <div className="w-1/2 flex-shrink-0 px-4 py-5 min-h-[65vh] flex flex-col justify-between">
            <div>
              <div className="mb-5 flex items-baseline justify-between">
                <div>
                  <h1 className="text-3xl font-black uppercase tracking-tight text-white">
                    Pel·lícules
                  </h1>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {filmNotesList.length} {filmNotesList.length === 1 ? 'pel·lícula amb apunts' : 'pel·lícules amb apunts'}
                  </p>
                </div>

                {/* Tab slide pills */}
                <div className="flex items-center gap-1.5 bg-neutral-900/80 px-2.5 py-1 rounded-full border border-neutral-800 text-[10px] font-bold uppercase tracking-wider">
                  <button
                    type="button"
                    onClick={() => setActiveTab('notes')}
                    className="text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                  >
                    ← Apunts
                  </button>
                  <span className="text-neutral-600">·</span>
                  <span className="text-[#FF0042]">Pel·lícules</span>
                </div>
              </div>

              {filmNotesList.length > 0 ? (
                <div className="grid grid-cols-2 gap-3.5">
                  {filmNotesList.map(({ film: f, noteContent }) => (
                    <div
                      key={f.id}
                      onClick={() => navigate(`/films/${f.id}/apunts`)}
                      className="bg-[#F5F0E6] text-neutral-900 rounded-2xl p-4 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between min-h-[140px] relative overflow-hidden group select-none border border-neutral-300/40"
                    >
                      <div className="absolute top-0 bottom-0 left-2.5 w-0.5 bg-red-400/50 pointer-events-none" />
                      <div className="pl-2">
                        <span className="text-[9px] font-bold text-[#FF0042] uppercase tracking-widest block mb-0.5">
                          {f.section}
                        </span>
                        <h3 className="font-black text-sm text-neutral-900 line-clamp-2 leading-tight group-hover:text-[#FF0042] transition-colors uppercase">
                          {f.title}
                        </h3>
                        <p className="text-[10px] text-neutral-500 font-semibold mt-0.5 uppercase tracking-wide">
                          {f.venue} | {f.duration}
                        </p>
                        <p className="text-xs text-neutral-700 line-clamp-4 mt-2 leading-relaxed font-medium">
                          {noteContent}
                        </p>
                      </div>
                      <div className="pl-2 pt-3 text-[10px] font-bold text-[#FF0042] uppercase tracking-wider flex items-center gap-1">
                        <span>Obrir apunts</span>
                        <span>→</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center border border-neutral-800 rounded-xl bg-neutral-950/60 p-6">
                  <svg className="w-12 h-12 mx-auto text-neutral-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                  <h3 className="text-base font-bold text-white uppercase tracking-wider mb-1">
                    Sense apunts de pel·lícules
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-xs mx-auto mb-5">
                    Ves a la fitxa de qualsevol pel·lícula i prem el botó "APUNTS" per afegir-hi comentaris.
                  </p>
                  <Link
                    to="/films"
                    className="inline-block bg-[#FF0042] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full transition-colors"
                  >
                    Veure pel·lícules
                  </Link>
                </div>
              )}
            </div>

            {/* Back Button */}
            <div className="px-4 py-3 flex items-center border-t border-neutral-900 mt-8 mb-4">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-300 hover:text-[#FF0042] uppercase tracking-wider transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
                Tornar
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      {activeTab === 'notes' && (
        <button
          type="button"
          onClick={handleCreateNote}
          aria-label="Afegir apunt"
          className="fixed bottom-28 right-6 w-14 h-14 rounded-full bg-[#FF0042] hover:bg-red-700 active:scale-95 text-white shadow-2xl flex items-center justify-center text-3xl font-bold cursor-pointer transition-all z-50 select-none border-2 border-white/20 shadow-red-950/60"
        >
          +
        </button>
      )}

      {/* Bottom Sticky Tab Bar (Apunts | Pel·lícules) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto bg-neutral-950/95 backdrop-blur-md border-t border-neutral-900 py-2.5 px-6 flex justify-around items-center z-40 select-none">
        {/* Tab Apunts */}
        <button
          type="button"
          onClick={() => setActiveTab('notes')}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${activeTab === 'notes' ? 'text-[#FF0042]' : 'text-neutral-400 hover:text-white'
            }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-[11px] font-bold tracking-wider uppercase">Apunts</span>
        </button>

        {/* Tab Pel·lícules */}
        <button
          type="button"
          onClick={() => setActiveTab('films')}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${activeTab === 'films' ? 'text-[#FF0042]' : 'text-neutral-400 hover:text-white'
            }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
          <span className="text-[11px] font-bold tracking-wider uppercase">Pel·lícules</span>
        </button>
      </div>
    </div>
  )
}

export default ApuntsPage
