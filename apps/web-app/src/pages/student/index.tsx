import { O, pipe } from "@mobily/ts-belt";
import {
  StudentProfileCard,
  StudentRecordsCard,
  SubjectListCard,
  SubjectRecommendationsCard,
} from "@web-app/components/cards";
import { EducationLoader } from "@web-app/components/loaders";
import StudentProfileSelector from "@web-app/containers/student-profile-selector/StudentProfileSelector";
import { getUserInfo } from "@web-app/helpers";
import { useCourseNameStore, useCurriculumStore } from "@web-app/stores";
import { trpc } from "@web-app/utils/trpc";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const StudentPage: NextPage = () => {
  const courseName = useCourseNameStore((state) => state.courseName);
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
    pipe(
      schoolYearsData,
      O.fromNullable,
      O.flatMap((schoolYear) => O.fromNullable(schoolYear[0]?.startYear)),
      O.tap(setSchoolYear),
    );
  }, [schoolYearsData, setSchoolYear]);

  const { data: studentData, status: studentDataStatus } = trpc.useQuery([
    "studentData.details",
    {
      studentId: id,
      schoolYear: schoolYear,
    },
  ]);

  if (studentDataStatus === "loading") {
    return <EducationLoader />;
  }

  if (studentDataStatus === "error" || !studentData) {
    return <div>Error</div>;
  }

  const userInfo = getUserInfo(studentData.studentRecords);
  const isSuccess = typeof userInfo !== "string";

  return (
    <>
      {!isSuccess && userInfo}
      {studentData && isSuccess && (
        <div>
          <StudentProfileCard
            id={studentData.id}
            studentIdNumber={studentData.studentIdNumber}
            firstName={studentData.firstName}
            lastName={studentData.lastName}
            email={studentData.email}
            phoneNumber={studentData.phoneNumber}
            address={studentData.address}
            userInfo={{
              course: courseName ?? "--",
              yearLevel: userInfo.yearLevel,
              enrollmentType: userInfo.enrollmentType,
              semesterType: userInfo.semesterType,
            }}
          />
          {schoolYearsData && (
            <StudentProfileSelector
              schoolYearsData={schoolYearsData}
              setSchoolYear={setSchoolYear}
            />
          )}
          <StudentRecordsCard records={studentData.studentRecords} />
          <div className="mt-20" />
          <SubjectRecommendationsCard
            studentId={id}
            enrollmentType={userInfo.enrollmentType}
            course={userInfo.course}
            userInfo={userInfo}
          />
          <div className="mt-20" />
          <SubjectListCard
            studentId={id}
            semesterType={semesterType}
            enrollmentType={userInfo.enrollmentType}
            course={userInfo.course}
            userInfo={userInfo}
          />
        </div>
      )}
    </>
  );
};

export default StudentPage;
