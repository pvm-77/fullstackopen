import { useEffect } from 'react'
// import anecdoteService from './services/anecdotes'
// import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { initializeAnecdote } from './reducers/anecdoteReducer'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    // anecdoteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
    // ex 6.15

    dispatch(initializeAnecdote())

  }, [dispatch]);
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />

    </div>
  )
}
export default App