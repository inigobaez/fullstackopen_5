import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserInfo from './components/UserInfo'
import CreateBlogForm from './components/CreateBlogForm'
import Toggable from './components/Togglable'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [blogFormIsShown, setBlogFormIsShown] = useState(false)
  const blogFormRef = useRef()
  const appHeader = user === null ? 'Log in to application' : 'Blogs'


  useEffect(() => {
    const updateBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    if (user) {
      updateBlogs()
    }
  }, [user])
  useEffect(() => {
    const loggedBlogappUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedBlogappUser) {
      const user = JSON.parse(loggedBlogappUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async (requestedUser) => {
    try {
      //console.log(requestedUser)
      const loggedUser = await loginService.login(requestedUser)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      handleNotification({ message: 'user successfully logged in', type: 'success' })
    } catch (error) {
      handleNotification({ message: 'wrong username or password', type: 'error' })
      console.log(error)
    }


  }
  const handleLogout = async () => {
    try {
      setUser(null)
      blogService.setToken(null)
      setUser(null)
      window.localStorage.removeItem('loggedBlogappUser')
    } catch (exception) {
      console.log(exception)
    }
  }
  const handleNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 2000)
  }
  const createBlog = async (newBlog) => {

    try {
      const createdBlog = await blogService.create(newBlog)
      blogFormRef.current.toggle()
      //console.log('createdBlog', createdBlog)
      setBlogs(prevState => [...prevState, createdBlog])
      handleNotification({ message: `A new blog ${createdBlog.title} by ${createdBlog.author} added`, type: 'success' })
    } catch (error) {
      console.log(error)
    }

  }
  const updateBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog)
      setBlogs((prevState) => prevState.map(b => b.id !== blog.id ? b : updatedBlog))
      //console.log('updatedBlog', updatedBlog)
      handleNotification({ message: `Blog ${updatedBlog.title} updated`, type: 'success' })

    } catch (error) {
      handleNotification({ message: `Blog ${error} could not be updated`, type: 'error' })

    }
  }
  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {

        await blogService.deleteBlog(blog)
        setBlogs((prevState) => prevState.filter(b => b.id !== blog.id))
        handleNotification({ message: `Blog ${blog.title} deleted`, type: 'success' })
      }
    } catch (error) {
      handleNotification({ message: `Blog ${error} could not be updated`, type: 'error' })
    }
  }
  const toggleBlogForm = () => {
    setBlogFormIsShown((prevState) => !prevState)
  }
  const userInfo = () => {
    return <>
      <span>{`${user.name} logged in`}</span>
      <button type='button' onClick={handleLogout}>logout</button>
      <br />
      <br />
    </>
  }



  return (

    <>
      <h2>{appHeader}</h2>
      <Notification notification={notification} />
      {user === null ? <LoginForm login={login} /> :
        <>
          <UserInfo name={user.name} handleLogout={handleLogout} />
          <Toggable buttonLabel='new Blog' ref={blogFormRef}>
            <CreateBlogForm createBlog={createBlog} />
          </Toggable>
          <BlogList blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
        </>}
    </>
  )
}

export default App