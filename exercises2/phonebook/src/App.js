import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'
const create = (personObject) => 
  axios.post(baseUrl, personObject)
const getAll = () => 
  axios.get(baseUrl)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  useEffect(() => {
    getAll().then(response => {
      setPersons(response.data)
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
        window.alert(`${newName} is already added to phonebook`)
        return
      }
    }

    create({
      name: newName,
      number: newNumber
    }).then(response => {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    })
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
      <Filter value={filter} onChange={(event) => setFilter(event.target.value)} />
      <PersonForm name={newName} number={newNumber} onNameChange={handleNameChange}
        onNumberChange={handleNumberChange} onSubmit={addPerson} />
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App