
import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { updateAnecdoteVote } from '../reducers/anecdoteReducer';
import { createNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, handleClick }) => {
    // console.log(anecdote.id);
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
    const compareVotes = (a, b) => a.votes - b.votes

    const dispatch = useDispatch()
    const anecdotes = useSelector((state) =>
        state.filter
            ? state.anecdotes.filter((anecdote) =>
                anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
            )
            : state.anecdotes
    );
    const anecdotesForComparison=[...anecdotes]
    const addVoteToAnecdote = (anecdote) => {

        dispatch(updateAnecdoteVote(anecdote))
        dispatch(createNotification(`u voted ${anecdote.content}`, 2))


    }

    return (
        <ul>{
            anecdotesForComparison.sort(compareVotes).map(singleanecdote =>
                <Anecdote
                    key={singleanecdote.id}
                    anecdote={singleanecdote}
                    handleClick={() => addVoteToAnecdote(singleanecdote)}
                />
            )
        }
        </ul>
    )

}

export default AnecdoteList