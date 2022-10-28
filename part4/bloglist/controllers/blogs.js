const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const middleware = require('../utils/middleware')

// update a blog post 

blogRouter.put('/:id', async (request, response) => {
    try {
        const body = request.body
        // make sure only valid fields updated
        const decodedToken = jwt.verify(request.token, config.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })

        }
        const user = await User.findById(decodedToken.id)
        const updateBlogObject = {
            user: user.id,
            author: body.author,
            url: body.url,
            likes: body.likes,
            title: body.title
        }
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updateBlogObject, { new: true })
        response.status(200).json(updatedBlog)
    } catch (error) {
        response.status(500).json({ error })
    }

}
)
blogRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })

    }

    const fields = Object.keys(body)
    if (fields.length === 2) {
        const allowedFields = ['url', 'title'];
        const isValidOperation = fields.every(field => allowedFields.includes(field))
        if (!isValidOperation) {
            return response.status(400).json({ error: 'field are missing' })
        }
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        likes: body.likes,
        url: body.url,
        user: user.id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)

})

//------------------TODO: delete a blog only by who created it -------------
blogRouter.delete('/:id', async (request, response) => {
    // old code
    // const decodedToken = jwt.verify(request.token, config.SECRET)
    // if (!decodedToken.id) {
    //     return response.status(401).json({ error: 'token missing or invalid' })
    // }
    // const blog = await Blog.findById(request.params.id)

    // console.log('blog user', blog.user.toString());
    // console.log('decoded token id', decodedToken.id.toString());
    // if (blog.user.toString() === decodedToken.id.toString()) {
    //     await Blog.findByIdAndRemove(request.params.id)
    //     response.status(204).end()
    // }
    // else{
    //     response.status(404).json({error:"cant delete"})
    // }
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()

})

// ------------- TODO: get all resource --------------
blogRouter.get('/', async (request, response) => {
    const allBlogList = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.status(200).json(allBlogList)

})


// ------------------TODO: get single blog by id-----------------
blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.status(200).json(blog)
    } else {
        response.status(404).end()
    }
})


module.exports = blogRouter