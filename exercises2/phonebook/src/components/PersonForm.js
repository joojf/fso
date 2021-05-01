import React from 'react'

const PersonForm = (props) => {
    return (
        <div>
            <h2>Add a new</h2>
            <form onSubmit={props.onSubmit}>
                <div>
                    name: <input value={props.name} onChange={props.onNameChange} />
                </div>
                <div>
                    number: <input value={props.number} onChange={props.onNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm