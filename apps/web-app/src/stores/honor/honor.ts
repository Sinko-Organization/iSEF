import create from "zustand";
import { persist } from "zustand/middleware";

interface HonorsFilterState {
  yearLevel: number;
  schoolYear: number;
  semesterType: "FIRST" | "SECOND" | "SUMMER";
  skip: number;
  take: number;
  field: "lastName" | "gwa";
  order: "asc" | "desc";
  setYearLevel: (yearLevel: number) => void;
  setSchoolYear: (schoolYear: number) => void;
  setSemesterType: (semesterType: "FIRST" | "SECOND" | "SUMMER") => void;
  setSkip: (skip: number) => void;
  setTake: (take: number) => void;
  setField: (field: "lastName" | "gwa") => void;
  setOrder: (order: "asc" | "desc") => void;
}

export const useHonorsFilterStore = create(
  persist<HonorsFilterState>(
    (set) => ({
      yearLevel: 1,
      schoolYear: new Date().getFullYear(),
      semesterType: "FIRST",
      skip: 0,
      take: 10,
      field: "lastName",
      order: "asc",
      setYearLevel: (yearLevel: number) => set({ yearLevel }),
      setSchoolYear: (schoolYear: number) => set({ schoolYear }),
      setSemesterType: (semesterType: "FIRST" | "SECOND" | "SUMMER") =>
        set({ semesterType }),
      setSkip: (skip: number) => set({ skip }),
      setTake: (take: number) => set({ take }),
      setField: (field: "lastName" | "gwa") => set({ field }),
      setOrder: (order: "asc" | "desc") => set({ order }),
    }),
    {
      name: "honors-filter",
      getStorage: () => localStorage,
    },
  ),
);
