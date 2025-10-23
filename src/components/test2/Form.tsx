'use client';
import { Button, DatePicker, Input, Radio, Select } from 'antd';
import styles from './Form.module.css';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormState, resetForm, updateField } from '@/store/formSlice';
import type { RootState } from '@/store/store';
const citizenLengths = [1, 4, 5, 2, 1];
import moment from 'moment';
import React, { useState } from 'react';
import { addUser, updateUser } from '@/store/userListSlice';
const Form = () => {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.form);
  const [mobilePrefix, setMobilePrefix] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = () => {
    const newForm: FormState = {
      ...form,
      id: form.id || Math.random().toString(36).substr(2, 9),
    };

    if (form.id) {
      dispatch(updateUser(newForm));
    } else {
      dispatch(addUser(newForm));
    }

    dispatch(resetForm());
    setMobilePrefix('');
    setMobileNumber('');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateField({ key: name as keyof FormState, value }));
  };

  const citizen = form.citizen || '';
  const parts: string[] = [];
  let start = 0;
  for (let len of citizenLengths) {
    parts.push(citizen.substr(start, len));
    start += len;
  }

  const handleChange = (index: number, value: string) => {
    if (value.length > citizenLengths[index]) return;
    const newParts = [...parts];
    newParts[index] = value;
    dispatch(updateField({ key: 'citizen', value: newParts.join('') }));
  };

  const handleMobileChange = () => {
    dispatch(
      updateField({ key: 'mobile', value: `${mobilePrefix}${mobileNumber}` })
    );
  };
  return (
    <>
      <div className={styles['form']}>
        <div className={styles['sub-box']}>
          <div>
            <div className={styles['group-text']}>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('title')}:
                <Select
                  value={form.title}
                  onChange={(value) =>
                    dispatch(updateField({ key: 'title', value }))
                  }
                  options={Object.entries(
                    i18next.t('titles', { returnObjects: true })
                  ).map(([value, label]) => ({ value, label }))}
                  style={{ width: 150 }}
                />
              </div>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('firstname')}:
                <Input
                  name='firstname'
                  value={form.firstname}
                  onChange={onChange}
                  placeholder='First name'
                  style={{ width: 200 }}
                />
              </div>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('lastname')}:
                <Input
                  name='lastname'
                  value={form.lastname}
                  onChange={onChange}
                  placeholder='Last name'
                  style={{ width: 200 }}
                />
              </div>
            </div>
            <div className={styles['group-text']}>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('birthday')}:
                <Input
                  type='date'
                  value={form.brithday || ''} // string 'YYYY-MM-DD' ตรง ๆ
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch(
                      updateField({ key: 'brithday', value: e.target.value })
                    );
                  }}
                  style={{
                    fontSize: 16,
                    backgroundColor: '#d7d7d7',
                    width: 200,
                  }}
                />
              </div>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('nationality')}:
                <Select
                  value={form.nationality}
                  onChange={(value) =>
                    dispatch(updateField({ key: 'nationality', value }))
                  }
                  options={Object.entries(
                    i18next.t('nationalityOption', { returnObjects: true })
                  ).map(([value, label]) => ({ value, label }))}
                  style={{ width: 200 }}
                />
              </div>
            </div>
            {/* <div className={styles['group-text']}>
              <div className={styles['label']}>
                {i18next.t('citizen')}:
                <Input
                  style={{ width: 100 }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch(
                      updateField({ key: 'citizen', value: e.target.value })
                    );
                  }}
                />
              </div>
              <div className={styles['label']}>-</div>
              <div className={styles['label']}>
                <Input style={{ width: 200 }} />
              </div>
              <div className={styles['label']}>-</div>
              <div className={styles['label']}>
                <Input style={{ width: 200 }} />
              </div>
              <div className={styles['label']}>-</div>
              <div className={styles['label']}>
                <Input style={{ width: 150 }} />
              </div>
              <div className={styles['label']}>-</div>
              <div className={styles['label']}>
                <Input style={{ width: 100 }} />
              </div>
            </div> */}
            <div className={styles['group-text']}>
              <div className={styles['label']}>
                {i18next.t('citizen')}:
                {parts.map((part, i) => (
                  <React.Fragment key={i}>
                    <Input
                      style={{ width: citizenLengths[i] * 40 }}
                      maxLength={citizenLengths[i]}
                      value={part}
                      onChange={(e) => handleChange(i, e.target.value)}
                    />
                    {i < parts.length - 1 && <span>-</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className={styles['group-text']}>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('gender')}:
                <Radio.Group
                  value={form.gender}
                  onChange={(e) =>
                    dispatch(
                      updateField({ key: 'gender', value: e.target.value })
                    )
                  }
                >
                  {Object.entries(
                    i18next.t('genders', { returnObjects: true })
                  ).map(([value, label]) => (
                    <Radio key={value} value={value}>
                      {label}
                    </Radio>
                  ))}
                </Radio.Group>
              </div>
            </div>
            <div className={styles['group-text']}>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('mobile')}:
                <div className={styles['label']}>
                  <Select
                    style={{ width: 100 }}
                    value={mobilePrefix}
                    options={[
                      { value: '+66', label: '+66' },
                      { value: '+1', label: '+1' },
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
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      handleMobileChange();
                    }}
                    style={{ width: 200 }}
                  />
                </div>
              </div>
            </div>
            <div className={styles['group-text']}>
              <div className={styles['label']}>
                {i18next.t('passport')}:
                <Input
                  name='passport'
                  value={form.passport}
                  onChange={onChange}
                  placeholder='Passport'
                  style={{ width: 200 }}
                />
              </div>
            </div>
            <div className={styles['group-text']}>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('expected')}:
                <Input
                  name='expected'
                  value={form.expected}
                  onChange={onChange}
                  placeholder='Expected'
                  style={{ width: 200 }}
                />
              </div>
              <div className={styles['label']} onClick={handleSubmit}>
                <Button>{i18next.t('save')}</Button>
              </div>
              {/* <div className={styles['label']}>
                <Button>{i18next.t('save')}</Button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Form;
