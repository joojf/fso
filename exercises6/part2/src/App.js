import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, initializeAnecdotes, voteAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { setNotification } from './reducers/notificationReducer'


const App = () => {
    const anecdotes = useSelector((state) => state.anecdotes)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAnecdotes()) 
    }, [dispatch]) 

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`you added '${content}'`, 10))
    }

    const vote = (id) => {
        const anecdoteToVote = anecdotes.find(a => a.id === id)
        dispatch(voteAnecdote(id, anecdoteToVote))
        dispatch(setNotification(`you voted '${anecdoteToVote.content}'`, 10))
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
