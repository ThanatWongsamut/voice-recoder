import React from 'react';
import { Mic, Play, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Language } from '@/types/recording';
import { useTranslation } from 'react-i18next';

interface RecordingControlsProps {
  lang: Language;
  isCurrentlyRecording: boolean;
  isCompleted: boolean;
  isDisabled: boolean;
  isPlaying: boolean;
  recordingTime: number;
  recordingStatus: string;
  onRecord: (lang: Language) => void;
  onPlayback: (lang: Language) => void;
  onReRecord: (lang: Language) => void;
}

export const RecordingControls: React.FC<RecordingControlsProps> = ({
  lang,
  isCurrentlyRecording,
  isCompleted,
  isDisabled,
  isPlaying,
  recordingTime,
  recordingStatus,
  onRecord,
  onPlayback,
  onReRecord,
}) => {
  const { t } = useTranslation('translation');

  return (
    <div className="space-y-4">
      <div className="flex gap-4 flex-wrap">
        <Button
          onClick={() => onRecord(lang)}
          className={isCurrentlyRecording ? 'bg-red-600 hover:bg-red-700' : ''}
          disabled={isDisabled}
        >
          <Mic className="h-4 w-4" />
          {isCurrentlyRecording ? t('recording.stopButton') : t('recording.recordButton')}
        </Button>

        {isCompleted && (
          <>
            <Button
              variant="outline"
              onClick={() => onPlayback(lang)}
              className="flex items-center gap-2"
              disabled={isCurrentlyRecording}
            >
              <Play className="h-4 w-4" />
              {isPlaying ? t('recording.stopButton') : t('recording.playButton')}
            </Button>
            <Button
              variant="outline"
              onClick={() => onReRecord(lang)}
              className="flex items-center gap-2"
              disabled={isCurrentlyRecording || isPlaying}
            >
              <RotateCcw className="h-4 w-4" />
              {t('recording.reRecordButton')}
            </Button>
          </>
        )}
      </div>

      {isCurrentlyRecording && (
        <Alert className="bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            {t('recording.statusMessages.recording')} ({recordingTime}s)
          </AlertDescription>
        </Alert>
      )}

      {isCompleted && !isCurrentlyRecording && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">{t('recording.completed')}</AlertDescription>
        </Alert>
      )}

      {recordingStatus === 'error' && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{t('recording.statusMessages.error')}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};
