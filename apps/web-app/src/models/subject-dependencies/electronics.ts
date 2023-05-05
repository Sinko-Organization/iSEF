import { DependencyListV2 } from "./types";

// ***************************   OLD CURRICULUM 2018 - 2019   *************************** //

export const eceDepOld: DependencyListV2 = [
  // ============= FIRST YEAR - FIRST SEM - BRIDGING - OC ============= //

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
        subjectCode: "PE 2B (M)",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PE 1a (W)",
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
    creditUnits: 20,
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
        subjectCode: "PE 1a (M)",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PE 2B (W)",
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
        subjectCode: "EMath 1103",
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
        subjectCode: "Engg 1003",
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
    creditUnits: 22,
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
        subjectCode: "Engg 1010",
        prerequisites: [],
        coRequisites: ["Engg 1009"],
        type: "regular",
      },
      {
        subjectCode: "Engg 1011",
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
      {
        subjectCode: "PE 4a (W)",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 2,
    creditUnits: 18,
  },

  // THIRD YEAR - FIRST SEM - BRIDGING - OC
  {
    subjects: [
      {
        subjectCode: "EMath 2101",
        prerequisites: ["EMath 1201", "EMath 1202"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 2101",
        prerequisites: [],
        coRequisites: ["EE 2131"],
        type: "regular",
      },
      {
        subjectCode: "EE 2131",
        prerequisites: ["Engg 1010"],
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
        subjectCode: "GESocSci 6",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Fil 12",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "FIRST",
    yearLevel: 3,
    creditUnits: 20,
  },

  // THIRD YEAR - SECOND SEM - BRIDGING - OC
  {
    subjects: [
      {
        subjectCode: "EMath 2200",
        prerequisites: ["EMath 1201"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 2201",
        prerequisites: ["EMath 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 2202",
        prerequisites: [],
        coRequisites: ["ECE 2203"],
        type: "regular",
      },
      {
        subjectCode: "ECE 2203",
        prerequisites: ["ECE 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "EE 2231",
        prerequisites: ["EE 2131"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Fil 13",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 3,
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
        subjectCode: "ECE 3110",
        prerequisites: ["ECE 2202"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3111",
        prerequisites: ["ECE 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3112",
        prerequisites: ["EMath 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3113",
        prerequisites: ["ECE 2203"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3114",
        prerequisites: ["ECE 2201"],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "FIRST",
    yearLevel: 4,
    creditUnits: 23,
  },

  // FOURTH YEAR - SECOND SEM - BRIDGING - OC

  {
    subjects: [
      {
        subjectCode: "Engg 1027",
        prerequisites: ["Engg 1025"],
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
        subjectCode: "ECE 3210",
        prerequisites: ["ECE 3110"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3211",
        prerequisites: ["ECE 3110"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3212",
        prerequisites: ["ECE 3111"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3213",
        prerequisites: ["GESocSci 5"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3214",
        prerequisites: ["ECE 2201"],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 4,
    creditUnits: 25,
  },

  // FOURTH YEAR - SUMMER - BRIDGING - OC
  {
    subjects: [
      {
        subjectCode: "ECE 3301",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SUMMER",
    yearLevel: 4,
    creditUnits: 3,
  },

  // FIFTH YEAR - FIRST SEM - BRIDGING - OC

  {
    subjects: [
      {
        subjectCode: "Engg 1019",
        prerequisites: ["Engg 1001"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1032",
        prerequisites: ["Engg 1025"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 4100",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "ECE 4140",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "ECE 4141",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },

      //TE 1 - ECE ELECTIVES

      {
        subjectCode: "ECE 4142",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Advanced Communication System & Design (Wireless)",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4143",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Analog IC Design",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4144",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Advanced Power Supply Systems",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4145",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Fundamentals of Biomedical Engineering",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4146",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Advanced Instrumentation & Control Systems",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4147",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "ICT Infrastructure",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4148",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Computer Systems Architecture",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4149",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Broadcast Production Engineering",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4150",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Technopreneurship 102",
        units: 4,
        type: "elective",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "FIRST",
    yearLevel: 5,
    creditUnits: 15,
  },

  // FIFTH YEAR - SECOND SEM - BRIDGING - OC

  {
    subjects: [
      {
        subjectCode: "Engg 1022",
        prerequisites: ["Engg 1001"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 4200",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "ECE 4240",
        prerequisites: ["ECE 4140"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 4241",
        prerequisites: [],
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

      //TE 2 - ECE ELECTIVES

      {
        subjectCode: "ECE 4242",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Advanced Networking",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4243",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Digital IC Design",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4244",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Renewable Energy Systems",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4245",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Medical Imaging",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4246",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Robotics Technology",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4247",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Electronics Ancillary System",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4248",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Operating Systems & Advanced Programming Languages",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4249",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Broadcast Transmission & Distribution",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4250",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Technopreneurship 103",
        units: 4,
        type: "elective",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 5,
    creditUnits: 14,
  },

  // ============= FIRST YEAR - FIRST SEM - REGULAR - OC ============= //

  {
    subjects: [
      {
        subjectCode: "EMath 1101",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "EMath 1103",
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
        subjectCode: "Engg 1003",
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
        subjectCode: "PE 2B (M)",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PE 1a (W)",
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
    creditUnits: 23,
  },

  // FIRST YEAR - SECOND SEM - REGULAR - OC

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
        subjectCode: "Engg 1010",
        prerequisites: [],
        coRequisites: ["Engg 1009"],
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
        subjectCode: "PE 1a (M)",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PE 2B (W)",
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
    creditUnits: 25,
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
        subjectCode: "GEHum 1",
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

  // SECOND YEAR - FIRST SEM - REGULAR - OC
  {
    subjects: [
      {
        subjectCode: "EMath 2101",
        prerequisites: ["EMath 1201", "EMath 1202"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 2101",
        prerequisites: [],
        coRequisites: ["EE 2131"],
        type: "regular",
      },
      {
        subjectCode: "EE 2131",
        prerequisites: ["Engg 1010"],
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
        subjectCode: "GESocSci 6",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Fil 12",
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
    enrollmentType: "Regular",
    semesterType: "FIRST",
    yearLevel: 2,
    creditUnits: 22,
  },
  // SECOND YEAR - SECOND SEM - REGULAR - OC
  {
    subjects: [
      {
        subjectCode: "EMath 2200",
        prerequisites: ["EMath 1201"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 2201",
        prerequisites: ["EMath 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 2202",
        prerequisites: [],
        coRequisites: ["ECE 2203"],
        type: "regular",
      },
      {
        subjectCode: "ECE 2203",
        prerequisites: ["ECE 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "EE 2231",
        prerequisites: ["EE 2131"],
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
        subjectCode: "PE 4a (M)",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "PE 4a (W)",
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

  //SECOND YEAR - SUMMER - REGULAR - OC

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
        subjectCode: "ECE 3110",
        prerequisites: ["ECE 2202"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3111",
        prerequisites: ["ECE 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3112",
        prerequisites: ["EMath 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3113",
        prerequisites: ["ECE 2203"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3114",
        prerequisites: ["ECE 2201"],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Regular",
    semesterType: "FIRST",
    yearLevel: 3,
    creditUnits: 23,
  },

  // THIRD YEAR - SECOND SEM - REGULAR - OC

  {
    subjects: [
      {
        subjectCode: "Engg 1027",
        prerequisites: ["Engg 1025"],
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
        subjectCode: "ECE 3210",
        prerequisites: ["ECE 3110"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3211",
        prerequisites: ["ECE 3110"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3212",
        prerequisites: ["ECE 3111"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3213",
        prerequisites: ["GESocSci 5"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3214",
        prerequisites: ["ECE 2201"],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SECOND",
    yearLevel: 3,
    creditUnits: 25,
  },

  // THIRD YEAR - SUMMER - REGULAR - OC
  {
    subjects: [
      {
        subjectCode: "ECE 3301",
        prerequisites: [],
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

  // FOURTH YEAR - FIRST SEM - REGULAR - OC

  {
    subjects: [
      {
        subjectCode: "Engg 1019",
        prerequisites: ["Engg 1001"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1032",
        prerequisites: ["Engg 1025"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 4100",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "ECE 4140",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "ECE 4141",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },

      //TE 1 - ECE ELECTIVES

      {
        subjectCode: "ECE 4142",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Advanced Communication System & Design (Wireless)",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4143",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Analog IC Design",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4144",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Advanced Power Supply Systems",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4145",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Fundamentals of Biomedical Engineering",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4146",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Advanced Instrumentation & Control Systems",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4147",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "ICT Infrastructure",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4148",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Computer Systems Architecture",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4149",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Broadcast Production Engineering",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4150",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Technopreneurship 102",
        units: 4,
        type: "elective",
      },
    ],
    enrollmentType: "Regular",
    semesterType: "FIRST",
    yearLevel: 4,
    creditUnits: 15,
  },

  // FOUTH YEAR - SECOND SEM - REGULAR - OC

  {
    subjects: [
      {
        subjectCode: "Engg 1022",
        prerequisites: ["Engg 1001"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 4200",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "ECE 4240",
        prerequisites: ["ECE 4140"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 4241",
        prerequisites: [],
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

      //TE 2 - ECE ELECTIVES

      {
        subjectCode: "ECE 4242",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Advanced Networking",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4243",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Digital IC Design",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4244",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Renewable Energy Systems",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4245",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Medical Imaging",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4246",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Robotics Technology",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4247",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Electronics Ancillary System",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4248",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Operating Systems & Advanced Programming Languages",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4249",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Broadcast Transmission & Distribution",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4250",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Technopreneurship 103",
        units: 4,
        type: "elective",
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SECOND",
    yearLevel: 4,
    creditUnits: 14,
  },
];

// ***************************   NEW CURRICULUM 2022 - 2023   *************************** //

export const eceDepNew: DependencyListV2 = [
  // ============= FIRST YEAR - FIRST SEM - BRIDGING - NC ============= //

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
    creditUnits: 20,
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
        subjectCode: "EMath 1103",
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
        subjectCode: "Engg 1003",
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
    creditUnits: 22,
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
        subjectCode: "Engg 1010",
        prerequisites: [],
        coRequisites: ["Engg 1009"],
        type: "regular",
      },
      {
        subjectCode: "Engg 1011",
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
    creditUnits: 18,
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
        subjectCode: "ECE 2101",
        prerequisites: [],
        coRequisites: ["EE 2131"],
        type: "regular",
      },
      {
        subjectCode: "EE 2131",
        prerequisites: ["Engg 1010"],
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
        subjectCode: "GESocSci 6",
        prerequisites: [],
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
    semesterType: "FIRST",
    yearLevel: 3,
    creditUnits: 20,
  },

  // THIRD YEAR - SECOND SEM - BRIDGING - NC

  {
    subjects: [
      {
        subjectCode: "EMath 2200",
        prerequisites: ["EMath 1201"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 2201",
        prerequisites: ["EMath 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 2202",
        prerequisites: [],
        coRequisites: ["ECE 2203"],
        type: "regular",
      },
      {
        subjectCode: "ECE 2203",
        prerequisites: ["ECE 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "EE 2231",
        prerequisites: ["EE 2131"],
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
    semesterType: "SECOND",
    yearLevel: 3,
    creditUnits: 21,
  },

  // FOURTH YEAR - FIRST SEM - BRIDGING - NC

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
        subjectCode: "ECE 3110",
        prerequisites: ["ECE 2202"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3111",
        prerequisites: ["ECE 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3112",
        prerequisites: ["EMath 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3113",
        prerequisites: ["ECE 2203"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3114",
        prerequisites: ["ECE 2201"],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "FIRST",
    yearLevel: 4,
    creditUnits: 23,
  },

  // FOURTH YEAR - SECOND SEM - BRIDGING - NC

  {
    subjects: [
      {
        subjectCode: "Engg 1030",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
        type: "regular",
      },
      {
        subjectCode: "ECE 3210",
        prerequisites: ["ECE 3110"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3211",
        prerequisites: ["ECE 3110"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3212",
        prerequisites: ["ECE 3111"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3214",
        prerequisites: ["ECE 2201"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3215",
        prerequisites: ["GEEng 1", "EMath 1202"],
        coRequisites: [],
        yearStanding: 3,
        type: "regular",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 4,
    creditUnits: 25,
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
    ],
    enrollmentType: "Bridging",
    semesterType: "SUMMER",
    yearLevel: 4,
    creditUnits: 3,
  },

  // FIFTH YEAR - FIRST SEM - BRIDGING - NC

  {
    subjects: [
      {
        subjectCode: "Engg 1019",
        prerequisites: ["Engg 1001"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1032",
        prerequisites: ["Engg 1025"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 4100",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "ECE 4140",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "ECE 4151",
        prerequisites: ["GESocSci 5"],
        coRequisites: [],
        type: "regular",
      },

      //TE 1 - ECE ELECTIVES

      {
        subjectCode: "ECE 4142",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Advanced Communication System & Design (Wireless)",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4143",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Analog IC Design",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4144",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Advanced Power Supply Systems",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4145",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Fundamentals of Biomedical Engineering",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4146",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Advanced Instrumentation & Control Systems",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4147",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "ICT Infrastructure",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4148",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Computer Systems Architecture",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4149",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Broadcast Production Engineering",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4150",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Technopreneurship 102",
        units: 4,
        type: "elective",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "FIRST",
    yearLevel: 5,
    creditUnits: 15,
  },

  // FIFTH YEAR - SECOND SEM - BRIDGING - NC

  {
    subjects: [
      {
        subjectCode: "Engg 1022",
        prerequisites: ["Engg 1001"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 4200",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "ECE 4240",
        prerequisites: ["ECE 4140"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 4241",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },

      //TE 2 - ECE ELECTIVES

      {
        subjectCode: "ECE 4242",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Advanced Networking",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4243",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Digital IC Design",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4244",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Renewable Energy Systems",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4245",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Medical Imaging",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4246",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Robotics Technology",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4247",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Electronics Ancillary System",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4248",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Operating Systems & Advanced Programming Languages",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4249",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Broadcast Transmission & Distribution",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4250",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Technopreneurship 103",
        units: 4,
        type: "elective",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 5,
    creditUnits: 11,
  },

  // FIFTH YEAR - SUMMER - BRIDGING - NC

  {
    subjects: [
      {
        subjectCode: "ECE 4300",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SUMMER",
    yearLevel: 5,
    creditUnits: 3,
  },

  // ============= FIRST YEAR - FIRST SEM - REGULAR - NC ============= //

  {
    subjects: [
      {
        subjectCode: "EMath 1101",
        prerequisites: [],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "EMath 1103",
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
        subjectCode: "Engg 1003",
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
    creditUnits: 23,
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
        subjectCode: "Engg 1010",
        prerequisites: [],
        coRequisites: ["Engg 1009"],
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
    creditUnits: 25,
  },

  // FIRST YEAR - SUMMER - REGULAR - NC

  {
    subjects: [
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
        subjectCode: "ECE 2101",
        prerequisites: [],
        coRequisites: ["EE 2131"],
        type: "regular",
      },
      {
        subjectCode: "EE 2131",
        prerequisites: ["Engg 1010"],
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
        subjectCode: "GESocSci 6",
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
    creditUnits: 22,
  },

  // SECOND YEAR - SECOND SEM - REGULAR - NC

  {
    subjects: [
      {
        subjectCode: "EMath 2200",
        prerequisites: ["EMath 1201"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 2201",
        prerequisites: ["EMath 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 2202",
        prerequisites: [],
        coRequisites: ["ECE 2203"],
        type: "regular",
      },
      {
        subjectCode: "ECE 2203",
        prerequisites: ["ECE 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "EE 2231",
        prerequisites: ["EE 2131"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "CETech 1",
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

  //SECOND YEAR - SUMMER - REGULAR - NC

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

  // THIRD YEAR - FIRST SEM - REGULAR - NC

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
        subjectCode: "ECE 3110",
        prerequisites: ["ECE 2202"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3111",
        prerequisites: ["ECE 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3112",
        prerequisites: ["EMath 2101"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3113",
        prerequisites: ["ECE 2203"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3114",
        prerequisites: ["ECE 2201"],
        coRequisites: [],
        type: "regular",
      },
    ],
    enrollmentType: "Regular",
    semesterType: "FIRST",
    yearLevel: 3,
    creditUnits: 23,
  },

  // THIRD YEAR - SECOND SEM - REGULAR - NC

  {
    subjects: [
      {
        subjectCode: "Engg 1030",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 3,
        type: "regular",
      },
      {
        subjectCode: "ECE 3210",
        prerequisites: ["ECE 3110"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3211",
        prerequisites: ["ECE 3110"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3212",
        prerequisites: ["ECE 3111"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3214",
        prerequisites: ["ECE 2201"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 3215",
        prerequisites: ["GEEng 1", "EMath 1202"],
        coRequisites: [],
        yearStanding: 3,
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
    semesterType: "SECOND",
    yearLevel: 3,
    creditUnits: 25,
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

  // FOURTH YEAR - FIRST SEM - REGULAR - NC

  {
    subjects: [
      {
        subjectCode: "Engg 1019",
        prerequisites: ["Engg 1001"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 1032",
        prerequisites: ["Engg 1025"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 4100",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "ECE 4140",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "ECE 4151",
        prerequisites: ["GESocSci 5"],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },

      //TE 1 - ECE ELECTIVES

      {
        subjectCode: "ECE 4142",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Advanced Communication System & Design (Wireless)",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4143",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Analog IC Design",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4144",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Advanced Power Supply Systems",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4145",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Fundamentals of Biomedical Engineering",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4146",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Advanced Instrumentation & Control Systems",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4147",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "ICT Infrastructure",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4148",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Computer Systems Architecture",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4149",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Broadcast Production Engineering",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4150",
        referenceCode: "ECE TE 1",
        prerequisites: [],
        coRequisites: [],
        name: "Technopreneurship 102",
        units: 4,
        type: "elective",
      },
    ],
    enrollmentType: "Regular",
    semesterType: "FIRST",
    yearLevel: 4,
    creditUnits: 15,
  },

  // FOUTH YEAR - SECOND SEM - REGULAR - NC

  {
    subjects: [
      {
        subjectCode: "Engg 1022",
        prerequisites: ["Engg 1001"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "Engg 4200",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },
      {
        subjectCode: "ECE 4240",
        prerequisites: ["ECE 4140"],
        coRequisites: [],
        type: "regular",
      },
      {
        subjectCode: "ECE 4241",
        prerequisites: [],
        coRequisites: [],
        yearStanding: 4,
        type: "regular",
      },

      //TE 2 - ECE ELECTIVES

      {
        subjectCode: "ECE 4242",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Advanced Networking",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4243",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Digital IC Design",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4244",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Renewable Energy Systems",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4245",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Medical Imaging",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4246",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Robotics Technology",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4247",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Electronics Ancillary System",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4248",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Operating Systems & Advanced Programming Languages",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4249",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Broadcast Transmission & Distribution",
        units: 4,
        type: "elective",
      },
      {
        subjectCode: "ECE 4250",
        referenceCode: "ECE TE 2",
        prerequisites: [],
        coRequisites: [],
        name: "Technopreneurship 103",
        units: 4,
        type: "elective",
      },
    ],
    enrollmentType: "Regular",
    semesterType: "SECOND",
    yearLevel: 4,
    creditUnits: 11,
  },

  // FOUTH YEAR - SUMMER - REGULAR - NC

  {
    subjects: [
      {
        subjectCode: "ECE 4300",
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
