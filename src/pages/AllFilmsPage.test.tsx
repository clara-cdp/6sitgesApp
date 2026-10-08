import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { AllFilmsPage } from './AllFilmsPage'

describe('AllFilmsPage', () => {
  it('renders all films and marathons by default', () => {
    render(
      <MemoryRouter>
        <AllFilmsPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Adolescencia, sexo y muerte en Campamento Miasma')).toBeInTheDocument()
    expect(screen.getByText('HALF')).toBeInTheDocument()
    expect(screen.getByText('La nit + zombi')).toBeInTheDocument()
    expect(screen.getByText('Marató Auditori')).toBeInTheDocument()
  })

  it('filters items when a specific date key is selected from dropdown', () => {
    render(
      <MemoryRouter>
        <AllFilmsPage isFilterOpen={true} setIsFilterOpen={vi.fn()} />
      </MemoryRouter>
    )

    const fridayOption = screen.getByRole('button', { name: 'Divendres 9' })
    fireEvent.click(fridayOption)

    expect(screen.getByText('Adolescencia, sexo y muerte en Campamento Miasma')).toBeInTheDocument()
    expect(screen.getByText('HALF')).toBeInTheDocument()

    expect(screen.queryByText('Red Snow')).not.toBeInTheDocument()
    expect(screen.queryByText('Marató Auditori')).not.toBeInTheDocument()
  })

  it('excludes Midnight X-Treme section films', () => {
    render(
      <MemoryRouter>
        <AllFilmsPage />
      </MemoryRouter>
    )

    expect(screen.queryByText('Black Sheeps')).not.toBeInTheDocument()
    expect(screen.queryByText('Unholy Night')).not.toBeInTheDocument()
    expect(screen.queryByText('Get Undressed')).not.toBeInTheDocument()
  })
})
