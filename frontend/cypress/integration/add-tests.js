describe('Test: Add User and Doors', function() {
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

      it('Add user', function() {

        cy.get('[data-cy=linkToUsers]').click()

        cy.get('[data-cy=addNewUserbtn]').click()

        cy.get('[data-cy=username]').type('bernd')
        cy.get('[data-cy=addNewUserBtn]').click()

        cy.url().should('include','/doors')

    })

      it('Add door', function() {

        cy.get('[data-cy=linkToDoors]').click()

        cy.get('[data-cy=addNewDoorbtn]').click()

        cy.get('[data-cy=doornameInput]').type('Wohnzimmer')
        cy.get('[data-cy=ipInput]').type('1.1.0.0')
        cy.get('[data-cy=download]').click()

        cy.url().should('include','/doors')

    })

    })
      
      
    