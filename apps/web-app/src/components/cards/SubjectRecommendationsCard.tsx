import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { trpc } from "@web-app/utils/trpc";
import _ from "lodash";
import { match } from "ts-pattern";

type Props = {
  studentId: string;
  semesterType: "FIRST" | "SECOND" | "SUMMER";
};
export default function StudentProfileCard({ studentId }: Props) {
  const { data: recommended } = trpc.useQuery([
    "subject.getRecommendedSubjects",
    {
      studentId,
      enrollmentType: "Regular",
    },
  ]);

  const { data: recommendedV2 } = trpc.useQuery([
    "subject.getRecommendedSubjectsV2",
    {
      studentId,
      enrollmentType: "Regular",
    },
  ]);

  if (!recommendedV2) {
    return <></>;
  }

  console.log(
    recommendedV2?.dependencyCodes.map((d) => d.stubCode),
    recommendedV2?.parsedDependencyList,
  );

  const depCode = recommendedV2.dependencyCodes.map((d) => d.stubCode);
  const parsedCode = recommendedV2.parsedDependencyList;

  // use lodash and find the difference between the two arrays
  const difference = _.difference(parsedCode, depCode);

  console.log(difference);

  const groupedByYearLevel = _(recommended)
    .groupBy("yearLevel")
    .map((subjects, yearLevel) => ({
      subjects: subjects
        .map((subject) => {
          const { yearLevel: _, ...rest } = subject;
          return rest;
        })
        .sort(
          // sort by this order
          // FIRST > SECOND > SUMMER
          (a) => {
            return match(a.semesterType)
              .with("FIRST", () => 1)
              .with("SECOND", () => -1)
              .with("SUMMER", () => 0)
              .exhaustive();
          },
        ),
      yearLevel: Number.parseInt(yearLevel),
    }))
    .orderBy("yearLevel")
    .value();

  return (
    <>
      <Card>
        <CardHeader
          sx={{
            fontWeight: "bold",
          }}
          title={"Subject Recommendations"}
        />
        <CardContent>
          {recommended ? (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="text-bold">Subject</TableCell>
                  <TableCell className="text-bold">Subject Code</TableCell>
                  <TableCell className="text-bold">Status</TableCell>
                  <TableCell className="text-bold">Year Level</TableCell>
                  <TableCell className="text-bold">Semester Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recommended.map((subj, idx) => (
                  <TableRow
                    key={`${subj.id}-${subj.name}-${idx}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{subj.name}</TableCell>
                    <TableCell>{subj.stubCode}</TableCell>
                    <TableCell>{subj.status}</TableCell>
                    <TableCell>{subj.yearLevel}</TableCell>
                    <TableCell className="capitalize">
                      {subj.semesterType.toLowerCase()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No records found
            </Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
}
