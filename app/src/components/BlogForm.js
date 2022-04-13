import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const BlogForm = ({ togglableRef }) => {
    const { reset: resetTitle, ...title } = useField('text')
    const { reset: resetAuthor, ...author } = useField('text')
    const { reset: resetUrl, ...url } = useField('text')

    const dispatch = useDispatch()

    const addNewBlog = async (event) => {
      event.preventDefault()
  
      try {
        let newBlog = {
          title: title.value,
          author: author.value,
          url: url.value
        }

        await dispatch(createBlog(newBlog))  
        dispatch(showNotification(`New Blog: ${newBlog.title} by ${newBlog.author} was successfully added`, false, 3))
        togglableRef.current.toggleVisibility()
      } catch (err) {
        dispatch(showNotification(err.message, true, 3))
        console.log(err)
      }
    }

    return (
        <>
            <h4>Create New Blog</h4>
            <form onSubmit={addNewBlog}>
              <div className='form-group mb-2'>
                    <label htmlFor='title'>Title:</label>
                    <input id='title' className='form-control' {...title} />
                </div>
                <div className='form-group mb-2'>
                    <label htmlFor='author'>Author:</label>
                    <input id='author' className='form-control' {...author} />
                </div>
                <div className='form-group mb-2'>
                    <label htmlFor='url'>Url:</label>
                    <input id='url' className='form-control' {...url} />
                </div>
                <button type="submit" className='btn btn-outline-secondary mb-2'>Create</button>
            </form>
        </>
    )
}

export default BlogForm