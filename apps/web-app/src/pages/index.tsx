import { AccountError } from "@web-app/components/errors";
import { trpc } from "@web-app/utils/trpc";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const SignIn = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: userRole } = trpc.useQuery(["user.role"]);
  if (userRole?.role === "admin" && session) {
    router.push("/dashboard");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {session && userRole?.role !== "admin" && <AccountError />}
      {!session && (
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Not signed in
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <button
                onClick={() => signIn()}
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SignIn;
