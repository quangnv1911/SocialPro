/* eslint-disable no-unused-vars */
'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserDetailResponse } from '@/api/actions/user/user.types';

interface UserState {
  user: UserDetailResponse | null;
  setCurrentUserData: (data: UserDetailResponse) => void;
  clearData: () => void;
}

const userStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setCurrentUserData: (data: UserDetailResponse) =>
        set({
          user: data,
        }),
      clearData: (): void =>
        set({
          user: null,
        }),
    }),
    {
      name: 'user-data',
    },
  ),
);
export default userStore;
