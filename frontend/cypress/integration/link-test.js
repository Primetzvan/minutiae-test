describe('Test: Switch to other page', function() {
    beforeEach(() => {
        cy.visit('http://localhost:3001/')

        cy.get('[data-cy=username]').type('admin')
        cy.get('[data-cy=password]').type('admin')
        cy.get('[data-cy=login]').click()
      })

      afterEach(() => {
        cy.get('[data-cy=nav]').click()
        cy.get('[data-cy=logout]').click()
      })

    it('Switch to doors true', function() {

        cy.get('[data-cy=linkToDoors]').click()

        cy.url().should('include','/doors')

    })

    it('Switch back from doors true', function() {

        cy.get('[data-cy=linkToDoors]').click()

        cy.get('[data-cy=backFromDoors]').click()

        cy.url().should('include','/management')

    })

    it('Switch to users true', function() {

        cy.get('[data-cy=linkToUsers]').click()

        cy.url().should('include','/users')

    })

    it('Switch back from users true', function() {

        cy.get('[data-cy=linkToUsers]').click()

        cy.get('[data-cy=backFromUsers]').click()

        cy.url().should('include','/management')

    })

    it('Switch to user detail true', function() {

        cy.get('[data-cy=linkToUsers]').click()

        cy.get('[data-cy=userDetail]').click()

        cy.get('[data-cy=backFromDetail]').click()

        cy.url().should('include','/users')

    })

    it('Switch back from profile true', function() {

        cy.wait(3000)

        cy.get('[data-cy=nav]').click()

        cy.get('[data-cy=profile]').click()

        cy.url().should('include','/profile')

    })

    it('Switch to logs true', function() {

        cy.wait(3000)

        cy.get('[data-cy=nav]').click()

        cy.get('[data-cy=logs]').click()

        cy.url().should('include','/logs')

    })

    it('Switch to profile true', function() {

        cy.wait(3000)

        cy.get('[data-cy=nav]').click()

        cy.get('[data-cy=profile]').click()

        cy.url().should('include','/profile')

    })

})