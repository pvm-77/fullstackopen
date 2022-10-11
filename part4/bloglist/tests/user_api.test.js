const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt');
const User = require('../models/user')
let token=''
beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('somepassword', 10)
    const user = new User({
        username: 'sarfaraz297',
        password: passwordHash,
        name: 'Sarfaraz Hussain'
    })
    await user.save()

  
   
})
describe('when there is initially one user in DB', () => {
    test('creation succeeds with a fresh username', async () => {
        const userAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Mohib',
            name: 'mohib297',
            password: 'somepassword'
        }
        // api call now 
        api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(userAtStart.length + 1)
        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)

    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'sarfaraz297',
            name: 'Sarfaraz Hussain',
            password: 'somepassword',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

});
