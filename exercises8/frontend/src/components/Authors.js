import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import { EDIT_AUTHOR } from '../mutations'

const Authors = () => {
  const [authors, setAuthors] = useState([])
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)
    }
  }, [result.data])

  if (!result.data) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    await editAuthor({ variables: {
      name,
      setBornTo: parseInt(born)
    }})
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>
        Set birthyear
      </h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map(a =>
              <option key={a.name} value={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          born
          <input value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors