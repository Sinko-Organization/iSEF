import { HonorsListTable } from "@web-app/components/tables";
import { CurriculumSelector } from "@web-app/containers/curriculum-selector";
import { YearLevelSelector } from "@web-app/containers/year-level-selector";
import { useHonorsFilterStore } from "@web-app/stores";
import { trpc } from "@web-app/utils/trpc";
import type { NextPage } from "next";
import { useEffect } from "react";

const Index: NextPage = () => {
  const { data: schoolYearsData, status: schoolYearStatus } = trpc.useQuery([
    "schoolYear.getAll",
  ]);
  const {
    semesterType,
    yearLevel,
    schoolYear,
    setSchoolYear,
    setSemesterType,
    setYearLevel,
  } = useHonorsFilterStore();

  useEffect(() => {
    if (schoolYearsData) {
      const startYear = schoolYearsData[0]?.startYear;
      if (startYear) {
        setSchoolYear(startYear);
      }
    }
  }, [schoolYearsData, setSchoolYear]);

  useEffect(() => {
    console.log(yearLevel);
  }, [yearLevel]);

  const { data } = trpc.useQuery(
    [
      "honors.getAll",
      {
        schoolYear,
        semesterType,
        yearLevel,
        courseId: null,
        sortBy: {
          field: "gwa",
          order: "desc",
        },
      },
    ],
    {
      // handle error
      onError: (err) => {
        console.log(err.data?.code);
      },
    },
  );

  return (
    <>
      <div className="flex flex-row gap-5">
        {schoolYearsData && (
          <CurriculumSelector
            schoolYearsData={schoolYearsData}
            curriculum={{ schoolYear, semesterType }}
            setSchoolYear={setSchoolYear}
            setSemesterType={setSemesterType}
          />
        )}
        <YearLevelSelector setYearLevel={setYearLevel} />
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
