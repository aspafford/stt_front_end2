import React, { useState, useEffect } from 'react';
import TranscriptionDisplay from './components/TranscriptionDisplay';
import RecordButton from './components/RecordButton';
import StatusIndicator from './components/StatusIndicator';
import { useRecorder } from './hooks/useRecorder';
import { transcribeAudio } from './services/api';
import styles from './SpeechToText.module.css';

type Status = 'idle' | 'recording' | 'loading' | 'error';

const SpeechToText: React.FC = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [transcription, setTranscription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { 
    status: recorderStatus, 
    startRecording, 
    stopRecording, 
    audioBlob, 
    error: recorderError 
  } = useRecorder();

  // Sync recorder status with component status
  useEffect(() => {
    if (recorderStatus === 'recording') {
      setStatus('recording');
    } else if (recorderStatus === 'error') {
      setStatus('error');
      setError(recorderError);
    }
  }, [recorderStatus, recorderError]);

  // Process audio blob when it's created
  useEffect(() => {
    if (audioBlob) {
      handleTranscription(audioBlob);
    }
  }, [audioBlob]);

  const handleTranscription = async (blob: Blob) => {
    setStatus('loading');
    try {
      const text = await transcribeAudio(blob);
      setTranscription(text);
      setStatus('idle');
      setError(null);
    } catch (err) {
      setStatus('error');
      setError('Transcription service is currently unavailable. Please try again later.');
    }
  };

  const handleRecordClick = async () => {
    switch (status) {
      case 'idle':
        setTranscription(''); // Clear previous transcription
        await startRecording();
        break;
      case 'recording':
        stopRecording();
        // Audio blob processing will be handled by the useEffect
        break;
      case 'error':
        setStatus('idle');
        setError(null);
        break;
    }
  };


  return (
    <div className={styles.container}>
      <TranscriptionDisplay text={transcription} error={error} status={status} />
      <RecordButton status={status} onClick={handleRecordClick} />
      <StatusIndicator status={status} />
    </div>
  );
};

export default SpeechToText;