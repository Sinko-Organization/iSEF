// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import * as trpc from "@trpc/server";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "../../../server/db/client";

import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async signIn({ user }) {
      // check if user's role is admin
      const role = await prisma.user
        .findUnique({
          where: {
            id: user.id,
          },
          select: {
            role: true,
          },
        })
        .then((res) => res?.role);

      // if user's role is not admin, return an error
      if (role !== "admin") {
        throw new trpc.TRPCError({
          code: "FORBIDDEN",
        });
      }

      return true;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@world.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (email == "hans@yahoo.com" && password == "12345") {
          return { id: "1", email: "hans@yahoo.com", password: "12345" };
        }

        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
