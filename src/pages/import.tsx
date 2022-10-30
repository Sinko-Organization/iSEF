import type { NextPage } from "next";

import { useState } from "react";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";

import { fields, dataOutputSchema } from "../types/spreadsheet";
import { Result } from "react-spreadsheet-import/types/types";

const Import: NextPage = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleButton = (state: boolean) => () => {
    setOpen(state);
  };

  const onSubmit = (data: Result<string>) => {
    const res = dataOutputSchema.parse(data);
    console.log(res);
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
