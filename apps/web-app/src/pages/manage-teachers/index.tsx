import { NextPage } from 'next';
import TeacherTable from '@web-app/components/tables/TeacherTable';

const ManageTeachersPage: NextPage = () => {

    return (
        <div>
           <TeacherTable/>
        </div>
    );
}

export default ManageTeachersPage;