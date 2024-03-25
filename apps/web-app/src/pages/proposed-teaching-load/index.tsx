import { NextPage } from "next";
import { ProposedTeachingLoadTable} from "@web-app/components/tables";
import { AddPTL } from "@web-app/components/buttons";
import { Add } from "@mui/icons-material";

const ProposedTeachingLoad: NextPage = () => {
  return (
    <>
    <AddPTL />
    <ProposedTeachingLoadTable />
    </>
  );
};

export default ProposedTeachingLoad;