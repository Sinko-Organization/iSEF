import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";

const SignIn: NextPage = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default SignIn;