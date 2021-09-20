describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'jooj',
            username: 'jooj',
            password: 'jooj',
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('when login button is clicked, the form is shown', function () {
        cy.contains('login').click()
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('jooj')
            cy.get('#password').type('jooj')
            cy.get('#login-button').click()
            cy.contains('jooj logged in')
        })

        it('fails with wrong credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('testuser')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
            cy.contains('Wrong name or password')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.contains('login').click()
            cy.get('#username').type('jooj')
            cy.get('#password').type('jooj')
            cy.get('#login-button').click()
        })

        it('A blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('test blog')
            cy.get('#author').type('test author')
            cy.get('#url').type('test url')
            cy.get('#create-button').click()
            cy.contains('test blog')
        })

        it('A blog can be liked', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('test blog')
            cy.get('#author').type('test author')
            cy.get('#url').type('test url')
            cy.get('#create-button').click()
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('1')
        })

        it('A blog can be deleted only by the user that created', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('test blog')
            cy.get('#author').type('test author')
            cy.get('#url').type('test url')
            cy.get('#create-button').click()
            cy.contains('view').click()
            cy.contains('delete').click()
            cy.contains('test blog').should('not.exist')
        })

        it('checks that the blogs are ordered according to likes', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('test blog')
            cy.get('#author').type('test author')
            cy.get('#url').type('test url')
            cy.get('#create-button').click()
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('new blog').click()
            cy.get('#title').type('test blog 2')
            cy.get('#author').type('test author 2')
            cy.get('#url').type('test url 2')
            cy.get('#create-button').click()
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('new blog').click()
            cy.get('#title').type('test blog 3')
            cy.get('#author').type('test author 3')
            cy.get('#url').type('test url 3')
            cy.get('#create-button').click()
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('new blog').click()
            cy.get('#title').type('test blog 4')
            cy.get('#author').type('test author 4')
            cy.get('#url').type('test url 4')
            cy.get('#create-button').click()
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('new blog').click()
        })
    })
})
