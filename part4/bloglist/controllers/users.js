const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

const isLength = (field) => {
    if (field.length >= 3) {
        return true
    } else {
        return false
    }
}
userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    const userAlreadyExist = await User.findOne({ username })
    if (userAlreadyExist) return response.status(400).json({
        error: 'username must be unique'
    })
    if (!isLength(username)) return response.status(400).json({
        error: 'username contains atleast 3 characters'
    })
    if (!isLength(password)) return response.status(400).json({
        error: 'password contains atleast 3 characters'
    })

    const passwordHash = await bcrypt.hash(password, 12)
    const user = new User({
        username, name, password: passwordHash
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})
userRouter.get('/', async (request, response) => {
    const allUsers = await User.find({}).populate('blogs',{
        url:1,title:1,author:1,id:1
    })
    response.status(200).json(allUsers)
})


module.exports = userRouter