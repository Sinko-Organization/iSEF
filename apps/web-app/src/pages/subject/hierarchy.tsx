import { trpc } from "@web-app/utils/trpc";
import type { NextPage } from "next";
import { useState } from "react";

const Hierarchy: NextPage = () => {
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const [courseId, setCourseId] = useState<string | null>(null);
  const [level, setLevel] = useState<number | null>(null);

  const { data: subjects, status: subjectStatus } = trpc.useQuery([
    "subject.getAll",
  ]);
  const { data: courses, status: courseStatus } = trpc.useQuery([
    "course.getAll",
  ]);
  const { mutate: addHierarchy } = trpc.useMutation("subject.addHierarchy");

  const submit = () => {
    if (subjectId && courseId && level) {
      addHierarchy(
        {
          subjectId,
          courseId,
          level,
        },
        {
          onSuccess: () => {
            console.log("success");
          },
        },
      );
    }
  };

  return (
    <div className="flex flex-col py-2 gap-4">
      {subjectStatus === "success" && (
        <select onChange={(e) => setSubjectId(e.target.value)}>
          <option value={undefined}>Select Subject</option>
          {subjects
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
        </select>
      )}
      {courseStatus === "success" && (
        <select onChange={(e) => setCourseId(e.target.value)}>
          <option value={undefined}>Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      )}
      <input
        type="number"
        className="border-2 border-black w-1/4"
        onChange={(e) => setLevel(Number(e.target.value))}
      />
      <button
        className="bg-blue-700 text-white py-4 w-1/4 rounded-xl hover:bg-blue-800"
        onClick={submit}
      >
        Add Dependency
      </button>
    </div>
  );
};

export default Hierarchy;
