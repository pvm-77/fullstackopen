const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
beforeEach(async () => {
    await Blog.deleteMany({})

    await Blog.insertMany(helper.initialBlogs)
})

describe('when there is some blogs saved initially', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 10000
    )
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    }, 10000)

    test('a specific blog within the returned bloglist', async () => {
        const response = await api.get('/api/blogs')
        const authors = response.body.map(blog => blog.author)
        expect(authors).toContain('Robert C. Martin')

    }, 10000)

})
describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
        const blogAtStart = await helper.blogsInDb()
        const blogToView = blogAtStart[0]
        const resultBlog = await api.get(`/api/blogs/${blogToView.id}`).expect(200).expect('Content-Type', /application\/json/)
        const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
        expect(resultBlog.body).toEqual(processedBlogToView)

    })

    test('fails with status code 404 if blog does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        console.log(validNonexistingId)

        await api
            .get(`/api/blogs/${validNonexistingId}`)
            .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)

    })
})




describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const result = api.post('/api/login').send({ username: 'sarfaraz297', password: 'somepassword' })
        // console.log(result);
        const token = (await result).body.token
        console.log('token is ', token);

        const blogsAtStart = await helper.blogsInDb()
        const blogTodelete = blogsAtStart[0]
        console.log('blog id to delete', blogTodelete.id)
        // call api
        await api
            .delete(`/api/blogs/${blogTodelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)
        // check length
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
        // check jo author delete hua vo list me to nahi a raha 
        const authors = blogsAtEnd.map(blog => blog.author)
        expect(authors).not.toContain(blogTodelete.author)

    })

})


describe('addition of a new blog', () => {
    test('succeed with valid data', async () => {
        const result = api.post('/api/login').send({ username: 'sarfaraz297', password: 'somepassword' })
        // console.log(result);
        const token = (await result).body.token
        console.log('token is ', token);

        // blog information to send to server
        const blogObject = {
            title: "some random thoughts",
            author: "zmq",
            url: "http://www.u.arizona.edu/~rubinson/frzilink.html",
            likes: 18,
        }
        // send data to server
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blogObject)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        const authors = blogsAtEnd.map(blog => blog.author)
        expect(authors).toContain('zmq')
    })

    test('fails with status code 400 if data invalid', async () => {
        const result = api.post('/api/login').send({ username: 'sarfaraz297', password: 'somepassword' })
        // console.log(result);
        const token = (await result).body.token
        console.log('token is ', token);
        const newObject = {
            author: 'fake author', likes: 3
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newObject)
            .expect(400)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    })
    test(' blog fails with the proper status code 401 Unauthorized if a token is not provided.', async () => {
        // blog information to send to server
        const blogObject = {
            title: "some random thoughts",
            author: "sample",
            url: "http://www.u.arizona.edu/~rubinson/frzilink.html",
            likes: 18,
        }
        // send data to server
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer`)
            .send(blogObject)
            .expect(401)

    }, 10000)

})
describe('update of a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        // update blog fields
        blogToUpdate.likes = 9
        const resultBlog = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)
        console.log(resultBlog.body)
    })
})
afterAll(() => {
    mongoose.connection.close()
})

