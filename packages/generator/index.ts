import { faker } from "@faker-js/faker";
import type { Schema } from "write-excel-file";
import writeXlsxFile from "write-excel-file/node";

type Student = {
  firstName: string;
  lastName: string;
};
const generateNames = (count: number) => {
  const names = [] as Student[];
  for (let i = 0; i < count; i++) {
    names.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });
  }
  const schema: Schema<Student> = [
    {
      column: "First Name",
      value: (row) => row.firstName,
    },
    {
      column: "Last Name",
      value: (row) => row.lastName,
    },
  ];
  writeXlsxFile(names, {
    schema,
    filePath: "names.xlsx",
  });
};
generateNames(8279);
