import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_USER, ALL_BOOKS } from '../queries'

const Recommend = () => {
    const [user, setUser] = useState(null)
    const [books, setBooks] = useState([])

    const token = localStorage.getItem('books-user-token')

    const userQuery = useQuery(GET_USER, {
        variables: { token },
    })

    const booksQuery = useQuery(ALL_BOOKS)

    useEffect(() => {
        if (userQuery.data) {
            setUser(userQuery.data.me)
        }
    }, [userQuery.data])

    useEffect(() => {
        if (booksQuery.data) {
            setBooks(booksQuery.data.allBooks)
        }
    }, [booksQuery.data])

    if (!user) {
        return <div>loading...</div>
    }

    return (
        <div>
            <h2>recommendations</h2>
            <div>books in your favorite genre: <strong>{user.favoriteGenre}</strong></div>
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
                    {books.filter(book => book.genres.includes(user.favoriteGenre)).map(book =>
                        <tr key={book.title}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend