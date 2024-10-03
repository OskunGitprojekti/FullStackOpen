describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', {
            name: 'Test Tester',
            username: 'test',
            password: 'test'
        })
        cy.visit('http://localhost:5173')
    })

    it('Login form is shown', function () {
        cy.get('#loginSubmit').should('exist')
    })

    describe('Login',function() {
        it('fails with wrong credentials', function() {
            cy.get("#loginUsername").type("teasdasdt")
            cy.get("#loginPassword").type("tesasdasdt")
            cy.get("#loginSubmit").click()
            cy.contains("wrong username or password")
        })

        it('succeeds with correct credentials', function() {
            cy.get("#loginUsername").type("test")
            cy.get("#loginPassword").type("test")
            cy.get("#loginSubmit").click()
            cy.contains("Test Tester logged in")
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.get("#loginUsername").type("test")
            cy.get("#loginPassword").type("test")
            cy.get("#loginSubmit").click()
        })

        it('A blog can be created', function() {
            cy.get('#newPostEditable').click();
            cy.get('#newTitle').type("test title");
            cy.get('#newAuthor').type("test author");
            cy.get('#newUrl').type("test.url");
            cy.get('#submitNewPost').click();
            cy.contains('a new blog test title by test author added');
        })

        describe('When a post is created', function(){
            beforeEach(function(){
                cy.request('POST', 'http://localhost:3003/api/users', {
                    name: 'Anti Tester',
                    username: 'antitest',
                    password: 'antitest'
                })
                cy.get('#newPostEditable').click();
                cy.get('#newTitle').type("test title");
                cy.get('#newAuthor').type("test author");
                cy.get('#newUrl').type("test.url");
                cy.get('#submitNewPost').click();
            })

            it('A blog can be liked', function() {
                cy.get('#showDetailsButton').click();
                cy.get('#addLikeButton').click();
            })

            it('A blog can be deleted', function() {
                cy.get('#showDetailsButton').click();
                cy.get('#removePostButton').click();
            })

            it('A blog cannot be deleted by another user', function(){
                cy.get('#logout').click();
                cy.get("#loginUsername").type("antitest");
                cy.get("#loginPassword").type("antitest");
                cy.get("#loginSubmit").click();
                cy.get('#showDetailsButton').click();
                cy.get('#removePostButton').should('not.exist');
            })

            it('The blog with most likes is sorted to the top', function() {
                cy.get('#newPostEditable').click();
                cy.get('#newTitle').type("liked test title");
                cy.get('#newAuthor').type("liked test title");
                cy.get('#newUrl').type("liked.test.url");
                cy.get('#submitNewPost').click();

                cy.get("#postContainer").find(".showDetailsButton").first().click();
                cy.get("#postContainer #addLikeButton").first().click();
                cy.get("#postContainer #addLikeButton").first().click();
                cy.get("#postContainer").find(".showDetailsButton").first().click();
                cy.get("#postContainer div").first().find("span").first().contains("test title")

                cy.get("#postContainer").find(".showDetailsButton").last().click();
                cy.get("#postContainer #addLikeButton").last().click();
                cy.get("#postContainer #addLikeButton").last().click();
                cy.get("#postContainer #addLikeButton").last().click();
                cy.get("#postContainer").find(".showDetailsButton").first().click();
                cy.get("#postContainer div").first().find("span").first().contains("liked test title")

            })
        })
    })
})