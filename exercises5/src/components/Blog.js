import React, { useState } from 'react'
const Blog = ({ blog, increaseLikes }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const [showDetails, setShowDetails] = useState(false)

    const toggleShowDetails = () => {
        setShowDetails(!showDetails)
    }

    const blogDetails = () => {
        if (showDetails) {
            return (
                <div>
                    <div>{blog.url}</div>
                    <div>
                        {blog.likes} likes{' '}
                        <button onClick={() => increaseLikes(blog)}>
                            like
                        </button>
                    </div>
                    <div>added by {blog.user.name}</div>
                </div>
            )
        }
    }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}
            <button onClick={toggleShowDetails}>
                {showDetails ? 'hide' : 'view'}
            </button>
            {blogDetails()}
        </div>
    )
}

export default Blog
