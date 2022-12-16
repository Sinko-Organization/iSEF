import create from "zustand";

import type { Semester } from "@/types/semester";

interface CurriculumState {
  schoolYear: number;
  semesterType: Semester;
  setSchoolYear: (schoolYear: number) => void;
  setSemesterType: (semesterType: Semester) => void;
}

export const useCurriculumStore = create<CurriculumState>((set) => ({
  schoolYear: new Date().getFullYear(),
  semesterType: "FIRST",
  setSchoolYear: (schoolYear: number) => set({ schoolYear }),
  setSemesterType: (semesterType: Semester) => set({ semesterType }),
}));
