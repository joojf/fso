import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [messageState, setMessageState] = useState(null)
    const [loginVisible, setLoginVisible] = useState(false)

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (error) {
            setMessage('Wrong name or password')
            setMessageState('error')
            setTimeout(() => setMessage(null), 3000)
        }
    }

    const addBlog = async (blogObject) => {
        try {
            const returnedBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(returnedBlog))
            setMessage(
                `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
            )
            setMessageState('success')
            setTimeout(() => setMessage(null), 3000)
        } catch (error) {
            setMessage('Blog already exists')
            setMessageState('error')
            setTimeout(() => setMessage(null), 3000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    const increaseLikes = async (blog) => {
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id,
        }

        try {
            const returnedBlog = await blogService.update(blog.id, updatedBlog)
            setBlogs(
                blogs.map((blog) =>
                    blog.id === returnedBlog.id ? returnedBlog : blog
                )
            )
        } catch (error) {
            console.log(error)
        }
    }

    const loginForm = () => (
        <Togglable buttonLabel="login">
            <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleLogin={handleLogin}
            />
        </Togglable>
    )

    const blogForm = () => (
        <Togglable buttonLabel="new blog">
            <BlogForm createBlog={addBlog} />
        </Togglable>
    )

    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

    return (
        <div>
            <h1>Blogs</h1>
            <Notification message={message} messageState={messageState} />
            {user === null ? (
                loginForm()
            ) : (
                <div>
                    <p>{user.username} logged in!</p> {blogForm()}{' '}
                    <button onClick={handleLogout}>logout</button>
                </div>
            )}

            <div>
                {sortedBlogs.map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        increaseLikes={increaseLikes}
                    />
                ))}
            </div>
        </div>
    )
}

export default App
