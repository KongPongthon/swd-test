import { configureStore } from '@reduxjs/toolkit';
import formSlice from './formSlice';
import userListSlice from './userListSlice';

export const store = configureStore({
  reducer: {
    form: formSlice,
    userList: userListSlice,
  },
});

// สร้าง type สำหรับใช้ใน useSelector และ useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
