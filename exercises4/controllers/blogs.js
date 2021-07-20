const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
    Blog.find({}).then((blogs) => {
        res.json(blogs)
    })
})

blogsRouter.get('/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then((blog) => {
            if (blog) {
                res.json(blog.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch((err) => next(error))
})

blogsRouter.post('/', (req, res) => {
    const body = req.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })

    blog.save()
        .then((blog) => {
            res.json(blog.toJSON())
        })
        .catch((err) => next(err))
})

blogsRouter.delete('/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id)
        .then((blog) => {
            res.json(blog.toJSON())
        })
        .catch((err) => next(err))
})

blogsRouter.put('/:id', (req, res) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: url.likes,
    }

    Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        .then((blog) => {
            res.json(blog.toJSON())
        })
        .catch((err) => next(err))
})

module.exports = blogsRouter
