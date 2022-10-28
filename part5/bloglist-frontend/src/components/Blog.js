import { useState } from 'react'
import viewBlog from './viewBlog.png'

const Blog = ({ blog }) => {
  const [isBlogDetailsOpen, setIsBlogDetailsOpen] = useState(false)
  const Toggle = () => {
    setIsBlogDetailsOpen(!isBlogDetailsOpen)
  }
  // (

  //   <div>
  //     {blog.title} {blog.author}
  //   </div>  
  // )


  const blogStyle = {

    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderRadius: 20,
    display: 'flex',

    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor:'white',
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    backdropFilter: 5,
    boxShadow: '0 0 1rem 0 rgba(0,0,0,0.2)',
    border: 'solid', borderWidth: 1, marginBottom: 5,
    marginRight: 20
  }
  if (isBlogDetailsOpen === false) {
    return (
      <div style={blogStyle}>
        <div style={{ border: 'solid', borderWidth: 1 }}>
          {blog.title} {blog.author}
        </div>
        {/* <button>view</button> */}

        <button class="button" onClick={Toggle}>
          <div class="button__content">
            <div class="button__icon">
              <img src={viewBlog} alt='view-blog' />
            </div>
            <p class="button__text">view</p>
          </div>
        </button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div style={{ border: 'solid', borderWidth: 1 }}>
          <p>{blog.title} {blog.author}</p>
          <p>{blog.url}</p>
          <p>like {blog.likes} <button >like</button></p>
          <p>{blog.user.name}</p>
        </div>
        {/* <button>view</button> */}

        <button class="button" onClick={Toggle}>
          <div class="button__content">
            <div class="button__icon">
              <img src={viewBlog} alt='view-blog' />
            </div>
            <p class="button__text">hide</p>
          </div>
        </button>
      </div>
    )

  }

}

export default Blog