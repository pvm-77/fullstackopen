import { ChangeEvent, useState } from "react";
export const useField = (type: string) => {
  const [value, setValue] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};
