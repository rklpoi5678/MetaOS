import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@supabase/supabase-js';

interface Project { id: string; title: string; status: string; created_at: string; tags: string[]; }

interface AppState {
  user: User | null;
  projects: Project[];
  setUser: (u: User | null) => void;
  setProjects: (p: Project[]) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      projects: [],
      setUser: (u) => set({ user: u }),
      setProjects: (p) => set({ projects: p }),
    }),
    {
      name: 'app-storage', // localStorage key
      partialize: (state) => ({ user: state.user, projects: state.projects }),
    }
  )
);
