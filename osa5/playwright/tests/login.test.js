const {test, expect, beforeEach, describe} = require('@playwright/test')
const {waitFor} = require("@testing-library/react");

describe('Blog app', () => {
    beforeEach(async ({page, request}) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Test Tester',
                username: 'test',
                password: 'test'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({page}) => {
        await expect(page.getByTestId('loginForm')).toBeDefined();
    })

    describe('Login', () => {
        test('fails with wrong credentials', async ({page}) => {
            await page.getByTestId('loginUsername').fill("tresat");
            await page.getByTestId('loginPassword').fill("eta3wer");
            await page.getByTestId('loginSubmit').click();
            await expect(page.getByText("wrong username or password")).toBeVisible();
        })

        test('succeeds with correct credentials', async ({page}) => {
            await page.getByTestId('loginUsername').fill("test");
            await page.getByTestId('loginPassword').fill("test");
            await page.getByTestId('loginSubmit').click();
            await expect(page.getByText("logged in")).toBeVisible();
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({page, request}) => {
            await request.post('http://localhost:3003/api/testing/reset')
            await request.post('http://localhost:3003/api/users', {
                data: {
                    name: 'Test Tester',
                    username: 'test',
                    password: 'test'
                }
            })
            await page.getByTestId('loginUsername').fill("test");
            await page.getByTestId('loginPassword').fill("test");
            await page.getByTestId('loginSubmit').click();
            await page.getByTestId('newPostEditable').click();
        })

        test('a new blog can be created', async ({page}) => {
            await page.getByTestId('newTitle').fill("test title");
            await page.getByTestId('newAuthor').fill("test author");
            await page.getByTestId('newUrl').fill("test.url");
            await page.getByTestId('submitNewPost').click();
            await expect(page.getByText('test title', {exact: true}).first()).toBeVisible();
        })

    })

    describe('When a post is created', () => {
        beforeEach(async ({page, request}) => {
            await request.post('http://localhost:3003/api/testing/reset')
            await request.post('http://localhost:3003/api/users', {
                data: {
                    name: 'Test Tester',
                    username: 'test',
                    password: 'test'
                }
            })
            await page.getByTestId('loginUsername').fill("test");
            await page.getByTestId('loginPassword').fill("test");
            await page.getByTestId('loginSubmit').click();
            await page.getByTestId('newPostEditable').click();
            await page.getByTestId('newTitle').fill("test title");
            await page.getByTestId('newAuthor').fill("test author");
            await page.getByTestId('newUrl').fill("test.url");
            await page.getByTestId('submitNewPost').click();
        })

        test('like a post', async ({page}) => {
            await page.getByTestId('showDetailsButton').first().click();
            await page.getByTestId('addLikeButton').click();
        })

        test('delete a post', async ({page}) => {
            await page.getByTestId('showDetailsButton').first().click();
            await page.getByTestId('removePostButton').click();
        })
    })

    describe('When a post is created', () => {
        beforeEach(async ({page, request}) => {
            await request.post('http://localhost:3003/api/testing/reset')
            await request.post('http://localhost:3003/api/users', {
                data: {
                    name: 'Test Tester',
                    username: 'test',
                    password: 'test'
                }
            })
            await page.getByTestId('loginUsername').fill("test");
            await page.getByTestId('loginPassword').fill("test");
            await page.getByTestId('loginSubmit').click();
            await page.getByTestId('newPostEditable').click();
            await page.getByTestId('newTitle').fill("test title");
            await page.getByTestId('newAuthor').fill("test author");
            await page.getByTestId('newUrl').fill("test.url");
            await page.getByTestId('submitNewPost').click();
            await (await page.getByTestId('showDetailsButton').all()).forEach((l) => l.click());
        })

        test('posts are sorted by likes', async ({page}) => {
            expect(Number(await page.getByTestId('blogElement').first().getAttribute("data-likes"))).toBeLessThanOrEqual(Number(await page.getByTestId('blogElement').last().getAttribute("data-likes")))
        })
    })

})