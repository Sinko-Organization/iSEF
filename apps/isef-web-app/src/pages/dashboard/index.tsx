import { DashboardTable } from "@isef-web-app/components/tables";
import { CurriculumSelector } from "@isef-web-app/containers/curriculum-selector";
import type { CurriculumType } from "@isef-web-app/containers/curriculum-selector";
import { useCurriculumStore } from "@isef-web-app/stores";
import { trpc } from "@isef-web-app/utils/trpc";
import type { NextPage } from "next";
import { useEffect } from "react";

const DashboardPage: NextPage = () => {
  const { schoolYear, setSchoolYear, semesterType, setSemesterType } =
    useCurriculumStore();

  const { data: courseData, status: courseStatus } = trpc.useQuery([
    "course.population",
    {
      schoolYear,
      semesterType,
    },
  ]);
  const { data: schoolYearsData, status: schoolYearStatus } = trpc.useQuery([
    "schoolYear.getAll",
  ]);

  useEffect(() => {
    if (schoolYearsData) {
      const startYear = schoolYearsData[0]?.startYear;
      if (startYear) {
        setSchoolYear(startYear);
      }
    }
  }, [schoolYearsData, setSchoolYear]);

  // function that filters based on school year and semester type
  const getCourseData = (data: CurriculumType) => {
    const { schoolYear, semesterType } = data;
    setSchoolYear(schoolYear);
    setSemesterType(semesterType);
    return courseData;
  };

  // loading
  if (courseStatus === "loading" || schoolYearStatus === "loading") {
    return <div>Loading...</div>;
  }

  // error
  if (courseStatus === "error" || schoolYearStatus === "error") {
    return <div>Error</div>;
  }

  return (
    <div className="mx-32 mt-10">
      {schoolYearsData && (
        <CurriculumSelector
          schoolYearsData={schoolYearsData}
          submitHandler={getCourseData}
          curriculum={{ schoolYear, semesterType }}
        />
      )}
      {courseData && <DashboardTable rows={courseData} />}
    </div>
  );
};

export default DashboardPage;
