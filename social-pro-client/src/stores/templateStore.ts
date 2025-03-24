/* eslint-disable no-unused-vars */
'use client';
import { create } from 'zustand/index';
import { createJSONStorage, persist } from 'zustand/middleware';
import { SecureStorage } from '@/utils/helper/storage';

interface TemplateStateProps {
  sidebarCollapsed: boolean | null;
  setSidebarCollapsed: (collapsed: boolean) => void;
  theme: string;
  setTheme(theme: string): void;
}

const templateStore = create<TemplateStateProps>()(
  persist(
    (set, get) => ({
      sidebarCollapsed: false,
      setSidebarCollapsed: (collapsed: boolean) => set({ sidebarCollapsed: collapsed }),
      theme: 'light',
      setTheme: (theme: string): void => {
        set({ theme });
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
        } else {
          document.documentElement.classList.add('dark');
        }
      },
    }),
    {
      name: 'template',
    },
  ),
);
export default templateStore;