import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/noteReducer';
const NewNote = (props) => {
    const dispatch = useDispatch();
    const addNote = (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        // store.dispatch({
        //   type: 'NEW_NOTE',
        //   data: {
        //     content,
        //     important: false,
        //     id: generateId()
        //   }
        // })
        dispatch(createNote(content))

    }
    return (
        <form onSubmit={addNote}>
            <input name='note' />
            <button type='submit'>add</button>

        </form>
    )
}

export default NewNote