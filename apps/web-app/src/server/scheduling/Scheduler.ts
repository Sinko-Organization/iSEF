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
      const time = this.assignDaysAndTime("LEC", subject.lecHours);
      const lectureSchedule: Schedule = {
        teacherId: subject.teacherId,
        subCode: subject.subCode,
        type: subjectType.LEC,
        room: this.assignRoom(),
        days: time.days,
        startTime: time.startTime, // Assuming Time is defined somewhere
        endTime: time.endTime, // Assuming Time is defined somewhere
      };

      if (!this.scheduleOverlapVerification(lectureSchedule)) {
        singleSectionSchedules.push(lectureSchedule);
      }
    }

    if (subject.labHours > 0) {
      const time = this.assignDaysAndTime("LAB", subject.labHours);
      const labSchedule: Schedule = {
        teacherId: subject.teacherId,
        subCode: subject.subCode,
        type: subjectType.LAB,
        room: this.assignRoom(),
        days: time.days,
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
        const time = this.assignDaysAndTime("LEC", subject.lecHours);
        const lectureSchedule: Schedule = {
          teacherId: subject.teacherId,
          subCode: subject.subCode,
          type: subjectType.LEC,
          room: this.assignRoom(),
          days: time.days,
          startTime: time.startTime,
          endTime: time.endTime,
        };

        if (!this.scheduleOverlapVerification(lectureSchedule)) {
          multipleSectionSchedules.push(lectureSchedule);
        }
      }

      if (subject.labHours > 0) {
        const time = this.assignDaysAndTime("LAB", subject.labHours);
        const labSchedule: Schedule = {
          teacherId: subject.teacherId,
          subCode: subject.subCode,
          type: subjectType.LAB,
          room: this.assignRoom(),
          days: time.days,
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
    const existingStart = this.parseTimeString(existingStartTime);
    const existingEnd = this.parseTimeString(existingEndTime);
    const newStart = this.parseTimeString(newStartTime);
    const newEnd = this.parseTimeString(newEndTime);

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
    // Use this.teacher.birthday to determine age

    return "EN100";
  }

  assignDaysAndTime(
    subjectType: subjectType,
    hours: number,
  ): { startTime: Time; endTime: Time; days: DaysOfWeek[] } {
    const startTime = this.generateStartTime();
    let endTime: Time;

    if (subjectType === "LAB") {
      // Calculate end time for Lab based on continuous hours
      endTime = this.calculateEndTimeForDay(startTime, hours);

      // Assign a single random day for Lab
      const days = this.assignSingleDay();
      return { startTime, endTime, days };
    } else {
      // Assign multiple days for Lecture
      const days = this.assignMultipleDaysForLecture(hours);
      // Calculate end time for Lecture based on the given hours
      endTime = this.calculateEndTimeForLecture(days, startTime, hours);

      return { startTime, endTime, days };
    }
    // 3hour class 1 hour rest rule
    // teacher availability verification
  }

  /***
HELPER FUNCTIONS
***/
  // Helper function to parse time string to Date object
  parseTimeString(timeString: string): Date {
    // Assuming the time string is in the format "HHMM"
    const hours = Number.parseInt(timeString.slice(0, 2), 10);
    const minutes = Number.parseInt(timeString.slice(2, 4), 10);

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0); // Optionally, set seconds to 0

    return date;
  }
  // Helper function to calculate start time
  generateStartTime(): Time {
    // Generate a random start time from available time slots
    const timeSlots: Time[] = [
      "0700",
      "0730",
      "0800",
      "0830",
      "0900",
      "0930",
      "1000",
      "1030",
      "1100",
      "1130",
      "1200",
      "1230",
      "1300",
      "1330",
      "1400",
      "1430",
      "1500",
      "1530",
      "1600",
      "1630",
      "1700",
      "1730",
      "1800",
      "1830",
      "1900",
      "1930",
      "2000",
      "2030",
      "2100",
      "2130",
    ];
    const randomIndex = Math.floor(Math.random() * timeSlots.length);
    return timeSlots[randomIndex] as Time;
  }

  // Helper function to generate a random day
  assignSingleDay(): DaysOfWeek[] {
    // Assign a single random day from available days
    const availableDays: DaysOfWeek[] = ["M", "T", "W", "TH", "F", "S"];
    const randomIndex = Math.floor(Math.random() * availableDays.length);
    return [availableDays[randomIndex]] as DaysOfWeek[];
  }
  // Helper function to generate multiple random days
  assignMultipleDaysForLecture(hours: number): DaysOfWeek[] {
    // Assign multiple days for Lecture
    const availableDays: DaysOfWeek[] = ["M", "T", "W", "TH", "F", "S"];
    // Calculate the number of days to assign based on the given hours
    const numberOfDays = Math.min(hours, availableDays.length); // Ensure not to exceed the number of available days
    // Randomly shuffle the available days array
    const shuffledDays = availableDays.sort(() => Math.random() - 0.5);
    // Select the first 'numberOfDays' days from the shuffled array
    const selectedDays = shuffledDays.slice(0, numberOfDays);
    return selectedDays;
  }
  // Helper function to calculate end time for a day
  calculateEndTimeForDay(startTime: Time, hours: number): Time {
    // Calculate end time based on the start time and hours for a day
    const startTimeInMinutes = this.timeToMinutes(startTime);
    const endTimeInMinutes = startTimeInMinutes + hours * 60;
    const endTime = this.minutesToTime(endTimeInMinutes);
    return endTime;
  }
  // Helper function to calculate end time for Lecture
  calculateEndTimeForLecture(
    days: DaysOfWeek[],
    startTime: Time,
    hours: number,
  ): Time {
    // Calculate the duration per day
    const durationPerDay = hours / days.length;
    // Calculate the end time for each day
    let endTime: Time = startTime;
    for (let i = 0; i < days.length; i++) {
      endTime = this.calculateEndTimeForDay(endTime, durationPerDay);
    }
    // Return the end time for the last day
    return endTime;
  }
  // Helper function to conver time string to minutes
  timeToMinutes(time: Time): number {
    const hours: number = Number.parseInt(time.slice(0, 2), 10);
    const minutes: number = Number.parseInt(time.slice(2), 10);
    return hours * 60 + minutes;
  }
  // Helper function to convert minutes into time string
  minutesToTime(duration: number): Time {
    const hours: number = Math.floor(duration / 60);
    const minutes: number = duration % 60;
    const formattedHours: string = hours.toString().padStart(2, "0");
    const formattedMinutes: string = (minutes % 60).toString().padStart(2, "0");
    return `${formattedHours}${formattedMinutes}` as Time;
  }
}

export default Scheduler;
