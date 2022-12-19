// src/server/router/index.ts
import superjson from "superjson";

import { createRouter } from "./context";
import { courseRouter } from "./course";
import { exampleRouter } from "./example";
import { honorsRouter } from "./honors";
import { protectedExampleRouter } from "./protected-example-router";
import { schoolYearRouter } from "./school-year";
import { studentDataRouter } from "./student-data";
import { userRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("auth.", protectedExampleRouter)
  .merge("studentData.", studentDataRouter)
  .merge("course.", courseRouter)
  .merge("schoolYear.", schoolYearRouter)
  .merge("user.", userRouter)
  .merge("honors.", honorsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
