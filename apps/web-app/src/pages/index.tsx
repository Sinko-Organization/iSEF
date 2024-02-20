import { AccountError } from "@web-app/components/errors";
import Hero from "@web-app/components/hero";
import Navbar from "@web-app/components/navbars";
import { trpc } from "@web-app/utils/trpc";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SignIn = () => {
  

  const router = useRouter();
  const { data: session } = useSession();
  const { data: userRole } = trpc.useQuery(["user.role"]);
  const { data: userEmail } = trpc.useQuery(["user.email"]);
  const { mutate: updateLastAccess} = trpc.useMutation(["user.updateLatestAccess"]);



  if (
    (userRole?.role === "admin" || userRole?.role === "superadmin") &&
    session
  ) {
    updateLastAccess(userEmail);
    router.push("/dashboard");
  }
  return (
    <>
      {session && userRole?.role !== "admin" && (
        <div className="min-h-screen flex items-center justify-center">
          {" "}
          <AccountError />
        </div>
      )}
      {!session && (
        <>
          <Navbar signIn={() => signIn()} />
          <Hero signIn={() => signIn()} />
        </>
      )}
    </>
  );
};
export default SignIn;
