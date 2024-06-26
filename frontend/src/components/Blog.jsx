import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {

  const [detailsVisible, setDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    updateBlog({ ...blog, likes: blog.likes + 1 })
  }
  //console.log('blog details', blog, blog.user.username, user.username)
  return (
    <div style={blogStyle} data-testid='blogItem' >
      <div className='blog_header'>{blog.title} {blog.author}
        <button onClick={() => setDetailsVisible((prevState) => !prevState)}>
          {detailsVisible ? 'hide' : 'show'}
        </button>
      </div>
      {detailsVisible &&
        <div className='blog_body'>
          <p>{blog.url}</p>
          <p><span data-testid='like'>{blog.likes}</span> <button onClick={handleLike}>like</button></p>
          <p>{blog.user.name}</p>
          {blog.user.username === user.username &&
            <button onClick={() => deleteBlog(blog)}>Remove
            </button>}

        </div>
      }

    </div>
  )

}



export default Blog