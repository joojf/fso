import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders only title and author', () => {
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

test('renders all info when button is clicked', () => {
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

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('Test blog Test author')

    expect(component.container).toHaveTextContent('www.test.com')

    expect(component.container).toHaveTextContent('0 likes')

    expect(component.container).toHaveTextContent('added by Test User')
})

test('clicking the like button twice calls event handler twice', () => {
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

    const mockHandler = jest.fn()

    const component = render(<Blog blog={blog} onClick={mockHandler} />)

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})

