import React, { useState } from 'react';
import TranscriptionDisplay from './components/TranscriptionDisplay';
import RecordButton from './components/RecordButton';
import StatusIndicator from './components/StatusIndicator';
import styles from './SpeechToText.module.css';

type Status = 'idle' | 'recording' | 'loading' | 'error';

const SpeechToText: React.FC = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [transcription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleRecordClick = () => {
    switch (status) {
      case 'idle':
        setStatus('recording');
        setError(null);
        break;
      case 'recording':
        setStatus('loading');
        // Simulate processing time, then return to idle
        setTimeout(() => {
          setStatus('idle');
        }, 1000);
        break;
      case 'error':
        setStatus('idle');
        setError(null);
        break;
    }
  };

  // Developer-only function to test error state
  const handleTestError = () => {
    setStatus('error');
    setError('Could not access microphone. Please check your browser settings and grant permission.');
  };

  return (
    <div className={styles.container}>
      <TranscriptionDisplay text={transcription} error={error} status={status} />
      <RecordButton status={status} onClick={handleRecordClick} />
      <StatusIndicator status={status} />
      {/* Temporary developer button for testing error state */}
      <button 
        onClick={handleTestError}
        style={{ marginTop: '16px', padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Test Error State
      </button>
    </div>
  );
};

export default SpeechToText;