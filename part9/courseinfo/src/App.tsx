interface HeaderProps {
  name: string;
}
interface CoursePart {
  name: string;
  exerciseCount: number;
}
interface ContentProps {
  courseParts: CoursePart[];
}
interface TotalProps {
  courseParts: CoursePart[];
}
const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};
const Total = (props: TotalProps) => {
  return (
    <p>
      Number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

const Content = (props: ContentProps) => {
  console.log(props.courseParts)

  return(
    <div>{
      props.courseParts.map(p=><p key={p.name}>{p.name}  {p.exerciseCount}</p>)
    }</div>
  )
};
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />

      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
