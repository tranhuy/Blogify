import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  
  try {
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
  } catch (err) {
      throw new Error(err.response.data.error)
  }
}

const addComment = async (blogId, comment) => {
  try {
      const response = await axios.post(`${baseUrl}/${blogId}/comments`, { comments: comment })
      return response.data
  } catch (err) {
      throw new Error(err.response.data.error)
  }
}

const updateBlog = async (blogId, modifiedBlog) => {
  try {
    const response = await axios.put(`${baseUrl}/${blogId}`, modifiedBlog)
    return response.data
  } catch (err) {
      throw new Error(err.response.data.error)
  }
}

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token }
  }

  try {
    const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  } catch (err) {
      throw new Error(err.response.data.error)
  } 
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll, create, updateBlog, deleteBlog, addComment, setToken }