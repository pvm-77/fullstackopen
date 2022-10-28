import React from 'react'
import Notification from './Notification'
const CreateNewBlog = ({ title, url, author, handleTitleChange, handleAuthorChange,
    handleSubmit, handleUrlChange, errorMessage, successMessage
}) => {
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
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input name='Title'
                                id='title'
                                value={title}
                                type='text'
                                onChange={handleTitleChange}
                                placeholder='enter title here' />
                        </div>
                        <div>
                            <input name='Author'
                                id='author'
                                value={author}
                                type='text'
                                onChange={handleAuthorChange}
                                placeholder='enter author here' />
                        </div>
                        <div>
                            <input name='Url'
                                id='url'
                                value={url}
                                type='text'
                                onChange={handleUrlChange}
                                placeholder='enter url here' /></div>
                        {/* <button type='submit'>create</button> */}
                        <button class="button">
                            <div class="button__content">
                                <div class="button__icon">
                                    {/* <img src={viewBlog} alt='view-blog'/> */}
                                </div>
                                <p class="button__text">create</p>
                            </div>
                        </button>
                    </form>
                </main>
            </div>
        </div>
    )
}

export default CreateNewBlog