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
                  <TableCell className="text-bold">Stubcode</TableCell>
                  <TableCell className="text-bold">Status</TableCell>
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
