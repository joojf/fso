require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')
const { response } = require('express')

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
    } else if (err.name === 'ValidationError') {
        res.status(400).json({
            error: error.message,
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
    Person.countDocuments().then((count) => {
        res.send(`Phonebook has info for ${count} people <br/> <br/>${Date()}`)
    })
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
    Person.findByIdAndRemove(req.params.id).then((person) => {
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
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

    person
        .save()
        .then((person) => {
            res.json(person)
        })
        .catch((err) => {
            next(err)
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
