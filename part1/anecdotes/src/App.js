import { useState } from 'react'
const App = () => {
  // helper function  to generate number between 0 to anecdotes length
  const generateRandomNumber = (range) => {
    return Math.floor(Math.random() * range)
  }
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  // votes state
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  console.log('total length',anecdotes.length);
  //handler: generate new random anecdote on next anecdote button
  const handleGenerateNextRandomAnectode = () => {
    // generate a random number
    const randomNumber = generateRandomNumber(anecdotes.length)
    console.log(`generated random number is ${randomNumber}`)
    // set variable named `selected`
    setSelected(randomNumber)
  }
  // votes handler
  const handleVotes = () => {
    // get old votes 
    const newVotes = [...votes]
    // increament votes for selected anecdotes
    newVotes[selected] += 1

    // set new votes count
    setVotes(newVotes)
  }
  const maxVotes=Math.max(...votes) 
  const indexMaximumVotes=votes.indexOf(maxVotes)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} has {votes[selected]} votes.<br />
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleGenerateNextRandomAnectode}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[indexMaximumVotes]} has {votes[indexMaximumVotes]} votes.<br />
      
    </div>
  )
}

export default App