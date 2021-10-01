import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, initializeAnecdotes, voteAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { setNotification, removeNotification } from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'

const App = () => {
    const anecdotes = useSelector((state) => state.anecdotes)
    const dispatch = useDispatch()

    useEffect(() => {
        anecdoteService.getAll().then(anecdotes => {
            dispatch(initializeAnecdotes(anecdotes))
        })
    }, [dispatch])

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`you added '${content}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }

    const vote = (id) => {
        dispatch(voteAnecdote(id))
        dispatch(setNotification(`you voted for '${anecdotes.find(a => a.id === id).content}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }

    const orderedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification/>
            <Filter />
            <AnecdoteList anecdotes={orderedAnecdotes} vote={vote} />
            <AnecdoteForm addAnecdote={addAnecdote} />
        </div>
    )
}

export default App
