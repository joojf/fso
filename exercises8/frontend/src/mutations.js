import { gql } from '@apollo/client'

export const NEW_BOOK = gql`
  mutation AddBookMutation($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      published
      author
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation EditAuthorMutation($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
  }
}
`
