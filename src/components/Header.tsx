import { Link } from 'react-router-dom'
import { KingKongLogo } from './KingKongLogo'

interface HeaderProps {
  onToggleFilter?: () => void
  showFilterToggle?: boolean
}

export function Header({ onToggleFilter, showFilterToggle = false }: HeaderProps) {
  return (
    <header className="w-full font-['Montserrat'] select-none sticky top-0 z-50">
      {/* Top Black Bar */}
      <div className="bg-[#000000] text-[#FF0042] px-4 py-2 flex justify-between items-center text-xs sm:text-sm font-extrabold tracking-widest uppercase">
        <div>8-18 OCTUBRE 2026</div>
        <div className="flex items-center gap-1.5 text-[#B78B4B] font-bold tracking-wider text-xs">
          <KingKongLogo className="h-4 w-auto text-[#B78B4B]" fill="currentColor" />
          <span>59A EDICIÓ</span>
        </div>
      </div>

      {/* Main Red Banner */}
      <div className="bg-[#FF0042] text-[#000000] px-4 py-4 sm:py-5 flex items-center justify-between shadow-md">
        <Link to="/" className="flex items-center gap-3 sm:gap-5 flex-1 min-w-0">
          {/* King Kong Logo */}
          <div className="shrink-0 flex items-center justify-center">
            <KingKongLogo className="h-12 w-auto sm:h-16 text-[#000000]" fill="currentColor" />
          </div>

          {/* Title and Subtitle */}
          <div className="flex flex-col justify-center min-w-0">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-[0.25em] leading-none uppercase font-['Cinzel',serif] sm:font-['Montserrat']">
              SITGES
            </h1>
            <p className="text-[10px] sm:text-xs md:text-sm font-bold tracking-tight uppercase leading-tight mt-1 max-w-xl">
              59È FESTIVAL INTERNACIONAL DE <br /> CINEMA FANTÀSTIC DE CATALUNYA
            </p>
          </div>
        </Link>

        {/* Single Hamburger Menu */}
        {showFilterToggle && (
          <button
            type="button"
            onClick={onToggleFilter}
            aria-label="Toggle filter menu"
            className="shrink-0 p-2 text-black hover:opacity-80 transition-opacity cursor-pointer focus:outline-none ml-2"
          >
            <svg
              className="w-8 h-8 sm:w-9 sm:h-9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
