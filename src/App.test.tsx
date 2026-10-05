import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the header and main welcome message', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('SITGES')
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /Benvinguts/i
    )
  })
})
