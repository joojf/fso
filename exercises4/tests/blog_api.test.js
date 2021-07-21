const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialData = [
    {
        title: 'First blog post',
        author: 'John Doe',
        url: 'http://example.com/first-blog-post',
        likes: 0,
    },
    {
        title: 'Second blog post',
        author: 'Jane Doe',
        url: 'http://example.com/second-blog-post',
        likes: 1,
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogData = initialData.map((blog) => new Blog(blog))
    await Blog.insertMany(blogData)
})

test('return the amount of blogs posts', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
})

test('verify if the unique identifier property of the blog posts is named "id"', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
    expect(response.body[1].id).toBeDefined()
})

afterAll(() => {
    mongoose.connection.close()
})
