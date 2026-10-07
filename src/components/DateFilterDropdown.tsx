export interface DateOption {
  key: string
  label: string
}

export const DATE_OPTIONS: DateOption[] = [
  { key: 'ALL', label: 'TOTES' },
  { key: '2026-10-09', label: 'Divendres 9' },
  { key: '2026-10-10', label: 'Dissabte 10' },
  { key: '2026-10-11', label: 'Diumenge 11' },
  { key: '2026-10-12', label: 'Dilluns 12' },
  { key: '2026-10-13', label: 'Dimarts 13' },
  { key: '2026-10-15', label: 'Dijous 15' },
  { key: '2026-10-18', label: 'Diumenge 18' },
]

interface DateFilterDropdownProps {
  selectedKey: string
  onSelectKey: (key: string) => void
  isOpen: boolean
  onClose: () => void
}

export function DateFilterDropdown({
  selectedKey,
  onSelectKey,
  isOpen,
  onClose,
}: DateFilterDropdownProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Floating Dropdown Box anchored top-right below the header */}
      <div className="fixed right-4 top-24 z-50 w-56 bg-white border border-gray-300 rounded-xs shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
        <div className="divide-y divide-gray-100 font-['Montserrat']">
          {DATE_OPTIONS.map((option) => {
            const isSelected = option.key === selectedKey

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => {
                  onSelectKey(option.key)
                  onClose()
                }}
                className={`w-full text-center px-4 py-3 text-sm font-extrabold uppercase transition-colors cursor-pointer ${isSelected
                    ? 'text-[#FF0042] bg-red-50/50'
                    : 'text-black hover:bg-gray-50'
                  }`}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
