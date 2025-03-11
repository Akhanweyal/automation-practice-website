

describe('checkout and callculation',()=>{
    beforeEach(()=>{
     cy.login( Cypress.env('username'),Cypress.env('password'))
    })
    it('add item to checkout list',()=>{
        cy.get('[data-category="phones"]').click({multiple: true})
      })
})