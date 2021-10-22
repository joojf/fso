import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = () => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState('')

  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  if (!result.data) {
    return <div>loading...</div>
  }

  const handleFilter = (event) => {
    setGenre(event.target.value)
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {// map the books to the table rows according to the filter, if no filter, show all
          books.filter(b => genre === '' || b.genres.includes(genre)).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {
          result.data.allBooks.map(b => b.genres).flat().filter((v, i, a) => a.indexOf(v) === i).map(g =>
            <button key={g} value={g} onClick={handleFilter}>{g}</button>
          )
        }
        <button onClick={() => setGenre('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books