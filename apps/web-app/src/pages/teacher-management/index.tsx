import AdminError from "@web-app/components/errors/AdminError";
import { EducationLoader } from "@web-app/components/loaders";
import { TeacherManagementTable } from "@web-app/components/tables";
import { trpc } from "@web-app/utils/trpc";
import { NextPage } from "next";
import toast, { Toaster } from "react-hot-toast";


const TeacherManagementPage: NextPage = () => {

  const { data: user, error } = trpc.useQuery(["user.role"]);
  const { data: teachers, error: teachersError } = trpc.useQuery(
    ["teacher.getAll"],
    {},
  );



  if (!teachers) {
    return <EducationLoader />;
  }
  return (
    <>
      {user?.role === "admin" || user?.role === "superadmin" ? (
        <div className="mx-32 fontsans mt-10">
          <TeacherManagementTable
            teachers={teachers!}
          />
        </div>
      ) : (
        <AdminError />
      )}
      <Toaster />
    </>
  );
};

export default TeacherManagementPage;
