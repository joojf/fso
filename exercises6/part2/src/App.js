import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'

const App = () => {
    const anecdotes = useSelector((state) => state)
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
    }

    const vote = (id) => {
        dispatch(voteAnecdote(id))
    }

    const orderedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

    return (
        <div>
            <h2>Anecdotes</h2>
            {orderedAnecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
            <h2>create new</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    addAnecdote(e.target.anecdote.value)
                    e.target.anecdote.value = ''
                }}
            >
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default App
