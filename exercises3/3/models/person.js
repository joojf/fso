const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then((result) => {
        console.log('connected to mongodb')
    })
    .catch((err) => {
        console.log('error', err)
    })

const personSchema = new mongoose.Schema({
    name: String,
    id: Number,
    number: String,
})

personSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    },
})

module.exports = mongoose.model('Person', personSchema)
