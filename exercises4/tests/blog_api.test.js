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

test('create a new blog post', async () => {
    const newBlog = {
        title: 'New blog post',
        author: 'A new author',
        url: 'http://example.com/new-blog-post',
        likes: 2,
    }

    const response = await api.post('/api/blogs').send(newBlog).expect(201)

    const newBlogPost = response.body
    expect(newBlogPost.title).toBe(newBlog.title)
    expect(newBlogPost.author).toBe(newBlog.author)
    expect(newBlogPost.url).toBe(newBlog.url)
    expect(newBlogPost.likes).toBe(newBlog.likes)
})

// write a test that verifies that if the likes property is missing from the request, it will default to the value 0
test('create a new blog post with missing likes property', async () => {
    const newBlog = {
        title: 'Testing likes',
        author: 'Likerino',
        url: 'http://example.com/likes',
    }
    const response = await api.post('/api/blogs').send(newBlog).expect(201)
    const newBlogPost = response.body
    expect(newBlogPost.likes).toBe(0)
})

afterAll(() => {
    mongoose.connection.close()
})
