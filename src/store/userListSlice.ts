import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState } from './formSlice';

interface UserListState {
  users: FormState[];
}

const initialState: UserListState = {
  users:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('formData') || '[]')
      : [],
};

const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<FormState>) => {
      state.users.push(action.payload);
      localStorage.setItem('formData', JSON.stringify(state.users));
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      localStorage.setItem('formData', JSON.stringify(state.users));
    },
    updateUser: (state, action: PayloadAction<FormState>) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      } else {
        // ถ้าไม่มี → treat เป็น user ใหม่
        state.users.push(action.payload);
      }
      localStorage.setItem('formData', JSON.stringify(state.users));
    },
    setUsers: (state, action: PayloadAction<FormState[]>) => {
      state.users = action.payload;
      localStorage.setItem('formData', JSON.stringify(action.payload));
    },
  },
});

export const { addUser, deleteUser, updateUser, setUsers } =
  userListSlice.actions;
export default userListSlice.reducer;
