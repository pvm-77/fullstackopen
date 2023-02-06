import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer';
// import { createNotification } from '../reducers/notificationReducer';
const AnecdoteForm = (props) => {
    const addAnecdote =  (e) => {
        e.preventDefault()
        const anecdote = e.target.anecdote.value;
        e.target.anecdote.value = ''
        props.createAnecdote(anecdote)
        // props.createNotification(`you have created ${anecdote}`, 5)
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
const mapDispatchToProps = {
    createAnecdote,
    // createNotification
}
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm

