import { NextPage } from "next";
import { ProposedTeachingLoadTable } from "@web-app/components/tables";
import AddPTL from "@web-app/components/buttons/AddPTL";
import { Add } from "@mui/icons-material";
import { trpc } from "@web-app/utils/trpc";
import { Box, Grid } from "@mui/material";


const ProposedTeachingLoad: NextPage = () => {
  // Fetch Data
  const { data: PTLList, error: PTLerror } = trpc.useQuery(
    ["proposedTeachingLoad.getAll"]
  );

  return (
    <Grid paddingTop={5} paddingX={5} sx={{ flexGrow: 1 }}>
      <Grid item container justifyContent="flex-end" paddingTop={1}>
        <Box>
          <AddPTL />
        </Box>
      </Grid>
      <ProposedTeachingLoadTable PTLs={PTLList} />
    </Grid>


  );
};

export default ProposedTeachingLoad;