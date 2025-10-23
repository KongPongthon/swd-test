import { configureStore } from '@reduxjs/toolkit';
import formSlice from './formSlice';

export const store = configureStore({
  reducer: {
    form: formSlice,
  },
});

// สร้าง type สำหรับใช้ใน useSelector และ useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
