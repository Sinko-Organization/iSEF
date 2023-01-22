import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import type { IconButtonProps } from "@mui/material/IconButton";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";

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
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
};

type Props = {
  [P in keyof StudentProfileCardProps]: StudentProfileCardProps[P] | null;
};

export default function RecipeReviewCard({
  id,
  firstName,
  lastName,
  email,
  phone,
  address,
}: Props) {
  const formik = useFormik<Props>({
    initialValues: {
      id,
      firstName,
      lastName,
      email,
      phone,
      address,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
                name="id"
                label="Student ID"
                fullWidth
                variant="standard"
                value={formik.values.id}
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
                name="phone"
                type="number"
                id="outlined-required"
                label="Phone"
                fullWidth
                variant="standard"
                value={formik.values.phone}
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
