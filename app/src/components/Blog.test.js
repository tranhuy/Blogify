import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {
    const blog = {
        user: '999999',
        title: 'Huy is best',
        author: 'Huy Tran',
        url: 'www.huytran.com',
        likes: 100
    }

    const blogActions = {
        update : jest.fn()
    }

    let component

    beforeEach(() => {
        component = render(
            <Blog blog={blog} blogActions={blogActions} canDelete={true} />
        )
    })

    // test('renders title and author', () => {    
    //     component.debug()
    
    //     expect(component.container.querySelector('.title') && component.container.querySelector('.author')).not.toEqual(null)
    // })
    
    // test('renders url and likes after View button clicked to show blog details', () => {
    //     const button = component.getByText('View')
    //     fireEvent.click(button)
    //     component.debug()
        
    //     expect(component.container.querySelector('.url') && component.container.querySelector('.likes')).not.toEqual(null)
    // })

    test('updates blog 2 times upon like button being clicked twice', () => {
        const btnView = component.getByText('View')
        fireEvent.click(btnView)
        const btnLike = component.getByText('Like')
        fireEvent.click(btnLike)
        fireEvent.click(btnLike)

        expect(blogActions.update.mock.calls).toHaveLength(2)
    })
})

