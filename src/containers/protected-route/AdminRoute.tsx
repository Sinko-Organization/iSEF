import { useRouter } from "next/router";
import type { FC } from "react";

import { trpc } from "@/utils/trpc";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: FC<Props> = ({ children }) => {
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

export default ProtectedRoute;
