import create from "zustand";
import { persist } from "zustand/middleware";

interface YearLevelState {
  yearLevel: number | "ALL";
  setYearLevel: (yearLevel: number | "ALL") => void;
}

export const useYearLevelStore = create(
  persist<YearLevelState>(
    (set) => ({
      yearLevel: 1,
      setYearLevel: (yearLevel: number | "ALL") => set({ yearLevel }),
    }),
    {
      name: "year-level",
      getStorage: () => localStorage,
    },
  ),
);
