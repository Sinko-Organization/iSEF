import type { Semester } from "@web-app/types/semester";
import create from "zustand";
import { persist } from "zustand/middleware";

interface CurriculumState {
  schoolYear: number;
  semesterType: Semester;
  setSchoolYear: (schoolYear: number) => void;
  setSemesterType: (semesterType: Semester) => void;
}

export const useCurriculumStore = create(
  persist<CurriculumState>(
    (set) => ({
      schoolYear: new Date().getFullYear(),
      semesterType: "FIRST",
      setSchoolYear: (schoolYear: number) => set({ schoolYear }),
      setSemesterType: (semesterType: Semester) => set({ semesterType }),
    }),
    {
      name: "curriculum",
      getStorage: () => localStorage,
    },
  ),
);
