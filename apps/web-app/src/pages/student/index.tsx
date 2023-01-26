import {
  StudentProfileCard,
  StudentRecordsCard,
} from "@web-app/components/cards";
import { useCurriculumStore } from "@web-app/stores";
import { trpc } from "@web-app/utils/trpc";
import _ from "lodash";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const StudentPage: NextPage = () => {
  const { schoolYear, semesterType } = useCurriculumStore();
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== "string") {
    return <div>Error</div>;
  }

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

  console.log(data);
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
          {/* Student Records */}
          <StudentRecordsCard records={data.studentRecords} />
        </div>
      )}
    </>
  );
};

export default StudentPage;
