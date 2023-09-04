import Part from "./Part";
import { CoursePart } from "../types";
const Content = ({courseParts}:{courseParts:CoursePart[]}): JSX.Element => {
  return (
    <>
      {courseParts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </>
  );
};

export default Content;
