const express = require('express')
const app = express()

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

app.get('/', (req, res) => {
    res.send('home page')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(
        `Phonebook has info for ${persons.length} people <br/> <br/>${Date()}`
    )
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find((person) => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter((person) => person.id !== id)
    res.status(204).end()
})

const generateId = () => {
    const id = Math.random() * (10000 - persons.length)
    return Math.round(id)
}

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

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)

    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
