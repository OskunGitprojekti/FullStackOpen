const next = require('express')
const jwt = require('jsonwebtoken')
const User = require("../models/user");

function errorHandler(error, _req, res, next) {
    if (error.name === 'CastError') {
        return res.status(400).send({error: 'malformed id'})
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({error: error.message})
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({error: error.message})
    }
    return next(error)
}

const authenticateToken = (req, res, next) => {
    let authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        authorization = authorization.replace('Bearer ', '')
    }
    const decodedToken = jwt.verify(authorization, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({error: 'token invalid'})
    } else {
        req.decodedToken = decodedToken
        next()
    }
};

const userExtractor = async (req, res, next) => {
    req.user = await User.findById(req.decodedToken.id)
    next()
};

module.exports = {
    errorHandler,
    authenticateToken,
    userExtractor
}