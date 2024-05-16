import { PrismaClient, subjectType } from "@prisma/client";

import {
  PTL,
  Schedule,
  SchedulerClass,
  Teacher,
} from "./interfaces/interfaces";
import { DaysOfWeek, Room, Time } from "./types/type";

const prisma = new PrismaClient();

class Scheduler implements SchedulerClass {
  ptl: PTL[] = [];
  teachers: Teacher[] = [];
  schedules: Schedule[] = [];
  constructor() {
    this.ptl = [];
    this.teachers = [];
    this.schedules = [];
  }

  /***
SCHEDULE DATABASE OPERATIONS
***/
  async PTLData(): Promise<PTL[]> {
    try {
      return await prisma.proposedTeachingLoad.findMany();
    } catch (error) {
      // Handle the error here, such as logging it or throwing a custom error
      throw new Error(
        `Failed to fetch proposed teaching load data: ${
          (error as Error).message
        }`,
      );
    }
  }

  async TeacherData(): Promise<Teacher[]> {
    try {
      return await prisma.teacher.findMany();
    } catch (error) {
      // Handle the error here, such as logging it or throwing a custom error
      throw new Error(
        `Failed to fetch teacher data: ${(error as Error).message}`,
      );
    }
  }

  async createMultipleSchedules(schedules: Schedule[]): Promise<void> {
    try {
      // Use Prisma to create many schedules
      await prisma.schedule.createMany({
        data: schedules,
      });
    } catch (error) {
      // Handle the error here, such as logging it or throwing a custom error
      throw new Error(
        `Failed to create schedules: ${(error as Error).message}`,
      );
    }
  }

  /***
SCHEDULE GENERATION
***/
  async generateSchedule(): Promise<Schedule[]> {
    // Retrieve data from the database
    this.ptl = await this.PTLData();
    this.teachers = await this.TeacherData();

    const generatedSchedules: Schedule[] = [];
    for (const subject of this.ptl) {
      if (subject.sections === 1) {
        generatedSchedules.push(...this.generateSingleSectionSchedule(subject));
      } else {
        generatedSchedules.push(
          ...this.generateMultipleSectionSchedule(subject),
        );
      }
    }

    // Save generated schedules to the database
    await this.createMultipleSchedules(generatedSchedules);

    return generatedSchedules;
  }

  generateSingleSectionSchedule(subject: PTL): Schedule[] {
    const singleSectionSchedules: Schedule[] = [];

    if (subject.lecHours > 0) {
      const time = this.assignTime();
      const lectureSchedule: Schedule = {
        teacherId: subject.teacherId,
        subCode: subject.subCode,
        type: subjectType.LEC,
        room: this.assignRoom(),
        days: this.assignDays(),
        startTime: time.startTime, // Assuming Time is defined somewhere
        endTime: time.endTime, // Assuming Time is defined somewhere
      };

      if (!this.scheduleOverlapVerification(lectureSchedule)) {
        singleSectionSchedules.push(lectureSchedule);
      }
    }

    if (subject.labHours > 0) {
      const time = this.assignTime();
      const labSchedule: Schedule = {
        teacherId: subject.teacherId,
        subCode: subject.subCode,
        type: subjectType.LAB,
        room: this.assignRoom(),
        days: this.assignDays(),
        startTime: time.startTime,
        endTime: time.endTime,
      };

      if (!this.scheduleOverlapVerification(labSchedule)) {
        singleSectionSchedules.push(labSchedule);
      }
    }
    return singleSectionSchedules;
  }

  generateMultipleSectionSchedule(subject: PTL): Schedule[] {
    const multipleSectionSchedules: Schedule[] = [];

    for (let i = 1; i <= subject.sections; i++) {
      if (subject.lecHours > 0) {
        const time = this.assignTime();
        const lectureSchedule: Schedule = {
          teacherId: subject.teacherId,
          subCode: subject.subCode,
          type: subjectType.LEC,
          room: this.assignRoom(),
          days: this.assignDays(),
          startTime: time.startTime,
          endTime: time.endTime,
        };

        if (!this.scheduleOverlapVerification(lectureSchedule)) {
          multipleSectionSchedules.push(lectureSchedule);
        }
      }

      if (subject.labHours > 0) {
        const time = this.assignTime();
        const labSchedule: Schedule = {
          teacherId: subject.teacherId,
          subCode: subject.subCode,
          type: subjectType.LAB,
          room: this.assignRoom(),
          days: this.assignDays(),
          startTime: time.startTime,
          endTime: time.endTime,
        };

        if (!this.scheduleOverlapVerification(labSchedule)) {
          multipleSectionSchedules.push(labSchedule);
        }
      }
    }
    return multipleSectionSchedules;
  }

  /***
SCHEDULE VERIFICATION
***/
  scheduleOverlapVerification(newSchedule: Schedule): boolean {
    // Check if there are any overlaps with the new schedule
    for (const existingSchedule of this.schedules) {
      if (
        existingSchedule.room === newSchedule.room &&
        this.daysOverlapVerification(existingSchedule.days, newSchedule.days) &&
        this.timeOverlapVerification(
          existingSchedule.startTime,
          existingSchedule.endTime,
          newSchedule.startTime,
          newSchedule.endTime,
        )
      ) {
        return true; // Overlap found
      }
    }
    return false; // No overlap found
  }

  daysOverlapVerification(
    existingDays: DaysOfWeek[],
    newDays: DaysOfWeek[],
  ): boolean {
    // Check if there's any overlap between the days of the week
    for (const day of existingDays) {
      if (newDays.includes(day)) {
        return true; // Overlap found
      }
    }
    return false; // No overlap found
  }

  timeOverlapVerification(
    existingStartTime: string,
    existingEndTime: string,
    newStartTime: string,
    newEndTime: string,
  ): boolean {
    // Convert time strings to Date objects for easier comparison
    const existingStart = new Date(existingStartTime);
    const existingEnd = new Date(existingEndTime);
    const newStart = new Date(newStartTime);
    const newEnd = new Date(newEndTime);

    // Check for overlap by comparing start and end times
    if (
      (newStart >= existingStart && newStart < existingEnd) || // Check if new start time is between existing start and end time
      (newEnd > existingStart && newEnd <= existingEnd) || // Check if new end time is between existing start and end time
      (existingStart >= newStart && existingEnd <= newEnd) // Check if existing time is fully within new time
    ) {
      return true; // Overlap found
    }
    return false; // No overlap found
  }

  teacherAvailabilityVerification(): boolean {
    // Check if teachers are availability factoring the remarks from PTL for the generated schedule
    // Teacher availability verification logic goes here
    return true;
  }

  classAndRestRuleVerification(): boolean {
    // Check if the 3hr class and 1hr rest rule is followed
    // Class and rest rule verification logic goes here
    return true;
  }
  /***
ROOM DAYS TIME ASSIGNMENTS
***/
  assignRoom(): Room {
    // Assign a room for the schedule logic
    // Age appropriate room assignment

    return "EN100";
  }

  assignDays(): DaysOfWeek[] {
    // Assign days for the schedule logic
    // teacher availability verification

    return ["M", "W", "F"];
  }

  assignTime(): { startTime: Time; endTime: Time } {
    // Assign time for the schedule logic
    // 3hour class 1 hour rest rule
    // teacher availability verification

    return { startTime: "08:00", endTime: "09:30" };
  }
}

export default Scheduler;
