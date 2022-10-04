import React from 'react'

// PersonForm component
const PersonForm = (props) => {
    return (
        <>
            <form onSubmit={props.addPerson}>
                <div>
                    name: <input name='name' value={props.newName} onChange={props.handlePersonNameChange} />
                </div>
                <div>
                    number: <input name='number' value={props.newNumber} onChange={props.handlePersonNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>

        </>
    )
}

export default PersonForm