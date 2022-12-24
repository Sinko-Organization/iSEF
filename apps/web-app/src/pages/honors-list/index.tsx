import { HonorsListTable } from "@web-app/components/tables";
import { useHonorsFilterStore } from "@web-app/stores";
import { trpc } from "@web-app/utils/trpc";
import type { NextPage } from "next";

const Index: NextPage = () => {
  const {
    schoolYear,
    setSchoolYear,
    semesterType,
    setSemesterType,
    yearLevel,
    setYearLevel,
    field,
    order,
    setField,
    setOrder,
    setSkip,
    setTake,
    skip,
    take,
  } = useHonorsFilterStore();
  const { data } = trpc.useQuery(
    [
      "honors.getAll",
      {
        schoolYear: 2021,
        semesterType,
        yearLevel,
        skip: 0,
        take: 20,
        sortBy: {
          field: "gwa",
          order: "desc",
        },
      },
    ],
    {
      // handle error
      onError: (err) => {
        console.log(err.data?.code);
      },
    },
  );

  return (
    <>
      <div className="mx-20 mt-10">
        {data && <HonorsListTable honorsList={data} />}
      </div>
    </>
  );
};

export default Index;
