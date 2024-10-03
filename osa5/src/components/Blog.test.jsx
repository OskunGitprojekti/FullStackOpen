import {render} from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const blogs = [
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

const user = {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjY2ZjgxY2EyOGI2Y2ExNTA4Y2ExNTFjNyIsImlhdCI6MTcyNzU0NjI0N30.qQeRTHotVMbTFbp2ujED97qNOV5ZzUx531VI1Q53IXg",
    "username": "test",
    "name": "test"
}

const blog = blogs[0]

const setBlogs = vi.fn()

test('renders content', () => {


    const {container} = render(<Blog key={blog.id} blog={blog} user={user} blogs={blogs} setBlogs={setBlogs}/>)

    let element = container.querySelector('#title')
    expect(element).toBeDefined()
    element = container.querySelector('#author')
    expect(element).toBeDefined()
    element = container.querySelector('#url')
    expect(element).toBeNull()
    element = container.querySelector('#likes')
    expect(element).toBeNull()
})

test('renders content when detailed view', async () => {

    const user = userEvent.setup()
    const {container} = render(<Blog key={blog.id} blog={blog} user={user} blogs={blogs} setBlogs={setBlogs}/>)
    await user.click(container.querySelector('#showDetailsButton'))

    let element = container.querySelector('#title')
    expect(element).toBeDefined()
    element = container.querySelector('#author')
    expect(element).toBeDefined()
    element = container.querySelector('#url')
    expect(element).toBeDefined()
    element = container.querySelector('#likes')
    expect(element).toBeDefined()
})

test('ensure add like gets called', async () => {
    const user = userEvent.setup()
    const mockMethodWhyMakeMeDoThis = vi.fn()
    const {container} = render(<Blog key={blog.id} blog={blog} user={user} blogs={blogs} setBlogs={setBlogs} mockMethodWhyMakeMeDoThis={mockMethodWhyMakeMeDoThis}/>)
    await user.click(container.querySelector('#showDetailsButton'))
    await user.click(container.querySelector('#addLikeButton'))
    await user.click(container.querySelector('#addLikeButton'))
    expect(mockMethodWhyMakeMeDoThis.mock.calls).toHaveLength(2)
})