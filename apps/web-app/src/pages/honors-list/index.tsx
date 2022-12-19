import { trpc } from "@web-app/utils/trpc";
import type { NextPage } from "next";
import { useEffect } from "react";

const Index: NextPage = () => {
  const { data } = trpc.useQuery([
    "honors.getAll",
    {
      schoolYear: 2021,
      semesterType: "FIRST",
      skip: 100,
      take: 10,
    },
  ]);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <>
      <h1>Honors List</h1>
      <div className="flex flex-col gap-3">
        {data &&
          data.map((studentDetails, idx) => {
            return (
              <div key={studentDetails.id} className="flex flex-row gap-3">
                <h1>{idx}</h1>
                <h3>{studentDetails.firstName}</h3>
                <h3>{studentDetails.lastName}</h3>
                <h3>{studentDetails.gwa.toFixed(2)}</h3>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Index;
