import { Link } from 'react-router-dom'

interface NavButtonProps {
  label: string
  to?: string
  disabled?: boolean
  onClick?: () => void
}

export function NavButton({ label, to, disabled = false, onClick }: NavButtonProps) {
  const clipPathStyle = {
    clipPath:
      'polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)',
  }

  const baseStyles =
    'block w-full text-black font-black text-base sm:text-lg uppercase py-3.5 px-6 tracking-[0.15em] text-center transition-all shadow-md select-none'

  const activeStyles =
    'bg-[#FF0042] hover:bg-[#E6003B] active:scale-[0.99] cursor-pointer'

  const disabledStyles =
    'bg-[#FF0042]/50 cursor-not-allowed opacity-70 text-white'

  if (to && !disabled) {
    return (
      <Link
        to={to}
        style={clipPathStyle}
        className={`${baseStyles} ${activeStyles}`}
      >
        {label}
      </Link>
    )
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={clipPathStyle}
      className={`${baseStyles} ${disabled ? disabledStyles : activeStyles}`}
    >
      {label}
    </button>
  )
}
