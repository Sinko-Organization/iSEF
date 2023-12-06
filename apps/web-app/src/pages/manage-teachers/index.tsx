import { NextPage } from 'next';
import TeacherManagementTable from '@web-app/components/tables/TeacherManagementTable';

const ManageTeachersPage: NextPage = () => {

    return (
        <div>
            <TeacherManagementTable teachers={[]} />
        </div>
    );
};

export default ManageTeachersPage;