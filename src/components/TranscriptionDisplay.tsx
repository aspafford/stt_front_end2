import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface TranscriptionDisplayProps {
  text: string;
  error?: string | null;
  status?: 'idle' | 'recording' | 'loading' | 'error';
}

const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({ text, error, status }) => {
  const showError = status === 'error' && error;
  
  return (
    <div 
      style={{
        backgroundColor: 'var(--neutral-200)',
        border: '1px solid var(--neutral-400)',
        borderRadius: 'var(--border-radius-area)',
        padding: 'var(--space-3)',
        minHeight: 'var(--transcription-area-min-height)',
        fontSize: 'var(--font-size-transcription)',
        fontWeight: 'var(--font-weight-regular)',
        lineHeight: 'var(--line-height-transcription)',
        color: showError ? 'var(--system-error)' : (text ? 'var(--neutral-900)' : 'var(--neutral-700)'),
        display: 'flex',
        alignItems: 'flex-start',
        gap: showError ? 'var(--space-2)' : '0',
        fontFamily: 'var(--font-family)',
      }}
    >
      {showError && <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: '2px' }} role="img" aria-label="Alert" />}
      {showError ? error : (text || "Click the button below to start recording. Your words will appear here.")}
    </div>
  );
};

export default TranscriptionDisplay;