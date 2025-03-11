// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('uncoughtErrors', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      // Ignore errors related to 'process is not defined'
      if (err.message.includes('process is not defined')) {
        return false
      }
      // Allow other errors to fail the test
      return true
    })
  }
)

// cypress/support/commands.js
Cypress.Commands.add('login', (username, password) => {
  cy.visit(Cypress.env('baseUrl'));
  cy.get('[href="#account"]').click();
  cy.get("a[href='#login']").click({ force: true });
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('#loginForm').find('button').click();
});