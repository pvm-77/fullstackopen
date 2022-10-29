const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const isUserAlreadyExist = await User.findOne({ username })
    console.log('username',username);
    console.log('existing user info', isUserAlreadyExist)
    const isPasswordCorrect = isUserAlreadyExist === null ? false : await bcrypt.compare(password, isUserAlreadyExist.password)
    if (!(isUserAlreadyExist && isPasswordCorrect)) {
        return response.status(401).json({ error: 'username or password invalid' })

    }
    // generate a token from backend[here] 
    // user info for token
    const userForToken = {
        username: isUserAlreadyExist.username,
        id: isUserAlreadyExist._id
    }
    const token = jwt.sign(userForToken, config.SECRET)
    response.status(200).json({
        token,
        username: isUserAlreadyExist.username,
        name: isUserAlreadyExist.name

    })
})



module.exports = loginRouter
