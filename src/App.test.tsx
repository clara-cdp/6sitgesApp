import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the header and films list', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('SITGES')
    expect(screen.getByText('Adolescencia, sexo y muerte en Campamento Miasma')).toBeInTheDocument()
    expect(screen.getByText('La nit + zombi')).toBeInTheDocument()
    expect(screen.queryByText('Get Undressed')).not.toBeInTheDocument()
  })
})
