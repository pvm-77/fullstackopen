/* eslint-disable no-unused-vars */
import { useState } from 'react'
import viewBlog from './viewBlog.png'
const Blog = ({ blog, updateBlog, deleteBlog, user }) => {

  // const [isBlogDetailsOpen, setIsBlogDetailsOpen] = useState(false)
  const [fullBlogDetailVisible, setFullBlogDetailVisible] = useState(false)
  // const hideWhenFullBlogDetailVisible = { display: fullBlogDetailVisible ? 'none' : '' }
  const showWhenFullBlogDetailVisible = { display: fullBlogDetailVisible ? '' : 'none' }
  const Toggle = () => {
    // setIsBlogDetailsOpen(!isBlogDetailsOpen)
    setFullBlogDetailVisible(!fullBlogDetailVisible)
  }

  const handleDeleteBlog = (blog) => {
    let toDelete = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (toDelete) {
      deleteBlog(blog.id)
    }

  }
  const handleLikePost = () => {
    const updateBlogInfo = {
      ...blog,
      likes: blog.likes + 1

    }
    updateBlog(updateBlogInfo)
  }
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
  //   if (isBlogDetailsOpen === false) {
  //     return (
  //       <div id='blog' className='blog' style={blogStyle}>
  //         <div style={{ border: 'solid', borderWidth: 1 }}>
  //           <div> {blog.title}</div>
  //
  //           <div>{blog.author}</div>
  //         </div>
  //
  //         <button id='view-btn' className="button" onClick={Toggle}>
  //           <div className="button__content">
  //             <div className="button__icon">
  //               <img src={viewBlog} alt='view-blog' />
  //             </div>
  //             <p className="button__text">view</p>
  //           </div>
  //         </button>
  //       </div>
  //     )
  //   }

  // else {
  return (
    <div id='blog' className='blog'>
      <div style={blogStyle}>
        <div style={{ border: 'solid', borderWidth: 1 }}>
          <p>{blog.title} {blog.author}</p>
          <div style={showWhenFullBlogDetailVisible} className='expand-blog-detail'>
            <p>{blog.url}</p>
            <p>likes {blog.likes} <button id='like-btn' onClick={handleLikePost}>like</button></p>
            <p>{blog.user.name}</p>
            {blog.user.username === user.username ? <button id='view-btn-detail' className="button" onClick={() => handleDeleteBlog(blog)}>
              <div className="button__content">
                <div className="button__icon">
                  <img src={viewBlog} alt='view-blog' />
                </div>
                <p id='delete-blog-btn' className="button__text">remove</p>
              </div>
            </button> : null}
          </div>
        </div>

        <button id='btn' className="button" onClick={Toggle}>
          <div className="button__content">
            <div className="button__icon">
              <img src={viewBlog} alt='view-blog' />
            </div>
            <p className="button__text">{fullBlogDetailVisible ? 'hide' : 'view'}</p>
          </div>
        </button>
      </div>
    </div>
  )

}

// }

export default Blog