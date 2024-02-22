import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { trpc } from '@web-app/utils/trpc';
import React from 'react';
import { EducationLoader } from '../loaders';
import EditSubjectButton from '../buttons/EditSubjectButton';
import RemoveSubjectButton from '../buttons/RemoveSubjectButton';

interface Props {
    code: string;
}


export default function SubjectDetailsCard({ code
}: Props) {

    const { data: subject, error } = trpc.useQuery(["subjectList.get", { subCode: code }]);

    if (!subject) {
        return <EducationLoader />
    }

    return (
        <Card style={{ maxWidth: 400, margin: 'auto' }}>
            <CardHeader
                title={subject.subCode}
                action={
                    <div>
                        <EditSubjectButton subCode={subject.subCode} />
                        <RemoveSubjectButton subCode={subject.subCode} />
                    </div>
                }
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    <strong>Subject Title:</strong> {subject.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <strong>Units:</strong> {subject.units}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <strong>Curriculum:</strong> {subject.curriculum}
                </Typography>
            </CardContent>
        </Card>
    );
};
