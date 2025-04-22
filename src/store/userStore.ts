// src/store/userStore.ts
import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

interface UserState { user: User | null; setUser: (u: User | null) => void; }
export const useUserStore = create<UserState>(set => ({
  user: null,
  setUser: user => set({ user }),
}));
