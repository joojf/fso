import React, { useState } from "react";

const Display = (props) => {
  return (
    <div>
      {props.value}
    </div>
  )
}

const Button = (props) => {
  return(
      <button onClick={props.handleClick}>{props.value}</button>
  )
}



const App = (props) => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  })

  const newAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const voted = () => {
    setPoints({
      ...points,
      [selected]: points[selected] + 1
    })
  }

  const mostVotes = () => {
    let max = -1, index = -1

    for (let key in points) {
      if (points[key] > max) {
        index = key
        max = points[key]
      }
    }
    return index
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display value={anecdotes[selected]} />
      <p>Has {points[selected]} votes</p>
      <Button handleClick={voted} value="vote" />
      <Button handleClick={newAnecdote} value="next" />
      <h1>Anecdote with most Votes</h1>
      <Display value={anecdotes[mostVotes()]} />
      <p>has {points[mostVotes()]} votes</p>
    </div>
  )
}

export default App