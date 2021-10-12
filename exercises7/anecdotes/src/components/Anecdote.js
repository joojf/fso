import React from 'react'
import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
    const { id } = useParams()
    const anecdote = anecdotes.find(a => a.id === id)
    
    return (
        <div>
        <h1>{anecdote.content}</h1>
        <p>
            has {anecdote.votes} votes
        </p>
        </div>
    )
       
}

export default Anecdote
