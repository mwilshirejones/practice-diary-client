const BASE_URL = Cypress.config().baseUrl

describe('Diary: Welcome', () => {
  beforeEach(() => {
    cy.visit(BASE_URL + '/diary')
  })

  it('displays the welcome message', () => {
    cy.get('h1').should('have.text', 'My practice diary')
  })

  it('opens an objective when selected from the nav', () => {
    cy.get('nav').contains('Objective 1').invoke('attr', 'href').then(href => {
      cy.get('nav').contains('Objective 1').click()

      // Is this URL check superfluous?
      // If so, remove other instances too.
      cy.url().should('eq', BASE_URL + href)

      cy.get('h1').should('have.text', 'Objective 1')
    })
  })

  it('opens the new objective form when selected from the nav', () => {
    cy.get('nav').contains('Create a new objective').invoke('attr', 'href').then(href => {
      cy.get('nav').contains('Create a new objective').click()

      cy.url().should('eq', BASE_URL + href)

      cy.get('h1').should('have.text', 'Create a new objective')
    })
  })
})
