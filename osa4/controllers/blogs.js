const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

blogsRouter.get('', async (request, response) => {
    Blog.find({}).populate("user").then(blogs => {
        response.json(blogs)
    })
})

blogsRouter.get('/:id', async (request, response) => {
    let err, result = await Blog.findById(request.params.id).populate("user")
    result ? response.status(200).json(result) : response.status(404).send()
})

blogsRouter.put('/:id', async (request, response) => {
    const result = await Blog.updateOne({"_id": request.params.id}, {
        "title": request.body.title,
        "author": request.body.author,
        "url": request.body.url,
        "likes": request.body.likes
    })
    response.status(200).json(result)
})

blogsRouter.post('', async (request, response) => {
    const user = await User.findById(request.user)
    const blog = new Blog({...request.body, user: user})
    const result = await blog.save()
    user.blogs = user.blogs.concat(blog.id)
    await user.save()
    response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate("user")
    if (!blog) {
        response.status(404).send("Blog post not found")
    }
    if (blog.user.id !== request.user.id) {
        response.status(403).send("Users may only delete their own posts")
    }
    const result = await blog.deleteOne()
    response.status(200).send(result)
})

module.exports = blogsRouter