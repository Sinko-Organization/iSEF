import { NextPage } from "next";
import { useRouter } from "next/router";
import TeacherProfileCard from "@web-app/components/cards/TeacherProfileCard";

const TeacherPage: NextPage = () => {
    const router = useRouter();

    return (
        <>
            <TeacherProfileCard teacherID={router.query.id} />
        </>
    );
};

export default TeacherPage;