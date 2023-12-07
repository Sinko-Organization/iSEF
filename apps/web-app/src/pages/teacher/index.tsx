import { NextPage } from "next";
import { useRouter } from "next/router";
import TeacherProfileCard from "@web-app/components/cards/TeacherProfileCard";

const TeacherPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  return (
    <>
      <TeacherProfileCard />
    </>
  );
};

export default TeacherPage;