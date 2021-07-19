require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')

let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456',
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523',
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345',
    },
    {
        id: 4,
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
    },
]

app.use(express.json())
app.use(cors())
app.use(express.json())

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :body'
    )
)

app.get('/', (req, res) => {
    res.send('home page')
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then((persons) => {
        res.json(persons)
    })
})

app.get('/info', (req, res) => {
    res.send(
        `Phonebook has info for ${persons.length} people <br/> <br/>${Date()}`
    )
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then((person) => {
        res.json(person)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter((person) => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    for (let i in persons) {
        if (body.name === persons[i].name) {
            return res.status(400).json({ error: 'name must be unique' })
        }
    }

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing',
        })
    }

    const person = new Person({
        id: body.id,
        name: body.name,
        number: body.number,
    })

    person.save().then((person) => {
        res.json(person)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
