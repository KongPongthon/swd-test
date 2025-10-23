'use client';
import { useEffect, useState } from 'react';
import i18next from '@/lib/i18n';

export function useI18n() {
  const [lang, setLang] = useState(i18next.language);
  useEffect(() => {
    const handler = (lng: string) => setLang(lng);
    i18next.on('languageChanged', handler);

    return () => {
      i18next.off('languageChanged', handler);
    };
  }, []);
  const changeLanguage = (lng: string) => {
    i18next.changeLanguage(lng);
  };
  const t = (key: string) => i18next.t(key);

  return { t, lang, changeLanguage };
}
