import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    castVote(state, action) {
      const anecdoteWithCastedVote = action.payload;
      const { id } = anecdoteWithCastedVote;
      console.log(id);
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : anecdoteWithCastedVote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },


  },

})

export const { castVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const updateAnecdoteVote = (anecdote) => {
  const updateAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(updateAnecdote)
    dispatch(castVote(updatedAnecdote))
  }
}



export default anecdoteSlice.reducer
