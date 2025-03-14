describe('element validation', () => {
  beforeEach(() => {
    cy.login(Cypress.env('username'), Cypress.env('password'));
  });

  it('there should 6 tabs', () => {
    cy.title().should('eq', 'Test Automation Website');

    const tabs = [
      'Shop by Category',
      'Home',
      'Special',
      'Blog',
      'My Account',
      'Test Scenarios',
    ];

    cy.get('.nav').then((el) => {
      tabs.forEach((tab) => {
        cy.wrap(el).should('contain.text', tab);
      });
    });
  });
  it('user should see search bar', () => {
    cy.get('#category-filter').should('be.visible');
    cy.get('#searchInput').should('be.visible');
    cy.get('#searchButton').should('be.visible');
  })
    it('user should see cart icon', () => {
        cy.get('[href="#cart"]').should('be.visible');
    })
    it('user should see favorite icon', () => {
        cy.get('[href="#favorites"]').should('be.visible');
    })
    it('backButton should be visible', () => {
        cy.get('#backButton').should('be.visible').and('be.enabled');
        
    })
    it('if user click on backButton, user should my account page', () => {
        cy.get('#backButton').click();
        cy.url().should('eq', 'https://test-automation-practice.netlify.app/#login');
        cy.get('.section.active').then((el)=>{
            cy.wrap(el).should('include.text','My Account').and('include.text','Welcome').and('include.text','Logout');

        })
        
    })

});