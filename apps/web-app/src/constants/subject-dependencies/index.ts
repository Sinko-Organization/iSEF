export type DependencyList = {
  subjects: {
    subjectCode: string;
    prerequisites: string[];
    coRequisites: string[];
  }[];
  enrollmentType: "Regular" | "Bridging";
}[];

export const seDep: DependencyList = [
  //BRIDGING
  {
    subjects: [
      //FIRST YEAR

      //First Sem
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

      // Second Sem

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

      // SECOND YEAR

      //First Sem

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

      //Second Sem

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

      // THIRD YEAR

      // First Sem

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

      // Second Sem

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

      // FOURTH YEAR

      // First Sem
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

      // Second Sem

      {
        subjectCode: "Engg 1025",
        prerequisites: ["EMath 1202"],
        coRequisites: [],
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

      // SUMMER

      {
        subjectCode: "Engg 1027",
        prerequisites: ["Engg 1025"],
        coRequisites: [],
      },
      {
        subjectCode: "CELit 1",
        prerequisites: [],
        coRequisites: [],
      },

      // FIFTH YEAR

      // First Sem

      {
        subjectCode: "Engg 1030",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "Engg 1031",
        prerequisites: [],
        coRequisites: [],
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
      },

      // Second Sem

      {
        subjectCode: "SE 4231",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "SE 4232",
        prerequisites: [],
        coRequisites: [],
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

      // Summer

      {
        subjectCode: "SE 4300",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Bridging",
  },

  // REGULARS

  // FIRST YEAR

  // First Sem
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

      // Second Sem
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

      // SECOND YEAR

      // First Sem

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

      // Second Sem

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

      // Summer

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

      // THIRD YEAR

      // First Sem

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

      // Second Sem
      {
        subjectCode: "Engg 1025",
        prerequisites: ["Emath 1202"],
        coRequisites: [],
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

      // Summer

      {
        subjectCode: "Engg 1027",
        prerequisites: ["Engg 1025"],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 2",
        prerequisites: [],
        coRequisites: [],
      },

      // FOURTH YEAR

      // First Sem

      {
        subjectCode: "Engg 1030",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "Engg 1031",
        prerequisites: [],
        coRequisites: [],
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
      },

      // Second Sem

      {
        subjectCode: "SE 4231",
        prerequisites: ["SE 4132"],
        coRequisites: [],
      },
      {
        subjectCode: "SE 4132",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "SE TE 2",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "SE TE 3",
        prerequisites: [],
        coRequisites: [],
      },

      // Summer

      {
        subjectCode: "SE 4300",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Regular",
  },
];
