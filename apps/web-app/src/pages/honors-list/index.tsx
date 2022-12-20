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
      {/* Filters */}
      <div className="my-5 flex flex-col">
        <h3>Filters</h3>
        <div className="flex flex-row gap-3">
          <h4 className="font-bold">Year Level</h4>
          <select
            value={yearLevel}
            onChange={(e) => {
              setYearLevel(Number(e.target.value));
            }}
          >
            <option value={1}>1st Year</option>
            <option value={2}>2nd Year</option>
            <option value={3}>3rd Year</option>
            <option value={4}>4th Year</option>
            <option value={5}>5th Year</option>
          </select>
        </div>
        {/* Semester Type */}
        <div className="flex flex-row gap-3">
          <h4 className="font-bold">Semester Type</h4>
          <select
            value={semesterType}
            onChange={(e) => {
              setSemesterType(e.target.value as "FIRST" | "SECOND");
            }}
          >
            <option value="FIRST">First Semester</option>
            <option value="SECOND">Second Semester</option>
            <option value="SUMMER">Summer</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1>Honors List</h1>
        {data &&
          data.map((studentDetails, idx) => {
            return (
              <div key={studentDetails.id} className="flex flex-row gap-3">
                <h1>{idx}</h1>
                <h3>{studentDetails.firstName}</h3>
                <h3>{studentDetails.lastName}</h3>
                <h3>{studentDetails.gwa.toFixed(2)}</h3>
                <h3>{studentDetails.studentRecords[0]?.yearLevel}</h3>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Index;
