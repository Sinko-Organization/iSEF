import { DependencyListV2 } from "./types";

// ***************************   NEW CURRICULUM 2022 - 2023   *************************** //

export const meDepNew: DependencyListV2 = [
  // ================================   BRDGING   ================================ //

  // FIRST YEAR - FIRST SEM - BRIDGING - NC
  {
    subjects: [
      {
        subjectCode: "EBMath 1101",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "EBMath 1102",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "GEMath 1",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "GESocSci 6",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "NSTP1-CWTS",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "NSTP1-LTS",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "NSTP1-ROTC",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PATHFit1 W",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PATHFit1 M",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "RE 1",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SEAL 1",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "FIRST",
    yearLevel: 1,
    creditUnits: 23,
  },

  // FIRST YEAR - SECOND SEM - BRIDGING - NC

  {
    subjects: [
      {
        subjectCode: "EBMath 1201",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "EBEngg 1201",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "GESocSci 1",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "GEHum 1",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "GESocSci 3",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "NSTP2-CWTS",
        prerequisites: ["NSTP1-CWTS"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "NSTP2-LTS",
        prerequisites: ["NSTP1-LTS"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "NSTP2-ROTC",
        prerequisites: ["NSTP1-ROTC"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PATHFit2 W",
        prerequisites: ["PATHFit1 W"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PATHFit2 M",
        prerequisites: ["PATHFit1 M"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "RE 2",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SEAL 2",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 1,
    creditUnits: 26,
  },

  // SECOND YEAR - FIRST SEM - BRIDGING - NC

  {
    subjects: [
      {
        subjectCode: "EMath 1101",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1001",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1004",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 1101",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "CELit 1",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "GEEng 1",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "GESocSci 2",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PATHFit3 W",
        prerequisites: ["PATHFit1 W", "PATHFit2 W"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PATHFit3 M",
        prerequisites: ["PATHFit1 M", "PATHFit2 M"],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "FIRST",
    yearLevel: 2,
    creditUnits: 20,
  },

  // SECOND YEAR - SECOND SEM - BRIDGING - NC

  {
    subjects: [
      {
        subjectCode: "EMath 1201",
        prerequisites: ["EMath 1101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "EMath 1202",
        prerequisites: ["EMath 1101", "GEMath 1"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1009",
        prerequisites: [],
        coRequisites: ["EMath 1201"],
        type: "regular",
      },
      {
        subjectCode: "Engg 1008",
        prerequisites: ["Engg 1004"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1011",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "GESocSci 4",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "GESocSci 5",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PATHFit4 W",
        prerequisites: ["PATHFit1 W", "PATHFit2 W"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PATHFit4 M",
        prerequisites: ["PATHFit1 M", "PATHFit2 M"],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 2,
    creditUnits: 20,
  },

  // THIRD YEAR - FIRST SEM - BRIDGING - NC
  {
    subjects: [
      {
        subjectCode: "EMath 2101",
        prerequisites: ["EMath 1201"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1002",
        prerequisites: [],
        coRequisites: ["EE 2131"],
        type: "regular",
      },
      {
        subjectCode: "Engg 1013",
        prerequisites: ["Engg 1009", "Engg 1201"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "EE 2114",
        prerequisites: ["Engg 1009", "Engg 1201"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 2101",
        prerequisites: ["Engg 1009", "Engg 1201"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 2102",
        prerequisites: ["Engg 1004"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "CETech 1",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "FIRST",
    yearLevel: 3,
    creditUnits: 17,
  },

  // THIRD YEAR - SECOND SEM - BRIDGING - NC

  {
    subjects: [
      {
        subjectCode: "EMath 2200",
        prerequisites: ["EMath 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1016",
        prerequisites: ["Engg 1013"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 2231",
        prerequisites: ["EE 2114"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 2201",
        prerequisites: ["ME 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 2202",
        prerequisites: ["ME 2102"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 2203",
        prerequisites: ["EMath 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "CESocSci 3",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 3,
    creditUnits: 19,
  },

  //FOURTH YEAR - FIRST SEM - BRIDGING - NC

  {
    subjects: [
      {
        subjectCode: "Engg 1025",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "Engg 1018",
        prerequisites: ["Engg 1016"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "EE 3214",
        prerequisites: ["EE 2114"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 3107",
        prerequisites: ["ME 2201"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 3108",
        prerequisites: ["ME 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 3109",
        prerequisites: ["Engg 1016"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 3110",
        prerequisites: ["EMath 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 3111",
        prerequisites: ["Engg 1002"],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "FIRST",
    yearLevel: 4,
    creditUnits: 20,
  },

  //   FOURTH YEAR - SECOND SEM - BRIDGING - NC

  {
    subjects: [
      {
        subjectCode: "Engg 1024",
        prerequisites: ["Engg 1001", "Engg 1018"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1030",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "ME 3207",
        prerequisites: ["ME 3107"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 3208",
        prerequisites: ["ME 3108"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 3209",
        prerequisites: ["ME 2201"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 3210",
        prerequisites: ["ME 2201"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 3211",
        prerequisites: ["EMath 1202"],
        coRequisites: [],
        type: "regular",
      },

      // TE 1 - ME ELECTIVES
      {
        subjectCode: "ME 3221",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        name: "Mechatronics",
        units: 2,
        type: "elective",
      },
      {
        subjectCode: "ME 3223",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        name: "Automotive Control",
        units: 2,
        type: "elective",
      },
      {
        subjectCode: "ME 3224",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        name: "Safety of Motor Vehicles",
        units: 2,
        type: "elective",
      },
      {
        subjectCode: "ME 3226",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        name: "Nuclear Energy",
        units: 2,
        type: "elective",
      },
      {
        subjectCode: "ME 3227",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        name: "Solar Energy & Wind Energy Utilization",
        units: 2,
        type: "elective",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 4,
    creditUnits: 20,
  },

  //   FOURTH YEAR - SUMMER - BRIDGING - NC

  {
    subjects: [
      {
        subjectCode: "Engg 1027",
        prerequisites: ["Engg 1025"],
        coRequisites: [],
        yearStanding: 5,
        type: "regular",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SUMMER",
    yearLevel: 4,
    creditUnits: 3,
  },

  //   FIFTH YEAR - FIRST SEM - BRIDGING - NC
  {
    subjects: [
      {
        subjectCode: "ME 4107",
        prerequisites: ["ME 3211"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4108",
        prerequisites: ["ME 3207"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4109",
        prerequisites: ["ECE 2231"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4110",
        prerequisites: ["ME 3209"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4111",
        prerequisites: ["ME 3109", "Engg 1024"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4112",
        prerequisites: ["ME 3208", "ME 3210"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4120",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 5,
        type: "regular",
      },

      //TE 2 - ME ELECTIVES

      {
        subjectCode: "ME 3222",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 5,
        name: "Introduction to Robotics",
        units: 2,
        type: "elective",
      },
      {
        subjectCode: "ME 4121",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 5,
        name: "Industrial Robots",
        units: 2,
        type: "elective",
      },
      {
        subjectCode: "ME 3225",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 5,
        name: "Engine Fuel Control Systems",
        units: 2,
        type: "elective",
      },
      {
        subjectCode: "ME 4122",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 5,
        name: "Engine Emissions and COntrol",
        units: 2,
        type: "elective",
      },
      {
        subjectCode: "ME 4123",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 5,
        name: "Engine Friction and Lubrication",
        units: 2,
        type: "elective",
      },
      {
        subjectCode: "ME 4124",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 5,
        name: "Micro-hydro-electric Power",
        units: 2,
        type: "elective",
      },
      {
        subjectCode: "ME 4125",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 5,
        name: "Energy Management in Buildings",
        units: 2,
        type: "elective",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "FIRST",
    yearLevel: 5,
    creditUnits: 20,
  },

  //   FIFTH YEAR - SECOND SEM - BRIDGING - NC
  {
    subjects: [
      {
        subjectCode: "Engg 1032",
        prerequisites: ["Engg 1025"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4207",
        prerequisites: ["ME 4107"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4208",
        prerequisites: ["ME 4108"],
        coRequisites: ["ME 4209"],
        type: "regular",
      },
      {
        subjectCode: "ME 4209",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 5,
        type: "regular",
      },
      {
        subjectCode: "ME 4210",
        prerequisites: ["GESocSci 5"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4211",
        prerequisites: ["ME 4111"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4212",
        prerequisites: ["ME 4108", "ME 4110", "ME 4112"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4220",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 5,
        type: "regular",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 5,
    creditUnits: 18,
  },

  //FIFTH YEAR - SUMMER - BRIDGING - NC

  {
    subjects: [
      {
        subjectCode: "ME 4300",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 5,
        type: "regular",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SUMMER",
    yearLevel: 5,
    creditUnits: 3,
  },

  // ================================   REGULAR   ================================ //

  // FIRST YEAR - FIRST SEM - REGULAR - NC

  {
    subjects: [
      {
        subjectCode: "EMath 1101",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1001",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1004",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 1101",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "GEMath 1",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "NSTP1-CWTS",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "NSTP1-LTS",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "NSTP1-ROTC",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PATHFit1 W",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PATHFit1 M",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "RE 1",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SEAL 1",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Regular",
    semesterType: "FIRST",
    yearLevel: 1,
    creditUnits: 21,
  },

  // FIRST YEAR - SECOND SEM - REGULAR - NC

  {
    subjects: [
      {
        subjectCode: "EMath 1201",
        prerequisites: ["EMath 1101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "EMath 1202",
        prerequisites: ["EMath 1101", "GEMath 1"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1009",
        prerequisites: [],
        coRequisites: ["EMath 1201"],
        type: "regular",
      },
      {
        subjectCode: "Engg 1008",
        prerequisites: ["Engg 1004"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1011",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "NSTP2-CWTS",
        prerequisites: ["NSTP1-CWTS"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "NSTP2-LTS",
        prerequisites: ["NSTP1-LTS"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "NSTP2-ROTC",
        prerequisites: ["NSTP1-ROTC"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PATHFit2 W",
        prerequisites: ["PATHFit1 W"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PATHFit2 M",
        prerequisites: ["PATHFit1 M"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "RE 2",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SEAL 2",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SECOND",
    yearLevel: 1,
    creditUnits: 21,
  },

  // FIRST YEAR - SUMMER - REGULAR - NC

  {
    subjects: [
      {
        subjectCode: "GEHum 1",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "GESocSci 1",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "GESocSci 2",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SUMMER",
    yearLevel: 1,
    creditUnits: 9,
  },

  // SECOND YEAR - FIRST SEM - REGULAR - NC

  {
    subjects: [
      {
        subjectCode: "EMath 2101",
        prerequisites: ["EMath 1201"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1002",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1013",
        prerequisites: [],
        coRequisites: ["Engg 1009", "Engg 1201"],
        type: "regular",
      },
      {
        subjectCode: "EE 2114",
        prerequisites: ["Engg 1009", "EMath 1201"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 2101",
        prerequisites: ["Engg 1009", "EMath 1201"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 2102",
        prerequisites: ["Engg 1004"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "GESocSci 6",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PATHFit3 W",
        prerequisites: ["PATHFit1 W", "PATHFit2 W"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PATHFit3 M",
        prerequisites: ["PATHFit1 M", "PATHFit2 M"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "CETech 1",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Regular",
    semesterType: "FIRST",
    yearLevel: 2,
    creditUnits: 22,
  },

  // SECOND YEAR - SECOND SEM - REGULAR - NC

  {
    subjects: [
      {
        subjectCode: "EMath 2200",
        prerequisites: ["EMath 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1016",
        prerequisites: ["Engg 1013"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 2231",
        prerequisites: ["EE 2114"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 2201",
        prerequisites: ["ME 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 2202",
        prerequisites: ["ME 2102"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 2203",
        prerequisites: ["EMath 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "GESocSci 5",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PATHFit4 W",
        prerequisites: ["PATHFit1 W", "PATHFit2 W"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PATHFit4 M",
        prerequisites: ["PATHFit1 M", "PATHFit2 M"],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SECOND",
    yearLevel: 2,
    creditUnits: 21,
  },

  //SECOND YEAR - SUMMER - REGULAR - NC

  {
    subjects: [
      {
        subjectCode: "GESocSci 3",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "GESocSci 4",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "GEEng 1",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SUMMER",
    yearLevel: 2,
    creditUnits: 9,
  },

  //THIRD YEAR - FIRST SEM - REGULAR - NC

  {
    subjects: [
      {
        subjectCode: "Engg 1025",
        prerequisites: ["EMath 1202"],
        coRequisites: [],
        yearStanding: 3,
        type: "regular",
      },
      {
        subjectCode: "Engg 1018",
        prerequisites: ["Engg 1016"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "EE 3214",
        prerequisites: ["EE 2114"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 3107",
        prerequisites: ["ME 2201"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 3108",
        prerequisites: ["ME 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 3109",
        prerequisites: ["Engg 1016"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 3110",
        prerequisites: ["EMath 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 3111",
        prerequisites: ["Engg 1002"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "CESocSci 3",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Regular",
    semesterType: "FIRST",
    yearLevel: 3,
    creditUnits: 23,
  },

  //   THIRD YEAR - SECOND SEM - REGULAR - NC

  {
    subjects: [
      {
        subjectCode: "Engg 1024",
        prerequisites: ["Engg 1001", "Engg 1018"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1030",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
        type: "regular",
      },
      {
        subjectCode: "ME 3207",
        prerequisites: ["ME 3107"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 3208",
        prerequisites: ["ME 3108"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 3209",
        prerequisites: ["ME 2201"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 3210",
        prerequisites: ["ME 2201"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 3211",
        prerequisites: ["EMath 1202"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "CELit 1",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },

      // TE 1 - ME ELECTIVES
      {
        subjectCode: "ME 3221",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
        name: "Mechatronics",
        units: 2,
        type: "elective",
      },
      {
        subjectCode: "ME 3223",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
        name: "Automotive Control",
        units: 2,
        type: "elective",
      },
      {
        subjectCode: "ME 3224",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
        name: "Safety of Motor Vehicles",
        units: 2,
        type: "elective",
      },
      {
        subjectCode: "ME 3226",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
        name: "Nuclear Energy",
        units: 2,
        type: "elective",
      },
      {
        subjectCode: "ME 3227",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
        name: "Solar Energy & Wind Energy Utilization",
        units: 2,
        type: "elective",
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SECOND",
    yearLevel: 3,
    creditUnits: 23,
  },

  // THIRD YEAR - SUMMER - REGULAR - NC
  {
    subjects: [
      {
        subjectCode: "Engg 1027",
        prerequisites: ["Engg 1025"],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SUMMER",
    yearLevel: 3,
    creditUnits: 3,
  },

  //   FOURTH YEAR - FIRST SEM - REGULAR - NC
  {
    subjects: [
      {
        subjectCode: "Engg 1032",
        prerequisites: ["Engg 1025"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4107",
        prerequisites: ["ME 3211"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4108",
        prerequisites: ["ME 3207"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4109",
        prerequisites: ["ECE 2231"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4110",
        prerequisites: ["ME 3209"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4111",
        prerequisites: ["ME 3109", "Engg 1024"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4112",
        prerequisites: ["ME 3208", "ME 3210"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4120",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },

      //TE 2 - ME ELECTIVES

      {
        subjectCode: "ME 3222",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        name: "Introduction to Robotics",
        units: 2,
        type: "elective",
      },
      {
        subjectCode: "ME 4121",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        name: "Industrial Robots",
        units: 2,
        type: "elective",
      },
      {
        subjectCode: "ME 3225",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        name: "Engine Fuel Control Systems",
        units: 2,
        type: "elective",
      },
      {
        subjectCode: "ME 4122",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        name: "Engine Emissions and COntrol",
        units: 2,
        type: "elective",
      },
      {
        subjectCode: "ME 4123",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        name: "Engine Friction and Lubrication",
        units: 2,
        type: "elective",
      },
      {
        subjectCode: "ME 4124",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        name: "Micro-hydro-electric Power",
        units: 2,
        type: "elective",
      },
      {
        subjectCode: "ME 4125",
        referenceCode: "ME TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        name: "Energy Management in Buildings",
        units: 2,
        type: "elective",
      },
    ],
    enrollmentType: "Regular",
    semesterType: "FIRST",
    yearLevel: 4,
    creditUnits: 22,
  },

  //   FOURTH YEAR - SECOND SEM - REGULAR - NC
  {
    subjects: [
      {
        subjectCode: "ME 4207",
        prerequisites: ["ME 4107"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4208",
        prerequisites: ["ME 4108"],
        coRequisites: ["ME 4209"],
        type: "regular",
      },
      {
        subjectCode: "ME 4209",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "ME 4210",
        prerequisites: ["GESocSci 5"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4211",
        prerequisites: ["ME 4111"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4212",
        prerequisites: ["ME 4108", "ME 4110", "ME 4112"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ME 4220",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SECOND",
    yearLevel: 4,
    creditUnits: 16,
  },

  //FOURTH YEAR - SUMMER - REGULAR - NC

  {
    subjects: [
      {
        subjectCode: "ME 4300",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SUMMER",
    yearLevel: 4,
    creditUnits: 3,
  },
];

// {
//     subjects: [
//       {
//         subjectCode: "",
//         prerequisites: [],
//         coRequisites: [],
//         type: "regular",
//       },
//       {
//         subjectCode: "",
//         prerequisites: [],
//         coRequisites: [],
//         type: "regular",
//       },
//       {
//         subjectCode: "",
//         prerequisites: [],
//         coRequisites: [],
//         type: "regular",
//       },
//     ],
//     enrollmentType: "",
//     semesterType: "",
//     yearLevel: ,
//     creditUnits: ,
//   },
// ];
