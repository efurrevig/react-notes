describe('Note app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Super',
            username: 'root',
            password: 'test123'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
        cy.contains('Notes')
    })

    it('login form can be opened', function() {
        cy.contains('login').click()
    })

    it('user can login', function() {
        cy.contains('login').click()
        cy.get('#username').type('root')
        cy.get('#password').type('test123')
        cy.get('#login-button').click()

        cy.contains('logged in as root')
    })

    it.only('login fails with wrong password', function() {
        cy.contains('login').click()
        cy.get('#username').type('root')
        cy.get('#password').type('test1235')
        cy.get('#login-button').click()

        cy.get('.error').contains('Wrong credentials')
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.contains('login').click()
            cy.get('#username').type('root')
            cy.get('#password').type('test123')
            cy.get('#login-button').click()
        })

        it('a new note can be created', function() {
            cy.contains('new note').click()
            cy.get('#new-note-input').type('a new note created by cypress')
            cy.get('#new-note-button').click()
            cy.contains('a new note created by cypress')
        })

        describe('and a note exists', function() {
            beforeEach(function() {
                cy.contains('new note').click()
                cy.get('#new-note-input').type('a new note created by cypress')
                cy.get('#new-note-button').click()
            })

            it('can be made not important', function() {
                cy.contains('a new note created by cypress')
                    .contains('make not important')
                    .click()
                cy.contains('a new note created by cypress')
                    .contains('make important')
            })
        })
    })
})