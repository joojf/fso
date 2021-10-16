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
