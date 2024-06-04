import Blog from './Blog'

const BlogList = ({ blogs, updateBlog, deleteBlog, user }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  return (<>{sortedBlogs.map(blog =>
    <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
  )}
  </>)
}
export default BlogList