import React from 'react'

const Persons = ({ persons, handleDelete }) => {
    return (
        <div>
            {persons.map((person, index) => (
                <div key={index}>
                    {person.name} {person.number}{' '}
                    <button value={person.id} onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Persons
