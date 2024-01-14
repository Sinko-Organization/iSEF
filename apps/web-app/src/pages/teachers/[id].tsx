import { NextPage } from "next";
import { useRouter } from "next/router";
import TeacherProfileCard from "@web-app/components/cards/TeacherProfileCard";
import { TeacherSubjectListCard } from "@web-app/components/cards";
import { trpc } from "@web-app/utils/trpc";
import type { SemesterType } from "@prisma/client";



const TeacherPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { data: teacherData, status: teacherDataStatus } = trpc.useQuery([
    "teacher.get",
    { teacherId: id },
  ]);

  return (
    <>
      <TeacherProfileCard teacherID={id} />
      <TeacherSubjectListCard/>
    </>
  );
};

export default TeacherPage;
