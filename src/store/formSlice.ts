import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormState {
  title: string;
  firstname: string;
  lastname: string;
  brithday: string | null;
  nationality: string;
  gender: string;
  mobile: string;
  passport: string;
  expected: string;
  id?: string;
  citizen?: string;
  errors?: Partial<Record<keyof Omit<FormState, 'errors'>, string>>;
}

const initialState: FormState = {
  id: '',
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
  errors: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: <K extends keyof FormState>(
      state: FormState,
      action: PayloadAction<{ key: K; value: FormState[K] }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    updateForm: (state, action: PayloadAction<Partial<FormState>>) => {
      Object.assign(state, action.payload);
    },
    resetForm: () => initialState,
  },
});

export const { updateField, updateForm, resetForm } = formSlice.actions;
export default formSlice.reducer;
