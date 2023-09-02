import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { ThemeType } from '@/theme';

interface ThemeState {
  theme: ThemeType | null;
  setTheme: (theme: ThemeType) => void;
  clearTheme: () => void;
}

const useThemeStore = create(
  devtools(
    persist<ThemeState>(
      (set) => ({
        theme: null,
        setTheme: (theme) => set({ theme }),
        clearTheme: () => set({ theme: null }),
      }),
      {
        name: 'theme-storage',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

export default useThemeStore;
