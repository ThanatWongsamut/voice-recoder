export type Language = 'en' | 'th';

export interface AudioBlob {
  en: Blob | null;
  th: Blob | null;
}

export interface CompletedRecording {
  en: boolean;
  th: boolean;
}

export type RecordingStatus = 'ready' | 'recording' | 'processing' | 'error';

export interface Passage {
  id: number;
  en: string;
  th: string;
}

export interface RecordingResponse {
  success: boolean;
  url?: string;
  error?: string;
}