import create from "zustand";
import { persist } from "zustand/middleware";

interface CourseState {
  course: string | null;
  setCourse: (course: string | null) => void;
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
