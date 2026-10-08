import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PWAUpdatePrompt } from './PWAUpdatePrompt'

vi.mock('virtual:pwa-register/react', () => ({
  useRegisterSW: () => ({
    needRefresh: [true, vi.fn()],
    updateServiceWorker: vi.fn(),
  }),
}))

describe('PWAUpdatePrompt', () => {
  it('renders update prompt when a new version is available', () => {
    render(<PWAUpdatePrompt />)
    expect(screen.getByText("Nova versió disponible de l'aplicació.")).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Actualitzar' })).toBeInTheDocument()
  })
})
