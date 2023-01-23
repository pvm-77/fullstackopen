// import React from 'react'

// import { createAnecdote } from '../reducers/anecdoteReducer';
// import { useDispatch } from 'react-redux';
// import { createNotification } from '../reducers/notificationReducer';
// const AnecdoteForm = () => {
//     const dispatch = useDispatch();

//     const addAnecdote = async (e) => {
//         e.preventDefault()
//         const anecdote = e.target.anecdote.value;
//         e.target.anecdote.value = ''
//         dispatch(createAnecdote(anecdote))
//         dispatch(createNotification(`u created ${anecdote}`, 2))
//     }


//     return (
//         <div>
//             <h2>create new</h2>
//             <form onSubmit={addAnecdote}>
//                 <div>
//                     <input name='anecdote' />
//                 </div>
//                 <button type='submit'>create</button>
//             </form>
//         </div>
//     )
// }

// export default AnecdoteForm





// make connected components
import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer';
import { createNotification } from '../reducers/notificationReducer';
const AnecdoteForm = (props) => {
    const addAnecdote = async (e) => {
        e.preventDefault()
        const anecdote = e.target.anecdote.value;
        e.target.anecdote.value = ''
        props.createAnecdote(anecdote)
        props.createNotification(`u created ${anecdote}`, 5)
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
    createNotification
}
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm

