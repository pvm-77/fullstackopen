import React from 'react'
// import { useParams } from 'react-router-dom'

const Note = ({ note }) => {
    // const id = useParams().id
    // const note = notes.find(n => n.id === Number(id))
    return (
        <div>
            <h2>{note.content}</h2>
            <div>{note.user}</div>
            <div><strong>{note.important ? 'important' : ''}</strong></div>
        </div>
    )
}

export default Note