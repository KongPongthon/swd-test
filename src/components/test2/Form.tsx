'use client';
import { Button, Input, Radio, Select } from 'antd';
import styles from './Form.module.css';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FormState, resetForm, updateField } from '@/store/formSlice';
import type { RootState } from '@/store/store';
const citizenLengths = [1, 4, 5, 2, 1];
const mobileLengths = [3, 8];
import React from 'react';
import { addUser, updateUser } from '@/store/userListSlice';
const Form = () => {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.form);
  const validateForm = (form: FormState) => {
    const errors: Partial<Record<keyof FormState, string>> = {};
    if (!form.title) errors.title = i18next.t('validate');
    if (!form.firstname) errors.firstname = i18next.t('validate');
    if (!form.lastname) errors.lastname = i18next.t('validate');
    if (!form.mobile) errors.mobile = i18next.t('validate');
    if (!form.brithday) errors.brithday = i18next.t('validate');
    if (!form.gender) errors.gender = i18next.t('validate');
    if (!form.nationality) errors.nationality = i18next.t('validate');
    if (!form.expected) errors.expected = i18next.t('validate');
    return errors;
  };
  const handleSubmit = () => {
    try {
      const errors = validateForm(form);
      if (Object.keys(errors).length > 0) {
        dispatch(updateField({ key: 'errors', value: errors }));
        return;
      }
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    dispatch(resetForm());
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateField({ key: name as keyof FormState, value }));
  };

  const citizen = form.citizen || '';
  const parts: string[] = [];
  let start = 0;
  for (const len of citizenLengths) {
    parts.push(citizen.substr(start, len));
    start += len;
  }

  const handleChange = (index: number, value: string) => {
    if (value.length > citizenLengths[index]) return;
    const newParts = [...parts];
    newParts[index] = value;
    dispatch(updateField({ key: 'citizen', value: newParts.join('') }));
  };

  const mobile = form.mobile || '';
  const partsMobile: string[] = [];
  let startMobile = 0;
  for (const len of mobileLengths) {
    partsMobile.push(mobile.substr(startMobile, len));
    startMobile += len;
  }
  const handleChangeMobile = (index: number, value: string) => {
    if (value.length > mobileLengths[index]) return;
    const newParts = [...partsMobile];
    newParts[index] = value;

    // join กลับเป็นค่าเดียว เช่น "+6612345678"
    dispatch(updateField({ key: 'mobile', value: newParts.join('') }));
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
                <div>
                  <Select
                    value={form.title}
                    onChange={(value) =>
                      dispatch(updateField({ key: 'title', value }))
                    }
                    options={Object.entries(
                      i18next.t('titles', { returnObjects: true })
                    ).map(([value, label]) => ({ value, label }))}
                    style={{ width: 150 }}
                    status={form.errors?.title ? 'error' : ''}
                  />
                  {form.errors?.firstname && (
                    <div style={{ color: 'red', marginTop: 4 }}>
                      {form.errors.firstname}
                    </div>
                  )}
                </div>
              </div>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('firstname')}:
                <div>
                  <Input
                    name='firstname'
                    value={form.firstname}
                    onChange={onChange}
                    placeholder='First name'
                    style={{ width: 300 }}
                    status={form.errors?.firstname ? 'error' : ''}
                  />
                  {form.errors?.firstname && (
                    <div style={{ color: 'red', marginTop: 4 }}>
                      {form.errors.firstname}
                    </div>
                  )}
                </div>
              </div>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('lastname')}:
                <div>
                  <Input
                    name='lastname'
                    value={form.lastname}
                    onChange={onChange}
                    placeholder='Last name'
                    style={{ width: 300 }}
                    status={form.errors?.lastname ? 'error' : ''}
                  />
                  {form.errors?.lastname && (
                    <div style={{ color: 'red', marginTop: 4 }}>
                      {form.errors.lastname}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles['group-text']}>
              <div className={styles['label1']}>
                <div className={styles['required']}>*</div>
                {i18next.t('birthday')}:
                <div>
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
                    status={form.errors?.brithday ? 'error' : ''}
                  />
                  {form.errors?.brithday && (
                    <div style={{ color: 'red', marginTop: 4 }}>
                      {form.errors.brithday}
                    </div>
                  )}
                </div>
                {/* //! max Date */}
              </div>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('nationality')}:
                <div>
                  <Select
                    value={form.nationality}
                    onChange={(value) =>
                      dispatch(updateField({ key: 'nationality', value }))
                    }
                    options={Object.entries(
                      i18next.t('nationalityOption', { returnObjects: true })
                    ).map(([value, label]) => ({ value, label }))}
                    style={{ width: 300 }}
                    status={form.errors?.nationality ? 'error' : ''}
                  />
                  {form.errors?.nationality && (
                    <div style={{ color: 'red', marginTop: 4 }}>
                      {form.errors.nationality}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles['group-text']}>
              <div className={styles['label']}>
                {i18next.t('citizen')}:
                {parts.map((part, i) => (
                  <React.Fragment key={i}>
                    <Input
                      style={{ width: citizenLengths[i] * 55 }}
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
                <div>
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
                  {form.errors?.gender && (
                    <div style={{ color: 'red', marginTop: 4 }}>
                      {form.errors.gender}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles['group-text']}>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('mobile')}:
                <div>
                  {partsMobile.map((part, i) => (
                    <React.Fragment key={i}>
                      {i === 0 ? (
                        <Select
                          style={{ width: 200 }}
                          value={part || '+66'}
                          options={[
                            { value: '+66', label: '+66' },
                            { value: '+1', label: '+1' },
                            { value: '+81', label: '+81' },
                          ]}
                          onChange={(value) => handleChangeMobile(i, value)}
                          status={form.errors?.mobile ? 'error' : ''}
                        />
                      ) : (
                        <Input
                          style={{ width: mobileLengths[i] * 40 }}
                          maxLength={mobileLengths[i]}
                          value={part}
                          onChange={(e) =>
                            handleChangeMobile(i, e.target.value)
                          }
                          status={form.errors?.mobile ? 'error' : ''}
                        />
                      )}
                      {i < partsMobile.length - 1 && <span>-</span>}
                    </React.Fragment>
                  ))}
                  {form.errors?.mobile && (
                    <div style={{ color: 'red', marginTop: 4 }}>
                      {form.errors.mobile}
                    </div>
                  )}
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
                  style={{ width: 300 }}
                />
              </div>
            </div>
            <div className={styles['group-text']}>
              <div className={styles['label2']}>
                <div className={styles['required']}>*</div>
                {i18next.t('expected')}:
                <div>
                  <Input
                    name='expected'
                    value={form.expected}
                    onChange={onChange}
                    placeholder='Expected'
                    style={{ width: 250 }}
                    status={form.errors?.expected ? 'error' : ''}
                  />
                  {form.errors?.expected && (
                    <div style={{ color: 'red', marginTop: 4 }}>
                      {form.errors.expected}
                    </div>
                  )}
                </div>
              </div>
              <div className={styles['label3']} onClick={handleCancel}>
                <Button>{i18next.t('reset')}</Button>
              </div>
              <div className={styles['label']} onClick={handleSubmit}>
                <Button>{i18next.t('submit')}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Form;
