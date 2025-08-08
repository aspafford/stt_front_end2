import React from 'react';

interface TranscriptionDisplayProps {
  text: string;
}

const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({ text }) => {
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
        color: text ? 'var(--neutral-900)' : 'var(--neutral-700)',
        display: 'flex',
        alignItems: 'flex-start',
        fontFamily: 'var(--font-family)',
      }}
    >
      {text || "Click the button below to start recording. Your words will appear here."}
    </div>
  );
};

export default TranscriptionDisplay;