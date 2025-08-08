import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import StatusIndicator from './StatusIndicator'

describe('StatusIndicator', () => {
  it('renders nothing when status is idle', () => {
    const { container } = render(<StatusIndicator status="idle" />)
    expect(container.firstChild).toBeNull()
  })

  it('renders "Recording..." text when status is recording', () => {
    render(<StatusIndicator status="recording" />)
    
    const statusText = screen.getByText(/recording.../i)
    expect(statusText).toBeInTheDocument()
  })

  it('renders "Error occurred" text when status is error', () => {
    render(<StatusIndicator status="error" />)
    
    const errorText = screen.getByText(/error occurred/i)
    expect(errorText).toBeInTheDocument()
  })
})