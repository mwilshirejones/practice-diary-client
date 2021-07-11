describe('Login', () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl)
  })

  it('links to the user\'s diary', () => {
    cy.contains('your diary').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/diary')
    cy.get('h1').should('have.text', 'My practice diary')
  })
})
