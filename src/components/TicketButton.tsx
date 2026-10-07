interface TicketButtonProps {
  onClick?: () => void
  disabled?: boolean
}

export function TicketButton({ onClick, disabled = false }: TicketButtonProps) {
  // Chamfered 45-degree cut corners
  const clipPathStyle = {
    clipPath:
      'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)',
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={clipPathStyle}
      className={`inline-block bg-[#B78B4B] hover:bg-[#a1783f] active:scale-[0.98] text-white text-xs sm:text-sm font-black tracking-widest uppercase px-4 py-2 transition-all shadow-xs select-none ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
        }`}
    >
      TICKET
    </button>
  )
}
