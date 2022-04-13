import { useParams } from 'react-router-dom'

import '../App.css'

const UserDetails = ({users}) => {
    const id = useParams().id
    const user = users.find(user => user.id === id)

    if (!user) {
        return null
    }

    return (
        <div>
            <h4 className='my-4'>{user.name}</h4>
            {
                user.blogs.length === 0 ? 'No blogs added' :
                <>
                    <h5>Added Blogs</h5>
                    <ul>
                        {user.blogs.map(blog => 
                            <li key={blog.id}>
                                {blog.title}
                            </li>)}
                    </ul>
                </>
            }           
        </div>
    )
}

export default UserDetails