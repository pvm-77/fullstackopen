import React from 'react'
import Person from './Person'
// Persons component
const Persons = ({ personToShow, deletePerson }) =>
  <ul>
    {
      personToShow.map(person =>
        <Person
          key={person.id}
          person={person}
          deletePerson={deletePerson}
        />
      )
    }
  </ul>

export default Persons