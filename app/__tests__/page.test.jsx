import { render, screen } from '@testing-library/react'
import HomePage from '../page.jsx'

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />)
    const heading = screen.getByRole('heading', { name: /meuportalfit/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the subtitle text', () => {
    render(<HomePage />)
    const subtitle = screen.getByText(/quiz inteligente para brasileiros nos eua/i)
    expect(subtitle).toBeInTheDocument()
  })

  it('renders the quiz button', () => {
    render(<HomePage />)
    const button = screen.getByRole('button', { name: /fazer quiz gratuito/i })
    expect(button).toBeInTheDocument()
  })

  it('has correct styling on the button', () => {
    render(<HomePage />)
    const button = screen.getByRole('button', { name: /fazer quiz gratuito/i })
    expect(button).toHaveStyle({
      background: 'rgb(5, 150, 105)',
      color: 'rgb(255, 255, 255)',
      cursor: 'pointer'
    })
  })
})