import React, { useState } from 'react'

const Buttons = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>{props.text}</button>
    </>
  )
}


const Display = () => {
  return (
    <>
      <h1>give feedback</h1>
    </>
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.bad === 0 && props.neutral === 0) {
    return (
      <div>
        <h1>{props.title}</h1>
        no feedback given
      </div>
    )
  }
  return (
    <div>
      <Statistic text="good" value={props.good} />
      <Statistic text="neutral" value={props.neutral} />
      <Statistic text="bad" value={props.bad} />
    // ...
    </div>
  )
}

const Statistic = (props) => {
  return (
    <div>
      <table>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Display />
      <Buttons handleClick={() => setGood(good + 1)} text="good" />
      <Buttons handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Buttons handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} title="statistics" />
    </div>
  )
}

export default App