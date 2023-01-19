// VERSION 1 start for redux notes appp **************


// import ReactDOM from 'react-dom/client'
// import { createStore } from 'redux';

// const noteReducer = (state = [], action) => {
//   switch (action.type) {
//     case 'NEW_NOTE':

//       return state.concat(action.data);
//     case 'TOGGLE_IMPORTANCE':
//       const id = action.data.id
//       const noteToChange = state.find(note => note.id === id)
//       const changedNote = {
//         ...noteToChange, important: !noteToChange.important
//       }
//       return state.map(note => note.id !== id ? note : changedNote)
//     default:
//       return state
//   }

// }
// const store = createStore(noteReducer)


// store.dispatch({
//   type: 'NEW_NOTE',
//   data: {
//     content: 'the app state is in redux store',
//     important: false,
//     id: 1
//   }

// })
// store.dispatch({
//   type: 'NEW_NOTE',
//   data: {
//     content: 'state changes are made with actions',
//     important: true, id: 2
//   }
// })

// const generatedId = () => {
//   Number((Math.random() * 1000000).toFixed(0))
// }
// const App = () => {
//   // add note using uncontrolled form
//   const addNote = (event) => {
//     event.preventDefault()
//     const content = event.target.note.value
//     event.target.note.value = ''

//     store.dispatch({
//       type: 'NEW_NOTE',
//       data: {
//         content,
//         importance: false,
//         id: generatedId()
//       }
//     })
//   }

//   const toggleImportance = (id) => {
//     store.dispatch({
//       type: 'TOGGLE_IMPORTANCE',
//       data: { id }
//     })
//   }






//   return (
//     <div>
//       {/* uncontrolled form  */}
//       <form onSubmit={addNote}>
//         <input name="note" />
//         <button type='submit'>add</button>
//       </form>

//       <ul>
//         {store.getState().map(note =>
//           <li
//             key={note.id}
//             onClick={() => { toggleImportance(note.id) }}

//           >
//             {note.content} <strong>{note.important ? 'important' : ''}</strong>
//           </li>
//         )}
//       </ul>
//     </div>
//   );
// }
// const root = ReactDOM.createRoot(document.getElementById('root'))
// const renderApp = () => root.render(<App />)
// renderApp()
// store.subscribe(renderApp)



// *************** VERSION 1 end **************************









//  VERSION 2 start here  ************************ 

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import App from './App'



// import { createStore } from 'redux';
// // import { Provider } from 'react-redux';
// import noteReducer from './reducers/noteReducer';
// import { createNote, toggleImportanceOf } from './reducers/noteReducer';
// const store = createStore(noteReducer);


// const App = () => {
//   // add note using uncontrolled form
//   const addNote = (event) => {
//     event.preventDefault()
//     const content = event.target.note.value
//     event.target.note.value = ''


//     store.dispatch(createNote(content))
//   }

//   const toggleImportance = (id) => {
//     store.dispatch(toggleImportanceOf(id))
//   }
//   return (
//     <div>
//       {/* uncontrolled form  */}
//       <form onSubmit={addNote}>
//         <input name="note" />
//         <button type='submit'>add</button>
//       </form>

//       <ul>
//         {store.getState().map(note =>
//           <li
//             key={note.id}
//             onClick={() => { toggleImportance(note.id) }}

//           >
//             {note.content} <strong>{note.important ? 'important' : ''}</strong>
//           </li>
//         )}
//       </ul>
//     </div>
//   );
// }


// const root = ReactDOM.createRoot(document.getElementById('root'))
// const renderApp = () => root.render(<App />)
// renderApp()
// store.subscribe(renderApp)
//  forwarding redux store to varius components
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <App />
//   </Provider>

// )
// VERSION 2 end here 





// version 3 redux notwe app ********* start here 
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import noteReducer from './reducers/noteReducer';
// import { createStore, combineReducers } from 'redux';

// import App from './App';
// import filterReducer from './reducers/filterReducer';


// import { createNote } from './reducers/noteReducer'
// import { filterChange } from './reducers/filterReducer'

// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer
// })
// const store = createStore(reducer)

// console.log(store.getState())
// store.subscribe(() => console.log(store.getState()))
// store.dispatch(filterChange('IMPORTANT'))
// store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <App />
//   </Provider>

// )

// version end here *****************



// version 4 using redux toolkit
// we will not use createStore of redux here


import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

console.log(store.getState())
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
// version 4 end here




