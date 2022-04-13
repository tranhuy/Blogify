const testingRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

testingRouter.get('/', (req, res) => {
    res.send('Welcome to testing endpoint')
})

testingRouter.post('/reset', async (req, res) => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    res.send('db tables successfully emptied')
})

module.exports = testingRouter