import { create } from 'zustand';

interface BootState {
  booted: boolean;
  complete: () => void;
  skip: () => void;
}

export const useBootStore = create<BootState>((set) => ({
  booted: false,
  complete: () => set({ booted: true }),
  skip: () => set({ booted: true }),
}));
