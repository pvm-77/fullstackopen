import { configureStore } from '@reduxjs/toolkit'
// import anecdoteService from './services/anecdotes'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
// import { combineReducers } from 'redux'
// const reducer = combineReducers({
//     anecdotes: anecdoteReducer,
//     notification: notificationReducer
// })

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        notification: notificationReducer

    }
})

// anecdoteService.getAll().then(anecdotes => {
//     store.dispatch(setAnecdotes(anecdotes))
// })
export default store