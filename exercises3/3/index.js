require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')
const { response } = require('express')

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

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :body'
    )
)

const errorHandler = (err, req, res, next) => {
    console.log(err.message)

    if (err.name === 'CastError') {
        res.status(400).json({
            error: 'malformatted id',
        })
    }
    next(err)
}

app.use(errorHandler)

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
    Person.findById(req.params.id)
        .then((person) => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch((err) => {
            next(err)
        })
})

app.delete('/api/persons/:id', (req, res) => {
    //delete the person
    Person.findByIdAndRemove(req.params.id)
        .then((result) =>
            response.status(204).send(`Person ${req.params.id} deleted`)
        )
        .catch((err) => {
            next(err)
        })
})

app.post('/api/persons', (req, res) => {
    const body = req.body

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

app.put('/api/persons/:id', (req, res) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number,
    }
    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then((person) => {
            res.json(person)
        })
        .catch((err) => {
            next(err)
        })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
