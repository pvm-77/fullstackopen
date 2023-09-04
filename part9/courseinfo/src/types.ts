


export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartBackground extends CoursePartDescription {
  kind: "background";
  backgroundMaterial: string;
}
export interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}
export interface CoursePartDescription extends CoursePartBase {
  description: string;
}


export type CoursePart =
  | CoursePartBasic
  | CoursePartBackground
  | CoursePartGroup
  | CoursePartSpecial