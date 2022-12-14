const logger = require('./logger')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
// import chalk from 'chalk'
const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
const errorHandler = (error, request, response, next) => {

    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).json({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        })
    }

    logger.error(error.message)
    next(error)
}

// token extractor
const tokenExtractor = async (request, response, next) => {
    // extratcts the token here
    const authorization = request.header('Authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        // return authorization.substring(7)
        request.token = authorization.substring(7)
    }
    else {
        request.token = null
    }
    next()

}
const userExtractor = async (request, response, next) => {
    // get token from request object
    // console.log('extarct user toke from req', request.token);
    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    // console.log('user in ext',user);
    if (!user) {
        request.user=null
    }
    request.user=user

    next()


}

module.exports = {
    unknownEndpoint,
    errorHandler,
    requestLogger,
    tokenExtractor,
    userExtractor
}