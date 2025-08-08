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

  it('renders nothing when status is error', () => {
    const { container } = render(<StatusIndicator status="error" />)
    expect(container.firstChild).toBeNull()
  })

  it('renders nothing when status is loading', () => {
    const { container } = render(<StatusIndicator status="loading" />)
    expect(container.firstChild).toBeNull()
  })
})