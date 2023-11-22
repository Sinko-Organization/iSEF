import { EducationLoader } from "@web-app/components/loaders";
import { trpc } from "@web-app/utils/trpc";
import { useRouter } from "next/router";
import type { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const SuperAdminRoute: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { data: user, error } = trpc.useQuery(["user.role"]);

  if (error) {
    router.push("/");
  }

  if (!user) {
    return <EducationLoader />;
  }

  if (user.role !=="superadmin") {
    router.push("/");
  }

  return <div>{children}</div>;
};

export default SuperAdminRoute;
