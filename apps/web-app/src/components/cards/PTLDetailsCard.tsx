import { Card, CardContent, CardHeader, Typography } from "@mui/material";


interface Props {
    id: string;
}

export default function PTLDetailsCard({ id }: Props) {
    return (
        <Card style={{ maxWidth: 400, margin: 'auto' }}>
            <CardHeader
                title={"Proposed Teaching Load Details"} />
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    <strong>Teacher Id:</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <strong>SubCode:</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <strong>Lec Hours:</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <strong>Lab Hours:</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <strong>Remarks:</strong>
                </Typography>
            </CardContent>
        </Card>
    )
}