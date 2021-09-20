describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('when login button is clicked, the form is shown', function () {
        cy.contains('login').click()
        cy.contains('username')
        cy.contains('password')
    })
})
