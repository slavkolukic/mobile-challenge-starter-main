import { create } from 'zustand';
import { ThemePreference } from '../types';

type ThemeStore = {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};

export const useThemeStore = create<ThemeStore>(set => ({
  preference: 'system',
  setPreference: preference => set({ preference }),
}));
