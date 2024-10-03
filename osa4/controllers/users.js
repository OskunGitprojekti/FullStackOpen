const usersRouter = require('express').Router()
const User = require('../models/user')
require('express-async-errors')
const mongoose = require("mongoose");

usersRouter.get('', async (request, response) => {
    const users = await User.find({}).populate("blogs")
    response.json(users)
})

usersRouter.post('', async (request, response) => {
    const user = new User(request.body)
    const usernameCount = await mongoose.models.User.countDocuments({username: user.username});
    if (usernameCount) {
        response.status(201).send("Username already exists")
    }
    const result = await user.save()
    response.status(201).json(result)
})

module.exports = usersRouter