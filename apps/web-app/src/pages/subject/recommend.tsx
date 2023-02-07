import { trpc } from "@web-app/utils/trpc";
import type { NextPage } from "next";

const Subject: NextPage = () => {
  const { data: recommendedSubjects, status } = trpc.useQuery([
    "subject.getRecommendedSubjects",
    {
      courseId: "1",
      schoolYearId: "1",
      semesterType: "FIRST",
      studentId: "1",
      studentRecords: [
        {
          id: "1",
          subjectId: "1",
          remark: "Passed",
        },
      ],
    },
  ]);
  return (
    <>
      <div>Subject</div>
    </>
  );
};

export default Subject;
