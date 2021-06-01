import React, { useEffect, useState } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageState, setMessageState] = useState(null)

  useEffect(() => {
    personService
      .getAll().then(response => {
        setPersons(response)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber
    }

    for (let i = 0; i < persons.length; i++) {
      if (personObject.name === persons[i].name) {
        if (personObject.number !== persons[i].number) {
          personService
            .update(persons[i].id, { name: persons[i].name, number: personObject.number })
            .then(person => {
              if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
                setPersons(persons.map(p =>
                  p.id !== persons[i].id ? p : person))
              }
            })
        } else {
          window.alert(`${personObject.name} is already added to phonebook`)
        }
        return
      }
    }

    personService
      .create({ name: newName, number: newNumber })
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${response.name} succesfully`)
        setMessageState('valid')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const handleDelete = (event) => {
    event.preventDefault()
    const id = parseInt(event.target.value)
    const name = persons[id - 1].name
    personService.remove(persons[id - 1])
      .catch(error => {
        setMessageState('error')
        setMessage(`information of ${name} has already been removed from server`)
        setTimeout(() => {
          setMessage(null)
          setMessageState('error')
        }, 1000)
        setPersons(persons.filter(n => n.id !== id))
      })
    setPersons(persons.filter(n => n.id !== id))
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageState={messageState} />
      <Filter value={filter} onChange={(event) => setFilter(event.target.value)} />
      <PersonForm name={newName} number={newNumber} onNameChange={handleNameChange}
        onNumberChange={handleNumberChange} onSubmit={addPerson} />
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App