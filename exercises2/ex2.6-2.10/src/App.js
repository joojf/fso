import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')

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

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterNames = (event) => {
    setNameSearch(event.target.value);

    const newList = persons.filter(
      (person) => person.name === nameSearch
    );
    console.log(newList)

    if (newList.length > 0) {
      return newList;
    }

    return persons;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={nameSearch} onChange={filterNames} />
      </div>
      <ul>
        <li>{filterNames.name}</li>
      </ul>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App