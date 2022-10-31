import React from 'react'
import { useState } from 'react'
import Notification from './Notification'
const BlogForm = ({ createBlog,errorMessage,successMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog=( e ) => {
    e.preventDefault()
    createBlog({ title,author,url })
  }
  return (
    <div className='create-blog-container'>
      <div className='create-blog' >
        <header className='create-blog-header'>
          <h2 className='create-blog-title'>create new</h2>
          {/* <img src='' alt='' className='' /> */}
        </header>
        {errorMessage && <Notification cls='error' msg={errorMessage} />}
        {successMessage && <Notification cls='success' msg={successMessage} />}
        <main>
          <form onSubmit={addBlog}>
            <div>
              <input name='Title'
                id='title'
                value={title}
                type='text'
                onChange={({ target }) => setTitle(target.value)}
                placeholder='enter title here' />
            </div>
            <div>
              <input name='Author'
                id='author'
                value={author}
                type='text'
                onChange={({ target }) => setAuthor(target.value)}
                placeholder='enter author here' />
            </div>
            <div>
              <input name='Url'
                id='url'
                value={url}
                type='text'
                onChange={({ target }) => setUrl(target.value)}
                placeholder='enter url here' /></div>
            {/* <button type='submit'>create</button> */}
            <button className="button" type='submit'>
              <div className="button__content">
                <div className="button__icon">
                  {/* <img src={viewBlog} alt='view-blog'/> */}
                </div>
                <p className="button__text">create</p>
              </div>
            </button>
          </form>
        </main>
      </div>
    </div>
  )
}

export default BlogForm