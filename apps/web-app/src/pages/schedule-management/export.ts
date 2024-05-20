import * as Excel from "exceljs";

export const excelConversion = (scheduleData: any, set: Function) => {
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
    const { subCode, type, teacher, room, days, startTime, endTime } = schedule;

    // Add a row to the worksheet with the schedule data
    worksheet.addRow([
      subCode,
      type,
      `${teacher.firstName} ${teacher.lastName}`,
      room,
      days.join(""),
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
