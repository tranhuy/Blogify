import blogService from '../services/blogs'

export const createBlog = newBlog => {
    return async dispatch => {
        const blog = await blogService.create(newBlog)
        dispatch({
            type: 'NEW_BLOG',
            data: blog
        })
    }
}

export const deleteBlog = blogId => {
    return async dispatch => {
        await blogService.deleteBlog(blogId)
        dispatch({
            type: 'DELETE_BLOG',
            data: blogId
        })
    }
}

export const likeBlog = blog => {
    return async dispatch => {
        await blogService.updateBlog(blog.id, blog)
        dispatch({
            type: 'LIKE_BLOG',
            data: blog
        })
    }
}

export const commentBlog = (blog, comment) => {
    return async dispatch => {
        const commentedBlog = await blogService.addComment(blog.id, comment)
        dispatch({
            type: 'COMMENT_BLOG',
            data: commentedBlog
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch( {
            type: 'INIT_BLOGS',
            data: blogs
        })
        dispatch(sortByLikes())
    }
}

export const sortByLikes = () => {
    return {
        type: 'SORT_BY_LIKES'
    }
}

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'LIKE_BLOG': 
        case 'COMMENT_BLOG':
            return state.map(blog => blog.id !== action.data.id ? blog : action.data)
        case 'DELETE_BLOG':
            return state.filter(blog => blog.id != action.data)
        case 'INIT_BLOGS':
            return action.data
        case 'SORT_BY_LIKES':
            return [...state].sort((blog1, blog2) => blog2.likes - blog1.likes)
        default: 
            return state
    }
}

export default reducer