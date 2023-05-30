/* eslint-disable import/named */
import {
  Document,
  Font,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { useCourseStore, useHonorsFilterStore } from "@web-app/stores";
import { trpc } from "@web-app/utils/trpc";
import type { inferQueryOutput } from "@web-app/utils/trpc";
import { useRouter } from "next/router";
import type { FC } from "react";
import { match } from "ts-pattern";

type HonorsData = inferQueryOutput<"honors.getAll">;

interface Props {
  data: HonorsData;
  semesterType: "FIRST" | "SECOND" | "SUMMER";
  schoolYear: number;
  yearLevel?: number;
  courseName?: string;
}

const getYear = (yearLevel: number | undefined) => {
  switch (yearLevel) {
    case 0: {
      return "Bridging";
    }
    case 1: {
      return "1st Year";
    }
    case 2: {
      return "2nd Year";
    }
    case 3: {
      return "3rd Year";
    }
    case 4: {
      return "4th Year";
    }
    default: {
      return "No Year";
    }
  }
};

const AcademicList: FC<Props> = ({
  data,
  semesterType,
  schoolYear,
  yearLevel,
  courseName,
}) => {
  const sortedData = data.sort((a, b) => a.gwa - b.gwa);
  const honorsList = sortedData.filter(
    (student) => student.gwa >= 1 && student.gwa <= 1.56,
  );
  const deansList = sortedData.filter(
    (student) => student.gwa >= 1.57 && student.gwa <= 2,
  );

  const semster = match(semesterType)
    .with("FIRST", () => "1st Semester")
    .with("SECOND", () => "2nd Semester")
    .with("SUMMER", () => "Summer")
    .exhaustive();

  return (
    <Document>
      <Page style={header.page} size="A4" wrap>
        <Text style={header.title}>Central Philippine University </Text>
        <Text style={header.headerTitle}>COLLEGE OF ENGINEERING</Text>

        <View style={header.header}>
          <Text>HONOR&apos;S LIST</Text>
          <Text>{courseName ?? "No Course"}</Text>
        </View>

        <View style={header.courseTable}>
          <View style={[header.row, header.courseTitle]}>
            <Text style={[header.courseTitle, header.cell]}>{semster}</Text>
            <Text style={[header.courseTitle, header.cell]}>
              S.Y. {schoolYear}-{schoolYear + 1}
            </Text>
            <Text style={[header.courseTitle, header.cell]}>
              {getYear(yearLevel)}
            </Text>
          </View>
        </View>

        <View style={header.header}>
          <View style={[header.row, header.border]}>
            <Text style={[header.courseTitle, header.col3]}>NO.</Text>
            <Text style={[header.courseTitle, header.col2]}>ID</Text>
            <Text style={[header.courseTitle, header.col1]}>Student Name</Text>
            <Text style={[header.courseTitle, header.col1]}>G.W.A</Text>
          </View>
        </View>

        {honorsList.length > 0 ? (
          honorsList.map((student, index) => {
            const { id, firstName, lastName, studentIdNumber, gwa } = student;
            const hasNames = firstName && lastName;
            const fullName = `${firstName} ${lastName}`;
            return (
              <View key={id}>
                <View style={[header.row, header.border]}>
                  <Text style={[header.courseTitle, header.col3]}>
                    {index + 1}
                  </Text>
                  <Text style={[header.courseTitle, header.col2]}>
                    {studentIdNumber}
                  </Text>
                  <Text style={[header.courseTitle, header.col1]}>
                    {hasNames ? fullName : "No Name"}
                  </Text>
                  <Text style={[header.courseTitle, header.col1]}>
                    {gwa.toFixed(2)}
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <Text style={header.header}>No Honor&apos;s List</Text>
        )}
      </Page>

      <Page style={header.page} size="A4" wrap>
        <Text style={header.title}>Central Philippine University </Text>
        <Text style={header.headerTitle}>COLLEGE OF ENGINEERING</Text>

        <View style={header.header}>
          <Text>DEAN&apos;S LIST</Text>
          <Text>{courseName ?? "No Course"}</Text>
        </View>

        <View style={header.courseTable}>
          <View style={[header.row, header.courseTitle]}>
            <Text style={[header.courseTitle, header.cell]}>{semster}</Text>
            <Text style={[header.courseTitle, header.cell]}>
              S.Y. {schoolYear}-{schoolYear + 1}
            </Text>
            <Text style={[header.courseTitle, header.cell]}>
              {getYear(yearLevel)}
            </Text>
          </View>
        </View>

        <View style={header.header}>
          <View style={[header.row, header.border]}>
            <Text style={[header.courseTitle, header.col3]}>NO.</Text>
            <Text style={[header.courseTitle, header.col2]}>ID</Text>
            <Text style={[header.courseTitle, header.col1]}>Student Name</Text>
            <Text style={[header.courseTitle, header.col1]}>G.W.A</Text>
          </View>
        </View>

        {deansList.length > 0 ? (
          deansList.map((student, index) => {
            const { id, firstName, lastName, studentIdNumber, gwa } = student;
            const hasNames = firstName && lastName;
            const fullName = `${firstName} ${lastName}`;
            return (
              <View key={id}>
                <View style={[header.row, header.border]}>
                  <Text style={[header.courseTitle, header.col3]}>
                    {index + 1}
                  </Text>
                  <Text style={[header.courseTitle, header.col2]}>
                    {studentIdNumber}
                  </Text>
                  <Text style={[header.courseTitle, header.col1]}>
                    {hasNames ? fullName : "No Name"}
                  </Text>
                  <Text style={[header.courseTitle, header.col1]}>
                    {gwa.toFixed(2)}
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <Text style={header.header}>No Dean&apos;s List</Text>
        )}
      </Page>
    </Document>
  );
};

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const header = StyleSheet.create({
  page: { flexDirection: "column", padding: 25 },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    marginBottom: 10,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Helvetica",
  },
  headerTitle: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Helvetica",
  },
  courseTitle: {
    fontSize: 12,
    textAlign: "center",
  },
  header: {
    fontSize: 13,
    marginTop: 10,
    marginBottom: 15,
    textAlign: "center",
    color: "blue",
  },
  courseTable: {
    width: 315,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch",
    marginLeft: 120,
  },
  cell: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    alignSelf: "baseline",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "stretch",
    flexBasis: 35,
  },
  border: {
    borderBottom: "1px solid #1d1d1d",
  },
  padding: {
    paddingBottom: 5,
  },
  col1: {
    width: "10%",
  },
  col2: {
    width: "1%",
    flexDirection: "column",
  },
  col3: {
    width: 1,
  },
});

const PdfComponent = () => {
  const router = useRouter();
  const { semesterType, schoolYear, yearLevel } = useHonorsFilterStore();
  const { course: courseId } = useCourseStore();

  if (!courseId) {
    router.push("/honors-list");
    return;
  }

  const { data: course } = trpc.useQuery(["course.getById", courseId]);

  const { data } = trpc.useQuery(
    [
      "honors.getAll",
      {
        schoolYear,
        yearLevel,
        semesterType,
        courseId,
        sortBy: {
          field: "gwa",
          order: "desc",
        },
      },
    ],
    {
      // handle error
      onError: (err) => {
        console.error(err.data?.code);
      },
    },
  );

  return (
    data &&
    semesterType &&
    schoolYear && (
      <PDFViewer width="100%" height="300%">
        <AcademicList
          data={data}
          semesterType={semesterType}
          schoolYear={schoolYear}
          yearLevel={yearLevel ?? undefined}
          courseName={course?.name ?? undefined}
        />
      </PDFViewer>
    )
  );
};

export default PdfComponent;
