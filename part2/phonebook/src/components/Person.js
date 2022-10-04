import React from 'react'

// single person
const Person = ({ person, deletePerson }) => <li className='person'>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></li>

export default Person