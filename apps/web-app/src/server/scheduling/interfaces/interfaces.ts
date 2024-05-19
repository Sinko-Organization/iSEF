import { Department, employmentType, subjectType } from "@prisma/client";

import DaysOfWeek from "../types/DaysOfWeek";
import { Room } from "../types/Room";
import { Time } from "../types/Time";

export interface PTL {
  id: string;
  teacherId: string;
  subCode: string;
  sections: number;
  lecHours: number;
  labHours: number;
  timeRemarks: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Teacher {
  id: string;
  teacherId: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  department: Department | null;
  employment: employmentType | null;
  birthday: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Schedule {
  teacherId: string;
  subCode: string;
  type: subjectType;
  room: Room;
  days: DaysOfWeek[];
  startTime: Time;
  endTime: Time;
}

export interface SchedulerClass {
  ptl: PTL[];
  teachers: Teacher[];
  schedules: Schedule[];
  PTLData(): Promise<PTL[]>;
  TeacherData(): Promise<Teacher[]>;
  createMultipleSchedules(schedules: Schedule[]): Promise<void>;
  generateSchedule(): Promise<Schedule[]>;
  generateSingleSectionSchedule(subject: PTL): Schedule[];
  generateMultipleSectionSchedule(subject: PTL): Schedule[];
  scheduleOverlapVerification(schedule: Schedule): boolean;
  daysOverlapVerification(
    existingDays: DaysOfWeek[],
    newDays: DaysOfWeek[],
  ): boolean;
  timeOverlapVerification(
    existingStartTime: Time,
    existingEndTime: Time,
    newStartTime: Time,
    newEndTime: Time,
  ): boolean;
  teacherAvailabilityVerification(): boolean;
  classAndRestRuleVerification(): boolean;
  assignRoom(birthday: Date): Room;
  assignDaysAndTime(
    subjectType: subjectType,
    hours: number,
  ): { startTime: Time; endTime: Time; days: DaysOfWeek[] };
  parseTimeString(time: string): Date;
  generateStartTime(): Time;
  assignSingleDay(): DaysOfWeek[];
  assignMultipleDaysForLecture(hours: number): DaysOfWeek[];
  calculateEndTimeForDay(startTime: Time, hours: number): Time;
  calculateEndTimeForLecture(
    days: DaysOfWeek[],
    startTime: Time,
    hours: number,
  ): Time;
  timeToMinutes(time: Time): number;
  minutesToTime(duration: number): Time;
}
