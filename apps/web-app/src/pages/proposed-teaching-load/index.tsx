import { NextPage } from "next";
import { ProposedTeachingLoadTable } from "@web-app/components/tables";
import AddPTL from "@web-app/components/buttons/AddPTL";
import { Add } from "@mui/icons-material";
import { trpc } from "@web-app/utils/trpc";


const ProposedTeachingLoad: NextPage = () => {
  // Fetch Data
  const { data: PTLList, error: PTLerror } = trpc.useQuery(
    ["proposedTeachingLoad.getAll"]
  );

  return (
    <>
      <AddPTL />
      <ProposedTeachingLoadTable PTLs={PTLList} />
    </>
  );
};

export default ProposedTeachingLoad;