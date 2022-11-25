import _ from "lodash";

import { createAdminRouter } from "../context";

export const courseRouter = createAdminRouter()
  .query("getAll", {
    resolve({ ctx }) {
      return ctx.prisma.course.findMany({
        select: {
          id: true,
          name: true,
          code: true,
        },
      });
    },
  })
  .query("population", {
    resolve({ ctx }) {
      // get all the student records for each course and selected the student ids
      return ctx.prisma.course
        .findMany({
          include: {
            studentRecords: {
              select: {
                student: {
                  select: {
                    id: true,
                    studentIdNumber: true,
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        })
        .then((courses) => {
          // create a new array where you add it only if the studentIdNumber is not yet in the array
          // reutrn the records and the array
          return courses.map((course) => {
            const studentIds = course.studentRecords.map(
              (record) => record.student.studentIdNumber,
            );
            return {
              ...course,
              studentRecords: _.uniq(studentIds),
              population: _.uniq(studentIds).length,
            };
          });
        });
    },
  });
