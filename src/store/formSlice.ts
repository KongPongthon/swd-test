import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Moment } from 'moment';

export interface FormState {
  title: string;
  firstname: string;
  lastname: string;
  brithday: Moment | null;
  nationality: string;
  gender: string;
  mobile: string;
  passport: string;
  expected: string;
  citizen?: string;
}

const initialState: FormState = {
  title: '',
  firstname: '',
  lastname: '',
  brithday: null,
  nationality: '',
  gender: '',
  mobile: '',
  passport: '',
  expected: '',
  citizen: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // ✅ ใช้ update แบบ key-value เฉพาะ field เดียว
    updateField: <K extends keyof FormState>(
      state: FormState,
      action: PayloadAction<{ key: K; value: FormState[K] }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },

    // ✅ ใช้ update หลาย field พร้อมกัน
    updateForm: (state, action: PayloadAction<Partial<FormState>>) => {
      Object.assign(state, action.payload);
    },

    // ✅ ล้างฟอร์มทั้งหมด
    resetForm: () => initialState,
  },
});

export const { updateField, updateForm, resetForm } = formSlice.actions;
export default formSlice.reducer;
