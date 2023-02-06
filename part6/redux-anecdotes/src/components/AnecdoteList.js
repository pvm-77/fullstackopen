import { useDispatch, connect } from 'react-redux';
import { castVote } from '../reducers/anecdoteReducer';
// import { createNotification } from '../reducers/notificationReducer';
import { addVote } from '../reducers/anecdoteReducer';

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
const AnecdoteList = (props) => {
    const anecdotes = [...props.anecdotes]
    const compareVotes = (a, b) => a.votes - b.votes
    const dispatch = useDispatch()
    const handleVoteToAnecdote = (anecdote) => {
        dispatch(castVote(anecdote))
        
    }
    return (
        <ul>{
            anecdotes.sort(compareVotes).map(singleanecdote =>
                <Anecdote
                    key={singleanecdote.id}
                    anecdote={singleanecdote}
                    handleClick={() => handleVoteToAnecdote(singleanecdote)}
                />
            )
        }
        </ul>
    )

}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.filter
            ? state.anecdotes.filter((anecdote) =>
                anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
            )
            : state.anecdotes
    }
}
const ConnectedAnecdoteList = connect(mapStateToProps)(AnecdoteList)
export default ConnectedAnecdoteList