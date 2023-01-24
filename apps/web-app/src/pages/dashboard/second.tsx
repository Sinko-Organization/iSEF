import { DashboardTable2 } from "@web-app/components/tables";
import type { NextPage } from "next";

const Second: NextPage = () => {
  return (
    <>
      {/* add some margin  */}
      <div className="mx-32 mt-10">
        <DashboardTable2 courseData={[]} />
      </div>
    </>
  );
};

export default Second;
