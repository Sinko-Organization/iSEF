import { EducationLoader } from "@web-app/components/loaders";
import { SubjectTable } from "@web-app/components/tables";
import { trpc } from "@web-app/utils/trpc";
import type { NextPage } from "next";



const SubjectPage: NextPage = () => {
  // const { data: subjects, error: subjectsError } = trpc.useQuery(
  //   ["subjectList.getAll"],
  //   {},
  // );

  // if (!subjects) {
  //   return <EducationLoader />;
  // }

  return (
    <>
      <div className="mx-32 fontsans mt-10">
        <SubjectTable
          // subjects={subjects!}
        />
      </div>
   </>
  );
};

export default SubjectPage;