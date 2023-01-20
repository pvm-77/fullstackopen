import React from 'react'
import anecdoteService from '../services/anecdotes'

import { createAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import { removeNotification, setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const addAnecdote = async (e) => {
        e.preventDefault()
        const anecdote = e.target.anecdote.value;
        e.target.anecdote.value = ''


        const newAnecdote = await anecdoteService.createNew(anecdote)

        dispatch(createAnecdote(newAnecdote))
        // dispatch(createAnecdote(anecdote))
        
        dispatch(setNotification(`a new anecdote ${anecdote} created`));
        setTimeout(() => {
            return dispatch(removeNotification())

        }, 1000);
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