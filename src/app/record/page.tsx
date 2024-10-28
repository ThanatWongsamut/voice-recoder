'use client';

import React, { useState, useEffect } from 'react';
import {
  Mic,
  Languages,
  RotateCcw,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Play,
  AlertCircle,
  Info,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Language, useTranslation } from '@/translation';
import { usePassages } from '@/hooks/usePassages';

// interface Passage {
//   id: number;
//   en: string;
//   th: string;
// }

interface AudioBlob {
  en: Blob | null;
  th: Blob | null;
}

interface CompletedRecording {
  en: boolean;
  th: boolean;
}

interface RecordingStatus {
  ready: string;
  recording: string;
  processing: string;
  error: string;
}

// const samplePassages: Passage[] = [
//   {
//     id: 1,
//     en: 'The quick brown fox jumps over the lazy dog.',
//     th: 'เจ้าสุนัขจิ้งจอกสีน้ำตาลกระโดดข้ามสุนัขขี้เกียจ',
//   },
//   {
//     id: 2,
//     en: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
//     th: 'ความสำเร็จไม่ใช่จุดจบ ความล้มเหลวไม่ใช่เรื่องถึงตาย: สิ่งสำคัญคือความกล้าที่จะทำต่อไป',
//   },
//   {
//     id: 3,
//     en: `Life is like a box of chocolates. You never know what you're going to get.`,
//     th: 'ชีวิตเหมือนกล่องช็อคโกแลต คุณไม่มีทางรู้ว่าจะได้อะไร',
//   },
//   {
//     id: 4,
//     en: `In three words I can sum up everything I've learned about life: it goes on.`,
//     th: 'ฉันสามารถสรุปทุกสิ่งที่ได้เรียนรู้เกี่ยวกับชีวิตในสามคำ: มันดำเนินต่อไป',
//   },
//   {
//     id: 5,
//     en: 'The only way to do great work is to love what you do.',
//     th: 'หนทางเดียวที่จะทำงานที่ยอดเยี่ยมคือการรักในสิ่งที่คุณทำ',
//   },
//   {
//     id: 6,
//     en: 'Every moment is a fresh beginning.',
//     th: 'ทุกขณะคือการเริ่มต้นใหม่',
//   },
//   {
//     id: 7,
//     en: 'The best way to predict the future is to create it.',
//     th: 'วิธีที่ดีที่สุดในการทำนายอนาคตคือการสร้างมันขึ้นมา',
//   },
//   {
//     id: 8,
//     en: 'Happiness is not something ready made. It comes from your own actions.',
//     th: 'ความสุขไม่ใช่สิ่งที่ถูกสร้างขึ้นมาพร้อมใช้ มันเกิดจากการกระทำของคุณเอง',
//   },
//   {
//     id: 9,
//     en: 'The journey of a thousand miles begins with one step.',
//     th: 'การเดินทางพันไมล์เริ่มต้นด้วยก้าวแรก',
//   },
//   {
//     id: 10,
//     en: 'Change your thoughts and you change your world.',
//     th: 'เปลี่ยนความคิดของคุณ และคุณจะเปลี่ยนโลกของคุณ',
//   },
//   {
//     id: 11,
//     en: 'Education is the most powerful weapon which you can use to change the world.',
//     th: 'การศึกษาคืออาวุธที่ทรงพลังที่สุดที่คุณสามารถใช้เปลี่ยนแปลงโลก',
//   },
//   {
//     id: 12,
//     en: 'The future belongs to those who believe in the beauty of their dreams.',
//     th: 'อนาคตเป็นของคนที่เชื่อในความงดงามของความฝัน',
//   },
//   {
//     id: 13,
//     en: `Believe you can and you're halfway there.`,
//     th: 'เชื่อว่าคุณทำได้ และคุณก็มาถึงครึ่งทางแล้ว',
//   },
//   {
//     id: 14,
//     en: 'The only limit to our realization of tomorrow will be our doubts of today.',
//     th: 'ขีดจำกัดเดียวของการบรรลุเป้าหมายในวันพรุ่งนี้คือความสงสัยของเราในวันนี้',
//   },
//   {
//     id: 15,
//     en: 'Do what you can, with what you have, where you are.',
//     th: 'จงทำสิ่งที่คุณทำได้ ด้วยสิ่งที่คุณมี ณ ที่ที่คุณอยู่',
//   },
// ];

class AudioRecorder {
  private mediaRecorder: MediaRecorder | null;
  private audioChunks: BlobPart[];
  private stream: MediaStream | null;

  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.stream = null;
  }

  async start() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.start();
      return true;
    } catch (error) {
      console.error('Error starting recording:', error);
      return false;
    }
  }

  stop(): Promise<Blob> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || !this.stream) return;

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.stream?.getTracks().forEach((track) => track.stop());
        resolve(audioBlob);
      };
      this.mediaRecorder.stop();
    });
  }
}

