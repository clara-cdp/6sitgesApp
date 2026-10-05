import { KingKongLogo } from './KingKongLogo'

export function Footer() {
  return (
    <footer className="w-full font-['Montserrat'] select-none mt-auto sticky bottom-0 z-50 overflow-hidden relative">
      {/* Upper Area with Red King Kong Logo */}
      <div className="relative w-full h-12 flex items-end justify-end">
        {/* Red King Kong: Positioned to stand directly on top of the red bar */}
        <div className="absolute right-[85px] bottom-0 z-10">
          <KingKongLogo
            className="h-9 w-auto text-[#FF0042] block"
            fill="currentColor"
          />
        </div>
      </div>

      {/* Red Accent Bar */}
      <div className="bg-[#FF0042] h-5 w-full relative z-0"></div>

      {/* Bottom Black Bar*/}
      <div className="bg-[#000000] text-[#FFFFFF] py-3 px-3 flex justify-center items-center relative z-10">
        <a
          href="https://sitgesfilmfestival.com/ca"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold tracking-wider text-[#FFFFFF] hover:text-[#FF0042] transition-colors duration-200"
        >
          sitgesfilmfestival.com
        </a>
      </div>

      {/* Sitges Cathedral: Positioned at bottom-0 right-0 touching right margin & merging into black bar */}
      <div className="absolute right-0 bottom-0 z-20 pointer-events-none">
        <img
          src="/catedral.svg"
          alt="Sitges Cathedral"
          className="h-28 w-auto object-contain object-right-bottom block"
        />
      </div>
    </footer>
  )
}

export default Footer
