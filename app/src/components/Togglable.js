import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
          toggleVisibility
        }
    })

    return (
        <>
            { 
                visible ? <div>
                            {props.children}
                            <button className='btn btn-outline-secondary' onClick={toggleVisibility}>Cancel</button>
                          </div> 
                        : <div><button className='btn btn-outline-secondary' onClick={toggleVisibility}>{props.buttonLabel}</button></div>
            }
        </>
    )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable