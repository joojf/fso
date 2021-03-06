import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query Query {
  allBooks {
    title
    published
    id
    genres
    author {
      name
      born
      bookCount
    }
  }
}
`

export const GET_USER = gql`
query Query {
  me {
    username
    favoriteGenre
    id
  }
}
`
