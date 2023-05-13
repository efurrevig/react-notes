describe('Note app', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
        cy.contains('Notes')
        cy.contains('MongoDB is pretty easy to use')
    })

    it('login form can be opened', function() {
        cy.contains('login').click()
    })

    it('user can login', function() {
        cy.contains('login').click()
        cy.get('#username').type('root2')
        cy.get('#password').type('test123')
        cy.get('#login-button').click()

        cy.contains('logged in as root')
    })
})