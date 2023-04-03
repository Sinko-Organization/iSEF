import { EducationLoader } from "@web-app/components/loaders";
import { CourseTable } from "@web-app/components/tables";
import { CourseOptionSelector } from "@web-app/containers/course-option-selector";
import { useCourseOptions } from "@web-app/hooks/course";
import { trpc } from "@web-app/utils/trpc";
import type { inferQueryOutput } from "@web-app/utils/trpc";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type StudentData = inferQueryOutput<"course.getStudents">;

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

  const [searchText, setSearchText] = useState<string>("");
  const [filteredStudents, setFilteredStudents] = useState<StudentData>([]);
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

  useEffect(() => {
    if (data && searchText.length > 0) {
      const filtered = data.filter(
        (student) =>
          // student.studentIdNumber.includes(searchText)
          // filter also by first name and last name
          student.studentIdNumber.includes(searchText) ||
          student.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
          student.lastName?.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredStudents(filtered);
    } else if (data) {
      setFilteredStudents(data);
    }
  }, [data, searchText]);

  if (isLoading || schoolYearStatus === "loading") {
    return <EducationLoader />;
  }

  if (isError || schoolYearStatus === "error") {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="mx-32 mt-10">
        {schoolYearsData && yearLevelsData && (
          <CourseOptionSelector
            searchText={searchText}
            schoolYearsData={schoolYearsData}
            yearLevelsData={yearLevelsData}
            courseOptions={{ schoolYear, semesterType, yearLevel }}
            setSchoolYear={setSchoolYear}
            setSemesterType={setSemesterType}
            setYearLevel={setYearLevel}
            setSearchText={setSearchText}
          />
        )}

        {data && <CourseTable students={filteredStudents} />}
      </div>
    </>
  );
};

export default CoursePage;
