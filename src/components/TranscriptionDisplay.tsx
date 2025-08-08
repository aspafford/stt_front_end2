import React, { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import styles from './TranscriptionDisplay.module.css';

interface TranscriptionDisplayProps {
  text: string;
  error?: string | null;
  status?: 'idle' | 'recording' | 'loading' | 'error';
}

const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({ text, error, status }) => {
  const showError = status === 'error' && error;
  const [previousText, setPreviousText] = useState(text);
  const [animateText, setAnimateText] = useState(false);

  useEffect(() => {
    if (text !== previousText && text) {
      setAnimateText(true);
      setPreviousText(text);
      const timer = setTimeout(() => setAnimateText(false), 300);
      return () => clearTimeout(timer);
    }
  }, [text, previousText]);

  const getContainerClass = () => {
    let classes = styles.container;
    if (status === 'loading') {
      classes += ` ${styles.loading}`;
    }
    return classes;
  };

  const getTextClass = () => {
    if (showError) return '';
    if (text) {
      return animateText ? styles.transcriptionText : '';
    }
    return styles.placeholder;
  };
  
  return (
    <div className={getContainerClass()}>
      {showError ? (
        <div className={styles.error}>
          <AlertTriangle size={20} className={styles.errorIcon} role="img" aria-label="Alert" />
          <span>{error}</span>
        </div>
      ) : (
        <div className={getTextClass()}>
          {text || "Click the button below to start recording. Your words will appear here."}
        </div>
      )}
    </div>
  );
};

export default TranscriptionDisplay;