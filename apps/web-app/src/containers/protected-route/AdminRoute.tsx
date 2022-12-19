import { trpc } from "@web-app/utils/trpc";
import { useRouter } from "next/router";
import type { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const AdminRoute: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { data: user } = trpc.useQuery(["user.role"]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (user.role !== "admin") {
    router.push("/");
  }

  return <div>{children}</div>;
};

export default AdminRoute;
