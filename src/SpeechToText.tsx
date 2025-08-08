import React from 'react';
import TranscriptionDisplay from './components/TranscriptionDisplay';
import RecordButton from './components/RecordButton';
import StatusIndicator from './components/StatusIndicator';
import styles from './SpeechToText.module.css';

const SpeechToText: React.FC = () => {
  // For milestone 2, we're hardcoding the idle state with no functionality
  const status = 'idle' as const;
  const transcriptionText = '';

  const handleButtonClick = () => {
    // No functionality implemented yet - this is purely presentational
  };

  return (
    <div className={styles.container}>
      <TranscriptionDisplay text={transcriptionText} />
      <RecordButton status={status} onClick={handleButtonClick} />
      <StatusIndicator status={status} />
    </div>
  );
};

export default SpeechToText;