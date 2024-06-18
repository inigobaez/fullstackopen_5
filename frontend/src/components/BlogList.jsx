import Blog from './Blog'

const BlogList = ({ blogs, updateBlog, deleteBlog, user }) => {
  console.log('rerender blog list with blogs', blogs)
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  return (<div data-testid='blogList'>{sortedBlogs.map(blog =>
    <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
  )}
  </div>)
}
export default BlogList