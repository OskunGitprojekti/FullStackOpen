const {test, after, before} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')


const api = supertest(app)

test('try to create user with too short password', async () => {
    const result = await api
        .post('/api/users')
        .send({
            "username": "test",
            "password": "tt",
            "name": "test"
        }).expect(400)
})

test('try to create user with too short username', async () => {
    const result = await api
        .post('/api/users')
        .send({
            "username": "st",
            "password": "test",
            "name": "test"
        }).expect(400)
})

after(async () => {
    await mongoose.connection.close()
})