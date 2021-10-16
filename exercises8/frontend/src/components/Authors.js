import React, { useState } from 'react'

import { useMutation, useQuery } from '@apollo/client'
import { GET_AUTHORS } from '../queries'
import { EDIT_AUTHOR } from '../mutations'

const EditAuthor = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
    onError: (error) => {
      console.log(error)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    await editBorn({
      variables: {
        name,
        setBornTo: parseInt(born)
      }
    })
    setName('')
    setBorn('')
  }

  return (
    <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
            <div>
                name
                <input
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                />
            </div>
            <div>
                born
                <input
                    type='number'
                    value={born}
                    onChange={({ target }) => setBorn(parseInt(target.value))}
                />
            </div>
            <button type='submit'>update</button>
        </form>
    </div>
  )
}

const Authors = () => {
  const { loading, data } = useQuery(GET_AUTHORS)

  if (loading) {
    return (
    <div>Loading...</div>
    )
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
            {data.allAuthors.map(a =>
                <tr key={a.name}>
                    <td>{a.name}</td>
                    <td>{a.born}</td>
                    <td>{a.bookCount}</td>
                </tr>
            )}
        </tbody>
      </table>
      <EditAuthor />

    </div>
  )
}

export default Authors
