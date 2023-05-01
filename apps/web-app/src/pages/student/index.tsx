import {
  StudentProfileCard,
  StudentRecordsCard,
  SubjectRecomendationsCard,
} from "@web-app/components/cards";
import { EducationLoader } from "@web-app/components/loaders";
import StudentProfileSelector from "@web-app/containers/student-profile-selector/StudentProfileSelector";
import { useCurriculumStore } from "@web-app/stores";
import { trpc } from "@web-app/utils/trpc";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const StudentPage: NextPage = () => {
  const { schoolYear, setSchoolYear, semesterType } = useCurriculumStore();
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

  const { data: studentData, status: studentDataStatus } = trpc.useQuery([
    "studentData.details",
    {
      studentId: id,
      schoolYear: schoolYear === 0 ? undefined : schoolYear,
    },
  ]);

  if (studentDataStatus === "loading") {
    return <EducationLoader />;
  }

  if (studentDataStatus === "error") {
    return <div>Error</div>;
  }

  return (
    <>
      {studentData && (
        <div>
          <StudentProfileCard
            id={studentData.id}
            studentIdNumber={studentData.studentIdNumber}
            firstName={studentData.firstName}
            lastName={studentData.lastName}
            email={studentData.email}
            phoneNumber={studentData.phoneNumber}
            address={studentData.address}
          />
          {schoolYearsData && (
            <StudentProfileSelector
              schoolYearsData={schoolYearsData}
              setSchoolYear={setSchoolYear}
            />
          )}
          <StudentRecordsCard records={studentData.studentRecords} />
          <div className="mt-20" />
          <SubjectRecomendationsCard
            studentId={id}
            semesterType={semesterType}
          />
        </div>
      )}
    </>
  );
};

export default StudentPage;
