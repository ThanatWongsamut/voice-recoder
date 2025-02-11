import { useState, useMemo } from 'react';

export type Language = 'en' | 'th';

// Translation data organized by page
type TranslationsType = {
  [key: string]: {
    en: {
      title: string;
      subtitle: string;
      startButton: string;
      selectLanguage: string;
      overview: {
        title: string;
        description: string;
        points: string[];
      };
      process: {
        title: string;
        points: string[];
      };
      requirements: {
        title: string;
        points: string[];
      };
      policy: {
        title: string;
        points: string[];
      };
    };
    th: {
      title: string;
      subtitle: string;
      startButton: string;
      selectLanguage: string;
      overview: {
        title: string;
        description: string;
        points: string[];
      };
      process: {
        title: string;
        points: string[];
      };
      requirements: {
        title: string;
        points: string[];
      };
      policy: {
        title: string;
        points: string[];
      };
      progress?: string;
    };
  };
};

const translations: TranslationsType = {
  home: {
    en: {
      title: 'Voice Data Collection Project',
      subtitle: 'Help us develop AI voice translation that preserves speaker identity',
      startButton: 'Start Recording',
      selectLanguage: 'Select Language',
      overview: {
        title: 'Project Overview',
        description:
          "We are developing an AI model that can translate speech between Thai and English while maintaining the speaker's original voice characteristics. Your voice recordings will help train and improve this technology.",
        points: [
          'Your recordings will help train AI models for voice-to-voice translation',
          'The AI will learn to translate while preserving speaker voice characteristics',
          'Help create more natural-sounding translations between Thai and English',
          'Takes approximately 15-20 minutes to complete',
        ],
      },
      process: {
        title: 'Recording Guide',
        points: [
          'Record each passage in both English and Thai versions',
          'Speak naturally at your comfortable pace',
          'Ensure you are in a quiet environment for clear recordings',
          'Take breaks between recordings if needed',
          'Review and re-record passages as needed',
          'Complete all passages in both languages',
        ],
      },
      requirements: {
        title: 'Technical Requirements',
        points: [
          'Working microphone',
          'Quiet recording environment',
          'Stable internet connection',
          'Latest version of Chrome/Firefox/Safari',
        ],
      },
      policy: {
        title: 'Data Usage & Privacy',
        points: [
          'Voice data will be used to train AI translation models',
          'All data is collected anonymously',
          'No personal information is collected',
          'You can request deletion of your recordings',
          'Data will not be used for commercial purposes',
        ],
      },
    },
    th: {
      title: 'โครงการเก็บข้อมูลเสียง',
      subtitle: 'ช่วยเราพัฒนา AI แปลเสียงที่รักษาเอกลักษณ์เสียงของผู้พูด',
      startButton: 'เริ่มบันทึกเสียง',
      selectLanguage: 'เลือกภาษา',
      overview: {
        title: 'ภาพรวมโครงการ',
        description:
          'เรากำลังพัฒนาโมเดล AI ที่สามารถแปลเสียงระหว่างภาษาไทยและอังกฤษ โดยรักษาลักษณะเสียงเดิมของผู้พูด การบันทึกเสียงของคุณจะช่วยฝึกฝนและพัฒนาเทคโนโลยีนี้',
        points: [
          'การบันทึกเสียงของคุณจะช่วยฝึกฝนโมเดล AI สำหรับการแปลเสียง',
          'AI จะเรียนรู้การแปลโดยรักษาลักษณะเสียงของผู้พูด',
          'ช่วยสร้างการแปลที่ฟังเป็นธรรมชาติระหว่างภาษาไทยและอังกฤษ',
          'ใช้เวลาประมาณ 15-20 นาทีในการทำให้เสร็จ',
        ],
      },
      process: {
        title: 'คำแนะนำการบันทึก',
        points: [
          'บันทึกแต่ละบทความทั้งในภาษาอังกฤษและภาษาไทย',
          'พูดอย่างเป็นธรรมชาติในจังหวะที่คุณสบาย',
          'ตรวจสอบให้แน่ใจว่าคุณอยู่ในสภาพแวดล้อมที่เงียบสำหรับการบันทึกที่ชัดเจน',
          'พักระหว่างการบันทึกได้ตามต้องการ',
          'ตรวจสอบและบันทึกใหม่ได้ตามต้องการ',
          'ทำให้ครบทุกบทความในทั้งสองภาษา',
        ],
      },
      requirements: {
        title: 'ข้อกำหนดทางเทคนิค',
        points: [
          'ไมโครโฟนที่ทำงานได้',
          'สภาพแวดล้อมที่เงียบสำหรับการบันทึก',
          'การเชื่อมต่ออินเทอร์เน็ตที่เสถียร',
          'เว็บเบราว์เซอร์ที่ทันสมัย (Chrome/Firefox/Safari)',
        ],
      },
      policy: {
        title: 'การใช้ข้อมูลและความเป็นส่วนตัว',
        points: [
          'ข้อมูลเสียงจะถูกใช้ในการฝึกฝนโมเดล AI แปลเสียง',
          'ข้อมูลทั้งหมดถูกเก็บแบบไม่ระบุตัวตน',
          'ไม่มีการเก็บข้อมูลส่วนบุคคล',
          'คุณสามารถขอลบการบันทึกเสียงของคุณได้',
          'ข้อมูลจะไม่ถูกใช้เพื่อการพาณิชย์',
        ],
      },
    },
  },
  recording: {
    en: {
      title: 'Voice Recording Session',
      subtitle: 'Record passages in both English and Thai to help train AI voice translation',
      progress: 'Session Progress',
      currentStatus: 'Recording Status',
      instructions: 'Quick Tips',
      instructionsDetails: [
        'Record both language versions before proceeding',
        'Speak at a natural pace and volume',
        'Stay consistent with microphone distance',
        'Review your recordings before moving on',
      ],
      statusMessages: {
        ready: 'Ready to record',
        recording: '🔴 Recording in progress...',
        processing: 'Processing recording...',
        error: 'Recording failed. Please try again.',
      },
      currentPassage: 'Current Passage',
      recordButton: 'Record',
      stopButton: 'Stop',
      reRecordButton: 'Re-record',
      playButton: 'Play',
      nextPassage: 'Next Passage',
      previousPassage: 'Previous',
      passagesCompleted: 'passages completed',
      selectLanguage: 'Interface Language',
      enVersion: 'English Recording',
      thVersion: 'Thai Recording',
      bothRequired: 'Please record both versions to continue',
      completed: 'Recording completed',
      notRecordedYet: 'Not recorded yet',
      micPermission: 'Please allow microphone access',
      timeRemaining: 'Time Remaining',
      cancel: 'Cancel',
      retry: 'Retry',
      audioError: 'Audio playback error',
      processingMessage: 'Processing your recording...',
      readyMessage: 'Ready for recording',
      uploadProgress: 'Upload progress',
      qualityCheck: 'Checking recording quality...',
      networkError: 'Network connection error',
      saveSuccess: 'Recording saved successfully',
      saveFailed: 'Failed to save recording',
      confirmRerecord:
        'Are you sure you want to record again? This will delete your previous recording.',
      yes: 'Yes',
      no: 'No',
    },
    th: {
      title: 'การบันทึกเสียง',
      subtitle: 'บันทึกเสียงทั้งภาษาไทยและอังกฤษเพื่อช่วยฝึกฝน AI แปลเสียง',
      progress: 'ความคืบหน้า',
      currentStatus: 'สถานะการบันทึก',
      instructions: 'คำแนะนำ',
      instructionsDetails: [
        'บันทึกทั้งสองภาษาก่อนดำเนินการต่อ',
        'พูดด้วยความเร็วและระดับเสียงที่เป็นธรรมชาติ',
        'รักษาระยะห่างจากไมโครโฟนให้คงที่',
        'ตรวจสอบการบันทึกก่อนดำเนินการต่อ',
      ],
      statusMessages: {
        ready: 'พร้อมบันทึก',
        recording: '🔴 กำลังบันทึก...',
        processing: 'กำลังประมวลผลการบันทึก...',
        error: 'การบันทึกล้มเหลว กรุณาลองใหม่',
      },
      currentPassage: 'บทความปัจจุบัน',
      recordButton: 'บันทึก',
      stopButton: 'หยุด',
      reRecordButton: 'บันทึกใหม่',
      playButton: 'เล่น',
      nextPassage: 'บทความถัดไป',
      previousPassage: 'บทความก่อนหน้า',
      passagesCompleted: 'บทความที่เสร็จสมบูรณ์',
      selectLanguage: 'เลือกภาษา',
      enVersion: 'บันทึกภาษาอังกฤษ',
      thVersion: 'บันทึกภาษาไทย',
      bothRequired: 'กรุณาบันทึกทั้งสองภาษาเพื่อดำเนินการต่อ',
      completed: 'บันทึกเสร็จสมบูรณ์',
      notRecordedYet: 'ยังไม่ได้บันทึก',
      micPermission: 'กรุณาอนุญาตการใช้งานไมโครโฟน',
      timeRemaining: 'เวลาที่เหลือ',
      cancel: 'ยกเลิก',
      retry: 'ลองใหม่',
      audioError: 'เกิดข้อผิดพลาดในการเล่นเสียง',
      processingMessage: 'กำลังประมวลผลการบันทึกของคุณ...',
      readyMessage: 'พร้อมสำหรับการบันทึก',
      uploadProgress: 'ความคืบหน้าการอัปโหลด',
      qualityCheck: 'กำลังตรวจสอบคุณภาพการบันทึก...',
      networkError: 'เกิดข้อผิดพลาดในการเชื่อมต่อเครือข่าย',
      saveSuccess: 'บันทึกการบันทึกเสียงสำเร็จ',
      saveFailed: 'ไม่สามารถบันทึกการบันทึกเสียง',
      confirmRerecord: 'คุณแน่ใจหรือไม่ที่จะบันทึกใหม่? การบันทึกก่อนหน้าจะถูกลบ',
      yes: 'ใช่',
      no: 'ไม่',
    },
  },
};

// Simple hook for translations
export function useTranslation(page: string, initialLanguage: Language = 'en') {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const t = useMemo(() => translations[page][language], [page, language]);
  return { t, language, setLanguage };
}