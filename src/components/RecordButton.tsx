import React from 'react';
import { Mic, StopCircle } from 'lucide-react';

interface RecordButtonProps {
  status: 'idle' | 'recording' | 'error';
  onClick: () => void;
}

const RecordButton: React.FC<RecordButtonProps> = ({ status, onClick }) => {
  const getButtonText = () => {
    switch (status) {
      case 'recording':
        return 'Stop Recording';
      case 'error':
        return 'Try Again';
      default:
        return 'Start Recording';
    }
  };

  const getIcon = () => {
    if (status === 'recording') {
      return <StopCircle size={20} />;
    }
    return <Mic size={20} />;
  };

  return (
    <button
      onClick={onClick}
      style={{
        background: 'linear-gradient(45deg, var(--gradient-start), var(--gradient-end))',
        border: 'none',
        borderRadius: 'var(--border-radius-button)',
        padding: 'var(--button-padding)',
        color: 'var(--text-on-dark)',
        fontSize: 'var(--font-size-button)',
        fontWeight: 'var(--font-weight-semibold)',
        fontFamily: 'var(--font-family)',
        lineHeight: 'var(--line-height-button)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        boxShadow: 'var(--shadow-button)',
        transition: 'var(--transition-button)',
        minWidth: '200px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-button-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-button)';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(0px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-button-active)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-button-hover)';
      }}
    >
      {getIcon()}
      {getButtonText()}
    </button>
  );
};

export default RecordButton;