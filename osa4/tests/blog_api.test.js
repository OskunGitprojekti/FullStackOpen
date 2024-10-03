const {test, after, before} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert');
const Blog = require('../models/blog')

const api = supertest(app)

const getTestUserToken = (async () => {
    const username = crypto.randomUUID()
    const password = Math.random().toString(36).slice(-8)
    const user = await api.post('/api/users').send({
        "username": username,
        "password": password,
        "name": "Test Tester"
    })
    const login = await api.post('/api/login').send({
        "username": username,
        "password": password
    })
    return "Bearer " + login.body.token
})

let token

before(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(
        [
            {
                _id: "5a422a851b54a676234d17f7",
                title: "React patterns",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 7,
                __v: 0
            },
            {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 5,
                __v: 0
            },
            {
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12,
                __v: 0
            },
            {
                _id: "5a422b891b54a676234d17fa",
                title: "First class tests",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
                likes: 10,
                __v: 0
            },
            {
                _id: "5a422ba71b54a676234d17fb",
                title: "TDD harms architecture",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                likes: 0,
                __v: 0
            },
            {
                _id: "5a422bc61b54a676234d17fc",
                title: "Type wars",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                likes: 2,
                __v: 0
            }
        ]
    )
    token = await getTestUserToken()
})

test('correct amount of blogs is returned', async () => {
    await api
        .get('/api/blogs')
        .set('Authorization', token)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
            assert(res.body.length == 6)
        })
})

test('id field of json is id', async () => {
    await api
        .get('/api/blogs')
        .set('Authorization', token)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
            assert(res.body[0].hasOwnProperty("id"))
        })
})

test('insert blog', async () => {
    await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send({
            "title": "The Ticklish Subject",
            "author": "Slavoj Zizek",
            "url": "https://miro.medium.com/v2/resize:fit:1200/1*gUtP0H_A4x0Q-ZlmTykg4g@2x.jpeg",
            "likes": 0
        })
        .expect(201)
})

test('set default to likes', async () => {
    await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send({
            "title": "The Philosophy of Zen Buddhism",
            "author": "Byung-Chul Han",
            "url": "https://i.imgur.com/aVvNAT6.jpeg",
        })
        .expect(201)
        .expect((res) => {
            assert(res.body.likes == 0)
        })
})

test('title is required', async () => {
    await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send({
            "author": "Byung-Chul Han",
            "url": "https://i.imgur.com/aVvNAT6.jpeg",
        })
        .expect(400)
})

test('url is required', async () => {
    await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send({
            "title": "The Philosophy of Zen Buddhism",
            "author": "Byung-Chul Han",
        })
        .expect(400)
})

test('create and delete blog', async () => {
    const result = await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send({
            "title": "The Philosophy of Zen Buddhism",
            "author": "Byung-Chul Han",
            "url": "https://i.imgur.com/aVvNAT6.jpeg",
        }).expect(201)
    await api.get('/api/blogs/' + result.body.id).set('Authorization', token).expect(200)
    await api.delete('/api/blogs/' + result.body.id).set('Authorization', token).expect(200)
    await api.get('/api/blogs/' + result.body.id).set('Authorization', token).expect(404)
})

test('add a like to blog', async () => {
    const result = await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send({
            "title": "The Philosophy of Zen Buddhism",
            "author": "Byung-Chul Han",
            "url": "https://i.imgur.com/aVvNAT6.jpeg",
        }).expect(201)
    await api.put('/api/blogs/' + result.body.id).set('Authorization', token).send({likes: 1}).expect(200)
    await api.get('/api/blogs/' + result.body.id).set('Authorization', token).expect(200)
        .expect((res) => {
            assert(res.body.likes == 1)
        })
})

after(async () => {
    await mongoose.connection.close()
})

test('cannot create a blog without token', async () => {
    const result = await api
        .post('/api/blogs')
        .send({
            "title": "The Philosophy of Zen Buddhism",
            "author": "Byung-Chul Han",
            "url": "https://i.imgur.com/aVvNAT6.jpeg",
        }).expect(401)
})

after(async () => {
    await mongoose.connection.close()
})