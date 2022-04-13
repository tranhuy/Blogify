import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> passes correct form details when submitted', () => {
    const addBlog = jest.fn()
    
    const component = render(
        <BlogForm submitAction={addBlog} />
    )

    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(inputTitle, {
        target: { value: 'This is blog title' }
    })

    fireEvent.change(inputAuthor, {
        target: { value: 'This is blog author' }
    })

    fireEvent.change(inputUrl, {
        target: { value: 'This is blog url' }
    })

    fireEvent.submit(form)
    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].author).toBe('This is blog author')
})