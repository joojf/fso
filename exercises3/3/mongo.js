const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Usage: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.izsb3.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

const personSchema = new mongoose.Schema({
    name: String,
    id: Number,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
    const id = Math.floor(Math.random() * 10000)

    const person = new Person({
        name: name,
        id: Number(id),
        number: number,
    })

    person.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then((people) => {
        people.forEach((person) => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
