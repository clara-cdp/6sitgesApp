import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AllFilmsPage } from './AllFilmsPage'

describe('AllFilmsPage', () => {
  it('renders all films and marathons by default', () => {
    render(<AllFilmsPage />)

    expect(screen.getByText('Adolescencia, sexo y muerte en Campamento Miasma')).toBeInTheDocument()
    expect(screen.getByText('HALF')).toBeInTheDocument()
    expect(screen.getByText('La nit + zombi')).toBeInTheDocument()
    expect(screen.getByText('Marató Auditori')).toBeInTheDocument()
  })

  it('filters items when a specific date key is selected from dropdown', () => {
    render(<AllFilmsPage isFilterOpen={true} setIsFilterOpen={vi.fn()} />)

    const fridayOption = screen.getByRole('button', { name: 'Divendres 9' })
    fireEvent.click(fridayOption)

    expect(screen.getByText('Adolescencia, sexo y muerte en Campamento Miasma')).toBeInTheDocument()
    expect(screen.getByText('HALF')).toBeInTheDocument()

    expect(screen.queryByText('Red Snow')).not.toBeInTheDocument()
    expect(screen.queryByText('Marató Auditori')).not.toBeInTheDocument()
  })

  it('excludes Midnight X-Treme section films', () => {
    render(<AllFilmsPage />)

    expect(screen.queryByText('Black Sheeps')).not.toBeInTheDocument()
    expect(screen.queryByText('Unholy Night')).not.toBeInTheDocument()
    expect(screen.queryByText('Get Undressed')).not.toBeInTheDocument()
  })
})
