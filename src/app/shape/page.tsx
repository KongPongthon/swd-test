'use client';
import { Button, Select } from 'antd';
import styles from '@/app/page.module.css';
import i18next from '@/lib/i18n';
import { useI18n } from '@/hook/usei18n';
import { resetForm } from '@/store/formSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import ShapeBoard from '@/components/test1/ShapeBoard';

const Shape = () => {
  const { lang, changeLanguage } = useI18n();
  const dispatch = useDispatch();
  const handleChange = (value: string) => {
    i18next.changeLanguage(value);
    changeLanguage(value);
  };
  const router = useRouter();

  const onClick = (step: 'home' | 'test1' | 'test2') => {
    // console.log(step);

    if (step === 'home') {
      dispatch(resetForm());
      router.push('/');
      // return;
    }
    if (step === 'test1') {
      router.push('/shape');
    }
    if (step === 'test2') {
      router.push('/form');
    }
  };

  if (!lang) {
    return <div>Loading...</div>;
  }
  // console.log('step', step);

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <div>
          <div>
            <h1>{i18next.t('title1')}</h1>
          </div>
        </div>
        <div className={styles.lang}>
          <Select
            defaultValue={lang}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'th', label: 'TH' },
              { value: 'en', label: 'EN' },
            ]}
          />
          <Button onClick={() => onClick('home')} className={styles.buttonhome}>
            {i18next.t('home')}
          </Button>
        </div>
      </div>
      <ShapeBoard />
    </div>
  );
};

export default Shape;
