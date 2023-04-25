import { DependencyListV2 } from "./types";

// NEW CURRICULUM 2022

export const seDepNew: DependencyListV2 = [
  // FIRST YEAR - FIRST SEM - BRIDGING - NC
  {
    subjects: [
      {
        subjectCode: "EBMath 1101",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "EBEngg 1102",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GEMath 1",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 6",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP1-CWTS",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP1-LTS",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP1-ROTC",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "PATHFit1 W",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "PATHFit1 M",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "RE 1",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "SEAL 1",
        prerequisites: [],
        coRequisites: [],
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
      },
      {
        subjectCode: "EBEngg 1201",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 1",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 2",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GEHum 1",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP2-CWTS",
        prerequisites: ["NSTP1-CWTS"],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP2-LTS",
        prerequisites: ["NSTP1-LTS"],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP2-ROTC",
        prerequisites: ["NSTP1-ROTC"],
        coRequisites: [],
      },
      {
        subjectCode: "PATHFit2 W",
        prerequisites: ["PATHFit1 W"],
        coRequisites: [],
      },
      {
        subjectCode: "PATHFit2 M",
        prerequisites: ["PATHFit1 M"],
        coRequisites: [],
      },
      {
        subjectCode: "RE 2",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "SEAL 2",
        prerequisites: [],
        coRequisites: [],
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
      },
      {
        subjectCode: "EMath 1102",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "Engg 1001",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "SE 1121",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GEEng 1",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 3",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 4",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "PATHFit3 W",
        prerequisites: ["PATHFit1 W", "PATHFit2 W"],
        coRequisites: [],
      },
      {
        subjectCode: "PATHFit3 M",
        prerequisites: ["PATHFit1 M", "PATHFit2 M"],
        coRequisites: [],
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "FIRST",
    yearLevel: 2,
    creditUnits: 25,
  },

  // SECOND YEAR - SECOND SEM - BRIDGING - NC
  {
    subjects: [
      {
        subjectCode: "EMath 1201",
        prerequisites: ["EMath 1101"],
        coRequisites: [],
      },
      {
        subjectCode: "EMath 1202",
        prerequisites: ["EMath 1101", "GEMath 1"],
        coRequisites: [],
      },
      {
        subjectCode: "Engg 1006",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "Engg 1009",
        prerequisites: [],
        coRequisites: ["EMath 1201"],
      },
      {
        subjectCode: "SE 1221",
        prerequisites: ["SE 1121"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 1222",
        prerequisites: [],
        coRequisites: ["SE 1223"],
      },
      {
        subjectCode: "SE 1223",
        prerequisites: ["SE 1121"],
        coRequisites: [],
      },
      {
        subjectCode: "PATHFit4 W",
        prerequisites: ["PATHFit1 W", "PATHFit2 W"],
        coRequisites: [],
      },
      {
        subjectCode: "PATHFit4 M",
        prerequisites: ["PATHFit1 M", "PATHFit2 M"],
        coRequisites: [],
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 2,
    creditUnits: 21,
  },

  // THIRD YEAR - FIRST SEM - BRIDGING - NC
  {
    subjects: [
      {
        subjectCode: "EMath 2101",
        prerequisites: ["EMath 1201"],
        coRequisites: [],
      },
      {
        subjectCode: "EE 2121",
        prerequisites: ["Engg 1009"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2131",
        prerequisites: ["EMath 1102", "SE 1222"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2132",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2133",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2134",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: ["SE 2131"],
      },
      {
        subjectCode: "SE 2135",
        prerequisites: ["SE 1223"],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 5",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "FIRST",
    yearLevel: 3,
    creditUnits: 25,
  },

  // THIRD YEAR - SECOND SEM - BRIDGING - NC
  {
    subjects: [
      {
        subjectCode: "EMath 2102",
        prerequisites: ["EMath 1102", "EMath 1202"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2231",
        prerequisites: ["EMath 2102", "SE 1222"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2232",
        prerequisites: ["SE 2135"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2233",
        prerequisites: ["SE 2135"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2234",
        prerequisites: ["SE 2134"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2235",
        prerequisites: ["EMath 1102", "SE 2134"],
        coRequisites: [],
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 3,
    creditUnits: 18,
  },

  // FOURTH YEAR - FIRST SEM - BRIDGING - NC
  {
    subjects: [
      {
        subjectCode: "EMath 2200",
        prerequisites: ["EMath 2101"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3131",
        prerequisites: ["SE 2132", "SE 2134"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3132",
        prerequisites: ["SE1121", "EE 2121"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3133",
        prerequisites: [],
        coRequisites: ["SE 3132"],
      },
      {
        subjectCode: "SE 3134",
        prerequisites: ["SE 2232", "SE 2233", "SE 2234", "SE 2235"],
        coRequisites: ["SE 3131"],
      },
      {
        subjectCode: "CESocSci 3",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "FIRST",
    yearLevel: 4,
    creditUnits: 18,
  },

  // FOURTH YEAR - SECOND SEM - BRIDGING - NC
  {
    subjects: [
      {
        subjectCode: "Engg 1025",
        prerequisites: ["EMath 1202"],
        coRequisites: [],
        yearStanding: 3,
      },
      {
        subjectCode: "SE 3231",
        prerequisites: ["EMath 1202", "EMath 2200", "SE 2231"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3232",
        prerequisites: ["SE 2131", "SE 3132"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3233",
        prerequisites: ["SE 3134"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3234",
        prerequisites: ["SE 3134"],
        coRequisites: [],
      },
      {
        subjectCode: "CETech1",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 4,
    creditUnits: 19,
  },

  // FOURTH YEAR - SUMMER - BRIDGING - NC

  {
    subjects: [
      {
        subjectCode: "Engg 1027",
        prerequisites: ["Engg 1025"],
        coRequisites: [],
        yearStanding: 4,
      },
      {
        subjectCode: "CELit 1",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SUMMER",
    yearLevel: 4,
    creditUnits: 6,
  },

  // FIFTH YEAR - FIRST SEM - BRIDGING - NC
  {
    subjects: [
      {
        subjectCode: "Engg 1030",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
      },
      {
        subjectCode: "Engg 1031",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
      },
      {
        subjectCode: "Engg 1034",
        prerequisites: [],
        coRequisites: ["Engg 1030"],
      },
      {
        subjectCode: "SE 4131",
        prerequisites: ["SE 3232"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 4132",
        prerequisites: ["SE 3231"],
        coRequisites: [],
      },
      {
        subjectCode: ["SE 3224", "SE 3225", "SE 3226"],
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "FIRST",
    yearLevel: 5,
    creditUnits: 20,
  },

  // FIFTH YEAR - SECOND SEM - BRIDGING - NC

  {
    subjects: [
      {
        subjectCode: "SE 4231",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "SE 4232",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
      },
      {
        subjectCode: "SE TE 2",
        prerequisites: ["SE TE 1"],
        coRequisites: [],
      },
      {
        subjectCode: "SE TE 3",
        prerequisites: [],
        coRequisites: ["SE TE 2"],
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 5,
    creditUnits: 12,
  },

  // FIFTH YEAR - SUMMER - BRIDGING - NC
  {
    subjects: [
      {
        subjectCode: "SE 4300",
        prerequisites: [],
        coRequisites: [],
        yearStanding: "ALL",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SUMMER",
    yearLevel: 5,
    creditUnits: 3,
  },

  // FIRST YEAR - FIRST SEM - REGULAR - NC

  {
    subjects: [
      {
        subjectCode: "EMath 1101",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "EMath 1102",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "Engg 1001",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "SE 1121",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GEMath 1",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 6",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP1-CWTS",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP1-LTS",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP1-ROTC",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "PATHFit1 W",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "PATHFit1 M",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "RE 1",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "SEAL 1",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Regular",
    semesterType: "FIRST",
    yearLevel: 1,
    creditUnits: 29,
  },

  // FIRST YEAR - SECOND SEM - REGULAR - NC
  {
    subjects: [
      {
        subjectCode: "EMath 1201",
        prerequisites: ["EMath 1101"],
        coRequisites: [],
      },
      {
        subjectCode: "EMath 1202",
        prerequisites: ["EMath 1101, GEMath 1"],
        coRequisites: [],
      },
      {
        subjectCode: "Engg 1006",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "Engg 1009",
        prerequisites: [],
        coRequisites: ["EMath 1201"],
      },
      {
        subjectCode: "SE 1221",
        prerequisites: ["SE 1121"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 1222",
        prerequisites: [],
        coRequisites: ["SE 1223"],
      },
      {
        subjectCode: "SE 1223",
        prerequisites: ["SE 1121"],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP2-CWTS",
        prerequisites: ["NSTP1-CWTS"],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP2-LTS",
        prerequisites: ["NSTP1-LTS"],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP2-ROTC",
        prerequisites: ["NSTP1-ROTC"],
        coRequisites: [],
      },
      {
        subjectCode: "PATHFit2 W",
        prerequisites: ["PATHFit1 W"],
        coRequisites: [],
      },
      {
        subjectCode: "PATHFit2 M",
        prerequisites: ["PATHFit1 M"],
        coRequisites: [],
      },
      {
        subjectCode: "RE 2",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "SEAL 2",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SECOND",
    yearLevel: 1,
    creditUnits: 28,
  },

  // SECOND YEAR - FIRST SEM - REGULAR - NC
  {
    subjects: [
      {
        subjectCode: "EMath 2101",
        prerequisites: ["EMath 1201"],
        coRequisites: [],
      },
      {
        subjectCode: "EE 2121",
        prerequisites: ["Engg 1009"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2131",
        prerequisites: ["EMath 1102", "SE 1222"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2132",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2133",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2134",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: ["SE 2131"],
      },
      {
        subjectCode: "SE 2135",
        prerequisites: ["SE 1223"],
        coRequisites: [],
      },
      {
        subjectCode: "PATHFit3 W",
        prerequisites: ["PATHFit1 W", "PATHFit2 W"],
        coRequisites: [],
      },
      {
        subjectCode: "PATHFit3 M",
        prerequisites: ["PATHFit1 M", "PATHFit2 M"],
        coRequisites: [],
      },
    ],
    enrollmentType: "Regular",
    semesterType: "FIRST",
    yearLevel: 2,
    creditUnits: 24,
  },

  // SECOND YEAR - SECOND SEM - REGULAR - NC
  {
    subjects: [
      {
        subjectCode: "EMath 2102",
        prerequisites: ["EMath 1102", "EMath 1202"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2231",
        prerequisites: ["SE 1222"],
        coRequisites: ["EMath 2102"],
      },
      {
        subjectCode: "SE 2232",
        prerequisites: ["SE 2135"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2233",
        prerequisites: ["SE 2135"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2234",
        prerequisites: ["SE 2134"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2235",
        prerequisites: ["EMath 1102", "SE 2134"],
        coRequisites: [],
      },
      {
        subjectCode: "GEHum 1",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "PATHFit4 W",
        prerequisites: ["PATHFit1 W", "PATHFit2 W"],
        coRequisites: [],
      },
      {
        subjectCode: "PATHFit4 M",
        prerequisites: ["PATHFit1 M", "PATHFit2 M"],
        coRequisites: [],
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SECOND",
    yearLevel: 2,
    creditUnits: 23,
  },

  // SECOND YEAR - SUMMER - REGULAR - NC
  {
    subjects: [
      {
        subjectCode: "GEEng 1",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 3",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GE SocSci 4",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SUMMER",
    yearLevel: 2,
    creditUnits: 9,
  },

  // THIRD YEAR - FIRST SEM - REGULAR - NC
  {
    subjects: [
      {
        subjectCode: "EMath 2200",
        prerequisites: ["EMath 2101"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3131",
        prerequisites: ["SE 2132", "SE 2134"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3132",
        prerequisites: ["SE 1121", "EE 2121"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3133",
        prerequisites: [],
        coRequisites: ["SE 3132"],
      },
      {
        subjectCode: "SE 3134",
        prerequisites: ["SE 2232", "SE 2233", "SE 2234", "SE 2235"],
        coRequisites: ["SE 3131"],
      },
      {
        subjectCode: "CESocSci 3",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "CETech1",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "CELit 1",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Regular",
    semesterType: "FIRST",
    yearLevel: 3,
    creditUnits: 24,
  },

  // THIRD YEAR - SECOND SEM - REGULAR - NC
  {
    subjects: [
      {
        subjectCode: "Engg 1025",
        prerequisites: ["Emath 1202"],
        coRequisites: [],
        yearStanding: 3,
      },
      {
        subjectCode: "SE 3231",
        prerequisites: ["Emath 1202", "EMath 2200", "SE 2231"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3232",
        prerequisites: ["SE 2131", "SE 2132"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3233",
        prerequisites: ["SE 3134"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3234",
        prerequisites: ["SE 3134"],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 5",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 1",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SECOND",
    yearLevel: 3,
    creditUnits: 22,
  },

  // THIRD YEAR - SUMMER - REGULAR - NC

  {
    subjects: [
      {
        subjectCode: "Engg 1027",
        prerequisites: ["Engg 1025"],
        coRequisites: [],
        yearStanding: 4,
      },
      {
        subjectCode: "GESocSci 2",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SUMMER",
    yearLevel: 3,
    creditUnits: 6,
  },

  // FOURTH YEAR - FIRST SEM - REGULAR - NC
  {
    subjects: [
      {
        subjectCode: "Engg 1030",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
      },
      {
        subjectCode: "Engg 1031",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
      },
      {
        subjectCode: "Engg 1034",
        prerequisites: [],
        coRequisites: ["Engg 1030"],
      },
      {
        subjectCode: "SE 4131",
        prerequisites: ["SE 3232"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 4132",
        prerequisites: ["SE 3231"],
        coRequisites: [],
      },
      {
        subjectCode: "SE TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
      },
    ],
    enrollmentType: "Regular",
    semesterType: "FIRST",
    yearLevel: 4,
    creditUnits: 20,
  },

  // FOURTH YEAR - SECOND SEM - REGULAR - NC
  {
    subjects: [
      {
        subjectCode: "SE 4231",
        prerequisites: ["SE 4132"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 4132",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
      },
      {
        subjectCode: "SE TE 2",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
      },
      {
        subjectCode: "SE TE 3",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SECOND",
    yearLevel: 4,
    creditUnits: 12,
  },

  // FOURTH YEAR - SUMMER - REGULAR - NC
  {
    subjects: [
      {
        subjectCode: "SE 4300",
        prerequisites: [],
        coRequisites: [],
        yearStanding: "ALL",
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SUMMER",
    yearLevel: 4,
    creditUnits: 3,
  },
];

//                            *************************** OLD CURRICULUM (2018) ***************************

// FIRST YEAR - FIRST SEM - REGULAR - OC
export const seDeptOld: DependencyListV2 = [
  {
    subjects: [
      {
        subjectCode: "EMath 1101",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "EMath 1102",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "Engg 1001",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "SE 1121",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GEMath 1",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 6",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP1-CWTS",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP1-LTS",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP1-ROTC",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "PE 2B(M)",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "PE 1a(W)",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "RE 1",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "SEAL 1",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Regular",
    semesterType: "FIRST",
    yearLevel: 1,
    creditUnits: 29,
  },
  // FIRST YEAR - SECOND SEM - REGULAR - OC
  {
    subjects: [
      {
        subjectCode: "EMath 1201",
        prerequisites: ["EMath 1101"],
        coRequisites: [],
      },
      {
        subjectCode: "EMath 1202",
        prerequisites: ["EMath 1101", "GEMath 1"],
        coRequisites: [],
      },
      {
        subjectCode: "Engg 1006",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "Engg 1009",
        prerequisites: [],
        coRequisites: ["EMath 1201"],
      },
      {
        subjectCode: "SE 1221",
        prerequisites: ["SE 1121"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 1222",
        prerequisites: [],
        coRequisites: ["SE 1223"],
      },
      {
        subjectCode: "SE 1223",
        prerequisites: ["SE 1121"],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP2-CTWS",
        prerequisites: ["NSTP1-CWTS"],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP2-LTS",
        prerequisites: ["NSTP1-LTS"],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP2-ROTC",
        prerequisites: ["NSTP1-ROTC"],
        coRequisites: [],
      },
      {
        subjectCode: "PE 1a(M)",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "PE 2B(W)",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "RE 2",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "SEAL 2",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SECOND",
    yearLevel: 1,
    creditUnits: 28,
  },

  // FIRST YEAR - SUMMER - REGULAR - OC

  {
    subjects: [
      {
        subjectCode: "GESocSci 1",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 2",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GEHum 1",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SUMMER",
    yearLevel: 1,
    creditUnits: 9,
  },

  // SECOND YEAR - FIRST SEM - REGULAR - OC
  {
    subjects: [
      {
        subjectCode: "EMath 2101",
        prerequisites: ["EMath 1201", "Emath 1202"],
        coRequisites: [],
      },
      {
        subjectCode: "EMath 2102",
        prerequisites: ["EMath 1102", "EMath 1202"],
        coRequisites: [],
      },
      {
        subjectCode: "EE 2121",
        prerequisites: ["Engg 1009"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2121",
        prerequisites: ["EMath 1102", "SE 1222"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2122",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2123",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2124",
        prerequisites: ["SE 1223"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2125",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: ["SE 2121"],
      },
      {
        subjectCode: "PE 3a",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Regular",
    semesterType: "FIRST",
    yearLevel: 2,
    creditUnits: 27,
  },

  // SECOND YEAR - SECOND SEM - REGULAR - OC

  {
    subjects: [
      {
        subjectCode: "EMath 2200",
        prerequisites: ["EMath 2101"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2221",
        prerequisites: ["EMath 2102", "SE 1222"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2222",
        prerequisites: ["SE 1121", "EE 2121"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2223",
        prerequisites: ["SE 2122", "SE 2125"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2224",
        prerequisites: [],
        coRequisites: ["SE 2222"],
      },
      {
        subjectCode: "SE 2225",
        prerequisites: ["SE 2124"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2226",
        prerequisites: ["EMath 1102", "SE2125"],
        coRequisites: [],
      },
      {
        subjectCode: "PE 4a (W)",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "PE 4a (M)",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SECOND",
    yearLevel: 2,
    creditUnits: 23,
  },

  // SECOND YEAR - SUMMER - REGULAR - OC
  {
    subjects: [
      {
        subjectCode: "GEEng 1",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 3",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 4",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SUMMER",
    yearLevel: 2,
    creditUnits: 9,
  },

  // THIRD YEAR - FIRST SEM - REGULAR - OC
  {
    subjects: [
      {
        subjectCode: "Engg 1025",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
      },
      {
        subjectCode: "SE 3121",
        prerequisites: ["EMath 1202", "EMath 2200", "SE 2221"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3122",
        prerequisites: ["SE 2123", "SE 2222"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3123",
        prerequisites: ["SE 2223", "SE 2225", "SE2226"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3124",
        prerequisites: ["SE 2225"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3125",
        prerequisites: [],
        coRequisites: ["SE 3123"],
      },
      {
        subjectCode: "SE 3126",
        prerequisites: [],
        coRequisites: ["SE 3123"],
      },
      {
        subjectCode: "GESocSci 5",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Regular",
    semesterType: "FIRST",
    yearLevel: 3,
    creditUnits: 25,
  },

  //  THIRD YEAR - SECOND SEM - REGULAR - OC

  {
    subjects: [
      {
        subjectCode: "Engg 1027",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
      },
      {
        subjectCode: "Engg 1030",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
      },
      {
        subjectCode: "Engg 1031",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
      },
      {
        subjectCode: "Engg 1034",
        prerequisites: [],
        coRequisites: ["Engg 1030"],
      },
      {
        subjectCode: "SE 3221",
        prerequisites: ["SE 3122"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3222",
        prerequisites: ["SE 3121"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3223",
        prerequisites: ["SE 3123"],
        coRequisites: [],
      },
      {
        subjectCode: "SE TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SECOND",
    yearLevel: 3,
    creditUnits: 26,
  },
  // THIRD YEAR - SUMMER - REGULAR - OC
  {
    subjects: [
      {
        subjectCode: "Fil 12",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "Fil 13",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "CELit 1",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SUMMER",
    yearLevel: 3,
    creditUnits: 9,
  },

  // FOURTH YEAR - FIRST SEM - REGULAR - OC
  {
    subjects: [
      {
        subjectCode: "SE 4121",
        prerequisites: ["SE 3222"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 4122",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
      },
      {
        subjectCode: "SE TE 2",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
      },
      {
        subjectCode: "SE TE 3",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
      },
    ],
    enrollmentType: "Regular",
    semesterType: "FIRST",
    yearLevel: 4,
    creditUnits: 12,
  },

  // FOURTH YEAR - SECOND SEM - REGULAR - OC
  {
    subjects: [
      {
        subjectCode: "SE 4221",
        prerequisites: [],
        coRequisites: [],
        yearStanding: "ALL",
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SECOND",
    yearLevel: 4,
    creditUnits: 5,
  },

  // FIRST YEAR - FIRST SEM - BRIDGING - OC

  {
    subjects: [
      {
        subjectCode: "EBMath 1101",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "EBMath 1102",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GEMath",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 6",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP 1 - CWTS",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP 1 - LTS",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP 1 - ROTC",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "PE 2B(M)",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "PE 2a(W)",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "RE 1",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "SEAL 1",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "FIRST",
    yearLevel: 1,
    creditUnits: 23,
  },

  // FIRST YEAR - SECOND SEM - BRIDGING - OC

  {
    subjects: [
      {
        subjectCode: "EBMath 1201",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "EBEngg 1202",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 1",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 2",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GEHum 1",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP 2 - CWTS",
        prerequisites: ["NSTP 1 - CWTS"],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP 2 - LTS",
        prerequisites: ["NSTP 1 - LTS"],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP 2 - ROTC",
        prerequisites: ["NSTP 1 - ROTC"],
        coRequisites: [],
      },
      {
        subjectCode: "PE 1a(M)",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "PE 2B(w)",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "RE 2",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "SEAL 2",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 1,
    creditUnits: 26,
  },

  // FIRST YEAR - SUMMER - BRIDGING - OC

  {
    subjects: [
      {
        subjectCode: "Fil 12",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "Fil 13",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "CELit 1",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SUMMER",
    yearLevel: 1,
    creditUnits: 9,
  },

  // SECOND YEAR - FIRST SEM - BRIDGING - OC
  {
    subjects: [
      {
        subjectCode: "EMath 1101",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "EMath 1102",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "Engg 1001",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "SE 1121",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GEEng 1",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 3",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 4",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "PE 3a",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "FIRST",
    yearLevel: 2,
    creditUnits: 25,
  },

  // SECOND YEAR - SECOND SEM - BRIDGING - OC

  {
    subjects: [
      {
        subjectCode: "EMath 1201",
        prerequisites: ["EMath 1101"],
        coRequisites: [],
      },
      {
        subjectCode: "EMath 1202",
        prerequisites: ["EMath 1101", "GEMath 1"],
        coRequisites: [],
      },
      {
        subjectCode: "Engg 1006",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "Engg 1009",
        prerequisites: [],
        coRequisites: ["EMath 1201"],
      },
      {
        subjectCode: "SE 1221",
        prerequisites: ["SE 1121"],
        coRequisites: [],
      },
      {
        subjectCode: "EMath 1222",
        prerequisites: [],
        coRequisites: ["SE 1223"],
      },
      {
        subjectCode: "SE 1223",
        prerequisites: ["SE 1121"],
        coRequisites: [],
      },
      {
        subjectCode: "PE 4a(W)",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "PE 4a(M)",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 2,
    creditUnits: 21,
  },

  // SECOND YEAR - FIRST YEAR - BRIDGING - OC

  {
    subjects: [
      {
        subjectCode: "EMath 2101",
        prerequisites: ["EMath 1201", "EMath 1202"],
        coRequisites: [],
      },
      {
        subjectCode: "EMath 2102",
        prerequisites: ["EMath 1102", "EMath 1202"],
        coRequisites: [],
      },
      {
        subjectCode: "EE 2121",
        prerequisites: ["Engg 1009 "],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2121",
        prerequisites: ["EMath 1102", "SE 1222"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2122",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2123",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2124",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: ["SE 2121"],
      },
      {
        subjectCode: "GESocSci 5",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "FIRST",
    yearLevel: 2,
    creditUnits: 28,
  },

  // THIRD YEAR - SECOND SEM - BRIDGING - OC

  {
    subjects: [
      {
        subjectCode: "EMath 2200",
        prerequisites: ["Emath 2101"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2221",
        prerequisites: ["EMath 2102", "SE 1222"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2222",
        prerequisites: ["SE 1121", "SE 2121"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2223",
        prerequisites: ["SE 2122", "SE 2125"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2224",
        prerequisites: [],
        coRequisites: ["SE 2222"],
      },
      {
        subjectCode: "SE 2225",
        prerequisites: ["SE 2124"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 2226",
        prerequisites: ["EMath 1102", "SE 2125"],
        coRequisites: [],
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 2,
    creditUnits: 21,
  },

  // FOURTH YEAR - FIRST SEM - BRIDGING - OC

  {
    subjects: [
      {
        subjectCode: "Engg 1025",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
      },
      {
        subjectCode: "SE 3121",
        prerequisites: ["EMath 1202", "EMath 2200", "SE 2221"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3122",
        prerequisites: ["SE 2123", "SE 2222"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3123",
        prerequisites: ["SE 2223", "SE 2225", "SE 2226"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3124",
        prerequisites: ["SE 2225"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3125",
        prerequisites: [],
        coRequisites: ["SE 3123"],
      },
      {
        subjectCode: "SE 3126",
        prerequisites: [],
        coRequisites: ["SE 3123"],
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "FIRST",
    yearLevel: 2,
    creditUnits: 22,
  },

  // FOURTH YEAR - SECOND SEM - BRDGING - OC
  {
    subjects: [
      {
        subjectCode: "Engg 1027",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
      },
      {
        subjectCode: "Engg 1030",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
      },
      {
        subjectCode: "Engg 1031",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
      },
      {
        subjectCode: "Engg 1034",
        prerequisites: [],
        coRequisites: ["Engg 1030"],
      },
      {
        subjectCode: "SE 3221",
        prerequisites: ["SE 3122"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3222",
        prerequisites: ["SE 3121"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 3223",
        prerequisites: ["SE 3123"],
        coRequisites: [],
      },
      {
        subjectCode: "SE TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 2,
    creditUnits: 26,
  },

  // FIFTH YEAR - FIRST SEM - BRIDGING - OC

  {
    subjects: [
      {
        subjectCode: "SE 4121",
        prerequisites: ["SE 3222"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 4122",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
      },
      {
        subjectCode: "SE TE 2",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
      },
      {
        subjectCode: "SE TE 3",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "FIRST",
    yearLevel: 2,
    creditUnits: 12,
  },

  // FIFTH YEAR - SECOND SEM - BRIDGING - OC

  {
    subjects: [
      {
        subjectCode: "SE 4221",
        prerequisites: [],
        coRequisites: [],
        yearStanding: "ALL",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 2,
    creditUnits: 5,
  },
];
