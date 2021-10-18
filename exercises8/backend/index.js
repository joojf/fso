const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
const Book = require('./models/Book')
const Author = require('./models/Author')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (args.author) {
        return books.filter(book => book.author === args.author)
      } else if (args.genre) {
        return books.filter(book => book.genres.includes(args.genre))
      } else {
        return books
      }
    },
    allAuthors: () => {
      const result = authors.map(author => {
        const bookCount = books.filter(book => book.author === author.name).length
        return { ...author, bookCount }
      })
      return result
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }
      const author = authors.find(author => author.name === args.author)
      if (!author) {
        const newAuthor = {
          name: args.author,
          id: uuid()
        }
        authors.push(newAuthor)
      }
      books.push(book)
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(author => author.name === args.name)
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
