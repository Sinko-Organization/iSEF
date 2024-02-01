import { AddTeacherSubjects } from "@web-app/components/buttons";
import { EducationLoader } from "@web-app/components/loaders";
import { SubjectTable } from "@web-app/components/tables";
import { CourseOptionSelector } from "@web-app/containers/course-option-selector";
import { CurriculumSelector } from "@web-app/containers/curriculum-selector";
import { useCourseOptions } from "@web-app/hooks/course";
import { useCourseNameStore } from "@web-app/stores";
import { trpc } from "@web-app/utils/trpc";
import type { inferQueryOutput } from "@web-app/utils/trpc";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { P, match } from "ts-pattern";
import { string } from "zod";



const Index: NextPage = () => {
  const { data: subjects } = trpc.useQuery(["subject.getAll"])
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
  const setCourseName = useCourseNameStore((state) => state.setCourseName);
  const { id } = router.query as { id: string };

  const { data: subjectList } = trpc.useQuery(
    [
      "subject.getAll",
    ]);


  if (!subjectList) {
    return <EducationLoader />
  }


  return (
    <>
      <div className="mx-20 my-10 flex flex-row gap-5">
        {schoolYearsData && (
          <CurriculumSelector
            schoolYearsData={schoolYearsData}
            curriculum={{ schoolYear, semesterType }}
            setSchoolYear={setSchoolYear}
            setSemesterType={setSemesterType}
          />
        )}
        <AddTeacherSubjects />

        {/* { {schoolYearsData && yearLevelsData && (
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
        )} */}
        {/* 
        {data && <CourseTable students={filteredStudents} />} */}

      </div>
      <div className="mx-20 mt-10">
        <SubjectTable subjectList={subjectList} />
      </div>
    </>
  );
};

const isNotNullAndEmpty = (value: string | null) => {
  return value !== null && value !== "";
};

export default Index;
