import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useField } from '../hooks'

import { deleteBlog, likeBlog, commentBlog, sortByLikes } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

import '../App.css'

const Blog = ({ blogs }) => {
  //const [showBlogDetails, setShowBlogDetails] = useState(false)
  const dispatch = useDispatch()
  const { reset: resetComment, ...comment } = useField('text')

  const blogStyle = {
    padding: 6,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    gap: 5
  }

  const imgButtonStyle = {
    border: 0,
    background: 'transparent',
    //backgroundImage: `url('${process.env.PUBLIC_URL}/smThumbsUp.jpg')`,
    cursor: 'pointer'
  }

  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  if (!blog) {
      return null
  }

  const toggleDetails = () => {
    setShowBlogDetails(!showBlogDetails)
  }

  const incrementLikes = async () => {
    try {
      await dispatch(likeBlog({...blog, likes: ++blog.likes}))
      dispatch(sortByLikes())
    } catch (err) {
      console.log(err)
    } 
  }

  const addComment = async (event) => {
    event.preventDefault()

    try {
      await dispatch(commentBlog(blog, comment.value))
      resetComment()
    } catch (err) {
      dispatch(showNotification(err.message, true, 3))
    }
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(deleteBlog(blog.id))
      } catch (err) {
        console.log(err)
      }  
    }
  }

  const setHttp = url => {
    if (url.search(/^http[s]?\:\/\//) == -1) {
        url = 'http://' + url;
    }
    
    return url;
  }

  return (
    <div className='blog'>
      <table className='my-4'>
            <tbody>
              <tr className='title'><td style={{fontSize: '25px', fontWeight: 'bold'}}>{blog.title}</td></tr>
              <tr style={{height: 10}}></tr>
              <tr className='url'><td><a href={setHttp(blog.url)}>{blog.url}</a></td></tr>
              <tr className='likes'><td>{blog.likes} likes <button title='like blog' onClick={incrementLikes} style={imgButtonStyle}><i className='bi bi-hand-thumbs-up'></i></button></td></tr>
              <tr className='author'><td>Added By: {blog.author}</td></tr>
            </tbody>
        </table>
        <h4>Comments</h4>
        <form className='row g-3 mb-2' onSubmit={addComment}>
          <div className='col-auto'>
              <label htmlFor='comment'>Comment:</label>           
          </div>
          <div className='col-5'>
              <input id='comment' className='form-control form-control-sm' {...comment} />
          </div>
          <div className='col-auto'>
              <button className='btn btn-sm btn-outline-secondary'>Comment</button>
          </div>    
        </form>
        {
          blog.comments.length > 0 ?
          <ul>
            {blog.comments.map((comment, id) => 
              <li key={id}>{comment}</li>)}
          </ul>
            : <div>No comments provided</div>
        }
    </div>  
  )}

export default Blog