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
})
