/* eslint-disable no-unused-vars */
'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserDetailResponse } from '@/api/actions/user/user.types';


interface UserState {
  id: string | null;
  userName: string | null;
  roleName: string | null;
  email: string | null;
  money: number | null;
  avatar: string | null;
  ranking: string | null;
  apiKey: string | null;
  setCurrentUserData: (data: UserDetailResponse) => void;
  clearData: () => void;
}

const userStore = create<UserState>()(
    persist(
      (set, get) => ({
        id: null,
        userName: null,
        roleName: null,
        email: null,
        money: null,
        avatar: null,
        ranking: null,
        apiKey: null,
        setCurrentUserData: (data: UserDetailResponse) =>
          set({
            id: data.id,
            userName: data.userName,
            roleName: data.roleName,
            email: data.email,
            money: data.money,
            avatar: data.avatar,
            ranking: data.ranking,
            apiKey: data.apiKey,
          }),
        clearData: (): void =>
          set({
            id: null,
            userName: null,
            roleName: null,
            email: null,
            money: null,
            avatar: null,
            ranking: null,
            apiKey: null,
          }),
      }),
      {
        name: 'user-data',
      }
      ,
    ),
  )
;
export default userStore;
