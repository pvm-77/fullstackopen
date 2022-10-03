import { useState } from 'react'
const Button = ({ text, clickHandler }) => <button onClick={clickHandler}> {text}</button>
const StatisticLine = ({ value, text }) => text === 'positive' ? <tr><th>{text}</th><td>{value} %</td></tr> : <tr><th>{text}</th><td>{value}</td></tr>


const Statistics = (props) => {
  const { good, bad, neutral, positive, all, average, } = props
  if (good === 0 && bad === 0 && neutral === 0) {
    return (
      <>
        <h2>statistics</h2>
        <p>no feedback given</p>
      </>
    )

  }
  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>


          <StatisticLine value={good} text='good' />

          <StatisticLine value={neutral} text='neutral' />

          <StatisticLine value={bad} text='neutral' />
          <StatisticLine value={all(good, bad, neutral)} text='all' />
          <StatisticLine value={average(good, bad, neutral)} text='average' />
          <StatisticLine value={positive(good, bad, neutral)} text='positive' />

        </tbody>
      </table>
    </>)
}
const App = () => {
  const positive = (good, bad, neutral) => {
    if (good === 0) return 0
    return (good / (good + bad + neutral)) * 100
  }
  const average = (good, bad, neutral) => {
    if (good === 0) return 0
    return (good - bad) / (good + bad + neutral)
  }
  const all = (good, bad, neutral) => good + bad + neutral

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // event handlers
  const handleGood = () => {
    setGood(good + 1)

  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button clickHandler={handleGood} text='good' />
      <Button clickHandler={handleBad} text='bad' />
      <Button clickHandler={handleNeutral} text='neutral' />
      <Statistics good={good} bad={bad} neutral={neutral} positive={positive} average={average} all={all} />
    </div>
  )
}

export default App