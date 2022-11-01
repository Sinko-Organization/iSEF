import type { NextPage } from "next";

import { useState } from "react";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import { Result } from "react-spreadsheet-import/types/types";

import { fields, dataOutputSchema } from "../types/spreadsheet";
import { trpc } from "../utils/trpc";

const Import: NextPage = () => {
  const { mutate: uploadData } = trpc.useMutation(["studentData.upload2"]);
  const [open, setOpen] = useState<boolean>(false);

  const toggleButton = (state: boolean) => () => {
    setOpen(state);
  };

  const onSubmit = async (data: Result<string>) => {
    const result = dataOutputSchema.safeParse(data);
    if (!result.success) {
      console.log(result.error.message);
    } else {
      console.log(result.data);
      // uploadData(result.data.validData);
    }
  };

  return (
    <>
      <button onClick={toggleButton(true)}>Import File</button>
      <ReactSpreadsheetImport
        isOpen={open}
        onClose={toggleButton(false)}
        onSubmit={onSubmit}
        fields={fields}
      />
    </>
  );
};

export default Import;
