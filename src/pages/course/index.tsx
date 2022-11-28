import type { NextPage } from "next";
import { useRouter } from "next/router";

import { CourseTable } from "@/components/tables";
import { trpc } from "@/utils/trpc";

const CoursePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== "string") {
    return <div>Error</div>;
  }

  const students = trpc.useQuery([
    "course.getStudents",
    {
      courseId: id,
    },
  ]);

  const { data, isLoading, isError } = students;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="mx-32 mt-10">
        {data && <CourseTable students={data} />}
      </div>
    </>
  );
};

export default CoursePage;
