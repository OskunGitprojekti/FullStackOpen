import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewPost from "./NewPost.jsx";

const user = {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjY2ZjgxY2EyOGI2Y2ExNTA4Y2ExNTFjNyIsImlhdCI6MTcyNzU0NjI0N30.qQeRTHotVMbTFbp2ujED97qNOV5ZzUx531VI1Q53IXg",
    "username": "test",
    "name": "test"
}

test('ensure method gets called on new post', async () => {
    const testUser = userEvent.setup()
    const mockMethodWhyMakeMeDoThis = vi.fn()
    const setNotificationMessage = vi.fn()
    const setNotificationIsError = vi.fn()
    const setBlogs = vi.fn()
    const {container} = render(<NewPost user={user} setNotificationMessage={setNotificationMessage}
                                        setNotificationIsError={setNotificationIsError} setBlogs={setBlogs}
                                        mockMethodWhyMakeMeDoThis={mockMethodWhyMakeMeDoThis}/>)
    await testUser.click(container.querySelector('#newPostEditable'))
    await testUser.type(container.querySelector('#newTitle'), 'test title')
    await testUser.type(container.querySelector('#newAuthor'), 'test author')
    await testUser.type(container.querySelector('#newUrl'), 'test.url')
    await testUser.click(container.querySelector('#submitNewPost'))
    expect(mockMethodWhyMakeMeDoThis.mock.calls).containSubset([[user.token, {
        "title": 'test title',
        "author": 'test author',
        "url": 'test.url'
    }]])
})