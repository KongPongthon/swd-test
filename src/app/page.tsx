'use client';
import { useState } from 'react';
import { Button, Select } from 'antd';
import styles from './page.module.css';
import i18next from '@/lib/i18n';
import { useI18n } from '@/hook/usei18n';

export default function Home() {
  const { lang, changeLanguage } = useI18n();

  const handleChange = (value: string) => {
    i18next.changeLanguage(value);
    changeLanguage(value);
  };

  const data = i18next.t('data', { returnObjects: true }) as {
    name: string;
    des: string;
  }[];

  if (!lang) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <Select
          defaultValue={lang}
          style={{ width: 70 }}
          onChange={handleChange}
          options={[
            { value: 'th', label: 'TH' },
            { value: 'en', label: 'EN' },
          ]}
        />
      </div>
      <div className={styles.subMain}>
        {data.map((item, index) => (
          <Button key={index} className={styles.boderItem}>
            <>
              {item.name}
              <p>{item.des}</p>
            </>
          </Button>
        ))}
      </div>
    </div>
  );
}
