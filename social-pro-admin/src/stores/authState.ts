import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { encryptStorage } from '@/utils/helper/storage';

interface AuthState {
  isAuthen: boolean;
  accessToken: string | null;
  campusCode: string | null;
  refreshToken: string | null;
  role: string | null;
  name: string | null;
  email: string | null;
  image: string;
  setAuthData: (
    accessToken: string,
    refreshToken: string,
    role: string,
    name: string,
    email: string,
    image: string,
  ) => void;
  clearTokens: () => void;
  setCampusCode: (campusCode: string) => void;
  updateToken: (accessToken: string, refreshToken: string) => void;
}

const authStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthen: false,
      accessToken: null,
      campusCode: null,
      refreshToken: null,
      role: null,
      name: null,
      email: null,
      image: '',
      setCampusCode: (campusCode: string): void => set({ campusCode }),
      setAuthData: (
        accessToken: string,
        refreshToken: string,
        role: string,
        name: string,
        email: string,
        image: string,
      ): void =>
        set({
          isAuthen: true,
          accessToken,
          refreshToken,
          role,
          name,
          email,
          image,
        }),
      clearTokens: (): void =>
        set({
          isAuthen: false,
          accessToken: null,
          refreshToken: null,
          role: null,
          name: null,
          email: null,
          image: '',
        }),
      getRole: (): string | null => get().role,
      updateToken: (accessToken: string, refreshToken: string): void =>
        set({
          accessToken,
          refreshToken,
        }),
    }),
    {
      name: 'app-storage',
      serialize: (state): string => encryptStorage.encryptValue(JSON.stringify(state)),
      deserialize: (encryptedState) => JSON.parse(encryptStorage.decryptValue(encryptedState)),
    },
  ),
);
export default authStore;
