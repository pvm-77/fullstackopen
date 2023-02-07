import React from 'react'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const addBlog = (e) => {
    e.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }


  return (
    <div className='create-blog-container'>
      <div className='create-blog' >
        <header className='create-blog-header'>
          <h2 className='create-blog-title'>create new</h2>
          {/* <img src='' alt='' className='' /> */}
        </header>

        <main>
          <form onSubmit={addBlog}>
            <div>
              <input name='Title'
                id='title'
                value={newTitle}
                type='text'
                onChange={({ target }) => setNewTitle(target.value)}
                placeholder='enter title here' />
            </div>
            <div>
              <input name='Author'
                id='author'
                value={newAuthor}
                type='text'
                onChange={({ target }) => setNewAuthor(target.value)}
                placeholder='enter author here' />
            </div>
            <div>
              <input name='Url'
                id='url'
                value={newUrl}
                type='text'
                onChange={({ target }) => setNewUrl(target.value)}
                placeholder='enter url here' /></div>
            {/* <button type='submit'>create</button> */}
            <button id='create-blog-btn' className="button" type='submit'>
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