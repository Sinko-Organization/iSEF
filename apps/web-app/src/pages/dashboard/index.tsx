import { EducationLoader } from "@web-app/components/loaders";
import { DashboardTable } from "@web-app/components/tables";
import { CurriculumSelector } from "@web-app/containers/curriculum-selector";
import { useCurriculumStore } from "@web-app/stores";
import { trpc } from "@web-app/utils/trpc";
import type { NextPage } from "next";
import { useEffect } from "react";

// TODO: Improve UI for this page
const DashboardPage: NextPage = () => {
  const { data: schoolYearsData, status: schoolYearStatus } = trpc.useQuery([
    "schoolYear.getAll",
  ]);

  const { schoolYear, setSchoolYear, semesterType, setSemesterType } =
    useCurriculumStore();

  useEffect(() => {
    if (schoolYearsData) {
      const startYear = schoolYearsData.find(
        (year) => year.startYear === schoolYear,
      )?.startYear;

      if (startYear) {
        setSchoolYear(startYear);
      }
    }
  }, [schoolYear, schoolYearsData, setSchoolYear]);

  const { data: courseData, status: courseStatus } = trpc.useQuery([
    "course.population",
    {
      schoolYear,
      semesterType,
    },
  ]);

  // loading
  if (courseStatus === "loading" || schoolYearStatus === "loading") {
    return <EducationLoader />;
  }

  // error
  if (courseStatus === "error" || schoolYearStatus === "error") {
    return <div>Error</div>;
  }

  return (
    <div className="mx-32 font-sans mt-10">
      {schoolYearsData && (
        <CurriculumSelector
          schoolYearsData={schoolYearsData}
          curriculum={{ schoolYear, semesterType }}
          setSchoolYear={setSchoolYear}
          setSemesterType={setSemesterType}
        />
      )}
      {courseData && <DashboardTable rows={courseData} />}
    </div>
  );
};

export default DashboardPage;
