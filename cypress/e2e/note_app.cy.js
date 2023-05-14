describe('Note app', function() {
    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        const user = {
            name: 'Super',
            username: 'root',
            password: 'test123'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.visit('')
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

    it('login fails with wrong password', function() {
        cy.contains('login').click()
        cy.get('#username').type('root')
        cy.get('#password').type('test1235')
        cy.get('#login-button').click()

        cy.get('.error')
            .should('contain', 'Wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')

        cy.contains('logged in as root').should('not.exist')
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'root', password: 'test123' })
        })

        it('a new note can be created', function() {
            cy.contains('new note').click()
            cy.get('#new-note-input').type('a new note created by cypress')
            cy.get('#new-note-button').click()
            cy.contains('a new note created by cypress')
        })

        describe('and several notes exist', function() {
            beforeEach(function() {
                cy.createNote({ content: 'first note', important: false })
                cy.createNote({ content: 'second note', important: false })
                cy.createNote({ content: 'third note', important: false })
            })

            it('one of those can be made important', function() {
                cy.contains('second note').parent().find('button').as('theButton')
                cy.get('@theButton').click()
                cy.get('@theButton').should('contain', 'make important')
            })
        })
    })
})