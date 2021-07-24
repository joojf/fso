const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

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

test('create a new blog post with missing title and url properties', async () => {
    const newBlog = {
        author: 'No title',
        likes: 100,
    }

    const response = await api.post('/api/blogs').send(newBlog).expect(400)
})

test('deleting a single blog resource', async () => {
    const blogsInDB = await api.get('/api/blogs')
    const blogId = blogsInDB.body[0].id
    const response = await api.delete(`/api/blogs/${blogId}`).expect(204)

    const blogsAfterDelete = await api.get('/api/blogs')
    expect(blogsAfterDelete.body).toHaveLength(blogsInDB.body.length - 1)
})

test('updating a blog number of likes', async () => {
    const blogsInDb = await api.get('/api/blogs')
    const blogId = blogsInDb.body[0].id
    const response = await api
        .put(`/api/blogs/${blogId}`)
        .send({
            title: blogsInDb.body[0].title,
            author: blogsInDb.body[0].author,
            url: blogsInDb.body[0].url,
            likes: 300,
        })
        .expect(200)
    const blogAfterUpdate = response.body
    expect(blogAfterUpdate.likes).toBe(300)
})

describe('testing with one user in the db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('jooj', 10)
        const user = new User({
            username: 'root',
            password: passwordHash,
        })
        await user.save()
    })
    test('creation is successful', async () => {
        const usersAtStart = await User.find({})

        const newUser = {
            username: 'jorgef',
            name: 'Jorge',
            password: 'brazil',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfterCreation = await User.find({})
        expect(usersAfterCreation).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAfterCreation.map((user) => user.username)
        expect(usernames).toContain(newUser.username)
    })
})

describe('tests for login with error', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('jooj', 10)
        const user = new User({
            username: 'root',
            password: passwordHash,
        })
        await user.save()
    })
    test('login with a password with less than 3 characters', async () => {
        const login = {
            username: 'root',
            name: 'Brazil',
            password: 'jo',
        }
        const response = await api.post('/api/users').send(login).expect(400)

        expect(response.body.message).toBe(
            'Username and password must be at least 3 characters long'
        )
    })
    test('login with an username with less than 3 characters', async () => {
        const login = {
            username: 'ro',
            name: 'Brazil',
            password: 'jooj',
        }
        const response = await api.post('/api/users').send(login).expect(400)

        expect(response.body.message).toBe(
            'Username and password must be at least 3 characters long'
        )
    })
    test('login with a username that already exists', async () => {
        const login = {
            username: 'root',
            name: 'Brazil',
            password: 'jooj',
        }
        const response = await api.post('/api/users').send(login).expect(400)

        console.log(response.body.password)

        expect(response.body.message).toBe('Username already exists')
    })
})

afterAll(() => {
    mongoose.connection.close()
})
