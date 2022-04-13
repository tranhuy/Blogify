import { Link } from 'react-router-dom'

import { Navigation } from './styled/Navigation.style'

const Menu = ({ username, logoutHandler }) => {
    const menuStyle = {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        backgroundColor: '#d2d2d3',
        padding: 5
    }

     return (
        <Navigation>
            <Link to="/">Blogs</Link> |
            <Link to="/users">Users</Link>
            <div style={{marginLeft: 'auto'}}>
                <strong>{username} logged in </strong>
                <Link to='/'>
                    <button className='btn btn-sm btn-outline-dark' onClick={logoutHandler}>Logout</button>
                </Link>        
            </div>    
        </Navigation>
     )
}

export default Menu