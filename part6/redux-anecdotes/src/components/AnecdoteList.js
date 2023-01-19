
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { castVote } from '../reducers/anecdoteReducer';
const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}
const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)
    return (
        <ul>{
            anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => dispatch(castVote(anecdote.id))}
                />
            )
        }
        </ul>
    )

}

export default AnecdoteList