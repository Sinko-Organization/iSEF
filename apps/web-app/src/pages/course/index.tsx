import { CourseTable } from "@web-app/components/tables";
import { CourseOptionSelector } from "@web-app/containers/course-option-selector";
import { useCourseOptions } from "@web-app/hooks/course";
import { trpc } from "@web-app/utils/trpc";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const CoursePage: NextPage = () => {
  const {
    schoolYearsData,
    schoolYear,
    schoolYearStatus,
    semesterType,
    setSchoolYear,
    setSemesterType,
    yearLevel,
    setYearLevel,
    yearLevelsData,
  } = useCourseOptions();

  const router = useRouter();
  const { id } = router.query as { id: string };

  const students = trpc.useQuery([
    "course.getStudents",
    {
      courseId: id,
      schoolYear,
      semesterType,
      yearLevel,
    },
  ]);

  const { data, isLoading, isError } = students;

  if (isLoading || schoolYearStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (isError || schoolYearStatus === "error") {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="mx-32 mt-10">
        {schoolYearsData && yearLevelsData && (
          <CourseOptionSelector
            schoolYearsData={schoolYearsData}
            yearLevelsData={yearLevelsData}
            courseOptions={{ schoolYear, semesterType, yearLevel }}
            setSchoolYear={setSchoolYear}
            setSemesterType={setSemesterType}
            setYearLevel={setYearLevel}
          />
        )}
        {data && <CourseTable students={data} />}
      </div>
    </>
  );
};

export default CoursePage;
