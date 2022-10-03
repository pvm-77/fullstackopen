const Header = ({course}) => <h1>{course}</h1>
const Part = ({part}) => <p>{part.name} {part.exercises}</p>
const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </>
  )
}
const Total = ({ parts }) => <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: 'State of component', exercises: 14 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'Fundamental of React', exercises: 10 },
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App