import {create} from 'zustand';

interface TimerStoreState {
  isRunning: boolean;
  remainingTime: number;
  startTimer: () => void;
  resetTimer: () => void;
}

const useTimerStore = create<TimerStoreState>((set) => ({
  isRunning: false,
  remainingTime: 3 * 60,

  startTimer: () => {
    set({ isRunning: true });
    const interval = setInterval(() => {
      set((state) => {
        if (state.remainingTime > 0) {
          return { remainingTime: state.remainingTime - 1 };
        } else {
          clearInterval(interval);
          return { isRunning: false, remainingTime: 3 * 60 };
        }
      });
    }, 1000);
  },

  resetTimer: () => {
    set({ isRunning: false, remainingTime: 3 * 60 });
  },
}));

export default useTimerStore;
