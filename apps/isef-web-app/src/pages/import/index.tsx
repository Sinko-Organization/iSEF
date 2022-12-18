import {
  SchoolYearSelector,
  SemesterSelector,
} from "@isef-web-app/components/selectors";
import type { Semester } from "@isef-web-app/types/semester";
import { dataOutputSchema, fields } from "@isef-web-app/types/spreadsheet";
import { trpc } from "@isef-web-app/utils/trpc";
import _ from "lodash";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import { Result } from "react-spreadsheet-import/types/types";

const Import: NextPage = () => {
  const { data: session } = useSession();
  const { mutate: uploadData } = trpc.useMutation(["studentData.upload"]);
  const [open, setOpen] = useState<boolean>(false);
  const [schoolYear, setSchoolYear] = useState<string>("1990");
  const [semester, setSemester] = useState<Semester>("FIRST");

  const toggleButton = (state: boolean) => () => {
    setOpen(state);
  };

  const onSubmit = async (data: Result<string>) => {
    const result = dataOutputSchema.safeParse(data);
    if (!result.success) {
      console.log(result.error.message);
    } else {
      uploadData({
        studentRecords: result.data.validData,
        schoolYear: {
          startYear: _.toInteger(schoolYear),
          endYear: _.toInteger(schoolYear) + 1,
        },
        semester,
      });
    }
  };

  if (!session) {
    return <div>Not signed in</div>;
  }

  return (
    <div className="mx-20 mt-10">
      <div className="my-10">
        <SchoolYearSelector
          schoolYear={schoolYear}
          setSchoolYear={setSchoolYear}
        />
      </div>
      <div className="my-10">
        <SemesterSelector semester={semester} setSemester={setSemester} />
      </div>
      <button onClick={toggleButton(true)}>Import File</button>
      <ReactSpreadsheetImport
        isOpen={open}
        onClose={toggleButton(false)}
        onSubmit={onSubmit}
        fields={fields}
      />
    </div>
  );
};

export default Import;
