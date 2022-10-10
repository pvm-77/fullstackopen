const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const middleware=require('../utils/middleware')


blogRouter.post('/',middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user= request.user

    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })

    }
    const fields = Object.keys(body)
    if (fields.length === 2) {
        const allowedFields = ['url', 'title'];
        const isValidOperation = fields.every(field => allowedFields.includes(field))
        console.log(isValidOperation);
        if (!isValidOperation) {
            return response.status(400).json({ error: 'field are missing' })
        }
    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        likes: body.likes,
        url: body.url,
        user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)

})

//------------------TODO: delete a blog only by who created it -------------
blogRouter.delete('/:id',middleware.userExtractor, async (request, response) => {
    const user = request.user
    const userid=user._id;
    console.log('user in delete', user)
    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    console.log('blog user',blog.user.toString());
    console.log('decoded token id',decodedToken.id.toString());

    if (blog.user.toString() === userid.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
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

// update a blog post 






blogRouter.put('/:id', async (request, response) => {
    const body = request.body
    // make sure only valid fields updated
    const updateBlogObject = {
        user: body.user,
        author: body.author,
        url: body.url,
        likes: body.likes,
        title: body.title
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updateBlogObject, { new: true })
    response.status(200).json(updatedBlog)

})
module.exports = blogRouter