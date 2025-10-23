import { configureStore } from '@reduxjs/toolkit';
import formSlice from './formSlice';
import userListSlice from './userListSlice';

export const store = configureStore({
  reducer: {
    form: formSlice,
    userList: userListSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
