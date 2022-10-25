import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form>
          <input type='text' placeholder='enter username here'/>
          <input type='password' placeholder='enter password here'/>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}

export default App
