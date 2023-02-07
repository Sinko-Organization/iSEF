/* eslint-disable react/no-unescaped-entities */

/* eslint-disable jsx-a11y/alt-text */

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
import type { NextPage } from "next";

const DeansList = () => (
  <Document>
    <Page style={header.page} size="A4" wrap>
      <Text style={header.title}>College of Engineering</Text>
      <Text style={header.headerTitle}>Dean's List</Text>

      <Text style={header.header}>S.Y. "School Year" </Text>

      <View style={header.courseTable}>
        <View style={[header.row, header.courseTitle]}>
          <Text style={[header.courseTitle, header.cell]}>"Course Title"</Text>
          <Text style={[header.courseTitle, header.cell]}> Nth Semester</Text>
        </View>
      </View>

      <View style={header.header}>
        <View style={[header.row, header.border, header.padding]}>
          <Text style={[header.courseTitle, header.col1]}>Student Name</Text>
          <Text style={[header.courseTitle, header.col1]}>Grade</Text>
        </View>
      </View>
    </Page>
  </Document>
);

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
    fontSize: 35,
    textAlign: "center",
    fontFamily: "Helvetica",
  },
  headerTitle: {
    fontSize: 25,
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
    color: "grey",
  },
  courseTable: {
    width: 300,
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
    justifyContent: "space-around",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 35,
  },
  border: {
    borderBottom: "1px solid #1d1d1d",
  },
  padding: {
    paddingBottom: 5,
  },
  col1: {
    width: "28%",
  },
});

const PdfComponent: NextPage = () => {
  return (
    // full width
    <PDFViewer width="100%" height="300%">
      <DeansList />
    </PDFViewer>
  );
};

export default PdfComponent;
