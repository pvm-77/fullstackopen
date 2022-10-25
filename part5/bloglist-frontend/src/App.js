import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  const handleLogout=()=>{
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
      loginService.setToken(user.token)
      // set user in [user] state
      setUser(user)
      // empty user name and password
      setUsername('')
      setPassword('')




    } catch (error) {
      console.log(error);

    }

  }
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <input name='Username' id='username' value={username} onChange={(e) => setUsername(e.target.value)} type='text' placeholder='enter username here' />
          <input name='Password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='enter password here' />
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p> {user.username} logged in  <button onClick={handleLogout}>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}

export default App
