const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const middleware = require('../utils/middleware')

// update a blog post 

blogRouter.put('/:id',middleware.userExtractor, async (request, response) => {
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
blogRouter.post('/',middleware.userExtractor, async (request, response) => {
    const body = request.body
    
    try {

        // extract token from request object 
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
        // const user = await User.findById(decodedToken.id)
        const user = request.user
        const blog = new Blog({
            title: body.title,
            author: body.author,
            likes: body.likes,
            url: body.url,
            user: user.id
        })

        const savedBlog = await blog.save()
        console.log(savedBlog);

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    } catch (error) {
        response.status(500).json({ error })
    }

})

//------------------TODO: delete a blog only by who created it -------------
blogRouter.delete('/:id',middleware.userExtractor, async (request, response) => {

    try {

        const decodedToken = jwt.verify(request.token, config.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = request.user
        const userid = user._id
        // blog from db which is tobe deleted
        const blog = await Blog.findById(request.params.id)
        // compare user userid  from user and blog variables
        if (!(blog.user.toString() === userid.toString())) {
            return response.status(401).json({ error: 'you cant delete' })
        }
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (error) {
        response.status(500).json({ error })
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


module.exports = blogRouter