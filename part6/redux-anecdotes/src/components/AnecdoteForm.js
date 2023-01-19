import React from 'react'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const addAnecdote = (e) => {
        e.preventDefault()
        const anecdote = e.target.anecdote.value;
        e.target.anecdote.value = ''

        dispatch(createAnecdote(anecdote))


    }


    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name='anecdote' />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm