import React from 'react';
import Course from './components/Course'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const total1 = courses[0].parts.reduce((sum, part) => sum + part.exercises, 0)

  const total2 = courses[1].parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course course={courses} />
      <p><strong>total of {total1} exercises</strong></p>
      <h3>{courses[1].name}</h3>
      <p>{courses[1].parts[0].name} {courses[1].parts[0].exercises}</p>
      <p>{courses[1].parts[1].name} {courses[1].parts[1].exercises}</p>
      <p><strong>total of {total2} exercises</strong></p>
    </div>
  )
}

export default App
