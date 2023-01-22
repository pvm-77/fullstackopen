
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleImportanceOf } from '../reducers/noteReducer';



// const Note = ({ note, handleClick }) => {
//     return (
//         <li onClick={handleClick}>
//             {note.content}
//             <strong>{note.important ? 'important' : ''}</strong>
//         </li>
//     )
// 
// }

// 
// const Notes = () => {
//     const dispatch = useDispatch()
//     const notes = useSelector(state => {
//         // apply filter 
//         if (state.filter === 'ALL') {
//             return state.notes
//         }
//         return state.filter === 'IMPORTANT' ? state.notes.filter(note=>note.important) : state.notes.filter(note=>!note.important)
//         // return state
//     })
//     return (
//         <ul>
//             {notes.map(note =>
//                 <Note
//                     key={note.id}
//                     note={note}
//                     handleClick={() => { dispatch(toggleImportanceOf(note.id)) }} />)}
//         </ul>
//     )
// }

// export default Notes;




// last part connect function 
import { connect } from 'react-redux';

import { toggleImportanceOf } from '../reducers/noteReducer';



const Note = ({ note, handleClick }) => {
    return (
        <li onClick={handleClick}>
            {note.content}
            <strong>{note.important ? 'important' : ''}</strong>
        </li>
    )

}

const Notes = (props) => {
    //     const notesToShow = () => {
    //         if (props.filter === 'ALL') {
    //             return props.notes
    // 
    //         }
    //         return props.filter === 'IMPORTANT' ? props.notes.filter(note => note.important) : props.notes.filter(note => !note.important)
    // 
    //     }


    return (
        <ul>
            {props.notes.map(note =>
                <Note
                    key={note.id}
                    note={note}
                    handleClick={() => { props.toggleImportanceOf(note.id) }} />)}
        </ul>
    )
}
const mapStateToProps = (state) => {
    if (state.filter === 'ALL') {
        return {
            notes: state.notes
        }
    }
    return {
        // notes:state.notes,
        // filter:state.filter
        notes: (state.filter === 'IMPORTANT' ? state.notes.filter(note => note.important)
            : state.notes.filter(note => !note.important))
    }
}
const mapDispatchToProps = {
    toggleImportanceOf,
}
const connectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes)
export default connectedNotes;
