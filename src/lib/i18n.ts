import i18next from 'i18next';

let initialLang = 'en';
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('lang');
  if (saved) initialLang = saved;
}

i18next.init({
  lng: initialLang,
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        data: [
          { name: 'Test 1', des: 'Frontend React' },
          { name: 'Test 2', des: 'Build SPA with Ant Design' },
        ],
      },
    },
    th: {
      translation: {
        data: [
          { name: 'แบบทดสอบ 1', des: 'Frontend React' },
          { name: 'แบบทดสอบ 2', des: 'สร้าง SPA ด้วย Ant Design' },
        ],
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
