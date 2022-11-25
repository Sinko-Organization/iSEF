import type { FC } from "react";

import { DashboardTable } from "@/components/tables";
import { trpc } from "@/utils/trpc";

const index: FC = ({}) => {
  const coursePopulations = trpc.useQuery(["course.population"]);

  const { data, status } = coursePopulations;

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // error
  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="mx-32 mt-10">
        {data && <DashboardTable rows={data} />}
      </div>
    </>
  );
};

export default index;
