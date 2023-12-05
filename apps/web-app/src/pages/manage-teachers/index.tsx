// ManageTeachersPage component
import { useState } from "react";
import { NextPage } from 'next';
import TeacherManagementTable from '@web-app/components/tables/TeacherManagementTable';
import TeacherDetails from '@web-app/components/tables/TeacherDetails';
import { inferQueryOutput } from "@web-app/utils/trpc";

const ManageTeachersPage: NextPage = () => {
  const [selectedTeacher, setSelectedTeacher] = useState<inferQueryOutput<"teacher.getAll"> | null>(null);

  const handleTeacherSelection = (teacher: inferQueryOutput<"teacher.getAll">) => {
    setSelectedTeacher(teacher);
  };

  return (
    <div>
      <TeacherManagementTable teachers={[]} onTeacherSelect={handleTeacherSelection} />
      {selectedTeacher && <TeacherDetails teacher={selectedTeacher} />}
    </div>
  );
};

export default ManageTeachersPage;