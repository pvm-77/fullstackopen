import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  // delete a person
  const deletePerson = (id) => {
    // find person to delete here
    const deletedPerson = persons.find(person => person.id === id)
    personService
      .deletePerson(id)
      .then(response => {
        window.confirm(`Delete ${deletedPerson.name}`)
        setPersons(persons.filter(person => person.id !== id))

      })
      .catch(error => {
        setErrorMessage(`Information  of ${deletedPerson.name} has been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))

      })

  }
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
          setErrorMessage(error.response.data.error)
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
      }).catch(error => {
        // console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

      })
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

  // fetch and set persons from db.json 
  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      {successMessage && <Notification className='success' message={successMessage} />}
      {errorMessage && <Notification className='error' message={errorMessage} />}

      <Filter filter={filter} handleFilter={handleFilter} />

      <PersonForm addPerson={addPerson} newName={newName}
        newNumber={newNumber} handlePersonNameChange={handlePersonNameChange}
        handlePersonNumberChange={handlePersonNumberChange}
      />
      <h2>Numbers</h2>

      <Persons personToShow={personToShow}
        deletePerson={deletePerson} />
    </div>
  )
}

export default App