describe('search and dropdown functionality test', () => {
  beforeEach(() => {
    cy.login(Cypress.env('username'), Cypress.env('password'));
  });

  it('user should be able to select category from dropdown', () => {
    cy.get('#category-filter').find('option').then((options) => {
      const categories = [...options].map(option => option.textContent.trim());
      cy.log(categories.join(', '));
      categories.forEach(category => {
        cy.wrap(options).should('contain.text', category);
      });
      cy.get('#category-filter').select('Phones');
    });
  });

  it('Select form Category dropdown should have 4 options', () => {
    cy.get('[href="#shop"]').eq(1).realHover();
    cy.realPress('ArrowDown');
    cy.realPress('Enter');
    cy.wait(3000);
    cy.get('.dropdown-content').should('exist').find('a').then((el) => {
      const dropdownOptions = [];
      el.each((index, option) => {
        dropdownOptions.push(option.textContent.trim());
      });
      cy.log(dropdownOptions.join(', '));
      expect(dropdownOptions).to.have.length(7);
      expect(dropdownOptions[0]).to.contain('Phones')
      cy.wrap(el[0]).click();
    });
  });
});