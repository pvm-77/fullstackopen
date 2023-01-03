import React from "react";
import { PartProps } from "../types";
const Part = ({ part }: PartProps): JSX.Element => {
  return (
    <div>
      <b>
        {part.name} {part.exerciseCount}
      </b>
      <i>{part.description}</i>
    </div>
  );
};

export default Part;
