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
// import CreateNewBlog from './components/CreateNewBlog'
import BlogForm from './components/BlogForm'
const App = () => {
  // modal handling start here
  // const [modal, setModal] = useState(false)
  // const Toggle = () => setModal(!modal)
  // modal handling end here
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  console.log('USER is ', user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // set error and success notification
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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
    console.log(`username ${username} password ${password}`)

    try {
      // login details for user
      const user = await loginService.login({ username, password })
      console.log(user)
      // set user info to localstorage
      window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
      // set token
      blogService.setToken(user.token)
      // set user in [user] state
      setUser(user)
      // empty user name and password
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error.response.data.error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }

  }
  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
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
      // incalculate change
      setBlogs(blogs.map(blog => blog.id === blogToBeUpdate.id ? updatedBlog : blog))

      // notifcation if needed

    } catch (error) {
      console.log(error)
    }

  }
  // const handleCreateNewBlogInfo = async (e) => {
  //   e.preventDefault()
  //   try {
  //     console.log(`title ${title} author: ${author} url:${url}`)
  //     blogFormRef.current.toggleVisibility()
  //     const newNote = await blogService.create({ title, author, url })
  //     setBlogs(blogs.concat(newNote))
  //     setSuccessMessage(` ${title} added by ${user.username}`)
  //     setTimeout(() => {
  //       setSuccessMessage(null)
  //     }, 3000)


  //   } catch (error) {
  //     console.log(error)
  //     setErrorMessage(error.response.data.error)
  //     setTimeout(() => {
  //       setSuccessMessage(null)
  //     }, 3000)

  //   }
  // }

  const deleteBlog = async (id) => {
    console.log('id of blog which is about to delete is', id)
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
      {/* <Togglable buttonLabel='create new' ref={blogFormRef}>
        <CreateNewBlog
          handleAuthorChange={(e) => setAuthor(e.target.value)}
          handleTitleChange={(e) => setTitle(e.target.value)}
          handleUrlChange={(e) => setUrl(e.target.value)}
          author={author}
          title={title}
          url={url}
          handleSubmit={handleCreateNewBlogInfo}
          createBlog={addBlog}
          successMessage={successMessage}
          errorMessage={errorMessage}
        />
      </Togglable> */}

      <Togglable buttonLabel='create new' ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
          successMessage={successMessage}
          errorMessage={errorMessage}
        />
      </Togglable>
      {blogs.sort((a, b) => a.likes - b.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
      )}
    </div>
  )

}

export default App
