import { useState, useMemo } from 'react';

export type Language = 'en' | 'th';

// Translation data organized by page
const translations = {
  home: {
    en: {
      title: 'Voice Data Collection Project',
      subtitle: 'Help us develop AI voice translation that preserves speaker identity',
      startButton: 'Start Recording',
      selectLanguage: 'Select Language',
      overview: {
        title: 'Project Overview',
        description:
          "We are building an advanced AI model that can translate speech between Thai and English while maintaining the speaker's original voice characteristics. Your voice recordings will help create more natural and personalized voice translations.",
        points: [
          'Innovative AI translation preserving your voice identity',
          'Contributes to bilingual voice-to-voice translation technology',
          'Helps create more natural-sounding translations',
          'Expected duration: 10-15 minutes',
        ],
      },
      process: {
        title: 'Recording Guide',
        points: [
          'Read and record each passage in English',
          'Record the same passage in Thai',
          'Speak clearly at a natural pace',
          'Record in a quiet environment',
          'Keep consistent distance from microphone',
          'You can take breaks between passages',
          'Review and re-record if needed',
          'Complete all 15 passages',
        ],
      },
      requirements: {
        title: 'Technical Requirements',
        points: [
          'Working microphone',
          'Quiet environment',
          'Stable internet connection',
          'Latest version of Chrome/Firefox/Safari',
        ],
      },
      policy: {
        title: 'Data Policy',
        points: [
          'Your voice data will be used to train AI translation models',
          'Data is stored securely and anonymously',
          'No personal information is collected',
          'You can request data deletion',
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
          'เรากำลังพัฒนาโมเดล AI ขั้นสูงที่สามารถแปลเสียงระหว่างภาษาไทยและอังกฤษ โดยรักษาลักษณะเสียงเดิมของผู้พูด การบันทึกเสียงของคุณจะช่วยสร้างการแปลเสียงที่เป็นธรรมชาติและเป็นส่วนตัวมากขึ้น',
        points: [
          'นวัตกรรม AI แปลเสียงที่รักษาเอกลักษณ์เสียงของคุณ',
          'มีส่วนร่วมในการพัฒนาเทคโนโลยีแปลเสียงสองภาษา',
          'ช่วยสร้างการแปลที่ฟังเป็นธรรมชาติมากขึ้น',
          'ใช้เวลาประมาณ 10-15 นาที',
        ],
      },
      process: {
        title: 'คำแนะนำการบันทึก',
        points: [
          'อ่านและบันทึกแต่ละบทความเป็นภาษาอังกฤษ',
          'บันทึกบทความเดียวกันเป็นภาษาไทย',
          'พูดให้ชัดเจนในจังหวะธรรมชาติ',
          'บันทึกในสภาพแวดล้อมที่เงียบ',
          'รักษาระยะห่างจากไมโครโฟนให้คงที่',
          'สามารถพักระหว่างบทความได้',
          'ตรวจสอบและบันทึกใหม่ได้หากต้องการ',
          'ทำให้ครบทั้ง 15 บทความ',
        ],
      },
      requirements: {
        title: 'ข้อกำหนดทางเทคนิค',
        points: [
          'ไมโครโฟนที่ใช้งานได้',
          'สภาพแวดล้อมที่เงียบ',
          'การเชื่อมต่ออินเทอร์เน็ตที่เสถียร',
          'เบราว์เซอร์ Chrome/Firefox/Safari เวอร์ชันล่าสุด',
        ],
      },
      policy: {
        title: 'นโยบายข้อมูล',
        points: [
          'ข้อมูลเสียงของคุณจะถูกใช้ในการฝึกโมเดล AI แปลเสียง',
          'ข้อมูลถูกเก็บอย่างปลอดภัยและไม่ระบุตัวตน',
          'ไม่มีการเก็บข้อมูลส่วนบุคคล',
          'คุณสามารถขอลบข้อมูลได้',
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

// A simple function to get translations by page and language
function getTranslation(page: string, language: Language) {
  return translations[page][language];
}

// Simple hook for translations
export function useTranslation(page: string, initialLanguage: Language = 'en') {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  const t = useMemo(() => getTranslation(page, language), [page, language]);

  return {
    t,
    language,
    setLanguage,
  };
}