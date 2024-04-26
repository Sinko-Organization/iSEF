import { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "@web-app/utils/trpc";
import EditPTL from "@web-app/components/buttons/EditPTL";



const PTLPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };

    const { data: PTLdata, status: PTLDataStatus } = trpc.useQuery([
        "proposedTeachingLoad.get",
        { PTLId: id },
    ]);

    return (
        <>
            <EditPTL id={id} />
            <div>CUID: {id}</div>
            <div>put PTL info here</div>
        </>
    );
};

export default PTLPage;
