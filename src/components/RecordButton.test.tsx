import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import RecordButton from './RecordButton'

describe('RecordButton', () => {
  it('renders "Start Recording" text and mic icon when status is idle', () => {
    const mockOnClick = vi.fn()
    render(<RecordButton status="idle" onClick={mockOnClick} />)
    
    const button = screen.getByRole('button', { name: /start recording/i })
    expect(button).toBeInTheDocument()
    
    // Check for the presence of the mic icon by looking for the svg element
    const micIcon = button.querySelector('svg')
    expect(micIcon).toBeInTheDocument()
  })

  it('renders "Stop Recording" text when status is recording', () => {
    const mockOnClick = vi.fn()
    render(<RecordButton status="recording" onClick={mockOnClick} />)
    
    const button = screen.getByRole('button', { name: /stop recording/i })
    expect(button).toBeInTheDocument()
  })

  it('renders "Try Again" text when status is error', () => {
    const mockOnClick = vi.fn()
    render(<RecordButton status="error" onClick={mockOnClick} />)
    
    const button = screen.getByRole('button', { name: /try again/i })
    expect(button).toBeInTheDocument()
  })

  it('renders "Processing..." text and is disabled when status is loading', () => {
    const mockOnClick = vi.fn()
    render(<RecordButton status="loading" onClick={mockOnClick} />)
    
    const button = screen.getByRole('button', { name: /processing.../i })
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })
})