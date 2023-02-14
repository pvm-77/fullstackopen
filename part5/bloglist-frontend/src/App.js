import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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
  const [notice, setNotice] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    }
    )
  }, [])


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
      setNotice(`error is ${error.response.data.error}`)
      setTimeout(() => {
        setNotice(null)
      }, 5000)

    }

  }

  const addBlog = async (blogObject) => {

    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat({ ...newBlog, user }))
      setNotice(` ${newBlog.title} added by ${user.username}`)
      setTimeout(() => {
        setNotice(null)
      }, 3000)
    } catch (error) {
      setNotice(`error is ${error.response.data.error}`)
      setTimeout(() => {
        setNotice(null)
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



  return (
    <div>
      <Notification notice={notice} />
      {user === null ? <LoginForm
        username={username}
        password={password}
        handleUsernameChange={(e) => setUsername(e.target.value)}
        handlePasswordChange={(e) => setPassword(e.target.value)}
        handleSubmit={handleLogin}
      /> :
        <>
          <h2>blogs</h2>

          <p> {user.username} logged in  <button onClick={handleLogout}>logout</button></p>
          <Togglable id='create-new' buttonLabel='create new' ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
          )}
        </>


      }


    </div>
  )

}

export default App
