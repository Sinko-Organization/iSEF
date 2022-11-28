import type { NextPage } from "next";
import { useRouter } from "next/router";

import { trpc } from "@/utils/trpc";

const StudentPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== "string") {
    return <div>Error</div>;
  }

  const studentDetails = trpc.useQuery([
    "studentData.details",
    {
      studentId: id,
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
          <div>ID: {data.studentIdNumber}</div>
          <div>
            Name: {data.firstName} {data.lastName}
          </div>
          <div>Email: {data.email ?? "No email"}</div>
          <div>Phone: {data.phoneNumber ?? "No phone"}</div>
          <div>Address: {data.address ?? "No address"}</div>
          {/* Student Records */}
          <div>Student Records</div>
          {data.studentRecords.map((record) => (
            // table with spacing
            <div key={record.id} className="flex flex-row gap-5">
              <div>Grade: {record.grade}</div>
              <div>
                SY {record.schoolYear.startYear} {record.schoolYear.endYear}
              </div>
              <div>Subject: {record.subject.name}</div>
              <div>Stub Code: {record.subject.stubCode}</div>
              <div>Units: {record.subject.units}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default StudentPage;
