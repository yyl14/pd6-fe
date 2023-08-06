import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface AuthState {
  authToken: string | null;
  userId: string | null;
  set: (authToken: string, userId: string) => void;
  clear: () => void;
}

const useAuthStore = create(
  devtools(
    persist<AuthState>(
      (set) => ({
        authToken: null,
        userId: null,
        set: (authToken, userId) => set({ authToken, userId }),
        clear: () => set({ authToken: null, userId: null }),
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

export default useAuthStore;
