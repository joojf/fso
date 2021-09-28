import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

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
            <AnecdoteList anecdotes={orderedAnecdotes} vote={vote} />
            <AnecdoteForm addAnecdote={addAnecdote} />
        </div>
    )
}

export default App
