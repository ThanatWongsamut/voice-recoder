'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Info, AlertCircle, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';
import { AudioRecorder } from '@/utils/AudioRecorder';
import { RecordingControls } from '../_components/recording/RecordingControls';
import LanguageSwitcher from '../_components/LanguageSwitcher';
import { Language, AudioBlob, CompletedRecording, RecordingStatus } from '@/types/recording';

const RecordingPage: React.FC = () => {
  const [currentPassageIndex, setCurrentPassageIndex] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [activeLanguage, setActiveLanguage] = useState<Language | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<RecordingStatus>('ready');
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);
  const [audioRecorder] = useState<AudioRecorder>(() => new AudioRecorder());
  const [audioBlobs, setAudioBlobs] = useState<AudioBlob[]>(Array(15).fill({ en: null, th: null }));
  const [completedRecordings, setCompletedRecordings] = useState<CompletedRecording[]>(
    Array(15).fill({ en: false, th: false })
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const { t } = useTranslation('translation');

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
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleRecord = async (lang: Language) => {
    if (isRecording && activeLanguage === lang) {
      await stopRecording();
    } else {
      await startRecording(lang);
    }
  };

  const startRecording = async (lang: Language) => {
    const success = await audioRecorder.start();
    if (success) {
      setIsRecording(true);
      setActiveLanguage(lang);
      setRecordingStatus('recording');
    } else {
      setRecordingStatus('error');
    }
  };

  const stopRecording = async () => {
    try {
      setRecordingStatus('processing');
      const audioBlob = await audioRecorder.stop();

      setAudioBlobs((prev) => {
        const newBlobs = [...prev];
        if (activeLanguage) {
          newBlobs[currentPassageIndex] = {
            ...newBlobs[currentPassageIndex],
            [activeLanguage]: audioBlob,
          };
        }
        return newBlobs;
      });

      setCompletedRecordings((prev) => {
        const newCompletions = [...prev];
        if (activeLanguage) {
          newCompletions[currentPassageIndex] = {
            ...newCompletions[currentPassageIndex],
            [activeLanguage]: true,
          };
        }
        return newCompletions;
      });

      setIsRecording(false);
      setActiveLanguage(null);
      setRecordingStatus('ready');
    } catch (error) {
      console.error('Error stopping recording:', error);
      setRecordingStatus('error');
    }
  };

  const handlePlaybackEnd = useCallback(() => {
    setIsPlaying(false);
    setCurrentAudio(null);
  }, []);

  const handlePlayback = async (lang: Language) => {
    if (isPlaying) {
      currentAudio?.pause();
      currentAudio?.removeEventListener('ended', handlePlaybackEnd);
      setCurrentAudio(null);
      setIsPlaying(false);
      return;
    }

    const audioBlob = audioBlobs[currentPassageIndex][lang];
    if (!audioBlob) return;

    try {
      const audio = new Audio(URL.createObjectURL(audioBlob));

      audio.addEventListener('ended', handlePlaybackEnd);
      audio.addEventListener('error', () => {
        setRecordingStatus('error');
        handlePlaybackEnd();
      });

      setCurrentAudio(audio);
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
      setRecordingStatus('error');
    }
  };

  const handleReRecord = (lang: Language) => {
    if (isPlaying) {
      currentAudio?.pause();
      setIsPlaying(false);
      setCurrentAudio(null);
    }

    setCompletedRecordings((prev) => {
      const newCompletions = [...prev];
      newCompletions[currentPassageIndex] = {
        ...newCompletions[currentPassageIndex],
        [lang]: false,
      };
      return newCompletions;
    });

    setAudioBlobs((prev) => {
      const newBlobs = [...prev];
      newBlobs[currentPassageIndex] = {
        ...newBlobs[currentPassageIndex],
        [lang]: null,
      };
      return newBlobs;
    });
  };

  const handleNavigatePassage = (direction: 'next' | 'prev') => {
    if (isPlaying) {
      currentAudio?.pause();
      setIsPlaying(false);
      setCurrentAudio(null);
    }

    if (isRecording) {
      return; // Prevent navigation while recording
    }

    const newIndex =
      direction === 'next'
        ? Math.min(14, currentPassageIndex + 1)
        : Math.max(0, currentPassageIndex - 1);

    setCurrentPassageIndex(newIndex);
  };

  const renderRecordingSection = (lang: Language) => {
    const isCurrentlyRecording = isRecording && activeLanguage === lang;
    const isCompleted = completedRecordings[currentPassageIndex][lang];
    const isDisabled = isRecording && activeLanguage !== lang;

    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          {t(`recording.${lang}Version`)}
          {isCompleted && <CheckCircle className="h-4 w-4 text-green-600" />}
        </h3>

        <div className="bg-gray-50 p-6 rounded-lg text-lg border">
          Sample text for {lang} version
        </div>

        <RecordingControls
          lang={lang}
          isCurrentlyRecording={isCurrentlyRecording}
          isCompleted={isCompleted}
          isDisabled={isDisabled}
          isPlaying={isPlaying}
          recordingTime={recordingTime}
          recordingStatus={recordingStatus}
          onRecord={handleRecord}
          onPlayback={handlePlayback}
          onReRecord={handleReRecord}
        />
      </div>
    );
  };

  const totalProgress = completedRecordings.reduce(
    (acc, curr) => acc + (curr.en && curr.th ? 1 : 0),
    0
  );

  const canMoveToNext =
    !isRecording &&
    completedRecordings[currentPassageIndex].en &&
    completedRecordings[currentPassageIndex].th;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900">{t('recording.title')}</h1>
            <p className="text-gray-600 mt-2">{t('recording.subtitle')}</p>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Progress Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t('recording.progress')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={(totalProgress / 15) * 100} className="h-2" />
            <p className="mt-2 text-sm text-gray-600">
              {totalProgress}/15 {t('recording.passagesCompleted')}
            </p>
          </CardContent>
        </Card>

        {/* Microphone Permission Alert */}
        {hasMicPermission === false && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{t('recording.micPermission')}</AlertDescription>
          </Alert>
        )}

        {/* Quick Tips */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              {t('recording.instructions')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 space-y-1">
              {t('recording.instructionsDetails', { returnObjects: true }).map(
                (instruction: string, index: number) => (
                  <li key={index} className="text-sm text-gray-600">
                    {instruction}
                  </li>
                )
              )}
            </ul>
          </CardContent>
        </Card>

        {/* Recording Section */}
        <Card>
          <CardHeader>
            <CardTitle>
              {t('recording.currentPassage')} {currentPassageIndex + 1}/15
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderRecordingSection('en')}
            <Separator />
            {renderRecordingSection('th')}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={() => handleNavigatePassage('prev')}
            disabled={currentPassageIndex === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('recording.previousPassage')}
          </Button>

          <Button
            onClick={() => handleNavigatePassage('next')}
            disabled={currentPassageIndex === 14 || !canMoveToNext}
            className="flex items-center gap-2"
          >
            {t('recording.nextPassage')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecordingPage;
