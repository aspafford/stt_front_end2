export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'audio.webm');

  try {
    const response = await fetch('/api/v1/transcribe', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.transcription) {
      throw new Error('Invalid response from transcription service');
    }

    return data.transcription;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to transcribe audio');
  }
}