import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useField } from '../hooks'

import { login } from '../reducers/userReducer'
import { showNotification } from '../reducers/notificationReducer'
import { initializeBlogs } from '../reducers/blogReducer'

const LoginForm = () => {
    const { reset: resetUsernae, ...username } = useField('text')
    const { reset: resetPassword, ...password } = useField('password')
    const dispatch = useDispatch()
    
    const loginUser = async (event) => {
      event.preventDefault()

      try {
        await dispatch(login(username.value, password.value))
        dispatch(initializeBlogs())
      } catch (err) {
        dispatch(showNotification('Invalid Credentials', true, 3))
      }
    }

    return (
        <>
          <h2>User Login</h2>
          <form onSubmit={loginUser}>
              <div className='form-group mb-2'>
                  <label htmlFor='username'>Username:</label>
                  <input id='username' className='form-control' {...username} />
              </div>
              <div className='form-group mb-2'>
                  <label htmlFor='password'>Password:</label>
                  <input id='password' className='form-control' {...password} />
              </div>
              <button type="submit" className='btn btn-outline-secondary'>Login</button>
          </form>
        </>
    )
}

export default LoginForm