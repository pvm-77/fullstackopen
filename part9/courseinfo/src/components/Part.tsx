import { CoursePart } from "../types";
const Part = ({ part }: { part: CoursePart }) => {
  let description: JSX.Element = <></>;
  switch (part.kind) {
    case "background":
      description = (
        <>
          <p>
            <i>{part.description}</i>
          </p>
          <p>submit to {" "}
            <i>{part.backgroundMaterial}</i>
          </p>
        </>
      );

      break;
    case "basic":
      description = (
        <p>
          <i>{part.description}</i>
        </p>
      );
      break;

    case "group":
      description = (
        <p>project exercises
          <i>{part.groupProjectCount}</i>
        </p>
      );
      break;
    case "special":
      description = (
        <>
        <p>
          <i>{part.description}</i>
        </p>
          <p>{part.requirements.join(",")}</p>
        </>
      );
      break;

    default:
      break;
  }

  return (
    <>
      <p>
        <b>
          {part.name} {part.exerciseCount}
        </b>
      </p>
      {description}

      <hr />
    </>
  );
};

export default Part;
