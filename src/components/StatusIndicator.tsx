import React from 'react';

interface StatusIndicatorProps {
  status: 'idle' | 'recording' | 'loading' | 'error';
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  const getStatusText = () => {
    switch (status) {
      case 'recording':
        return 'Recording...';
      default:
        return '';
    }
  };

  const statusText = getStatusText();

  if (!statusText) {
    return null;
  }

  return (
    <p
      style={{
        fontSize: 'var(--font-size-status)',
        fontWeight: 'var(--font-weight-medium)',
        fontFamily: 'var(--font-family)',
        lineHeight: 'var(--line-height-status)',
        color: status === 'error' ? 'var(--system-error)' : 'var(--neutral-700)',
        margin: 0,
        textAlign: 'center',
      }}
    >
      {statusText}
    </p>
  );
};

export default StatusIndicator;