import type { NextPage } from "next";
import type { DataOutput } from "../types/spreadsheet";

import { useState } from "react";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import Button from "@mui/material/Button";

import { fields, dataOutputSchema } from "../types/spreadsheet";

const Import: NextPage = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleButton = (state: boolean) => () => {
    setOpen(state);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Button onClick={toggleButton(true)} variant="contained">
        Import File
      </Button>
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
