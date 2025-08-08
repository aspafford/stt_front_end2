import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TranscriptionDisplay from './TranscriptionDisplay'

describe('TranscriptionDisplay', () => {
  it('renders the correct placeholder text when no text is provided', () => {
    render(<TranscriptionDisplay text="" />)
    
    const placeholderText = screen.getByText(/click the button below to start recording/i)
    expect(placeholderText).toBeInTheDocument()
  })

  it('renders the provided text when text is given', () => {
    const testText = "Hello world, this is a test transcription."
    render(<TranscriptionDisplay text={testText} />)
    
    const transcriptionText = screen.getByText(testText)
    expect(transcriptionText).toBeInTheDocument()
  })

  it('does not show placeholder text when transcription text is provided', () => {
    const testText = "Hello world, this is a test transcription."
    render(<TranscriptionDisplay text={testText} />)
    
    const placeholderText = screen.queryByText(/click the button below to start recording/i)
    expect(placeholderText).not.toBeInTheDocument()
  })
})