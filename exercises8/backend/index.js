const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books = await Book.find({}).populate('author')
      if (args.author) {
        books = books.filter(b => b.author.name === args.author)
      }
      if (args.genre) {
        books = books.filter(b => b.genres.includes(args.genre))
      }
      return books
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const { title, author, published, genres } = args
      const authorExists = await Author.findOne({ name: author })
      if (!authorExists) {
        const newAuthor = new Author({ name: author, bookCount: 0 })
        const newBook = new Book({ title, author: newAuthor, published, genres })
        try {
          await newAuthor.save()
          await newBook.save()
          newAuthor.bookCount++
          await newAuthor.save()
          return newBook
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      } else {
        const newBook = new Book({ title, author: authorExists, published, genres })
        try {
          await newBook.save()
          authorExists.bookCount++
          await authorExists.save()
          return newBook
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const { name, setBornTo } = args
      const author = await Author.findOne({ name })

      if (!author) {
        throw new UserInputError(`Author ${name} not found`)
      }
      try {
        const updatedAuthor = await Author.findOneAndUpdate(
          { name },
          { born: setBornTo },
          { new: true }
        )
        return updatedAuthor
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    createUser: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (user) {
        throw new UserInputError('username taken')
      }
      const newUser = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      try {
        await newUser.save()
        return newUser
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
