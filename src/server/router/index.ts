// src/server/router/index.ts
import superjson from "superjson";

import { createRouter } from "./context";
import { courseRouter } from "./course";
import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { studentDataRouter } from "./student-data";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("auth.", protectedExampleRouter)
  .merge("studentData.", studentDataRouter)
  .merge("course.", courseRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
