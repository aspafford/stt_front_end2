import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SpeechToText from './SpeechToText'

describe('SpeechToText', () => {
  it('renders the SpeechToText component with child components', () => {
    render(<SpeechToText />)
    
    // Check if TranscriptionDisplay is present with placeholder text
    const placeholderText = screen.getByText(/click the button below to start recording/i)
    expect(placeholderText).toBeInTheDocument()
    
    // Check if RecordButton is present with Start Recording text
    const button = screen.getByRole('button', { name: /start recording/i })
    expect(button).toBeInTheDocument()
    
    // StatusIndicator should be hidden in idle state (no status text visible)
    const recordingText = screen.queryByText(/^recording\.\.\.$/i)
    expect(recordingText).not.toBeInTheDocument()
  })
})