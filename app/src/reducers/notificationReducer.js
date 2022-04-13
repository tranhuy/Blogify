export const showNotification = (message, isError, delay) => {
    return async dispatch => {
        dispatch({
            type: 'SHOW_NOTIFICATION', message, isError
        })
        await new Promise(resolve => setTimeout(resolve, delay * 1000))
        dispatch({
            type: 'HIDE_NOTIFICATION'
        })
    }
}

const reducer = (state = '', action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            let notification = {
                message: action.message,
                isError: action.isError
            }
            return notification
        case 'HIDE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export default reducer