import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
// import bg from './trianglify-lowres.png'
import loginLogo from './login.png'
import Modal from './components/Modal'
// import background from './background.png'
import './app.css'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import CreateNewBlog from './components/CreateNewBlog'
const App = () => {
  // modal handling start here
  // const [modal, setModal] = useState(false)
  // const Toggle = () => setModal(!modal)
  // modal handling end here
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // blogs states
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // set error and success notification 
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(`username ${username} password ${password}`);

    try {
      // login details for user 
      const user = await loginService.login({ username, password })
      console.log(user);
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
      console.log(error.response.data.error);
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }

  }
  const handleCreateNewBlogInfo = async (e) => {
    e.preventDefault()
    try {
      console.log(`title ${title} author: ${author} url:${url}`);

      const newNote = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(newNote))
      setSuccessMessage(` ${title} added by ${user.username}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)

    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)

    }
  }
  const mystyle = {
    left: '50%',
    top: "50%",
    position: 'absolute',
    transform: 'translate(-50%, -50%)',


  }

  if (user === null) {
    return (
      <div >

        {/* modal handling start here */}
        {/* <button className='clickme' onClick={() => Toggle()}>Modal</button>
        <Modal show={modal} close={Toggle} /> */}
        {/* modal handling end here */}
        {/* <div className='login-card-container'>
        
          <div className='login-card'>
            <header className='login-card-header'>
              <h2 className='login-card-title'>Log in to application</h2>
              <img src={loginLogo} alt='logo' className='login-card-logo' />

            </header>
            {successMessage && <Notification cls='success' msg={successMessage} />}
            {errorMessage && <Notification cls='error' msg={errorMessage} />}
            <main className='login-card-content'>
              <form onSubmit={handleLogin}>
                <div>
                  <input name='Username' id='username'
                    value={username} onChange={(e) => setUsername(e.target.value)} type='text' placeholder='enter username here' />
                </div>

                <div>
                  <input name='Password' id='password'
                    value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='enter password here' />
                </div>

                <button type='submit'>login</button>
              </form>
            </main>
            <footer className='login-card-footer'></footer>
          </div>
        </div> */}
        <Togglable buttonLabel='login'>
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
      <Togglable buttonLabel='create new'>
        {/* <div className='create-blog-container'>
          <div className='create-blog' >
            <header className='create-blog-header'>
              <h2 className='create-blog-title'>create new</h2>
              <img src='' alt='' className='' />
            </header>
            <main>
              <form onSubmit={handleCreateNewBlogInfo}>
                <div>
                  <input name='Title' id=''
                    value={title}
                    type='text'
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='enter title here' />
                </div>
                <div>
                  <input name='Author' id=''
                    value={author}
                    type='text'
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder='enter author here' />
                </div>
                <div>
                  <input name='Url' id=''
                    value={url}
                    type='text'

                    onChange={(e) => setUrl(e.target.value)}
                    placeholder='enter url here' /></div>
                <button type='submit'>create</button>
              </form>
            </main>
          </div>
        </div> */}

        <CreateNewBlog
          handleAuthorChange={(e) => setAuthor(e.target.value)}
          handleTitleChange={(e) => setTitle(e.target.value)}
          handleUrlChange={(e) => setUrl(e.target.value)}
          author={author}
          title={title}
          url={url}
          handleSubmit={handleCreateNewBlogInfo}
          successMessage={successMessage}
          errorMessage={errorMessage}

        />
      </Togglable>



      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}

export default App
