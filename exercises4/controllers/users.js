const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs')
    res.json(users)
})

usersRouter.post('/', async (req, res) => {
    const body = req.body

    // if the username or password is less than 3 characters, return an error
    if (body.username.length < 3 || body.password.length < 3) {
        res.status(400).json({
            message: 'Username and password must be at least 3 characters long',
        })
        return
    }
    // if the username already exists, return an error
    if (await User.findOne({ username: body.username })) {
        res.status(400).json({
            message: 'Username already exists',
        })
        return
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()
    res.json(savedUser)
})

module.exports = usersRouter
