import React from 'react';
import { Mic, StopCircle } from 'lucide-react';

interface RecordButtonProps {
  status: 'idle' | 'recording' | 'loading' | 'error';
  onClick: () => void;
}

const RecordButton: React.FC<RecordButtonProps> = ({ status, onClick }) => {
  const getButtonText = () => {
    switch (status) {
      case 'recording':
        return 'Stop Recording';
      case 'loading':
        return 'Processing...';
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
    if (status === 'loading') {
      return <div style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>;
    }
    return <Mic size={20} />;
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <button
        onClick={onClick}
        disabled={status === 'loading'}
        style={{
          background: status === 'loading' 
            ? 'linear-gradient(45deg, rgba(138, 43, 226, 0.6), rgba(255, 0, 255, 0.6))' 
            : 'linear-gradient(45deg, var(--gradient-start), var(--gradient-end))',
          border: 'none',
          borderRadius: 'var(--border-radius-button)',
          padding: 'var(--button-padding)',
          color: 'var(--text-on-dark)',
          fontSize: 'var(--font-size-button)',
          fontWeight: 'var(--font-weight-semibold)',
          fontFamily: 'var(--font-family)',
          lineHeight: 'var(--line-height-button)',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-2)',
          boxShadow: 'var(--shadow-button)',
          transition: 'var(--transition-button)',
          minWidth: '200px',
          opacity: status === 'loading' ? 0.7 : 1,
        }}
        onMouseEnter={(e) => {
          if (status !== 'loading') {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-button-hover)';
          }
        }}
        onMouseLeave={(e) => {
          if (status !== 'loading') {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-button)';
          }
        }}
        onMouseDown={(e) => {
          if (status !== 'loading') {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-button-active)';
          }
        }}
        onMouseUp={(e) => {
          if (status !== 'loading') {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-button-hover)';
          }
        }}
      >
        {getIcon()}
        {getButtonText()}
      </button>
    </>
  );
};

export default RecordButton;