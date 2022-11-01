import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
// import bg from './trianglify-lowres.png'
// import loginLogo from './login.png'
// import Modal from './components/Modal'
// import background from './background.png'
import './app.css'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    console.log('effect')
    blogService.getAll().then(blogs => {
      console.log('promise fulfilled')
      setBlogs(blogs)
    }
    )
  }, [])
  console.log('render', blogs.length, 'blogs')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }

  }

  const addBlog = async (blogObject) => {

    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)


      setBlogs(blogs.concat({ ...newBlog, user }))

      setSuccessMessage(` ${newBlog.title} added by ${user.username}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    }

  }
  const updateBlog = async (blogToBeUpdate) => {
    try {
      const updatedBlog = await blogService.likePost(blogToBeUpdate)
      const newUpdateBlog = { ...updatedBlog, user }
      setBlogs(blogs.map(blog => blog.id === newUpdateBlog.id ? newUpdateBlog : blog))
    } catch (error) {
      console.log(error)
    }

  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (error) {
      console.log('error on deletion', error)
    }

  }
  if (user === null) {
    return (
      <div >
        <Togglable buttonLabel='login' ref={blogFormRef}>
          <LoginForm username={username} password={password}
            errorMessage={errorMessage} successMessage={successMessage}
            handleUsernameChange={(e) => setUsername(e.target.value)}
            handlePasswordChange={(e) => setPassword(e.target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>

      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {successMessage && <Notification cls='success' msg={successMessage} />}
      {errorMessage && <Notification cls='error' msg={errorMessage} />}
      <p> {user.username} logged in  <button onClick={handleLogout}>logout</button></p>


      <Togglable buttonLabel='create new' ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
          successMessage={successMessage}
          errorMessage={errorMessage}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
      )}
    </div>
  )

}

export default App
