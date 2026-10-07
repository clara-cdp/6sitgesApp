import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AllFilmsPage } from './AllFilmsPage'

describe('AllFilmsPage', () => {
  it('renders films and marathons', () => {
    render(<AllFilmsPage />)

    expect(screen.getByText('Adolescencia, sexo y muerte en Campamento Miasma')).toBeInTheDocument()
    expect(screen.getByText('HALF')).toBeInTheDocument()

    expect(screen.getByText('La nit + zombi')).toBeInTheDocument()
    expect(screen.getByText('Marató Auditori')).toBeInTheDocument()
  })

  it('excludes films from the Midnight X-Treme section', () => {
    render(<AllFilmsPage />)

    expect(screen.queryByText('Black Sheeps')).not.toBeInTheDocument()
    expect(screen.queryByText('Unholy Night')).not.toBeInTheDocument()
    expect(screen.queryByText('Get Undressed')).not.toBeInTheDocument()
  })

  it('renders items in chronological date/time order', () => {
    render(<AllFilmsPage />)

    const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)

    expect(titles[0]).toBe('Adolescencia, sexo y muerte en Campamento Miasma')
    expect(titles[titles.length - 1]).toBe('Marató Auditori')
  })
})
