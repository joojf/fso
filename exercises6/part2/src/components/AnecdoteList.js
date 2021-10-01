import React from 'react'
import { useSelector } from 'react-redux'

const Anecdote = ({anecdotes, vote}) => {
    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const AnecdoteList = ({ vote }) => {
    const anecdotes = useSelector(({filter, anecdotes}) => {
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
    })

    return(<div>
        <Anecdote anecdotes={anecdotes} vote={vote} />
    </div>)
}

export default AnecdoteList
