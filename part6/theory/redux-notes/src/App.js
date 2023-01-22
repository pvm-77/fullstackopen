
// version 3 redux note
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import { initializeNotes, setNotes } from './reducers/noteReducer'
// import noteService from './services/notes'
import { initializeNotes } from './reducers/noteReducer'
const App = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   noteService.getAll().then(notes => {
  //     dispatch(setNotes(notes))
  //   })
  // }, [dispatch])

  // asyncronous action creator
  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])


  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App


