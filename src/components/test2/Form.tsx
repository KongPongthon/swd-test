'use client';
import { Button, DatePicker, Input, Select } from 'antd';
import styles from './Form.module.css';
import i18next from 'i18next';
import App from './TableForm';
import { useDispatch, useSelector } from 'react-redux';
import { FormState, resetForm, updateField } from '@/store/formSlice';
import type { RootState } from '@/store/store';
import CitizenInput from '../CitizenInput';
import MobileInput from '../MobileInput';
const citizenLengths = [1, 4, 5, 2, 1];
import moment, { Moment } from 'moment';

const Form = () => {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.form);
  const titleOptionObj = i18next.t('titles', { returnObjects: true });
  const selectOptions = Object.entries(titleOptionObj).map(([key, label]) => ({
    value: key,
    label,
  }));

  const titleOtionObj = i18next.t('genders', { returnObjects: true });
  const genderOption = Object.entries(titleOtionObj);

  const nationOptionObj = i18next.t('nationalityOption', {
    returnObjects: true,
  });
  console.log('nationOptionObj', nationOptionObj);

  const nationOption = Object.entries(nationOptionObj).map(([key, label]) => ({
    value: key,
    label,
  }));

  const handleSubmit = () => {
    // ดึงข้อมูลเก่า
    const savedData = localStorage.getItem('formData');
    const parsedData = savedData ? JSON.parse(savedData) : [];
    const dataArray = Array.isArray(parsedData) ? parsedData : [parsedData];
    dataArray.push(form);
    localStorage.setItem('formData', JSON.stringify(dataArray));
    console.log('Updated localStorage:', dataArray);
    dispatch(resetForm());
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { value, name } = e.target;
      // console.log('value', value, 'name', name);
      dispatch(updateField({ key: name as keyof FormState, value: value }));
    } catch (error) {
      console.log(error);
    }
  };
  const citizen = useSelector((state: RootState) => state.form.citizen);

  const parts: Array<string> = [];
  let start = 0;
  for (let len of citizenLengths) {
    if (typeof citizen === 'string') {
      parts.push(citizen.substr(start, len));
      start += len;
    }
  }

  const handleChange = (index: number, value: string) => {
    if (value.length > citizenLengths[index]) return;
    const newParts = [...parts];
    newParts[index] = value;
    const newCitizen = newParts.join('');
    dispatch(updateField({ key: 'citizen', value: newCitizen }));
  };

  console.log('Form', form);

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
                  placeholder={'title'}
                  style={{ width: 150 }}
                  onChange={(value) =>
                    dispatch(updateField({ key: 'title', value }))
                  }
                  value={form.title}
                  options={selectOptions}
                />
              </div>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('firstname')}:
                <Input
                  value={form.firstname}
                  placeholder={'First name'}
                  style={{ width: 460 }}
                  name='firstname'
                  onChange={onChange}
                />
              </div>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('lastname')}:
                <Input
                  value={form.lastname}
                  name='lastname'
                  placeholder={'Last name'}
                  style={{ width: 460 }}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className={styles['group-text']}>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('birthday')}:
                <DatePicker
                  needConfirm
                  value={form.brithday ? moment(form.brithday) : null} // แปลงเป็น moment
                  onChange={(value: Moment | null) => {
                    const dateValue = value
                      ? moment(value)
                      : moment(new Date());
                    console.log('dateValue', dateValue);

                    dispatch(
                      updateField({ key: 'brithday', value: dateValue })
                    );
                  }}
                  format='DD/MM/YYYY' // กำหนด format ที่ต้องการ
                />
              </div>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('nationality')}:
                <Select
                  value={form.nationality}
                  placeholder={'-- Please select --'}
                  style={{ width: 460 }}
                  options={nationOption}
                  onChange={(value) =>
                    dispatch(updateField({ key: 'nationality', value }))
                  }
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
                <CitizenInput
                  citizenLengths={citizenLengths}
                  parts={parts}
                  handleChange={handleChange}
                />
              </div>
            </div>
            {/* <div className={styles['group-text']}>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('gender')}:
              </div>
              <Radio.Group
                onChange={(e) =>
                  dispatch(
                    updateField({ key: 'gender', value: e.target.value })
                  )
                }
                value={form.gender} // value จาก state ที่เก็บค่าเพศ
              >
                {genderOption?.map(([value, label]) => (
                  <Radio key={value} value={value} className={styles['label']}>
                    {label}
                  </Radio>
                ))}
              </Radio.Group>
            </div> */}
            <div className={styles['group-text']}>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('mobile')}:
                <MobileInput />
              </div>
            </div>
            <div className={styles['group-text']}>
              <div className={styles['label']}>
                {i18next.t('passport')}:
                <Input
                  value={form.passport}
                  style={{ width: 350 }}
                  name='passport'
                  onChange={onChange}
                />
              </div>
            </div>
            <div className={styles['group-text']}>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('expected')}:
                <Input
                  value={form.expected}
                  style={{ width: 300 }}
                  name='expected'
                  onChange={onChange}
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
      <div>
        <App />
      </div>
    </>
  );
};
export default Form;
