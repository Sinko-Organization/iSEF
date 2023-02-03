import create from "zustand";
import { persist } from "zustand/middleware";

interface YearLevelState {
  yearLevel: number;
  setYearLevel: (yearLevel: number) => void;
}

export const useYearLevelStore = create(
  persist<YearLevelState>(
    (set) => ({
      yearLevel: 1,
      setYearLevel: (yearLevel: number) => set({ yearLevel }),
    }),
    {
      name: "year-level",
      getStorage: () => localStorage,
    },
  ),
);
