import React from 'react';
import { Mic, StopCircle } from 'lucide-react';
import styles from './RecordButton.module.css';

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
      return (
        <div className={`${styles.iconWrapper} ${styles.breathingIcon}`}>
          <StopCircle size={20} />
        </div>
      );
    }
    if (status === 'loading') {
      return <div className={styles.spinner}></div>;
    }
    return (
      <div className={styles.iconWrapper}>
        <Mic size={20} />
      </div>
    );
  };

  return (
    <button
      onClick={onClick}
      disabled={status === 'loading'}
      className={styles.button}
    >
      {getIcon()}
      {getButtonText()}
    </button>
  );
};

export default RecordButton;