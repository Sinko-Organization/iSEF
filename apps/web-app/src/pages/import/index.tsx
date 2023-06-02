import ExcelFileUploadButton from "@web-app/components/buttons";
import type { Semester } from "@web-app/types/semester";
import { dataOutputSchema, fields } from "@web-app/types/spreadsheet/second";
import { trpc } from "@web-app/utils/trpc";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import { Result } from "react-spreadsheet-import/types/types";
import { match } from "ts-pattern";

// TODO: Improve UI for this page

const Import: NextPage = () => {
  const { data: session } = useSession();
  const { mutate: uploadData, isLoading } = trpc.useMutation([
    "studentData.upload.v2",
  ]);
  const [open, setOpen] = useState<boolean>(false);

  const toggleButton = (state: boolean) => () => {
    setOpen(state);
  };

  const onSubmit = async (data: Result<string>) => {
    const result = dataOutputSchema.safeParse(data);
    if (!result.success) {
      console.error(result.error.message);
    } else {
      const mappedResults = result.data.validData.map((student) => ({
        ...student,
        firstName: student.firstName ?? "",
        lastName: student.lastName ?? "",
        semesterType: match(student.semesterType)
          .with("1", () => "FIRST")
          .with("2", () => "SECOND")
          .with("3", () => "SUMMER")
          .otherwise(() => "FIRST") as Semester,
      }));
      uploadData(
        {
          studentRecords: mappedResults,
        },
        {
          onSuccess: () => {
            toast.success("Successfully uploaded student records!");
          },
        },
      );
    }
  };

  if (!session) {
    return <div>Not signed in</div>;
  }

  return (
    <>
      <div className="mx-20 font-sans mt-10 flex flex-col align-middle justify-center">
        <h1 className="text-4xl font-semibold text-start mb-10">
          Import Student Records
        </h1>
        <ExcelFileUploadButton
          onClick={toggleButton(true)}
          disabled={isLoading}
        />
        <ReactSpreadsheetImport
          isOpen={open}
          onClose={toggleButton(false)}
          onSubmit={onSubmit}
          fields={fields}
        />
      </div>
      <Toaster />
    </>
  );
};

export default Import;
