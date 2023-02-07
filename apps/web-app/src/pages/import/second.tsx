import Button from "@mui/material/Button";
import { SemesterSelector } from "@web-app/components/selectors";
import type { Semester } from "@web-app/types/semester";
import { dataOutputSchema, fields } from "@web-app/types/spreadsheet/second";
import { trpc } from "@web-app/utils/trpc";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import { Result } from "react-spreadsheet-import/types/types";

// TODO: Improve UI for this page

const Import: NextPage = () => {
  const { data: session } = useSession();
  const { mutate: uploadData, isLoading } = trpc.useMutation([
    "studentData.upload.v2",
  ]);
  const [open, setOpen] = useState<boolean>(false);
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
        semester,
      });
    }
  };

  if (!session) {
    return <div>Not signed in</div>;
  }

  return (
    <div className="mx-20 mt-10">
      {/* loading component */}

      {isLoading && <div>Uploading...</div>}

      <div className="my-10">
        <SemesterSelector semester={semester} setSemester={setSemester} />
      </div>
      <Button
        onClick={toggleButton(true)}
        disabled={isLoading}
        variant="contained"
      >
        Import File
      </Button>
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
