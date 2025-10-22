import { Button, DatePicker, Input, Radio, Select } from 'antd';
import styles from './Form.module.css';
import i18next from 'i18next';
import App from './TableForm';

const Form = () => {
  const titleOptionObj = i18next.t('titles', { returnObjects: true });
  const titleOption = Object.entries(titleOptionObj);

  const titleOtionObj = i18next.t('genders', { returnObjects: true });
  const genderOption = Object.entries(titleOtionObj);
  return (
    <>
      <div className={styles['form']}>
        <div className={styles['sub-box']}>
          <div>
            <div className={styles['group-text']}>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('title')}:
                <Select placeholder={'title'} style={{ width: 150 }}>
                  {titleOption.map((item) => (
                    <option key={item[0]} value={item[0]}>
                      {item[1]}
                    </option>
                  ))}
                </Select>
              </div>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('firstname')}:
                <Input placeholder={'First name'} style={{ width: 460 }} />
              </div>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('lastname')}:
                <Input placeholder={'Last name'} style={{ width: 460 }} />
              </div>
            </div>
            <div className={styles['group-text']}>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('birthday')}:
                <DatePicker needConfirm />
              </div>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('nationality')}:
                <Select
                  placeholder={'-- Please select --'}
                  style={{ width: 460 }}
                />
              </div>
            </div>
            <div className={styles['group-text']}>
              <div className={styles['label']}>
                {i18next.t('citizen')}:
                <Input style={{ width: 100 }} />
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
            </div>
            <div className={styles['group-text']}>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('gender')}:
              </div>
              {genderOption?.map(([value, label]) => (
                <div key={value} className={styles['label']}>
                  <Radio value={value} />
                  {label}
                </div>
              ))}
            </div>
            <div className={styles['group-text']}>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('mobile')}:
                <Select placeholder={'title'} style={{ width: 150 }} />
              </div>
              <div className={styles['label']}>-</div>
              <div className={styles['label']}>
                <Input style={{ width: 300 }} />
              </div>
            </div>
            <div className={styles['group-text']}>
              <div className={styles['label']}>
                {i18next.t('passport')}:
                <Input style={{ width: 350 }} />
              </div>
            </div>
            <div className={styles['group-text']}>
              <div className={styles['label']}>
                <div className={styles['required']}>*</div>
                {i18next.t('expected')}:
                <Input style={{ width: 300 }} />
              </div>
              <div className={styles['label']}>
                <Button>{i18next.t('save')}</Button>
              </div>
              <div className={styles['label']}>
                <Button>{i18next.t('save')}</Button>
              </div>
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
