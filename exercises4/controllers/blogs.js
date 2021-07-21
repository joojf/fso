const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({})
        res.json(blogs)
    } catch (err) {
        res.status(500).send(err)
    }
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

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })

    try {
        await blog.save()
        res.status(201).json(blog)
    } catch (err) {
        next(err)
    }
})

blogsRouter.delete('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndRemove(req.params.id)
        res.json(blog)
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
        likes: url.likes,
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
