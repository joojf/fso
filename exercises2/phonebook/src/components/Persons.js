import React from 'react'

const Persons = (props) => {
    return (
        <div>
            <h2>Numbers</h2>
            {props.persons.map((person) => (
                <div>
                    <p key={person.id}>
                        {person.name} {person.number}{' '}
                        <button type="button" value={person.id} onClick={props.handleDelete}>delete</button>
                    </p>
                </div>
            ))}
        </div>
    )
}

export default Persons