import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
        token === null 
        ? 
        <button onClick={() => setPage('login')}>login</button> 
        : 
        <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setToken(null)}>logout</button>
        </>
        }
      </div>

      {page === 'authors' && <Authors />}
      {page === 'books' && <Books />}
      {page === 'add' && <NewBook />}
      {page === 'login' && <LoginForm setToken={setToken} />}

    </div>
  )
}

export default App