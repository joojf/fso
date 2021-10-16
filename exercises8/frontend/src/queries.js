import { gql } from '@apollo/client'

export const GET_AUTHORS = gql`
  query getAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const GET_BOOKS = gql`
  query getBooks {
    allBooks {
      title
      published
      author
      genres
    }
  }
`
