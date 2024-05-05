// src/server/router/index.ts
import superjson from "superjson";

import { createRouter } from "./context";
import { courseRouter } from "./course";
import { exampleRouter } from "./example";
import { honorsRouter } from "./honors";
import { proposedTeachingLoadRouter } from "./proposedTeachingLoad";
import { protectedExampleRouter } from "./protected-example-router";
import { scheduleRouter } from "./schedule";
import { schoolYearRouter } from "./school-year";
import { studentRouter } from "./student";
import { studentDataRouter } from "./student-data";
import { subjectRouter } from "./subject/subject";
import { subjectListRouter } from "./subjectList";
import { teacherRouter } from "./teacher";
import { userRouter } from "./user";
import { yearLevelRouter } from "./year-level";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("auth.", protectedExampleRouter)
  .merge("studentData.", studentDataRouter)
  .merge("course.", courseRouter)
  .merge("schoolYear.", schoolYearRouter)
  .merge("user.", userRouter)
  .merge("honors.", honorsRouter)
  .merge("student.", studentRouter)
  .merge("yearLevel.", yearLevelRouter)
  .merge("subject.", subjectRouter)
  .merge("teacher.", teacherRouter)
  .merge("subjectList.", subjectListRouter)
  .merge("schedule", scheduleRouter)
  .merge("proposedTeachingLoad.", proposedTeachingLoadRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
