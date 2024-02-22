import { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "@web-app/utils/trpc";
import SubjectDetailsCard from "@web-app/components/cards/SubjectDetailsCard";



const SubjectPage: NextPage = () => {
    const router = useRouter();
    const { code } = router.query as { code: string };


    return (
        <>
            <SubjectDetailsCard code={code} />
        </>
    );
};

export default SubjectPage;
