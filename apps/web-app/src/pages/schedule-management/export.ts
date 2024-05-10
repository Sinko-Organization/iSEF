import * as Excel from "exceljs";

const sample = [
  {
    id: "cknt0a0ou0000kgvyd2ufl7gt",
    teacher: { firstName: "John", lastName: "Doe" },
    subject: { subCode: "MATH101" },
    type: "lecture",
    room: "A101",
    days: ["Monday", "Wednesday", "Friday"],
    startTime: "09:00 AM",
    endTime: "10:30 AM",
    createdAt: "2024-05-10T08:00:00.000Z",
    updatedAt: "2024-05-10T08:30:00.000Z",
  },
  {
    id: "cknt0a0ou0000kgvyd2ufl7gu",
    teacher: { firstName: "Alice", lastName: "Smith" },
    subject: { subCode: "ENG201" },
    type: "lab",
    room: "B203",
    days: ["Tuesday", "Thursday"],
    startTime: "01:00 PM",
    endTime: "03:30 PM",
    createdAt: "2024-05-10T09:00:00.000Z",
    updatedAt: "2024-05-10T09:30:00.000Z",
  },
];

export const excelConversion = (scheduleData: any, set: Function) => {
  //   const scheduleData = sample;
  // Create a new workbook
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Schedule");

  // Add headers to the worksheet
  worksheet.addRow([
    "SubCode",
    "Type",
    "Teacher",
    "Room",
    "Days",
    "StartTime",
    "EndTime",
  ]);

  // Add data to the worksheet
  for (const schedule of scheduleData) {
    // Destructure schedule object to get relevant fields
    const { subject, type, teacher, room, days, startTime, endTime } = schedule;

    // Add a row to the worksheet with the schedule data
    worksheet.addRow([
      subject.subCode,
      type,
      `${teacher.firstName} ${teacher.lastName}`,
      room,
      days.join(", "), // Join array of days into a comma-separated string
      startTime,
      endTime,
    ]);
  }
  // Generate the Excel file buffer and convert to base64 string
  workbook.xlsx.writeBuffer().then((buffer) => {
    const base64String = buffer.toString("base64");
    set(base64String);
  });
};

export const generateDownload = (excelData: string | null) => {
  if (!excelData) return;

  // Convert base64 string to blob
  const blob = new Blob([Buffer.from(excelData, "base64")], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Create download link
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "schedule.xlsx";
  document.body.append(a);
  a.click();
  window.URL.revokeObjectURL(url);
};
