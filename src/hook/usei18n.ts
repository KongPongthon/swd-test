'use client';
import { useEffect, useState } from 'react';
import i18next from '@/lib/i18n';

export function useI18n() {
  const [lang, setLang] = useState(i18next.language);

  // อัปเดต state ทันทีเมื่อมีการเปลี่ยนภาษา
  useEffect(() => {
    const handler = (lng: string) => setLang(lng);
    i18next.on('languageChanged', handler);

    return () => {
      i18next.off('languageChanged', handler);
    };
  }, []);

  // ฟังก์ชันเปลี่ยนภาษา
  const changeLanguage = (lng: string) => {
    i18next.changeLanguage(lng);
  };

  // ฟังก์ชันแปลข้อความ
  const t = (key: string) => i18next.t(key);

  return { t, lang, changeLanguage };
}
