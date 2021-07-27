const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (req) => {
    const authorization = req.headers('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        id: 1,
        name: 1,
    })
    res.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.get('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id)
        res.json(blog)
    } catch (err) {
        next(err)
    }
})

blogsRouter.post('/', async (req, res, next) => {
    const body = req.body

    const token = getTokenFrom(req)
    const decoded = jwt.verify(token, process.env.SECRET)
    if (!token || !decoded) {
        return res.status(401).json({
            message: 'Unauthorized',
        })
    }
    const user = await User.findById(decoded.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    })

    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        res.status(201).json(savedBlog)
    } catch (err) {
        next(err)
    }
})

blogsRouter.delete('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndRemove(req.params.id)
        res.status(204).json(blog)
    } catch (err) {
        next(err)
    }
})

blogsRouter.put('/:id', async (req, res, next) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
            new: true,
        })
        res.json(updatedBlog)
    } catch (err) {
        next(err)
    }
})

module.exports = blogsRouter
