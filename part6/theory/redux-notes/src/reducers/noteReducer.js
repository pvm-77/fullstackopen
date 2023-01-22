// ***** ACTION CREATOR **************************
// const initialState = [
//     {
//         content: 'reducer defines how redux store works',
//         important: true,
//         id: 1,
//     },
//     {
//         content: 'state of store can contain any data',
//         important: false,
//         id: 2,
//     },
// ]
// const generateId = () => {
//     Number((Math.random() * 1000000).toFixed(0));
// }

// export const createNote = (content) => {
//     return {
//         type: 'NEW_NOTE',
//         data: {
//             content,
//             important: false,
//             id: generateId()
//         }
//     }
// }
// export const toggleImportanceOf = (id) => {

//     return {
//         type: 'TOGGLE_IMPORTANCE',
//         data: { id },
//     }
// }

// const noteReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'NEW_NOTE':
//             // return state.concat(action.data)
//             return [...state, action.data]

//         case 'TOGGLE_IMPORTANCE': {
//             const id = action.data.id
//             const noteToChange = state.find(n => n.id === id)
//             const changedNote = {
//                 ...noteToChange,
//                 important: !noteToChange.important
//             }
//             return state.map(note =>
//                 note.id !== id ? note : changedNote
//             )
//         }
//         default:
//             return state
//     }
// }


// note reducer using redux toolkit

import { createSlice } from "@reduxjs/toolkit"
import noteService from '../services/notes'

// const generateId = () => {
//     Number((Math.random() * 1000000).toFixed(0));
// }
const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {


        //         createNote(state, action) {
        //             const content = action.payload
        // 
        //             state.push({
        //                 content,
        //                 important: false,
        //                 id: generateId(),
        //             })
        //         },
        toggleImportanceOf(state, action) {
            const id = action.payload

            const noteToChange = state.find(n => n.id === id)

            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }

            return state.map(note =>
                note.id !== id ? note : changedNote
            )
        },
        appendNote(state, action) {
            state.push(action.payload)
        },
        setNotes(state, action) {
            return action.payload
        },
    }
})




// export const { createNote, toggleImportanceOf, appendNote, setNotes } = noteSlice.actions
export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions


// asynchronous action  creator

export const initializeNotes = () => {
    return async (dispatch) => {
        const notes = await noteService.getAll()
        dispatch(setNotes(notes))
    }
}
export const createNote = (content) => {
    return async dispatch => {
        const newNote = await noteService.createNew(content)
        dispatch(appendNote(newNote))
    }

}



export default noteSlice.reducer