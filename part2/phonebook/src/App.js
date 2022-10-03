import { useState, useEffect } from 'react'
import personService from './services/persons'
import axios from 'axios'
// filter component
const Filter = ({ filter, handleFilter }) => {
  return (
    <>    filter shown with:< input name='search' value={filter} onChange={handleFilter} /></>
  )
}
// PersonForm component
const PersonForm = (props) => {
  // console.log(props)
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
// Persons component
const Persons = ({ personToShow }) => {

  return (
    <ul>
      {
        personToShow.map(person => <Person key={person.id} person={person} />)
      }
    </ul>
  )
}
// single person
const Person = ({ person,setPersons }) => {

  const handleDelete = id => {

    personService
      .deletePerson(id)
      .then(response => {
        console.log("response", response)

        window.confirm(`Delete ${person.name}`)
      })
      .catch(error => console.log('in app', error))
      setPersons()

  }
  return (
    <li>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button></li>
  )
}
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='success'>
      {message}
    </div>
  )
}
const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  // add person handler
  const addPerson = (event) => {
    event.preventDefault();
    // new name handling in form  
    const personObject = {
      name: newName,
      number: newNumber,
    }
    // check here the if name already exist
    const isPersonAlreadyExist = persons.some(person => {
      return JSON.stringify(person.name) === JSON.stringify(personObject.name)
    })


    if (isPersonAlreadyExist) {
      const alreadyExistPersonDetail = persons.filter(person => person.name === personObject.name)
      window.confirm(`${newName} is alreday to phonebook,replece old number with new number`)
      personService.update(alreadyExistPersonDetail[0].id, personObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== alreadyExistPersonDetail[0].id ? person : response.data))
        }).catch(error => {
          setErrorMessage(`info of ${newName} has been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        })
    }
    else
      // save data to db{here db.json}
      personService.create(personObject).then(response => {
        setPersons(persons.concat(response.data))
        setSuccessMessage(`added ${newName} `)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 4000)
        // empty input field
        setNewName('')
        setNewNumber('')
      }).catch(e => console.log('something went wrong'))
  }
  // on change handler
  const handlePersonNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handlePersonNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
  const handleFilter = (e) => setFilter(e.target.value)

  // filtered person list
  const filteredPerson = persons.filter(person => {
    // convert current person name in smallcase
    return person.name.toLowerCase().includes(filter.toLowerCase())
  })
  // list of person
  const personToShow = filteredPerson ? filteredPerson : persons
  useEffect(() => {
    axios.get(`http://localhost:3001/persons`).then(response => {
      setPersons(response.data)
    })
  }, [])
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Notification message={errorMessage} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <PersonForm addPerson={addPerson} newName={newName}
        newNumber={newNumber}
        handlePersonNameChange={handlePersonNameChange}
        handlePersonNumberChange={handlePersonNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personToShow={personToShow} setPersons={setPersons}/>
    </div>
  )
}

export default App