'use client';
import { Button, Select } from 'antd';
import styles from './page.module.css';
import i18next from '@/lib/i18n';
import { useI18n } from '@/hook/usei18n';
import { useState } from 'react';
import ShapeBoard from '../components/test1/ShapeBoard';

export default function Home() {
  const { lang, changeLanguage } = useI18n();
  const [step, setStep] = useState<'home' | 'test1' | 'test2'>('home');

  const handleChange = (value: string) => {
    i18next.changeLanguage(value);
    changeLanguage(value);
  };

  const onClick = (step: 'home' | 'test1' | 'test2') => setStep(step);

  const data = i18next.t('data', { returnObjects: true }) as {
    name: string;
    des: string;
    path: 'home' | 'test1' | 'test2';
  }[];

  if (!lang) {
    return <div>Loading...</div>;
  }
  console.log('step', step);

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <div>
          {step === 'home' && <></>}
          {step === 'test1' && (
            <div>
              <h1>Layout & style</h1>
              <Button onClick={() => onClick('home')}>← กลับ</Button>
            </div>
          )}
          {step === 'test2' && (
            <div>
              <h1>Form & Table</h1>
              <Button onClick={() => onClick('home')}>← กลับ</Button>
            </div>
          )}
        </div>
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
        {step === 'home' ? (
          <>
            {data.map((item, index) => (
              <Button
                onClick={() => onClick(item.path)}
                key={index}
                className={styles.boderItem}
              >
                <>
                  {item.name}
                  <p>{item.des}</p>
                </>
              </Button>
            ))}
          </>
        ) : step === 'test1' ? (
          <div>
            <ShapeBoard />
          </div>
        ) : (
          <div>Test 2</div>
        )}
      </div>
    </div>
  );
}
