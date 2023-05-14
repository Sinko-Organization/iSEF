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
        type: "regular",
      },
      {
        subjectCode: "EBEngg 1102",
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
        subjectCode: "GESocSci 2",
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
        subjectCode: "EMath 1102",
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
        subjectCode: "SE 1121",
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
    creditUnits: 25,
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
        subjectCode: "Engg 1006",
        prerequisites: [],
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
        subjectCode: "SE 1221",
        prerequisites: ["SE 1121"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 1222",
        prerequisites: [],
        coRequisites: ["SE 1223"],
        type: "regular",
      },
      {
        subjectCode: "SE 1223",
        prerequisites: ["SE 1121"],
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
    creditUnits: 21,
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
        subjectCode: "EE 2121",
        prerequisites: ["Engg 1009"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2131",
        prerequisites: ["EMath 1102", "SE 1222"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2132",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2133",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2134",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: ["SE 2131"],
        type: "regular",
      },
      {
        subjectCode: "SE 2135",
        prerequisites: ["SE 1223"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "GESocSci 5",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
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
        type: "regular",
      },
      {
        subjectCode: "SE 2231",
        prerequisites: ["EMath 2102", "SE 1222"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2232",
        prerequisites: ["SE 2135"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2233",
        prerequisites: ["SE 2135"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2234",
        prerequisites: ["SE 2134"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2235",
        prerequisites: ["EMath 1102", "SE 2134"],
        coRequisites: [],
        type: "regular",
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
        type: "regular",
      },
      {
        subjectCode: "SE 3131",
        prerequisites: ["SE 2132", "SE 2134"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3132",
        prerequisites: ["SE1121", "EE 2121"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3133",
        prerequisites: [],
        coRequisites: ["SE 3132"],
        type: "regular",
      },
      {
        subjectCode: "SE 3134",
        prerequisites: ["SE 2232", "SE 2233", "SE 2234", "SE 2235"],
        coRequisites: ["SE 3131"],
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
        type: "regular",
      },
      {
        subjectCode: "SE 3231",
        prerequisites: ["EMath 1202", "EMath 2200", "SE 2231"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3232",
        prerequisites: ["SE 2131", "SE 3132"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3233",
        prerequisites: ["SE 3134"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3234",
        prerequisites: ["SE 3134"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "CETech1",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
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
        type: "regular",
      },
      {
        subjectCode: "CELit 1",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
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
        type: "regular",
      },
      {
        subjectCode: "Engg 1031",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "Engg 1034",
        prerequisites: [],
        coRequisites: ["Engg 1030"],
        type: "regular",
      },
      {
        subjectCode: "SE 4131",
        prerequisites: ["SE 3232"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 4132",
        prerequisites: ["SE 3231"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 4133",
        referenceCode: "SE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Networking",
        units: 4,
        yearStanding: 4,
        type: "elective",
      },
      {
        subjectCode: "SE 4134",
        referenceCode: "SE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Computer Graphics",
        units: 4,
        yearStanding: 4,
        type: "elective",
      },
      {
        subjectCode: "SE 4135",
        referenceCode: "SE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Technopreneurship 102",
        units: 3,
        yearStanding: 4,
        type: "elective",
      },
      {
        subjectCode: "SE 4136",
        referenceCode: "SE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "",
        units: 0,
        yearStanding: 4,
        type: "elective",
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
        type: "regular",
      },
      {
        subjectCode: "SE 4232",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "SE 4233",
        referenceCode: "SE TE 2",
        prerequisites: ["SE TE 1"],
        coRequisites: [],
        name: "Network Security Tools & Practices",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "SE 4235",
        referenceCode: "SE TE 2",
        prerequisites: ["SE TE 1"],
        coRequisites: [],
        name: "Game Develoopment",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "SE 4237",
        referenceCode: "SE TE 2",
        prerequisites: ["SE TE 1"],
        coRequisites: [],
        name: "Technopreneurship 103",
        units: 3,
        type: "elective",
      },
      {
        subjectCode: "SE 4239",
        referenceCode: "SE TE 2",
        prerequisites: ["SE TE 1"],
        coRequisites: [],
        name: "",
        units: 0,
        type: "elective",
      },
      {
        subjectCode: "SE 4234",
        referenceCode: "SE TE 3",
        prerequisites: [],
        coRequisites: ["SE TE 2"],
        name: "Cryptography/Blockchain",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "SE 4236",
        referenceCode: "SE TE 3",
        prerequisites: [],
        coRequisites: ["SE TE 2"],
        name: "Mobile Application Development",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "SE 4238",
        referenceCode: "SE TE 3",
        prerequisites: [],
        coRequisites: ["SE TE 2"],
        name: "Technopreneurship 104",
        units: 3,
        type: "elective",
      },
      {
        subjectCode: "SE 4240",
        referenceCode: "SE TE 3",
        prerequisites: [],
        coRequisites: ["SE TE 2"],
        name: "",
        units: 0,
        type: "elective",
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
        type: "regular",
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
        type: "regular",
      },
      {
        subjectCode: "EMath 1102",
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
        subjectCode: "SE 1121",
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
        type: "regular",
      },
      {
        subjectCode: "EMath 1202",
        prerequisites: ["EMath 1101, GEMath 1"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1006",
        prerequisites: [],
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
        subjectCode: "SE 1221",
        prerequisites: ["SE 1121"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 1222",
        prerequisites: [],
        coRequisites: ["SE 1223"],
        type: "regular",
      },
      {
        subjectCode: "SE 1223",
        prerequisites: ["SE 1121"],
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
    creditUnits: 28,
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
        subjectCode: "EE 2121",
        prerequisites: ["Engg 1009"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2131",
        prerequisites: ["EMath 1102", "SE 1222"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2132",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2133",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2134",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: ["SE 2131"],
        type: "regular",
      },
      {
        subjectCode: "SE 2135",
        prerequisites: ["SE 1223"],
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
        type: "regular",
      },
      {
        subjectCode: "SE 2231",
        prerequisites: ["SE 1222"],
        coRequisites: ["EMath 2102"],
        type: "regular",
      },
      {
        subjectCode: "SE 2232",
        prerequisites: ["SE 2135"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2233",
        prerequisites: ["SE 2135"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2234",
        prerequisites: ["SE 2134"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2235",
        prerequisites: ["EMath 1102", "SE 2134"],
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
    creditUnits: 23,
  },

  // SECOND YEAR - SUMMER - REGULAR - NC
  {
    subjects: [
      {
        subjectCode: "GEEng 1",
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
        subjectCode: "GE SocSci 4",
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

  // THIRD YEAR - FIRST SEM - REGULAR - NC
  {
    subjects: [
      {
        subjectCode: "EMath 2200",
        prerequisites: ["EMath 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3131",
        prerequisites: ["SE 2132", "SE 2134"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3132",
        prerequisites: ["SE 1121", "EE 2121"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3133",
        prerequisites: [],
        coRequisites: ["SE 3132"],
        type: "regular",
      },
      {
        subjectCode: "SE 3134",
        prerequisites: ["SE 2232", "SE 2233", "SE 2234", "SE 2235"],
        coRequisites: ["SE 3131"],
        type: "regular",
      },
      {
        subjectCode: "CESocSci 3",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "CETech1",
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
        type: "regular",
      },
      {
        subjectCode: "SE 3231",
        prerequisites: ["Emath 1202", "EMath 2200", "SE 2231"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3232",
        prerequisites: ["SE 2131", "SE 2132"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3233",
        prerequisites: ["SE 3134"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3234",
        prerequisites: ["SE 3134"],
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
        subjectCode: "GESocSci 1",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
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
        type: "regular",
      },
      {
        subjectCode: "Engg 1031",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "Engg 1034",
        prerequisites: [],
        coRequisites: ["Engg 1030"],
        type: "regular",
      },
      {
        subjectCode: "SE 4131",
        prerequisites: ["SE 3232"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 4132",
        prerequisites: ["SE 3231"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
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
        type: "regular",
      },
      {
        subjectCode: "SE 4132",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "SE TE 2",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "SE TE 3",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
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
        type: "regular",
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
        name: "Calculus I",
        units: 3,
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "EMath 1102",
        name: "Discrete Mathematics I for SE",
        units: 3,
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1001",
        name: "Chemistry for Engineers",
        units: 4,
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 1121",
        name: "Software Development I",
        units: 4,
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "GEMath 1",
        name: "Mathematics in the Modern World",
        units: 3,
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "GESocSci 6",
        name: "Science, Technology, and Society",
        units: 3,
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "NSTP1-CWTS",
        name: "Civic Welfare Training Service",
        units: 3,
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "NSTP1-LTS",
        prerequisites: [],
        coRequisites: [],
        name: "Literacy Training Service",
        units: 3,
        type: "regular",
      },
      {
        subjectCode: "NSTP1-ROTC",
        name: "Reserve Officer's Training Corps",
        units: 3,
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PE 2B(M)",
        name: "Individual/Dual Sports (Swimming)",
        units: 2,
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PE 1a(W)",
        name: "Physical Fitness and Wellness",
        units: 2,
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "RE 1",
        name: "Christianity in a Changing Society",
        units: 3,
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SEAL 1",
        name: "Student Enhancement Activities for Life I",
        units: 1,
        prerequisites: [],
        coRequisites: [],
        type: "regular",
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
        name: "Calculus II",
        units: 3,
        prerequisites: ["EMath 1101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "EMath 1202",
        name: "Engineering Data Analysis",
        units: 3,
        prerequisites: ["EMath 1101", "GEMath 1"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1006",
        name: "Computer Aided Drafting/Design",
        units: 1,
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1009",
        name: "Physics for Engineers",
        units: 4,
        prerequisites: [],
        coRequisites: ["EMath 1201"],
        type: "regular",
      },
      {
        subjectCode: "SE 1221",
        name: "Introduction to Engineering Design for SE",
        units: 1,
        prerequisites: ["SE 1121"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 1222",
        name: "Data Structures",
        units: 3,
        prerequisites: [],
        coRequisites: ["SE 1223"],
        type: "regular",
      },
      {
        subjectCode: "SE 1223",
        prerequisites: ["SE 1121"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "NSTP2-CWTS",
        prerequisites: ["NSTP1-CWTS"],
        coRequisites: [],
        name: "Civil Welfare Training Service",
        units: 3,
        type: "regular",
      },
      {
        subjectCode: "NSTP2-LTS",
        prerequisites: ["NSTP1-LTS"],
        coRequisites: [],
        name: "Literacy Training Service",
        units: 3,
        type: "regular",
      },
      {
        subjectCode: "NSTP2-ROTC",
        prerequisites: ["NSTP1-ROTC"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PE 1a(M)",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PE 2B(W)",
        prerequisites: [],
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
    creditUnits: 28,
  },

  // FIRST YEAR - SUMMER - REGULAR - OC

  {
    subjects: [
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
      {
        subjectCode: "GEHum 1",
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

  // SECOND YEAR - FIRST SEM - REGULAR - OC
  {
    subjects: [
      {
        subjectCode: "EMath 2101",
        prerequisites: ["EMath 1201", "Emath 1202"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "EMath 2102",
        prerequisites: ["EMath 1102", "EMath 1202"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "EE 2121",
        prerequisites: ["Engg 1009"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2121",
        prerequisites: ["EMath 1102", "SE 1222"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2122",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2123",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2124",
        prerequisites: ["SE 1223"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2125",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: ["SE 2121"],
        type: "regular",
      },
      {
        subjectCode: "PE 3a",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
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
        type: "regular",
      },
      {
        subjectCode: "SE 2221",
        prerequisites: ["EMath 2102", "SE 1222"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2222",
        prerequisites: ["SE 1121", "EE 2121"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2223",
        prerequisites: ["SE 2122", "SE 2125"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2224",
        prerequisites: [],
        coRequisites: ["SE 2222"],
        type: "regular",
      },
      {
        subjectCode: "SE 2225",
        prerequisites: ["SE 2124"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2226",
        prerequisites: ["EMath 1102", "SE2125"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PE 4a (W)",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PE 4a (M)",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
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
        type: "regular",
      },
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
        type: "regular",
      },
      {
        subjectCode: "SE 3121",
        prerequisites: ["EMath 1202", "EMath 2200", "SE 2221"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3122",
        prerequisites: ["SE 2123", "SE 2222"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3123",
        prerequisites: ["SE 2223", "SE 2225", "SE2226"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3124",
        prerequisites: ["SE 2225"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3125",
        prerequisites: [],
        coRequisites: ["SE 3123"],
        type: "regular",
      },
      {
        subjectCode: "SE 3126",
        prerequisites: [],
        coRequisites: ["SE 3123"],
        type: "regular",
      },
      {
        subjectCode: "GESocSci 5",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
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
        subjectCode: "Engg 1031",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
        type: "regular",
      },
      {
        subjectCode: "Engg 1034",
        prerequisites: [],
        coRequisites: ["Engg 1030"],
        type: "regular",
      },
      {
        subjectCode: "SE 3221",
        prerequisites: ["SE 3122"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3222",
        prerequisites: ["SE 3121"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3223",
        prerequisites: ["SE 3123"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3224",
        referenceCode: "SE TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
        name: "Networking",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "SE 3225",
        referenceCode: "SE TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
        name: "Computer Graphics",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "SE 3226",
        referenceCode: "SE TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
        name: "Technopreneurship 102",
        units: 3,
        type: "elective",
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
        type: "regular",
      },
      {
        subjectCode: "Fil 13",
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
        type: "regular",
      },
      {
        subjectCode: "SE 4122",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "SE 4123",
        referenceCode: "SE TE 2",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        name: "Network Security Tools & Practices",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "SE 4125",
        referenceCode: "SE TE 2",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        name: "Game Development",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "SE 4127",
        referenceCode: "SE TE 2",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        name: "Technopreneurship 103",
        units: 3,
        type: "elective",
      },

      {
        subjectCode: "SE 4124",
        referenceCode: "SE TE 3",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        name: "Cryptography/Blockchain",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "SE 4126",
        referenceCode: "SE TE 3",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        name: "Mobile Application Development",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "SE 4128",
        referenceCode: "SE TE 3",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        name: "Technopreneurship 104",
        units: 3,
        type: "elective",
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
        type: "regular",
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
        type: "regular",
      },
      {
        subjectCode: "EBMath 1102",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "GEMath",
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
        subjectCode: "NSTP 1 - CWTS",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "NSTP 1 - LTS",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "NSTP 1 - ROTC",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PE 2B(M)",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PE 2a(W)",
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

  // FIRST YEAR - SECOND SEM - BRIDGING - OC

  {
    subjects: [
      {
        subjectCode: "EBMath 1201",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "EBEngg 1202",
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
      {
        subjectCode: "GEHum 1",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "NSTP 2 - CWTS",
        prerequisites: ["NSTP 1 - CWTS"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "NSTP 2 - LTS",
        prerequisites: ["NSTP 1 - LTS"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "NSTP 2 - ROTC",
        prerequisites: ["NSTP 1 - ROTC"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PE 1a(M)",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PE 2B(w)",
        prerequisites: [],
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

  // FIRST YEAR - SUMMER - BRIDGING - OC

  {
    subjects: [
      {
        subjectCode: "Fil 12",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Fil 13",
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
        type: "regular",
      },
      {
        subjectCode: "EMath 1102",
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
        subjectCode: "SE 1121",
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
        subjectCode: "PE 3a",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
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
        type: "regular",
      },
      {
        subjectCode: "EMath 1202",
        prerequisites: ["EMath 1101", "GEMath 1"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1006",
        prerequisites: [],
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
        subjectCode: "SE 1221",
        prerequisites: ["SE 1121"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "EMath 1222",
        prerequisites: [],
        coRequisites: ["SE 1223"],
        type: "regular",
      },
      {
        subjectCode: "SE 1223",
        prerequisites: ["SE 1121"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PE 4a(W)",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PE 4a(M)",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
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
        type: "regular",
      },
      {
        subjectCode: "EMath 2102",
        prerequisites: ["EMath 1102", "EMath 1202"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "EE 2121",
        prerequisites: ["Engg 1009 "],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2121",
        prerequisites: ["EMath 1102", "SE 1222"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2122",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2123",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2124",
        prerequisites: ["SE 1222", "SE 1223"],
        coRequisites: ["SE 2121"],
        type: "regular",
      },
      {
        subjectCode: "GESocSci 5",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
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
        type: "regular",
      },
      {
        subjectCode: "SE 2221",
        prerequisites: ["EMath 2102", "SE 1222"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2222",
        prerequisites: ["SE 1121", "SE 2121"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2223",
        prerequisites: ["SE 2122", "SE 2125"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2224",
        prerequisites: [],
        coRequisites: ["SE 2222"],
        type: "regular",
      },
      {
        subjectCode: "SE 2225",
        prerequisites: ["SE 2124"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 2226",
        prerequisites: ["EMath 1102", "SE 2125"],
        coRequisites: [],
        type: "regular",
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
        type: "regular",
      },
      {
        subjectCode: "SE 3121",
        prerequisites: ["EMath 1202", "EMath 2200", "SE 2221"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3122",
        prerequisites: ["SE 2123", "SE 2222"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3123",
        prerequisites: ["SE 2223", "SE 2225", "SE 2226"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3124",
        prerequisites: ["SE 2225"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3125",
        prerequisites: [],
        coRequisites: ["SE 3123"],
        type: "regular",
      },
      {
        subjectCode: "SE 3126",
        prerequisites: [],
        coRequisites: ["SE 3123"],
        type: "regular",
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
        subjectCode: "Engg 1031",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
        type: "regular",
      },
      {
        subjectCode: "Engg 1034",
        prerequisites: [],
        coRequisites: ["Engg 1030"],
        type: "regular",
      },
      {
        subjectCode: "SE 3221",
        prerequisites: ["SE 3122"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3222",
        prerequisites: ["SE 3121"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE 3223",
        prerequisites: ["SE 3123"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "SE TE 1",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
        type: "regular",
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
        type: "regular",
      },
      {
        subjectCode: "SE 4122",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "SE TE 2",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "SE TE 3",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
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
        type: "regular",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 2,
    creditUnits: 5,
  },
];
