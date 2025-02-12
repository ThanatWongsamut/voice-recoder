import { useState, useCallback, useEffect } from 'react';
import { AudioRecorder } from '@/utils/AudioRecorder';
import { Language, RecordingStatus } from '@/types/recording';

interface UseRecorderProps {
  onRecordingComplete?: (blob: Blob) => void;
  onError?: (error: string) => void;
}

export const useRecorder = ({ onRecordingComplete, onError }: UseRecorderProps = {}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null);
  const [status, setStatus] = useState<RecordingStatus>('ready');
  const [audioRecorder] = useState(() => new AudioRecorder());
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);

  const checkMicrophonePermission = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasMicPermission(true);
    } catch (error) {
      console.error('Error getting microphone permission:', error);
      setHasMicPermission(false);
    }
  }, []);

  useEffect(() => {
    checkMicrophonePermission();
    return () => {
      audioRecorder.cleanup();
    };
  }, [checkMicrophonePermission, audioRecorder]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = useCallback(async (lang: Language) => {
    try {
      const success = await audioRecorder.start();
      if (success) {
        setIsRecording(true);
        setStatus('recording');
        setCurrentLanguage(lang);
        setRecordingTime(0);
      } else {
        throw new Error('Failed to start recording');
      }
    } catch (error) {
      setStatus('error');
      onError?.(error instanceof Error ? error.message : 'Unknown error');
    }
  }, [audioRecorder, onError]);

  const stopRecording = useCallback(async () => {
    try {
      setStatus('processing');
      const audioBlob = await audioRecorder.stop();
      setIsRecording(false);
      setStatus('ready');
      setCurrentLanguage(null);
      onRecordingComplete?.(audioBlob);
      return audioBlob;
    } catch (error) {
      setStatus('error');
      onError?.(error instanceof Error ? error.message : 'Unknown error');
      return null;
    }
  }, [audioRecorder, onRecordingComplete, onError]);

  return {
    isRecording,
    recordingTime,
    status,
    currentLanguage,
    hasMicPermission,
    startRecording,
    stopRecording,
  };
};