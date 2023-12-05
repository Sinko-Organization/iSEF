import { NextPage } from 'next';
import TeacherManagementTable from '@web-app/components/tables/TeacherManagementTable';
import TeacherTable from '@web-app/components/tables/TeacherTable';

const ManageTeachersPage: NextPage = () => {

    return (
        <div>
            <TeacherManagementTable teachers={[]} />
        </div>
    );




}

export default ManageTeachersPage;