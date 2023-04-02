import { useCurriculumStore, useYearLevelStore } from "@web-app/stores";
import { trpc } from "@web-app/utils/trpc";
import { useEffect } from "react";

export const useCourseOptions = () => {
  const { data: schoolYearsData, status: schoolYearStatus } = trpc.useQuery([
    "schoolYear.getAll",
  ]);

  const { data: yearLevelsData, status: yearLevelStatus } = trpc.useQuery([
    "yearLevel.getAll",
  ]);

  const { schoolYear, setSchoolYear, semesterType, setSemesterType } =
    useCurriculumStore();

  const { yearLevel, setYearLevel } = useYearLevelStore();

  useEffect(() => {
    if (schoolYearsData) {
      const startYear = schoolYearsData.find(
        (year) => year.startYear === schoolYear,
      )?.startYear;
      if (startYear) {
        setSchoolYear(startYear);
      }
    }
    if (yearLevelsData) {
      const level = yearLevelsData[0]?.yearLevel;
      if (level && !yearLevel) {
        setYearLevel(level);
      }
    }
  }, [
    schoolYear,
    schoolYearsData,
    setSchoolYear,
    setYearLevel,
    yearLevel,
    yearLevelsData,
  ]);

  return {
    schoolYearsData,
    schoolYear,
    setSchoolYear,
    semesterType,
    setSemesterType,
    schoolYearStatus,
    yearLevel,
    setYearLevel,
    yearLevelsData,
    yearLevelStatus,
  };
};
