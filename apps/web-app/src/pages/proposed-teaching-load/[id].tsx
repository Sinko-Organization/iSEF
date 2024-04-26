import { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "@web-app/utils/trpc";
import EditPTL from "@web-app/components/buttons/EditPTL";
import PTLDetailsCard from "@web-app/components/cards/PTLDetailsCard";



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
            <PTLDetailsCard id={id} />
        </>
    );
};

export default PTLPage;
