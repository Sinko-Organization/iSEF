import { EducationLoader } from "@web-app/components/loaders";
import { SubjectTable } from "@web-app/components/tables";
import { trpc } from "@web-app/utils/trpc";
import type { NextPage } from "next";



const SubjectPage: NextPage = () => {
  const { data: curriculum, error } = trpc.useQuery(["subjectList.curriculum"]);
  const { data: subjectsList, error: subjectsError } = trpc.useQuery(
    ["subjectList.getAll"],
    {},
  );

  if (!subjectsList) {
    return <EducationLoader />;
  }
  console.log(curriculum)
  return (
    <>
      <div className="mx-32 fontsans mt-10">
        <SubjectTable
          subjects={subjectsList}
          curriculums={curriculum}
        />
      </div>
    </>
  );
};

export default SubjectPage;