const RecordingPage = () => {
  // const [language, setLanguage] = useState<Language>('en');
  const [currentPassageIndex, setCurrentPassageIndex] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [activeLanguage, setActiveLanguage] = useState<Language | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<keyof RecordingStatus>('ready');
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);
  const [audioRecorder] = useState<AudioRecorder>(new AudioRecorder());
  const [audioBlobs, setAudioBlobs] = useState<AudioBlob[]>(Array(15).fill({ en: null, th: null }));
  const [completedRecordings, setCompletedRecordings] = useState<CompletedRecording[]>(
    Array(15).fill({ en: false, th: false })
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  // const t = translations[language];

  const { t, setLanguage } = useTranslation('recording');

  const passages = usePassages();

  useEffect(() => {
    checkMicrophonePermission();
  }, []);

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

  const checkMicrophonePermission = async (): Promise<void> => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasMicPermission(true);
    } catch (error) {
      setHasMicPermission(false);
      console.error('Error getting microphone permission:', error);
    }
  };

  const handleRecord = async (lang: Language): Promise<void> => {
    if (isRecording && activeLanguage === lang) {
      await stopRecording();
    } else {
      await startRecording(lang);
    }
  };

  const startRecording = async (lang: Language): Promise<void> => {
    const success = await audioRecorder.start();
    if (success) {
      setIsRecording(true);
      setActiveLanguage(lang);
      setRecordingStatus('recording');
    } else {
      setRecordingStatus('error');
    }
  };

  const stopRecording = async (): Promise<void> => {
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

  const handlePlayback = async (lang: Language): Promise<void> => {
    if (isPlaying) {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      setIsPlaying(false);
      return;
    }

    const audioBlob = audioBlobs[currentPassageIndex][lang];
    if (!audioBlob) return;

    const audio = new Audio(URL.createObjectURL(audioBlob));
    setCurrentAudio(audio);

    audio.onended = () => {
      setIsPlaying(false);
      setCurrentAudio(null);
    };

    audio.onerror = () => {
      setIsPlaying(false);
      setCurrentAudio(null);
      setRecordingStatus('error');
    };

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
      setRecordingStatus('error');
    }
  };

  const handleReRecord = (lang: Language): void => {
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

  const renderRecordingSection = (lang: Language): JSX.Element => {
    const isCurrentlyRecording = isRecording && activeLanguage === lang;
    const isCompleted = completedRecordings[currentPassageIndex][lang];
    const isDisabled = isRecording && activeLanguage !== lang;
    const isCurrentlyPlaying = isPlaying && currentAudio;

    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          {t[`${lang}Version`]}
          {isCompleted && <CheckCircle className="h-4 w-4 text-green-600" />}
        </h3>

        <div className="bg-gray-50 p-6 rounded-lg text-lg border" suppressHydrationWarning>
          {passages[currentPassageIndex][lang]}
        </div>

        <div className="flex gap-4 flex-wrap">
          <Button
            onClick={() => handleRecord(lang)}
            className={`flex items-center gap-2 ${
              isCurrentlyRecording ? 'bg-red-600 hover:bg-red-700' : ''
            }`}
            disabled={isDisabled}
          >
            <Mic className="h-4 w-4" />
            {isCurrentlyRecording ? t.stopButton : t.recordButton}
          </Button>

          {isCompleted && (
            <>
              <Button
                variant="outline"
                onClick={() => handlePlayback(lang)}
                className="flex items-center gap-2"
                disabled={isRecording}
              >
                <Play className="h-4 w-4" />
                {isCurrentlyPlaying ? t.stopButton : t.playButton}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleReRecord(lang)}
                className="flex items-center gap-2"
                disabled={isRecording || !!isCurrentlyPlaying}
              >
                <RotateCcw className="h-4 w-4" />
                {t.reRecordButton}
              </Button>
            </>
          )}
        </div>

        {isCurrentlyRecording && (
          <Alert className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              {t.statusMessages.recording} ({recordingTime}s)
            </AlertDescription>
          </Alert>
        )}

        {isCompleted && !isCurrentlyRecording && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">{t.completed}</AlertDescription>
          </Alert>
        )}

        {recordingStatus === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{t.statusMessages.error}</AlertDescription>
          </Alert>
        )}
      </div>
    );
  };

  const handleNavigatePassage = (direction: 'next' | 'prev'): void => {
    if (isPlaying) {
      currentAudio?.pause();
      setIsPlaying(false);
      setCurrentAudio(null);
    }

    const newIndex =
      direction === 'next'
        ? Math.min(14, currentPassageIndex + 1)
        : Math.max(0, currentPassageIndex - 1);

    setCurrentPassageIndex(newIndex);
  };

  const totalProgress = completedRecordings.reduce(
    (acc, curr) => acc + (curr.en && curr.th ? 1 : 0),
    0
  );

  const canMoveToNext =
    completedRecordings[currentPassageIndex].en && completedRecordings[currentPassageIndex].th;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900">{t.title}</h1>
            <p className="text-gray-600 mt-2">{t.subtitle}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Languages className="h-4 w-4" />
                {t.selectLanguage}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('th')}>ภาษาไทย</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Progress Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t.progress}</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={(totalProgress / 15) * 100} className="h-2" />
            <p className="mt-2 text-sm text-gray-600">
              {totalProgress}/15 {t.passagesCompleted}
            </p>
          </CardContent>
        </Card>

        {/* Microphone Permission Alert */}
        {hasMicPermission === false && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{t.micPermission}</AlertDescription>
          </Alert>
        )}

        {/* Quick Tips */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              {t.instructions}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 space-y-1">
              {t.instructionsDetails.map((instruction: string, index: number) => (
                <li key={index} className="text-sm text-gray-600">
                  {instruction}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recording Section */}
        <Card>
          <CardHeader>
            <CardTitle>
              {t.currentPassage} {currentPassageIndex + 1}/15
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
            {t.previousPassage}
          </Button>

          <Button
            onClick={() => handleNavigatePassage('next')}
            disabled={currentPassageIndex === 14 || !canMoveToNext}
            className="flex items-center gap-2"
          >
            {t.nextPassage}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecordingPage;
