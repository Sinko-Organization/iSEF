import { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "@web-app/utils/trpc";



const PTLPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };

    const { data: PTLdata, status: PTLDataStatus } = trpc.useQuery([
        "proposedTeachingLoad.get",
        { PTLId: id },
    ]);

    return (
        <>
            <div>CUID: {id}</div>
            <div>put PTL info here</div>
        </>
    );
};

export default PTLPage;
