import { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "@web-app/utils/trpc";
import SubjectDetailsCard from "@web-app/components/cards/SubjectDetailsCard";
import { IconButton } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";



const SubjectPage: NextPage = () => {
    const router = useRouter();
    const { code } = router.query as { code: string };


    return (
        <>
            <Link href="/subjects">
                <IconButton className="btn" size="small">
                    <ArrowBackIcon />
                </IconButton>
            </Link>
            <SubjectDetailsCard code={code} />
        </>
    );
};

export default SubjectPage;
