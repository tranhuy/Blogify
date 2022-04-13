import { Link } from 'react-router-dom'

const UserList = ({users}) => {
    return (
        <div>
            <h4>Users</h4>
            <table>
                <thead>
                    <tr>
                        <th></th><th>Blogs Created</th>
                    </tr>
                </thead>
                <tbody>                   
                        {users.map(user =>
                            <tr key={user.id}>
                                <td><Link to={`users/${user.id}`}>{user.name}</Link></td>
                                <td style={{textAlign: 'center'}}>{user.blogs.length}</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default UserList