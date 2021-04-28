import React from 'react'

const Course = (props) => {
    const { course } = props
    return (
        <>
            <Header course={course} />
            <Content course={course} />
        </>
    )
}

const Header = (props) => {
    const { course } = props
    return (
        <h1>{course.name}</h1>
    )
}

const Content = (props) => {
    const { course } = props
    return (
        <div>
            <Part part={course[0].parts[0]} />
            <Part part={course[0].parts[1]} />
            <Part part={course[0].parts[2]} />
        </div>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}



export default Course