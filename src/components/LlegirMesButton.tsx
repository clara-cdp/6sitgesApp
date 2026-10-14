import { Link } from 'react-router-dom'
import React from 'react'

export interface LlegirMesButtonProps {
  to?: string
  onClick?: (e: React.MouseEvent) => void
  variant?: 'dark' | 'light'
  className?: string
  label?: string
}

export function LlegirMesButton({
  to,
  onClick,
  variant = 'dark',
  className = '',
  label = 'LLEGIR MÉS',
}: LlegirMesButtonProps) {
  // Chamfered 45-degree cut corners
  const outerClipStyle = {
    clipPath:
      'polygon(7px 0, calc(100% - 7px) 0, 100% 7px, 100% calc(100% - 7px), calc(100% - 7px) 100%, 7px 100%, 0 calc(100% - 7px), 0 7px)',
  }

  const innerClipStyle = {
    clipPath:
      'polygon(5.5px 0, calc(100% - 5.5px) 0, 100% 5.5px, 100% calc(100% - 5.5px), calc(100% - 5.5px) 100%, 5.5px 100%, 0 calc(100% - 5.5px), 0 5.5px)',
  }

  // Normal state: stroke only (outer is stroke color, inner matches card/page surface)
  // Hover / Click state: ALL RED (#FF0042) with bold black text (reference: button_hoover'click.png)
  const strokeColorClass =
    variant === 'light'
      ? 'bg-white hover:bg-[#FF0042] group-hover/btn:bg-[#FF0042] active:bg-[#FF0042]'
      : 'bg-black hover:bg-[#FF0042] group-hover/btn:bg-[#FF0042] active:bg-[#FF0042]'

  const innerBgClass =
    variant === 'light'
      ? 'bg-black text-white group-hover/btn:bg-[#FF0042] group-hover/btn:text-black active:bg-[#FF0042] active:text-black'
      : 'bg-white text-black group-hover/btn:bg-[#FF0042] group-hover/btn:text-black active:bg-[#FF0042] active:text-black'

  const content = (
    <span
      style={innerClipStyle}
      className={`w-full h-full flex items-center justify-center text-center font-black text-[11px] sm:text-xs tracking-wider uppercase px-4 py-1.5 sm:px-5 sm:py-2 leading-none transition-colors duration-150 select-none ${innerBgClass}`}
    >
      <span className="translate-y-[0.5px]">{label}</span>
    </span>
  )

  const outerClasses = `group/btn inline-flex items-center justify-center p-[1.5px] transition-all duration-150 active:scale-[0.98] select-none cursor-pointer whitespace-nowrap min-w-[105px] sm:min-w-[118px] ${strokeColorClass} ${className}`

  if (to) {
    return (
      <Link
        to={to}
        style={outerClipStyle}
        onClick={onClick}
        className={outerClasses}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      style={outerClipStyle}
      onClick={onClick}
      className={outerClasses}
    >
      {content}
    </button>
  )
}

export default LlegirMesButton
