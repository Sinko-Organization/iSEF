import { createRouter } from "../context";

export const userRouter = createRouter()
  /**
   * Queries
   */
  .query("role", {
    resolve({ ctx }) {
      return ctx.prisma.user.findUnique({
        where: {
          id: ctx.session?.user?.id,
        },
        select: {
          role: true,
        },
      });
    },
  });
