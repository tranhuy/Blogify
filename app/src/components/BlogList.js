import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { BlogItem } from './styled/BlogItem.style'

const BlogList = ({ blogs }) => {
    //const blogs = useSelector(state => state.blog)
    const blogStyle = {
        padding: 6,
        border: 'solid',
        borderWidth: 2,
        marginBottom: 5,
        marginTop: 0,
        display: 'flex',
        flexDirection: 'row',
        gap: 5
      }
    
    return (
        <>
            <h4>Blogs</h4>
            <section style={{marginTop: '10px'}}>
                {
                    blogs && blogs.map(blog => 
                        <Link key={blog.id} to={`blogs/${blog.id}`} style={{ color: 'black', textDecoration: 'none' }}><BlogItem>{blog.title} - {blog.author}</BlogItem></Link>)
                }    
            </section>        
        </>
    )
}

export default BlogList