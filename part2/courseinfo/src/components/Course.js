import React from 'react'
import { Fragment } from 'react'
// header component
const Header = (props) => <h1>{props.course}</h1>
// content component
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => <Part key={part.id} part={part} />)}
    </div>
  )
}
// total components
const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return (
    <p><b>total of  {total} exercises</b></p>
  )


}

// part component
const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}
// course component
const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => <Fragment key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </Fragment>)}

    </div>
  )
}

export default Course