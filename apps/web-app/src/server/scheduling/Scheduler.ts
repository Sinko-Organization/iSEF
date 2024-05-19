import { PrismaClient, subjectType } from "@prisma/client";

import {
  PTL,
  Schedule,
  SchedulerClass,
  Teacher,
} from "./interfaces/interfaces";
import DaysOfWeek from "./types/DaysOfWeek";
import { Room, roomArray } from "./types/Room";
import { Time, timeArray } from "./types/Time";

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
    const teacher = this.teachers.find(
      (teacher) => teacher.teacherId === subject.teacherId,
    ) as Teacher;
    if (subject.lecHours > 0) {
      let time = this.assignDaysAndTime("LEC", subject.lecHours);
      let lectureSchedule: Schedule = {
        teacherId: subject.teacherId,
        subCode: subject.subCode,
        type: "LEC",
        room: this.assignRoom(teacher.birthday),
        days: time.days,
        startTime: time.startTime,
        endTime: time.endTime,
      };

      while (
        this.scheduleOverlapVerification(lectureSchedule) ||
        !timeArray.includes(time.endTime) ||
        !this.classAndRestRuleVerification(lectureSchedule)
      ) {
        time = this.assignDaysAndTime("LEC", subject.lecHours);
        lectureSchedule = {
          teacherId: subject.teacherId,
          subCode: subject.subCode,
          type: "LEC",
          room: this.assignRoom(teacher.birthday),
          days: time.days,
          startTime: time.startTime,
          endTime: time.endTime,
        };
      }

      if (
        !this.scheduleOverlapVerification(lectureSchedule) &&
        timeArray.includes(time.endTime)
      ) {
        singleSectionSchedules.push(lectureSchedule);
      }
    }

    if (subject.labHours > 0) {
      let time = this.assignDaysAndTime("LAB", subject.labHours);
      let labSchedule: Schedule = {
        teacherId: subject.teacherId,
        subCode: subject.subCode,
        type: "LAB",
        room: this.assignRoom(teacher.birthday),
        days: time.days,
        startTime: time.startTime,
        endTime: time.endTime,
      };

      while (
        this.scheduleOverlapVerification(labSchedule) ||
        !timeArray.includes(time.endTime) ||
        !this.classAndRestRuleVerification(labSchedule)
      ) {
        time = this.assignDaysAndTime("LAB", subject.labHours);
        labSchedule = {
          teacherId: subject.teacherId,
          subCode: subject.subCode,
          type: "LAB",
          room: this.assignRoom(teacher.birthday),
          days: time.days,
          startTime: time.startTime,
          endTime: time.endTime,
        };
      }

      if (
        !this.scheduleOverlapVerification(labSchedule) &&
        timeArray.includes(time.endTime)
      ) {
        singleSectionSchedules.push(labSchedule);
      }
    }

    return singleSectionSchedules;
  }

  generateMultipleSectionSchedule(subject: PTL): Schedule[] {
    const multipleSectionSchedules: Schedule[] = [];

    for (let i = 1; i <= subject.sections; i++) {
      if (subject.lecHours > 0) {
        const teacher = this.teachers.find(
          (teacher) => teacher.teacherId === subject.teacherId,
        ) as Teacher;
        let time = this.assignDaysAndTime("LEC", subject.lecHours);
        let lectureSchedule: Schedule = {
          teacherId: subject.teacherId,
          subCode: subject.subCode,
          type: "LEC",
          room: this.assignRoom(teacher.birthday),
          days: time.days,
          startTime: time.startTime,
          endTime: time.endTime,
        };

        while (
          this.scheduleOverlapVerification(lectureSchedule) ||
          !timeArray.includes(time.endTime) ||
          !this.classAndRestRuleVerification(lectureSchedule)
        ) {
          time = this.assignDaysAndTime("LEC", subject.lecHours);
          lectureSchedule = {
            teacherId: subject.teacherId,
            subCode: subject.subCode,
            type: "LEC",
            room: this.assignRoom(teacher.birthday),
            days: time.days,
            startTime: time.startTime,
            endTime: time.endTime,
          };
        }

        if (
          !this.scheduleOverlapVerification(lectureSchedule) &&
          timeArray.includes(time.endTime)
        ) {
          multipleSectionSchedules.push(lectureSchedule);
        }
      }

      if (subject.labHours > 0) {
        const teacher = this.teachers.find(
          (teacher) => teacher.teacherId === subject.teacherId,
        ) as Teacher;
        let time = this.assignDaysAndTime("LAB", subject.labHours);
        let labSchedule: Schedule = {
          teacherId: subject.teacherId,
          subCode: subject.subCode,
          type: "LAB",
          room: this.assignRoom(teacher.birthday),
          days: time.days,
          startTime: time.startTime,
          endTime: time.endTime,
        };

        while (
          this.scheduleOverlapVerification(labSchedule) ||
          !timeArray.includes(time.endTime) ||
          !this.classAndRestRuleVerification(labSchedule)
        ) {
          time = this.assignDaysAndTime("LAB", subject.labHours);
          labSchedule = {
            teacherId: subject.teacherId,
            subCode: subject.subCode,
            type: "LAB",
            room: this.assignRoom(teacher.birthday),
            days: time.days,
            startTime: time.startTime,
            endTime: time.endTime,
          };
        }

        if (
          !this.scheduleOverlapVerification(labSchedule) &&
          timeArray.includes(time.endTime)
        ) {
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

  classAndRestRuleVerification(schedule: Schedule): boolean {
    const maxAllowedMinutes = 180;
    const teacherSchedules = this.schedules.filter(
      (sch) => sch.teacherId === schedule.teacherId,
    );
    const daySchedules = teacherSchedules.filter((sch) =>
      sch.days.some((day) => schedule.days.includes(day)),
    );

    let totalMinutes = 0;

    // Calculate total minutes for the new schedule
    const newStartMinutes = this.timeToMinutes(schedule.startTime);
    const newEndMinutes = this.timeToMinutes(schedule.endTime);
    totalMinutes += newEndMinutes - newStartMinutes;

    // Calculate total minutes for the existing schedules
    for (const daySchedule of daySchedules) {
      const startMinutes = this.timeToMinutes(daySchedule.startTime);
      const endMinutes = this.timeToMinutes(daySchedule.endTime);
      totalMinutes += endMinutes - startMinutes;

      // Check for the 1-hour rest rule
      if (
        Math.abs(startMinutes - newEndMinutes) < 60 ||
        Math.abs(endMinutes - newStartMinutes) < 60
      ) {
        return false;
      }

      // Check if there's a gap between the new schedule and existing schedules
      if (
        daySchedule.endTime !== schedule.startTime &&
        daySchedule.startTime !== schedule.endTime
      ) {
        return true;
      }
    }

    // Check if the total minutes exceed the maximum allowed minutes
    if (totalMinutes > maxAllowedMinutes) {
      return false;
    }
    return true;
  }
  /***
ROOM DAYS TIME ASSIGNMENTS
***/
  assignRoom(birthday: Date): Room {
    const today = new Date();
    const age = today.getFullYear() - birthday.getFullYear();

    if (age > 45) {
      // Filter the roomArray to include only rooms within the 100 range
      const availableRooms = roomArray.filter(
        (room) => Number.parseInt(room.slice(2)) < 200,
      );

      // Randomly select a room from the filtered availableRooms
      const randomIndex = Math.floor(Math.random() * availableRooms.length);
      return availableRooms[randomIndex] as Room;
    } else {
      // If the age is not greater than 45, select any room from the roomArray
      const randomIndex = Math.floor(Math.random() * roomArray.length);
      return roomArray[randomIndex] as Room;
    }
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
    const randomIndex = Math.floor(Math.random() * timeArray.length);
    return timeArray[randomIndex] as Time;
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
    const availableDays: DaysOfWeek[] = ["M", "T", "W", "TH", "F"];
    // Assign multiple days for Lecture
    const numberOfDays = hours === 3 ? [2, hours] : [1, 2, 3];
    // Divide the available days into the specified number of groups
    const groupedDays: DaysOfWeek[][] = [];

    for (const groupLength of numberOfDays) {
      const group: DaysOfWeek[] = [];
      for (let j = 0; j < groupLength; j++) {
        const randomIndex = Math.floor(Math.random() * availableDays.length);
        if (!group.includes(availableDays[randomIndex] as DaysOfWeek)) {
          group.push(availableDays[randomIndex] as DaysOfWeek);
        }
      }
      groupedDays.push(group);
    }
    const randomIndex = Math.floor(Math.random() * groupedDays.length);
    const selectedDays: DaysOfWeek[] = groupedDays[randomIndex] as DaysOfWeek[];
    selectedDays.sort(
      (a, b) => availableDays.indexOf(a) - availableDays.indexOf(b),
    );
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
    // Calculate the end time
    let endTime: Time = startTime;
    endTime = this.calculateEndTimeForDay(endTime, durationPerDay);
    // Return the end time for the last day
    return endTime;
  }
  // Helper function to convert time string to minutes
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
