import React from 'react'

const BlogForm = ({
    addBlog,
    title,
    author,
    url,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    handleSubmit,
}) => {
    return (
        <div>
            <h2>Create a new blog</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    title:
                    <input
                        id="title"
                        value={title}
                        name="title"
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author:
                    <input
                        id="author"
                        value={author}
                        name="author"
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url:
                    <input
                        id="url"
                        value={url}
                        name="url"
                        onChange={handleUrlChange}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm
