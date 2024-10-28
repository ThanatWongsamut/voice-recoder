import { useMemo } from 'react';

export interface Passage {
  id: number;
  en: string;
  th: string;
}

// About 1-minute reading passages (approximately 130-150 words each)
const allPassages: Passage[] = [
  {
    id: 1,
    en: `In today's rapidly evolving digital landscape, artificial intelligence has become an integral part of our daily lives. From virtual assistants that help us schedule appointments to smart home devices that automate our routines, AI technology continues to reshape how we interact with the world around us. Despite its widespread adoption, many people still have concerns about privacy and ethical implications. It's crucial to strike a balance between technological advancement and maintaining human values, ensuring that AI serves as a tool for enhancement rather than replacement. As we move forward, the focus should be on developing AI systems that are transparent, accountable, and designed with human well-being in mind.`,
    th: `ในภูมิทัศน์ดิจิทัลที่เปลี่ยนแปลงอย่างรวดเร็วในปัจจุบัน ปัญญาประดิษฐ์ได้กลายเป็นส่วนสำคัญของชีวิตประจำวันของเรา ตั้งแต่ผู้ช่วยเสมือนที่ช่วยจัดตารางนัดหมาย ไปจนถึงอุปกรณ์บ้านอัจฉริยะที่ทำให้กิจวัตรประจำวันของเราเป็นอัตโนมัติ เทคโนโลยี AI ยังคงปรับเปลี่ยนวิธีที่เราโต้ตอบกับโลกรอบตัว แม้จะมีการนำมาใช้อย่างแพร่หลาย แต่หลายคนยังกังวลเกี่ยวกับความเป็นส่วนตัวและผลกระทบทางจริยธรรม สิ่งสำคัญคือต้องสร้างสมดุลระหว่างความก้าวหน้าทางเทคโนโลยีและการรักษาคุณค่าความเป็นมนุษย์ เพื่อให้แน่ใจว่า AI เป็นเครื่องมือสำหรับการเพิ่มประสิทธิภาพมากกว่าการทดแทน`,
  },
  {
    id: 2,
    en: `Climate change remains one of the most pressing challenges facing our planet. Rising global temperatures have led to more frequent extreme weather events, from devastating hurricanes to prolonged droughts. The impact on ecosystems is profound, with many species facing extinction and entire habitats being destroyed. While individual actions like reducing carbon footprints matter, systemic change through policy reform and industrial transformation is crucial. Scientists emphasize that we have a narrow window of opportunity to prevent the worst effects of climate change. This requires international cooperation, innovative green technologies, and a fundamental shift in how we think about consumption and economic growth.`,
    th: `การเปลี่ยนแปลงสภาพภูมิอากาศยังคงเป็นหนึ่งในความท้าทายที่สำคัญที่สุดที่โลกของเรากำลังเผชิญ อุณหภูมิโลกที่สูงขึ้นนำไปสู่สภาพอากาศรุนแรงที่เกิดขึ้นบ่อยครั้งขึ้น ตั้งแต่พายุเฮอริเคนที่สร้างความเสียหายไปจนถึงภัยแล้งที่ยาวนาน ผลกระทบต่อระบบนิเวศนั้นรุนแรง โดยสิ่งมีชีวิตหลายสายพันธุ์กำลังเผชิญกับการสูญพันธุ์และที่อยู่อาศัยทั้งหมดถูกทำลาย แม้ว่าการกระทำของแต่ละบุคคล เช่น การลดรอยเท้าคาร์บอนจะมีความสำคัญ แต่การเปลี่ยนแปลงระบบผ่านการปฏิรูปนโยบายและการเปลี่ยนแปลงอุตสาหกรรมเป็นสิ่งสำคัญ`,
  },
  {
    id: 3,
    en: `The human brain is perhaps the most complex structure in the known universe. With approximately 86 billion neurons forming trillions of connections, it controls everything from basic bodily functions to complex emotional responses and abstract thinking. Recent advances in neuroscience have revealed fascinating insights into how memories are formed, decisions are made, and consciousness emerges. Understanding the brain's incredible plasticity – its ability to rewire and adapt – has revolutionary implications for education, mental health treatment, and cognitive enhancement. However, many mysteries remain unsolved, and researchers continue to discover new aspects of brain function that challenge our existing theories about human consciousness and cognition.`,
    th: `สมองของมนุษย์อาจเป็นโครงสร้างที่ซับซ้อนที่สุดในจักรวาลที่เรารู้จัก ด้วยเซลล์ประสาทประมาณ 86 พันล้านเซลล์ที่สร้างการเชื่อมต่อนับล้านล้าน มันควบคุมทุกอย่างตั้งแต่การทำงานพื้นฐานของร่างกายไปจนถึงการตอบสนองทางอารมณ์ที่ซับซ้อนและความคิดเชิงนามธรรม ความก้าวหน้าล่าสุดในประสาทวิทยาได้เผยให้เห็นข้อมูลเชิงลึกที่น่าสนใจเกี่ยวกับวิธีการสร้างความทรงจำ การตัดสินใจ และการเกิดจิตสำนึก ความเข้าใจเกี่ยวกับความยืดหยุ่นที่น่าทึ่งของสมอง`,
  },
  // Add more passages here...
  {
    id: 28,
    en: `The art of storytelling has been an essential part of human culture since the dawn of civilization. Through narratives, we share experiences, preserve history, and make sense of the world around us. In modern times, storytelling has evolved beyond traditional oral traditions to encompass various media formats, from books and films to virtual reality experiences. Despite these technological advances, the fundamental elements of a compelling story remain unchanged: strong characters, meaningful conflict, and emotional resonance. Understanding these principles helps us create more engaging content and connect with audiences on a deeper level.`,
    th: `ศิลปะการเล่าเรื่องเป็นส่วนสำคัญของวัฒนธรรมมนุษย์มาตั้งแต่จุดเริ่มต้นของอารยธรรม ผ่านการเล่าเรื่อง เราแบ่งปันประสบการณ์ รักษาประวัติศาสตร์ และทำความเข้าใจโลกรอบตัวเรา ในยุคสมัยใหม่ การเล่าเรื่องได้พัฒนาไปไกลกว่าประเพณีการเล่าด้วยปากเปล่าแบบดั้งเดิม ครอบคลุมรูปแบบสื่อต่างๆ ตั้งแต่หนังสือและภาพยนตร์ไปจนถึงประสบการณ์ความเป็นจริงเสมือน แม้จะมีความก้าวหน้าทางเทคโนโลยีเหล่านี้ แต่องค์ประกอบพื้นฐานของเรื่องราวที่น่าสนใจยังคงไม่เปลี่ยนแปลง`,
  },
  {
    id: 29,
    en: `The concept of sustainable living has gained significant attention in recent years as we face increasing environmental challenges. It involves making conscious choices about our consumption patterns, energy usage, and waste management to minimize our impact on the planet. This lifestyle shift encompasses everything from choosing renewable energy sources and reducing single-use plastics to supporting local food systems and practicing mindful consumption. While the transition to sustainable living may seem daunting, small changes in daily habits can collectively make a substantial difference in preserving our environment for future generations.`,
    th: `แนวคิดเรื่องการใช้ชีวิตอย่างยั่งยืนได้รับความสนใจอย่างมากในช่วงไม่กี่ปีที่ผ่านมา เมื่อเราเผชิญกับความท้าทายด้านสิ่งแวดล้อมที่เพิ่มขึ้น เกี่ยวข้องกับการเลือกอย่างมีสติเกี่ยวกับรูปแบบการบริโภค การใช้พลังงาน และการจัดการของเสียเพื่อลดผลกระทบต่อโลก การเปลี่ยนแปลงวิถีชีวิตนี้ครอบคลุมทุกอย่างตั้งแต่การเลือกแหล่งพลังงานหมุนเวียนและลดการใช้พลาสติกแบบใช้ครั้งเดียว ไปจนถึงการสนับสนุนระบบอาหารท้องถิ่นและการบริโภคอย่างมีสติ`,
  },
  {
    id: 30,
    en: `The rapid advancement of space exploration technology has opened up new possibilities for human civilization. Private companies now compete alongside government agencies in the race to develop more efficient rockets, sustainable space habitats, and innovative solutions for long-distance space travel. The potential for mining asteroids, establishing lunar bases, and eventually colonizing Mars has moved from science fiction to serious scientific endeavor. These developments not only push the boundaries of human achievement but also promise technological breakthroughs that could benefit life on Earth, from new materials and energy solutions to improved communication systems.`,
    th: `ความก้าวหน้าอย่างรวดเร็วของเทคโนโลยีการสำรวจอวกาศได้เปิดโอกาสใหม่ๆ สำหรับอารยธรรมมนุษย์ บริษัทเอกชนแข่งขันกับหน่วยงานของรัฐในการแข่งขันเพื่อพัฒนาจรวดที่มีประสิทธิภาพมากขึ้น ที่อยู่อาศัยในอวกาศที่ยั่งยืน และโซลูชั่นนวัตกรรมสำหรับการเดินทางในอวกาศระยะไกล ศักยภาพในการทำเหมืองดาวเคราะห์น้อย การสร้างฐานบนดวงจันทร์ และในที่สุดการตั้งถิ่นฐานบนดาวอังคารได้เปลี่ยนจากนิยายวิทยาศาสตร์เป็นความพยายามทางวิทยาศาสตร์ที่จริงจัง`,
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function usePassages() {
  // Using useMemo to ensure we don't regenerate on every render
  const selectedPassages = useMemo(() => {
    const shuffled = shuffleArray(allPassages);
    return shuffled.slice(0, 15);
  }, []); // Empty dependency array means this only runs once when component mounts

  return selectedPassages;
}
