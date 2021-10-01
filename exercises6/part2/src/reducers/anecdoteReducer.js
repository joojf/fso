
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0,
    }
}

export const createAnecdote = (content) => {
    return {
        type: 'ADD',
        content: content,
    }
}

export const voteAnecdote = (id) => {
    return {
        type: 'VOTE',
        id: id,
    }
}

export const initializeAnecdotes = (anecdotes) => {
    return {
        type: 'INIT',
        data: anecdotes,
    }
}


const reducer = (state = [], action) => {
    switch (action.type) {
        case 'VOTE':
            return state.map((anecdote) => {
                if (anecdote.id === action.id) {
                    return {
                        ...anecdote,
                        votes: anecdote.votes + 1,
                    }
                } else {
                    return anecdote
                }
            })
        case 'ADD':
            return [...state, asObject(action.content)]
        case 'INIT':
            return action.data
        default:
            return state
    }
}

export default reducer
