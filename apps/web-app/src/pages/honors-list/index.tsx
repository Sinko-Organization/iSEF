import { HonorsListTable } from "@web-app/components/tables";
import { CourseSelector } from "@web-app/containers/course-selector";
import { CurriculumSelector } from "@web-app/containers/curriculum-selector";
import { YearLevelSelector } from "@web-app/containers/year-level-selector";
import { useCourseStore, useHonorsFilterStore } from "@web-app/stores";
import { trpc } from "@web-app/utils/trpc";
import type { NextPage } from "next";
import { useEffect } from "react";

const Index: NextPage = () => {
  const { data: schoolYearsData } = trpc.useQuery(["schoolYear.getAll"]);
  const {
    semesterType,
    yearLevel,
    schoolYear,
    setSchoolYear,
    setSemesterType,
    setYearLevel,
  } = useHonorsFilterStore();
  const { course: courseId, setCourse } = useCourseStore();

  useEffect(() => {
    if (schoolYearsData) {
      const startYear = schoolYearsData[0]?.startYear;
      if (startYear) {
        setSchoolYear(startYear);
      }
    }
  }, [schoolYearsData, setSchoolYear]);

  const { data } = trpc.useQuery(
    [
      "honors.getAll",
      {
        schoolYear,
        semesterType,
        yearLevel,
        courseId,
        sortBy: {
          field: "gwa",
          order: "desc",
        },
      },
    ],
    {
      // handle error
      onError: (err) => {
        console.error(err.data?.code);
      },
    },
  );

  return (
    <>
      <div className="mx-20 flex flex-row gap-5">
        {schoolYearsData && (
          <CurriculumSelector
            schoolYearsData={schoolYearsData}
            curriculum={{ schoolYear, semesterType }}
            setSchoolYear={setSchoolYear}
            setSemesterType={setSemesterType}
          />
        )}
        <YearLevelSelector setYearLevel={setYearLevel} />
        <CourseSelector setCourse={setCourse} />
      </div>
      <div className="mx-20 mt-10">
        {data && (
          <HonorsListTable
            honorsList={data.map((student) => ({
              ...student,
              firstName: student.firstName ?? "",
              lastName: student.lastName ?? "",
            }))}
          />
        )}
      </div>
    </>
  );
};

export default Index;
