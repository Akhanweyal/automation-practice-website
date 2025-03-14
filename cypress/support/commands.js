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

Cypress.Commands.add('selectCategoryAndAddItemsToCart', (categoryName, itemSelector, itemCount) => {
  cy.contains('a', categoryName).realHover();
  cy.realPress('ArrowDown');
  cy.realPress('Enter');
  cy.wait(3000);
  cy.get('.dropdown-content').should('exist').find('a').then((el) => {
    cy.wrap(el).contains(categoryName).click({ force: true }); // Use { force: true } to force the click action

    // Add items to cart
    for (let i = 1; i <= itemCount; i++) {
      cy.get(`[${itemSelector}${i}"]`).scrollIntoView().click({ force: true });
    }
  });
});