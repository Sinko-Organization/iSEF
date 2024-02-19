import AdminError from "@web-app/components/errors/AdminError";
import { EducationLoader } from "@web-app/components/loaders";
import { AccessControlTable } from "@web-app/components/tables";
import { trpc } from "@web-app/utils/trpc";
import { NextPage } from "next";
import toast, { Toaster } from "react-hot-toast";

const AccessControlPage: NextPage = () => {
  const utils = trpc.useContext();

  const { data: accounts, error: accountsError } = trpc.useQuery(
    ["user.getAll"],
    {},
  );

  //   Set Admin Mutation
  const { mutate: setAdmin, isLoading: isSettingAdmin } = trpc.useMutation(
    ["user.setAdmin"],
    {
      onSuccess: (user) => {
        utils.invalidateQueries(["user.getAll"]);
        toast.success(`User ${user.name} has been set as admin`);
      },
      onError: () => {
        toast.error("Error setting user as admin");
      },
    },
  );

  //   Set Not Admin Mutation
  const { mutate: setNotAdmin, isLoading: isSettingNotAdmin } =
    trpc.useMutation(["user.setNotAdmin"], {
      onSuccess: (user) => {
        utils.invalidateQueries(["user.getAll"]);
        toast.success(`User ${user.name} has been removed as admin`);
      },
      onError: () => {
        toast.error("Error revoking admin rights");
      },
    });

  if (!accounts) {
    return <EducationLoader />;
  }

  //   Functions for props
  const setUserAsAdmin = (email: string) => {
    setAdmin({
      email,
    });
  };

  const setUserNotAdmin = (email: string) => {
    setNotAdmin({
      email,
    });
  };

  return (
    <>
      {
        <div className="mx-32 fontsans mt-10">
          <AccessControlTable
            users={accounts}
            isSettingAsAdmin={isSettingAdmin}
            setUserAsAdmin={setUserAsAdmin}
            isSettingNotAdmin={isSettingNotAdmin}
            setUserNotAdmin={setUserNotAdmin}
          />
        </div>

      }
      <Toaster />
    </>
  );
};

export default AccessControlPage;
