import create from "zustand";
import { persist } from "zustand/middleware";

interface CourseState {
  course: string | null;
  setCourse: (course: string | null) => void;
}

interface CourseNameState {
  courseName: string | null;
  setCourseName: (courseName: string | null) => void;
}

export const useCourseStore = create(
  persist<CourseState>(
    (set) => ({
      course: null,
      setCourse: (course: string | null) => set({ course }),
    }),
    {
      name: "course",
      getStorage: () => localStorage,
    },
  ),
);

export const useCourseNameStore = create(
  persist<CourseNameState>(
    (set) => ({
      courseName: null,
      setCourseName: (courseName: string | null) => set({ courseName }),
    }),
    {
      name: "courseName",
      getStorage: () => localStorage,
    },
  ),
);
