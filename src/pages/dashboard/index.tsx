import { SemesterType } from "@prisma/client";
import type { NextPage } from "next";
import { useState } from "react";

import { DashboardTable } from "@/components/tables";
import { CurriculumSelector } from "@/containers/curriculum-selector";
import type { CurriculumType } from "@/containers/curriculum-selector";
import { trpc } from "@/utils/trpc";

const DashboardPage: NextPage = () => {
  const [schoolYear, setSchoolYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [semesterType, setSemesterType] = useState<SemesterType>(
    SemesterType.FIRST,
  );

  const { data: courseData, status: courseStatus } = trpc.useQuery([
    "course.populationByCourse",
    {
      schoolYear,
      semesterType,
    },
  ]);
  const { data: schoolYearsData, status: schoolYearStatus } = trpc.useQuery([
    "schoolYear.getAll",
  ]);

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
        />
      )}
      {courseData && <DashboardTable rows={courseData} />}
    </div>
  );
};

export default DashboardPage;
