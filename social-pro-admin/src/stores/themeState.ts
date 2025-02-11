import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { encryptStorage } from '@/utils/helper/storage';

interface ThemeStore {
  theme: string;
  setTheme(theme: string): void;
}

const themeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme: string): void => {
        set({ theme });
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        }
      },
    }),
    {
      name: 'theme-storage',
      serialize: (state): string => encryptStorage.encryptValue(JSON.stringify(state)),
      deserialize: (encryptedState) => JSON.parse(encryptStorage.decryptValue(encryptedState)),
    },
  ),
);
export default themeStore;
