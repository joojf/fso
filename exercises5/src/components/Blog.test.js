import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders only initial content', () => {
    const blog = {
        title: 'Test blog',
        author: 'Test author',
        url: 'www.test.com',
        likes: 0,
        user: {
            username: 'testuser',
            name: 'Test User',
        },
    }

    const component = render(<Blog blog={blog} />)

    expect(component.container).toHaveTextContent('Test blog Test author')

    expect(component.container).not.toHaveTextContent('www.test.com')

    expect(component.container).not.toHaveTextContent('0 likes')

    expect(component.container).not.toHaveTextContent('added by Test User')
})
