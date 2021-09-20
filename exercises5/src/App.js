import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
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

    const addBlog = async (event) => {
        event.preventDefault()
        console.log(title, author, url)
        const blogObject = {
            title: title,
            author: author,
            url: url,
        }
        try {
            const blog = await blogService.create(blogObject)
            setBlogs(blogs.concat(blog))
            setTitle('')
            setAuthor('')
            setUrl('')
            setMessage('Blog added')
            setMessageState('success')
            setTimeout(() => setMessage(null), 3000)
        } catch (error) {
            setMessage(error)
            setMessageState('error')
            setTimeout(() => setMessage(null), 3000)
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
            <BlogForm
                title={title}
                author={author}
                url={url}
                handleTitleChange={({ target }) => setTitle(target.value)}
                handleAuthorChange={({ target }) => setAuthor(target.value)}
                handleUrlChange={({ target }) => setUrl(target.value)}
                handleSubmit={addBlog}
            />
        </Togglable>
    )
    return (
        <div>
            <h1>Blogs</h1>
            <Notification message={message} messageState={messageState} />
            {user === null ? (
                loginForm()
            ) : (
                <div>
                    <p>{user.username} logged in!</p> {blogForm()}{' '}
                </div>
            )}

            <div>
                {blogs.map((blog) => (
                    <Blog blog={blog} />
                ))}
            </div>
        </div>
    )
}

export default App
