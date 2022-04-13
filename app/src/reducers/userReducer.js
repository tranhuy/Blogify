import loginService from '../services/login'
import blogService from '../services/blogs'

export const login = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({username, password})
        window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch({
            type: 'LOGIN_USER',
            data: user
        })
    }
}

export const setUserToken = (user) => {
    blogService.setToken(user.token)
    return {
        type: 'LOGIN_USER',
        data: user
    }
}

export const logout = () => {
    window.localStorage.removeItem('loggedInBlogUser')
    return {
        type: 'LOGOUT_USER'
    }
}

const reducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.data
        case 'LOGOUT_USER':
            return null            
        default:
            return state
    }
}

export default reducer