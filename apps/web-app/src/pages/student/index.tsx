import {
  StudentProfileCard,
  StudentRecordsCard,
} from "@web-app/components/cards";
import { CurriculumSelector } from "@web-app/containers/curriculum-selector";
import { useCurriculumStore } from "@web-app/stores";
import { trpc } from "@web-app/utils/trpc";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const StudentPage: NextPage = () => {
  const { schoolYear, setSchoolYear, semesterType, setSemesterType } =
    useCurriculumStore();
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { data: schoolYearsData } = trpc.useQuery([
    "schoolYear.getByStudentID",
    {
      studentId: id,
    },
  ]);

  useEffect(() => {
    if (schoolYearsData) {
      const startYear = schoolYearsData[0]?.startYear;
      if (startYear) {
        setSchoolYear(startYear);
      }
    }
  }, [schoolYearsData, setSchoolYear]);

  const studentDetails = trpc.useQuery([
    "studentData.details",
    {
      studentId: id,
      schoolYear,
      semesterType,
    },
  ]);

  const { data, isLoading, isError } = studentDetails;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      {data && (
        <div>
          <StudentProfileCard
            id={data.id}
            studentIdNumber={data.studentIdNumber}
            firstName={data.firstName}
            lastName={data.lastName}
            email={data.email}
            phoneNumber={data.phoneNumber}
            address={data.address}
          />
          {schoolYearsData && (
            <CurriculumSelector
              schoolYearsData={schoolYearsData}
              curriculum={{ schoolYear, semesterType }}
              setSchoolYear={setSchoolYear}
              setSemesterType={setSemesterType}
              className="mt-20"
            />
          )}
          <StudentRecordsCard
            records={data.studentRecords}
            studentId={id}
            semesterType={semesterType}
          />
        </div>
      )}
    </>
  );
};

export default StudentPage;
