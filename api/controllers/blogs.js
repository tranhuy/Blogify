const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
//const { response } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')

//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//         return authorization.substring(7)
//     }

//     return null
// }

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    res.json(blogs)
    
    // Blog.find({}).then(blogs => {
    //     res.json(blogs)
    // })
})

blogsRouter.get('/:id', async (req, res, next) => {
    const blog = await Blog.findById(req.params.id)

    if (blog) {
        res.json(blog)
    } else {
        res.status(404).end()
    }

    // Blog.findById(req.params.id)
    //     .then(blog => {
    //         if (blog) {
    //             res.json(blog)
    //         } else {
    //             res.status(404).end()
    //         }
    //     })
    //     .catch(err => next(err))
})

blogsRouter.post('/', middleware.userExtractor, async (req, res, next) => {
    //const token = getTokenFrom(req)
    //const decodedToken = jwt.verify(req.token, process.env.SECRET)

    // if (!decodedToken.id) {
    //     return res.status(401).json({ error: 'token is missing or invalid' })
    // }

    let newBlog = new Blog(req.body)
    //let user = await User.findOne({ username: 'tranhuy' }).exec()
    //let user = await User.findById(decodedToken.id)
    let user = req.user
    newBlog.user = user

    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)

    // newBlog.save()
    //     .then(savedBlog => {
    //         res.status(201).json(savedBlog)
    //     })
    //     .catch(err => next(err))
})

blogsRouter.post('/:id/comments', async (req, res, next) => {
    const comment = req.body.comments
    
    if (!comment) {
        return res.status(400).json({ error: 'comments missing' })
    }

    const blog = await Blog.findById(req.params.id)
    blog.comments = blog.comments.concat(comment)
    const savedBlog = await blog.save()

    res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res, next) => {
    //const decodedToken = jwt.verify(req.token, process.env.SECRET)
    const blogToDelete = await Blog.findById(req.params.id)
    const blogOwnerId = await blogToDelete.user.toString()

    // if (!decodedToken.id) {
    //     return res.status(401).json({ error: 'token is missing or invalid' })
    // }

    // if (blogOwnerId !== decodedToken.id) {
    //     return res.status(403).json({ error: 'user with provided token does not have permission to delete blog' })
    // }   

    let user = req.user
    user.blogs = user.blogs.filter(blog => blog != blogToDelete.id)

    if (blogOwnerId !== user.id) {
        return res.status(403).json({ error: 'user with provided token does not have permission to delete blog' })
    }
 
    const deletedBlog = await Blog.findByIdAndRemove(req.params.id)

    if (deletedBlog) {
        await user.save()  //update blogs array in users table
        res.status(204).end()
    } else {
        res.status(404).send('Blog not found')
    }
})

blogsRouter.put('/:id', async (req, res, next) => {
    const {title, author, url, likes } = req.body

    let blog = {
        title: title,
        author: author,
        url: url,
        likes: likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true, runValidators: true, context: 'query' })

    if (updatedBlog) {
        res.json(updatedBlog)
    } else {
        res.status(404).send('Contact not found')
    }    
})

module.exports = blogsRouter