import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // blogs states
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
      console.log(error);

    }

  }
  const handleCreateNewBlogInfo = async (e) => {
    e.preventDefault()
    try {
      console.log(`title ${title} author: ${author} url:${url}`);

      const newNote = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(newNote))

    } catch (error) {
      console.log(error);

    }
  }
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <input name='Username' id='username' 
          value={username} onChange={(e) => setUsername(e.target.value)} type='text' placeholder='enter username here' />
          <input name='Password' id='password' 
          value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='enter password here' />
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p> {user.username} logged in  <button onClick={handleLogout}>logout</button></p>
      <div>
        <h1>create new</h1>
        <form onSubmit={handleCreateNewBlogInfo}>

          <input name='Title' id='' 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} placeholder='enter title here' />
          <input name='Author' id='' 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} placeholder='enter author here' />
          <input name='Url' id='' 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} placeholder='enter url here' />
          <button type='submit'>create</button>
        </form>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}

export default App
