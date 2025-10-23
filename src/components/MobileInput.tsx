'use client';
import { Input, Select } from 'antd';
import { updateField } from '../store/formSlice';
import React, { useState } from 'react';
import styles from './test2/Form.module.css';
import i18next from 'i18next';
import { useDispatch } from 'react-redux';

const MobileInput = () => {
  const dispatch = useDispatch();
  const [mobilePrefix, setMobilePrefix] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  // handler เมื่อเปลี่ยนค่า
  const handleMobileChange = () => {
    const fullMobile = `${mobilePrefix}${mobileNumber}`;
    dispatch(updateField({ key: 'mobile', value: fullMobile }));
  };

  return (
    <div>
      <div className={styles['label']}>
        <Select
          placeholder='Title'
          style={{ width: 100 }}
          options={[
            { label: '+66', value: '+66' },
            { label: '+1', value: '+1' },
          ]}
          onChange={(value) => {
            setMobilePrefix(value);
            handleMobileChange();
          }}
        />
      </div>

      <div className={styles['label']}>-</div>

      <div className={styles['label']}>
        <Input
          maxLength={8}
          style={{ width: 200 }}
          placeholder='Enter number'
          onChange={(e) => {
            setMobileNumber(e.target.value);
            handleMobileChange();
          }}
        />
      </div>
    </div>
  );
};

export default MobileInput;
