import React from 'react'

const Header = ({ course }) => {
  return (
    <>
      <h1>{course.name}</h1>
    </>
  )
}

const Content = (props) => {
	const text = props.course.parts.map(function(content) {
		return (
			<div>
				<p>{content.name}: {content.exercises}</p>
			</div>
		)
	})
	
	return text
};

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.parts.exercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App