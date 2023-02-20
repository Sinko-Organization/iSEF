import create from "zustand";
import { persist } from "zustand/middleware";

interface HonorsFilterState {
  yearLevel: number | null;
  schoolYear: number;
  semesterType: "FIRST" | "SECOND" | "SUMMER";
  field: "lastName" | "gwa";
  order: "asc" | "desc";
  setYearLevel: (yearLevel: number | null) => void;
  setSchoolYear: (schoolYear: number) => void;
  setSemesterType: (semesterType: "FIRST" | "SECOND" | "SUMMER") => void;
  setField: (field: "lastName" | "gwa") => void;
  setOrder: (order: "asc" | "desc") => void;
}

export const useHonorsFilterStore = create(
  persist<HonorsFilterState>(
    (set) => ({
      yearLevel: null,
      schoolYear: new Date().getFullYear(),
      semesterType: "FIRST",
      field: "lastName",
      order: "asc",
      setYearLevel: (yearLevel: number | null) => set({ yearLevel }),
      setSchoolYear: (schoolYear: number) => set({ schoolYear }),
      setSemesterType: (semesterType: "FIRST" | "SECOND" | "SUMMER") =>
        set({ semesterType }),
      setField: (field: "lastName" | "gwa") => set({ field }),
      setOrder: (order: "asc" | "desc") => set({ order }),
    }),
    {
      name: "honors-filter",
      getStorage: () => localStorage,
    },
  ),
);
