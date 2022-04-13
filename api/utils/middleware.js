const { response } = require('express')
const path = require('path')
const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method)
    logger.info('Path:', req.path)
    logger.info('Body:', req.body)
    logger.info('--------------------------------')
    next()
}

const unknownEndpoint = (req, res) => {
    res.sendFile('build/index.html', { root: './' })
}

const errorHandler = (err, req, resp, next) => {
    if (err.name === 'CastError') {
        return resp.status(400).send({ error: 'malformatted id' })
    } else if (err.name === 'ValidationError') {
        return resp.status(400).json({ error: err.message })
    } else if (err.name === 'JsonWebTokenError') {
        return resp.status(401).json({ error: 'missing token' })
    }

    next(err)
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    }  
    
    next()
}

const userExtractor = async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!decodedToken.id) {
        return res.status(401).json({ error: 'invalid token' })
    }

    req.user = await User.findById(decodedToken.id)

    next()
}

module.exports = { requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor }