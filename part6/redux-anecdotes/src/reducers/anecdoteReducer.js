import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {

    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      return state.map(a => a.id !== id ? a : changedAnecdote)
    },


    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },

})
export const {  setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}


export const castVote=(obj)=>{
  return async dispatch=>{
    const a=await anecdoteService.update(obj)
    dispatch(vote(a))
  }
}


export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}


export default anecdoteSlice.reducer
