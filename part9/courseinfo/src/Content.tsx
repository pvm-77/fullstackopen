import React from "react";
import { ContentProps, CoursePartFour, CoursePartOne, CoursePartThree, CoursePartTwo } from "./types";
import Part from "./components/Part";
const Content = (courseParts: ContentProps): JSX.Element => {
  console.log(courseParts);
  return (
    <div>
      {courseParts.map((part: CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour, idx: React.Key | null | undefined) => (
        <Part key={idx} part={part} />
      ))}
    </div>
  );
};

export default Content;
