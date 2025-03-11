describe('user should be able to register and login', () => {
  const username = 'khan12'
  const password = 'password123'
  const email = 'janeDoe@practice.com';

  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'));
  //   cy.get('#username').type('khan');
  //   cy.get('#password').type('password123');
  //   cy.get('button[data-test="login-button"]').click();
  });

  it('should register a new user', () => {
    cy.get('[href="#account"]').click();
    cy.get('a[href="#register"]').click({ force: true });
    cy.get('[data-test="reg-username-input"]').type(username);
    cy.get('#regEmail').type(email);
    cy.get('#regPassword').type(password);
    cy.get('#regConfirmPassword').type(password);
    cy.get('button[data-test="register-button"]').click();
    cy.get('#register-message').should('contain.text', 'Registration successful! Welcome, ' + username + '.');
  });

  it('should be able to login', () => {
    cy.get('[href="#account"]').click();
    cy.get("a[href='#login']").click({ force: true });
    cy.get('#username').type('khan');
    cy.get('#password').type('password123');
    cy.get('button[data-test="login-button"]').click();
    cy.contains('Welcome to the Test Automation Website, khan!').should('contain', 'Welcome to the Test Automation Website, khan!');
  });

 

  // it('validating user data in mongodb', () => {
  //   cy.task('mongofind', { dbName: 'test', collection: 'users', query: { username: username } }).then((user) => {
  //     expect(user[0].username).to.eq(username);
  //   });
  // });

  // it('insert user data into mongodb', () => {
  //   cy.task('mongoInsert', { dbName: 'test', collection: 'users', doc: { username: username, email: email, password: password } });
  //   cy.task('mongofind', { dbName: 'test', collection: 'users', query: { username: username } }).then((user) => {
  //     expect(user[0].username).to.eq(username);
  //   });
  // });

  // it('should delete user data from mongodb', () => {
  //   cy.task('mongoDelete', { dbName: 'test', collection: 'users', filter: { username: username } });
  // });
});