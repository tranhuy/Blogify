import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link, useHistory } from 'react-router-dom'

//components
import Menu from './components/Menu'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'
import ErrorPage from './components/ErrorPage'
import Notification from './components/Notification'

//reducers
import { initializeBlogs } from './reducers/blogReducer'
import { setUserToken, logout } from './reducers/userReducer'

//services
import userService from './services/users'

const App = () => {
  const [users, setUsers] = useState([])
  const user = useSelector(state => state.user) 
  const blogs = useSelector(state => state.blog)

  const dispatch = useDispatch()
  const history = useHistory()
  const togglableRef = useRef()

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogUser')

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setUserToken(user))  
      dispatch(initializeBlogs())   
    }       
  }, [])

  useEffect(() => {
    userService.getAll().then(users => 
        setUsers(users)
    )
}, [blogs])

  const logoutUser = () => {
    dispatch(logout())
  }

  return (
    <>
      <Notification />  
      {
        user === null ? 
          <LoginForm /> :
          <>
              <Menu username={user.name} logoutHandler={logoutUser} />                 
              <h2>Blog App</h2> 
              <Switch>
                <Route exact path="/">                     
                    <Togglable buttonLabel="Create New Blog" ref={togglableRef}>
                      <BlogForm togglableRef={togglableRef} />
                    </Togglable>             
                    <BlogList blogs={blogs} />
                </Route>
                <Route exact path="/users">
                    <UserList users={users} />
                </Route>   
                <Route exact path="/users/:id">
                    <UserDetails users={users} />
                </Route> 
                <Route exact path="/blogs/:id">
                    <Blog blogs={blogs} />
                </Route>  
                <Route>
                    <ErrorPage />
                </Route>            
              </Switch>              
          </>       
      }
    </>
  )
}

export default App