import { useMemo } from 'react';

export interface Passage {
  id: number;
  en: string;
  th: string;
}

// About 30-second reading passages (approximately 65-75 words each)
const allPassages: Passage[] = [
  {
    id: 1,
    en: `Artificial intelligence is increasingly present in our daily routines. From voice assistants to recommendation algorithms, AI shapes how we interact with technology. While it offers convenience, concerns about privacy and ethical use remain important.`,
    th: `ปัญญาประดิษฐ์มีบทบาทมากขึ้นในกิจวัตรประจำวันของเรา ตั้งแต่ผู้ช่วยเสียงไปจนถึงอัลกอริทึมการแนะนำ AI กำหนดวิธีที่เราโต้ตอบกับเทคโนโลยี แม้ว่ามันจะมอบความสะดวกสบาย แต่ความกังวลเกี่ยวกับความเป็นส่วนตัวและการใช้อย่างมีจริยธรรมยังคงมีความสำคัญ`,
  },
  {
    id: 2,
    en: `Climate change poses significant challenges worldwide. Rising temperatures lead to extreme weather events affecting ecosystems and human societies. Collective efforts are needed to mitigate these impacts and adapt to new environmental realities.`,
    th: `การเปลี่ยนแปลงสภาพภูมิอากาศเป็นความท้าทายที่สำคัญทั่วโลก อุณหภูมิที่สูงขึ้นนำไปสู่เหตุการณ์สภาพอากาศสุดขั้วที่ส่งผลกระทบต่อระบบนิเวศและสังคมมนุษย์ จำเป็นต้องมีความพยายามร่วมกันเพื่อลดผลกระทบเหล่านี้และปรับตัวให้เข้ากับความเป็นจริงทางสิ่งแวดล้อมใหม่`,
  },
  {
    id: 3,
    en: `Regular exercise is essential for maintaining good health. Physical activity strengthens the heart, improves circulation, and reduces stress levels. Even moderate exercise like walking can have significant health benefits over time.`,
    th: `การออกกำลังกายเป็นประจำเป็นสิ่งจำเป็นสำหรับการรักษาสุขภาพที่ดี กิจกรรมทางกายช่วยเสริมสร้างหัวใจ ปรับปรุงการไหลเวียน และลดระดับความเครียด แม้แต่การออกกำลังกายปานกลางอย่างการเดินก็มีประโยชน์ต่อสุขภาพอย่างมากเมื่อเวลาผ่านไป`,
  },
  {
    id: 4,
    en: `Eating a balanced diet is crucial for overall well-being. Incorporating a variety of fruits, vegetables, whole grains, and lean proteins can provide essential nutrients. Healthy eating habits contribute to better energy levels and disease prevention.`,
    th: `การรับประทานอาหารที่สมดุลเป็นสิ่งสำคัญสำหรับความเป็นอยู่ที่ดีโดยรวม การรวมผลไม้ ผัก ธัญพืชเต็มเมล็ด และโปรตีนไร้ไขมันชนิดต่างๆ สามารถให้สารอาหารที่จำเป็น นิสัยการกินที่ดีต่อสุขภาพช่วยเพิ่มระดับพลังงานและป้องกันโรค`,
  },
  {
    id: 5,
    en: `Time management skills help improve productivity. Prioritizing tasks and setting realistic goals can reduce stress and enhance efficiency. Effective time management allows for a better work-life balance.`,
    th: `ทักษะการจัดการเวลาช่วยปรับปรุงประสิทธิภาพ การจัดลำดับความสำคัญของงานและการตั้งเป้าหมายที่เป็นจริงสามารถลดความเครียดและเพิ่มประสิทธิภาพ การจัดการเวลาที่มีประสิทธิภาพช่วยให้เกิดสมดุลระหว่างชีวิตและการทำงานที่ดีขึ้น`,
  },
  {
    id: 6,
    en: `Technology continues to revolutionize education. Online learning platforms provide access to resources worldwide, enabling flexible and personalized education. This shift has expanded opportunities for lifelong learning.`,
    th: `เทคโนโลยียังคงปฏิวัติการศึกษา แพลตฟอร์มการเรียนรู้ออนไลน์ให้การเข้าถึงแหล่งข้อมูลทั่วโลก ทำให้เกิดการศึกษาที่ยืดหยุ่นและปรับแต่งได้ การเปลี่ยนแปลงนี้ได้ขยายโอกาสสำหรับการเรียนรู้ตลอดชีวิต`,
  },
  {
    id: 7,
    en: `Cultural diversity enriches societies by introducing new perspectives and ideas. Embracing different cultures promotes understanding and cooperation among communities. Diversity fosters innovation and creativity.`,
    th: `ความหลากหลายทางวัฒนธรรมเพิ่มพูนสังคมด้วยการแนะนำมุมมองและความคิดใหม่ๆ การยอมรับวัฒนธรรมที่แตกต่างส่งเสริมความเข้าใจและความร่วมมือระหว่างชุมชน ความหลากหลายส่งเสริมการสร้างสรรค์นวัตกรรมและความคิดสร้างสรรค์`,
  },
  {
    id: 8,
    en: `Sleep is vital for health and well-being. Adequate rest helps with memory consolidation and physical recovery. Poor sleep can lead to decreased cognitive function and increased risk of health issues.`,
    th: `การนอนหลับมีความสำคัญต่อสุขภาพและความเป็นอยู่ที่ดี การพักผ่อนอย่างเพียงพอช่วยในการรวมความจำและการฟื้นตัวทางร่างกาย การนอนหลับที่ไม่ดีสามารถนำไปสู่การทำงานของการรับรู้ที่ลดลงและความเสี่ยงที่เพิ่มขึ้นของปัญหาสุขภาพ`,
  },
  {
    id: 9,
    en: `Art and music play significant roles in human expression. They offer ways to convey emotions and ideas beyond words. Engaging with the arts can enhance empathy and cultural awareness.`,
    th: `ศิลปะและดนตรีมีบทบาทสำคัญในการแสดงออกของมนุษย์ พวกเขาเสนอวิธีการสื่อสารอารมณ์และความคิดที่เกินคำพูด การมีส่วนร่วมกับศิลปะสามารถเพิ่มความเห็นอกเห็นใจและความตระหนักทางวัฒนธรรม`,
  },
  {
    id: 10,
    en: `Financial literacy is essential in today's world. Understanding budgeting, saving, and investing helps individuals make informed decisions. Financial education contributes to personal stability and economic growth.`,
    th: `ความรู้ทางการเงินเป็นสิ่งจำเป็นในโลกปัจจุบัน การเข้าใจการจัดทำงบประมาณ การออม และการลงทุนช่วยให้บุคคลตัดสินใจได้อย่างรอบรู้ การศึกษาทางการเงินช่วยให้เกิดความมั่นคงส่วนบุคคลและการเติบโตทางเศรษฐกิจ`,
  },
  {
    id: 11,
    en: `Communication skills are key to personal and professional success. Active listening and clear expression facilitate better relationships. Improving communication can lead to more effective teamwork and problem-solving.`,
    th: `ทักษะการสื่อสารเป็นกุญแจสู่ความสำเร็จส่วนบุคคลและอาชีพ การฟังอย่างกระตือรือร้นและการแสดงออกที่ชัดเจนช่วยอำนวยความสะดวกในความสัมพันธ์ที่ดีขึ้น การปรับปรุงการสื่อสารสามารถนำไปสู่การทำงานเป็นทีมและการแก้ปัญหาที่มีประสิทธิภาพมากขึ้น`,
  },
  {
    id: 12,
    en: `Mindfulness practices can reduce stress and improve mental health. Techniques like meditation and deep breathing promote relaxation. Incorporating mindfulness into daily life enhances overall well-being.`,
    th: `การฝึกสติสามารถลดความเครียดและปรับปรุงสุขภาพจิต เทคนิคเช่นการทำสมาธิและการหายใจลึกๆ ส่งเสริมการผ่อนคลาย การรวมสติเข้ากับชีวิตประจำวันช่วยเพิ่มความเป็นอยู่ที่ดีโดยรวม`,
  },
  {
    id: 13,
    en: `Renewable energy sources are vital for a sustainable future. Technologies like solar and wind power reduce dependence on fossil fuels. Transitioning to clean energy can mitigate environmental impacts.`,
    th: `แหล่งพลังงานหมุนเวียนมีความสำคัญต่ออนาคตที่ยั่งยืน เทคโนโลยีเช่นพลังงานแสงอาทิตย์และพลังงานลมลดการพึ่งพาเชื้อเพลิงฟอสซิล การเปลี่ยนไปสู่พลังงานสะอาดสามารถบรรเทาผลกระทบต่อสิ่งแวดล้อม`,
  },
  {
    id: 14,
    en: `Volunteer work benefits both communities and individuals. Engaging in service fosters empathy and social responsibility. Volunteering provides opportunities to develop skills and make meaningful contributions.`,
    th: `งานอาสาสมัครเป็นประโยชน์ต่อทั้งชุมชนและบุคคล การมีส่วนร่วมในการบริการส่งเสริมความเห็นอกเห็นใจและความรับผิดชอบต่อสังคม การเป็นอาสาสมัครให้โอกาสในการพัฒนาทักษะและมีส่วนร่วมที่มีความหมาย`,
  },
  {
    id: 15,
    en: `Digital security is increasingly important in the modern world. Protecting personal information online helps prevent identity theft and fraud. Using strong passwords and being cautious with data sharing are essential practices.`,
    th: `ความปลอดภัยทางดิจิทัลมีความสำคัญมากขึ้นในโลกสมัยใหม่ การปกป้องข้อมูลส่วนบุคคลออนไลน์ช่วยป้องกันการขโมยข้อมูลประจำตัวและการฉ้อโกง การใช้รหัสผ่านที่แข็งแกร่งและระมัดระวังในการแบ่งปันข้อมูลเป็นการปฏิบัติที่จำเป็น`,
  },
  {
    id: 16,
    en: `Sustainable agriculture supports environmental health. Practices like crop rotation and organic farming reduce soil degradation. Sustainable methods contribute to long-term food security.`,
    th: `การเกษตรที่ยั่งยืนสนับสนุนสุขภาพสิ่งแวดล้อม การปฏิบัติเช่นการหมุนเวียนพืชผลและการเกษตรอินทรีย์ลดการเสื่อมสภาพของดิน วิธีการที่ยั่งยืนช่วยให้มั่นคงด้านอาหารในระยะยาว`,
  },
  {
    id: 17,
    en: `Language learning opens doors to new cultures and opportunities. Bilingualism enhances cognitive abilities and communication skills. Learning a new language can be both challenging and rewarding.`,
    th: `การเรียนรู้ภาษาช่วยเปิดประตูสู่วัฒนธรรมและโอกาสใหม่ๆ การพูดสองภาษาเพิ่มความสามารถในการรับรู้และทักษะการสื่อสาร การเรียนรู้ภาษาใหม่สามารถทั้งท้าทายและให้รางวัล`,
  },
  {
    id: 18,
    en: `Critical thinking skills enable better decision-making. Analyzing information objectively helps in evaluating arguments and evidence. Developing critical thinking promotes independence and problem-solving abilities.`,
    th: `ทักษะการคิดเชิงวิพากษ์ช่วยให้ตัดสินใจได้ดีขึ้น การวิเคราะห์ข้อมูลอย่างเป็นกลางช่วยในการประเมินข้อโต้แย้งและหลักฐาน การพัฒนาการคิดเชิงวิพากษ์ส่งเสริมความเป็นอิสระและความสามารถในการแก้ปัญหา`,
  },
  {
    id: 19,
    en: `Globalization has interconnected economies and cultures. It offers opportunities for trade and cultural exchange but also poses challenges like economic disparities. Understanding globalization is key to navigating today's world.`,
    th: `โลกาภิวัตน์ได้เชื่อมโยงเศรษฐกิจและวัฒนธรรมเข้าด้วยกัน มันมอบโอกาสสำหรับการค้าและการแลกเปลี่ยนวัฒนธรรม แต่ยังสร้างความท้าทายเช่นความเหลื่อมล้ำทางเศรษฐกิจ ความเข้าใจโลกาภิวัตน์เป็นกุญแจสำคัญในการนำทางโลกปัจจุบัน`,
  },
  {
    id: 20,
    en: `Healthy relationships are built on trust and communication. Respecting boundaries and actively listening contribute to strong connections. Investing time and effort strengthens bonds with others.`,
    th: `ความสัมพันธ์ที่ดีต่อสุขภาพสร้างขึ้นบนความไว้วางใจและการสื่อสาร การเคารพขอบเขตและการฟังอย่างตั้งใจช่วยสร้างความสัมพันธ์ที่แข็งแกร่ง การลงทุนเวลาและความพยายามช่วยเสริมสร้างความสัมพันธ์กับผู้อื่น`,
  },
  {
    id: 21,
    en: `Technological advancements drive innovation across industries. Developments in artificial intelligence and biotechnology are transforming fields like medicine and manufacturing. Staying informed about technology trends is increasingly important.`,
    th: `ความก้าวหน้าทางเทคโนโลยีขับเคลื่อนนวัตกรรมในอุตสาหกรรมต่างๆ การพัฒนาในปัญญาประดิษฐ์และเทคโนโลยีชีวภาพกำลังเปลี่ยนแปลงสาขาเช่นการแพทย์และการผลิต การติดตามข้อมูลเกี่ยวกับแนวโน้มเทคโนโลยีมีความสำคัญมากขึ้น`,
  },
  {
    id: 22,
    en: `Environmental conservation protects natural resources. Efforts like recycling and habitat preservation help sustain biodiversity. Conservation initiatives are crucial for the health of the planet.`,
    th: `การอนุรักษ์สิ่งแวดล้อมปกป้องทรัพยากรธรรมชาติ ความพยายามเช่นการรีไซเคิลและการอนุรักษ์ถิ่นที่อยู่อาศัยช่วยรักษาความหลากหลายทางชีวภาพ โครงการอนุรักษ์มีความสำคัญต่อสุขภาพของโลก`,
  },
  {
    id: 23,
    en: `The importance of mental health awareness is growing. Recognizing and addressing mental health issues leads to better outcomes. Support systems and open conversations reduce stigma.`,
    th: `ความสำคัญของการตระหนักรู้ด้านสุขภาพจิตกำลังเติบโต การรับรู้และจัดการกับปัญหาสุขภาพจิตนำไปสู่ผลลัพธ์ที่ดีขึ้น ระบบสนับสนุนและการสนทนาเปิดเผยช่วยลดการตีตรา`,
  },
  {
    id: 24,
    en: `Leadership skills can be developed through experience and education. Effective leaders inspire others and facilitate collaboration. Leadership involves responsibility, vision, and adaptability.`,
    th: `ทักษะการเป็นผู้นำสามารถพัฒนาได้ผ่านประสบการณ์และการศึกษา ผู้นำที่มีประสิทธิภาพสร้างแรงบันดาลใจให้ผู้อื่นและอำนวยความสะดวกในการทำงานร่วมกัน ความเป็นผู้นำเกี่ยวข้องกับความรับผิดชอบ วิสัยทัศน์ และความสามารถในการปรับตัว`,
  },
  {
    id: 25,
    en: `Historical knowledge provides context for the present. Studying history helps us understand societal developments and avoid past mistakes. History education promotes informed citizenship.`,
    th: `ความรู้ทางประวัติศาสตร์ให้บริบทสำหรับปัจจุบัน การศึกษาประวัติศาสตร์ช่วยให้เราเข้าใจพัฒนาการทางสังคมและหลีกเลี่ยงความผิดพลาดในอดีต การศึกษาประวัติศาสตร์ส่งเสริมความเป็นพลเมืองที่มีข้อมูล`,
  },
  {
    id: 26,
    en: `The internet has transformed how we access information. Online resources provide vast amounts of data but require critical evaluation. Information literacy is essential in navigating digital content.`,
    th: `อินเทอร์เน็ตได้เปลี่ยนวิธีที่เราเข้าถึงข้อมูล ทรัพยากรออนไลน์ให้ข้อมูลจำนวนมากแต่ต้องการการประเมินอย่างวิพากษ์ ความรู้สารสนเทศเป็นสิ่งจำเป็นในการนำทางเนื้อหาดิจิทัล`,
  },
  {
    id: 27,
    en: `Teamwork is fundamental in many professional environments. Collaborative efforts leverage diverse skills and perspectives. Effective teamwork leads to better problem-solving and innovation.`,
    th: `การทำงานเป็นทีมเป็นพื้นฐานในสภาพแวดล้อมการทำงานมืออาชีพหลายแห่ง ความพยายามร่วมกันใช้ประโยชน์จากทักษะและมุมมองที่หลากหลาย การทำงานเป็นทีมที่มีประสิทธิภาพนำไปสู่การแก้ปัญหาและนวัตกรรมที่ดีขึ้น`,
  },
  {
    id: 28,
    en: `Ethical considerations are important in decision-making processes. Evaluating the potential impact on others ensures responsible choices. Ethics guide professional conduct and personal behavior.`,
    th: `การพิจารณาด้านจริยธรรมมีความสำคัญในกระบวนการตัดสินใจ การประเมินผลกระทบที่อาจเกิดขึ้นกับผู้อื่นทำให้มั่นใจได้ว่ามีการเลือกอย่างรับผิดชอบ จริยธรรมเป็นแนวทางในการปฏิบัติงานและพฤติกรรมส่วนบุคคล`,
  },
  {
    id: 29,
    en: `Reading regularly expands knowledge and improves cognitive function. Literature exposes readers to new ideas and cultures. Making time for reading can enhance language skills and creativity.`,
    th: `การอ่านเป็นประจำช่วยขยายความรู้และปรับปรุงการทำงานของการรับรู้ วรรณกรรมเปิดโอกาสให้ผู้อ่านได้รับแนวคิดและวัฒนธรรมใหม่ๆ การหาเวลาสำหรับการอ่านสามารถเพิ่มทักษะทางภาษาและความคิดสร้างสรรค์`,
  },
  {
    id: 30,
    en: `Resilience enables individuals to overcome adversity. Developing coping strategies and a positive mindset helps navigate challenges. Resilience is built over time through experiences and personal growth.`,
    th: `ความยืดหยุ่นช่วยให้บุคคลเอาชนะความทุกข์ยาก การพัฒนากลยุทธ์การเผชิญปัญหาและทัศนคติเชิงบวกช่วยนำทางความท้าทาย ความยืดหยุ่นถูกสร้างขึ้นเมื่อเวลาผ่านไปผ่านประสบการณ์และการเติบโตส่วนบุคคล`,
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
