describe('checkout and calculation', () => {
  beforeEach(() => {
    cy.login(Cypress.env('username'), Cypress.env('password'));
  });
const cartbutton = '[data-test="cart-link"]'
  it('add item to checkout list', () => {
    const phones = ['Apple iPhone 14', 'Samsung Galaxy S23', 'HTC Touch HD', 'Budget Phone'];
    let totalSum = 0;

    // Extract prices before adding to cart
    phones.forEach((phone, index) => {
      cy.get(`[data-test="product-card-phone-${index + 1}"] > :nth-child(5)`).invoke('text').then((price) => {
        const priceValue = parseFloat(price.replace('$', ''));
        totalSum += priceValue;
      });
    });

    // Select category and add items to cart using custom command// the selctor should be without the double quotes sequer brackets as it is added in custom command
    cy.selectCategoryAndAddItemsToCart('Phones', 'data-test="add-to-cart-phone-', 4);

    // Go to cart and compare total price
    cy.get(cartbutton).click();
    cy.get('.cart-item').should('have.length', 4).each((el, index) => {
      cy.wrap(el).should('contain.text', phones[index]);
    }).then(() => {
      cy.get('#total').invoke('text').then((total) => {
        const totalValue = parseFloat(total.replace('Total: $', ''));
        expect(totalValue).to.equal(totalSum);
      });
    });
  });
  it.only('user should be able to checkout', () => {
    cy.selectCategoryAndAddItemsToCart('Phones', 'data-test="add-to-cart-phone-', 1);
    cy.get(cartbutton).click();
    // filing out the checkout form and checkouting
    cy.get('#fullName').type('John Doe');
    cy.get('#address').type('123 Main Street, New York, NY 10001');
    cy.get('#cardHolder').type('John Doe');
    cy.get('#cardNumber').type('1234567890123456');
    cy.get('#expiryDate').type('12/2025');
    cy.get('#cvv').type('123');
    const pymentType = '[type="radio"]'
    cy.get(pymentType).check('paypal').should('be.checked');
    
    cy.get('[data-test="checkout-button"]').click();
    cy.get('.alert').should('contain.text', 'Thank you for your purchase!');

  })
})