export const toNumericGrade = (input: string): number => {
  const grade = Number.parseFloat(input);

  if (Number.isNaN(grade)) {
    return 0;
  } else {
    return grade > 5 || grade < 1 ? 0 : grade;
  }
};
