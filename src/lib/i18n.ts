import i18next from 'i18next';

let initialLang;

const saved = localStorage.getItem('lang');
if (saved) {
  initialLang = saved;
} else {
  initialLang = 'en';
  localStorage.setItem('lang', 'en');
}

i18next.init({
  lng: initialLang,
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        data: [
          { name: 'Test 1', des: 'Frontend React', path: 'test1' },
          {
            name: 'Test 2',
            des: 'Build SPA with Ant Design',
            path: 'test2',
          },
        ],
        back: 'Back',
        title1: 'Layout & style',
        title2: 'Form & Table',
      },
    },
    th: {
      translation: {
        data: [
          { name: 'แบบทดสอบ 1', des: 'Frontend React', path: 'test1' },
          {
            name: 'แบบทดสอบ 2',
            des: 'สร้าง SPA ด้วย Ant Design',
            path: 'test2',
          },
        ],
        back: 'ย้อนกลับ',
        title1: 'การจัดการหน้าเว็บ',
        title2: 'การจัดการหน้าฟอร์ม',
      },
    },
  },
});

i18next.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lang', lng);
  }
});

export default i18next;
