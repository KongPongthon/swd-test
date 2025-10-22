import i18next from 'i18next';
import en from './en';
import th from './th';

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
    en: { translation: en },
    th: { translation: th },
  },
  interpolation: { escapeValue: false },
});

i18next.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lang', lng);
  }
});

export default i18next;
