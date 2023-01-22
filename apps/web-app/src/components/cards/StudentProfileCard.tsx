import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import type { IconButtonProps } from "@mui/material/IconButton";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { trpc } from "@web-app/utils/trpc";
import type { inferMutationInput } from "@web-app/utils/trpc";
import { useFormik } from "formik";

type UpdateStudentInput = inferMutationInput<"student.update">;

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

type StudentProfileCardProps = {
  studentIdNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
};

type Props = {
  [P in keyof StudentProfileCardProps]: StudentProfileCardProps[P] | null;
};

export default function RecipeReviewCard({
  studentIdNumber,
  firstName,
  lastName,
  email,
  phoneNumber,
  address,
}: Props) {
  const { mutate: updateStudent, isLoading } = trpc.useMutation([
    "student.update",
  ]);
  const formik = useFormik<Props>({
    initialValues: {
      studentIdNumber,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
    },
    onSubmit: (values) => {
      const newValues: UpdateStudentInput = {
        ...values,
        middleName: null,
      };
      updateStudent(newValues);
    },
  });
  return (
    <Card>
      <CardHeader className="bg-blue-700 h-10" />
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container direction="row" spacing={3}>
            <Grid item xs={6}>
              <TextField
                name="studentIdNumber"
                label="Student ID"
                fullWidth
                variant="standard"
                value={formik.values.studentIdNumber}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="firstName"
                label="First Name"
                fullWidth
                variant="standard"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="lastName"
                label="Last Name"
                fullWidth
                variant="standard"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="email"
                type="email"
                id="outlined-required"
                label="Email"
                fullWidth
                variant="standard"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="phoneNumber"
                type="tel"
                id="outlined-required"
                label="Phone"
                fullWidth
                variant="standard"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="address"
                id="outlined-required"
                label="Address"
                fullWidth
                variant="standard"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Button
            sx={{ mt: 3, mb: 2 }}
            color="secondary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Edit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
