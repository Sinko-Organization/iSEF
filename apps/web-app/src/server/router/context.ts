// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { Session } from "next-auth";

import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { prisma } from "../db/client";

type CreateContextOptions = {
  session: Session | null;
};

/** Use this helper for:
 * - testing, where we dont have to Mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (
  opts: trpcNext.CreateNextContextOptions,
) => {
  const { req, res } = opts;

  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerAuthSession({ req, res });

  return await createContextInner({
    session,
  });
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();

/**
 * Creates a tRPC router that asserts all queries and mutations are from an authorized user. Will throw an unauthorized error if a user is not signed in.
 **/
export function createProtectedRouter() {
  return createRouter().middleware(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        ...ctx,
        // infers that `session` is non-nullable to downstream resolvers
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });
}

/**
 * Creates a trpc router that is protected and also asserts that the user is an admin
 */

export function createAdminRouter() {
  return createProtectedRouter().middleware(async ({ ctx, next }) => {
    const role = await ctx.prisma.user
      .findUnique({
        where: {
          id: ctx.session?.user?.id,
        },
        select: {
          role: true,
        },
      })
      .then((res) => res?.role);

    if (role !== "admin") {
      throw new trpc.TRPCError({ code: "FORBIDDEN" });
    }

    return next();
  });
}

/**
 * Create a function that returns the user session
 */
export const createUserSession = async () => {
  const ctx = await createContextInner({
    session: null,
  });

  // create a user with the following properties
  const user = await ctx.prisma.user.create({
    data: {
      email: "user@website.com",
      name: "User",
      role: "admin",
    },
  });

  return createContextInner({
    session: {
      user,
      expires: "100",
    },
  });
};

/**
 * Delete all data within the database
 */

export const deleteAllData = async () => {
  const ctx = await createContextInner({
    session: null,
  });

  const tablenames = await ctx.prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== "_prisma_migrations")
    .map((name) => `"public"."${name}"`)
    .join(", ");

  try {
    await ctx.prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
  } catch (error) {
    console.log({ error });
  }
};

export const deleteRecords = async () => {
  const ctx = await createContextInner({
    session: null,
  });

  try {
    await ctx.prisma.course.deleteMany();
    await ctx.prisma.user.deleteMany();
    await ctx.prisma.student.deleteMany();
    await ctx.prisma.studentRecord.deleteMany();
    await ctx.prisma.schoolYear.deleteMany();
    await ctx.prisma.subject.deleteMany();
    await ctx.prisma.teacher.deleteMany();
    await ctx.prisma.example.deleteMany();
    await ctx.prisma.account.deleteMany();
    await ctx.prisma.verificationToken.deleteMany();
    await ctx.prisma.session.deleteMany();
  } catch (error) {
    console.log({ error });
  }
};
