import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const SignIn: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    router.push("/dashboard");
  }
  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </>
  );
};

export default SignIn;
