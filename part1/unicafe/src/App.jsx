import { useState } from 'react'

const Button = ({ handleClick, title }) => 
<button onClick={handleClick}>{title}</button>

const StatisticLine = ({ text, value }) => 
  <tr>
    <td>{text} </td>
    <td>{value}</td>
  </tr>

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  return <>
    <h1>statistics</h1>
    {total ?
    <table>
      <tbody>
      <StatisticLine text={"good"} value={good} />
      <StatisticLine text={"neutral"} value={neutral} />
      <StatisticLine text={"bad"} value={bad} />
      <StatisticLine text={"all"} value={total} />
      <StatisticLine text={"average"} value={(good + bad * -1) / total} />
      <StatisticLine text={"positive"} value={`${good * 100 / total} %`} /></tbody>
    </table>
    : <>No feedback given</>}
  </>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} title={"good"} />
      <Button handleClick={() => setNeutral(neutral+1)} title={"neutral"} />
      <Button handleClick={() => setBad(bad+1)} title={"bad"} />
      
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App