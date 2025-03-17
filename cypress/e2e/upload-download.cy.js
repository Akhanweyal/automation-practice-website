
describe('upload and download functionality test', () => {
  beforeEach(() => {
    cy.login(Cypress.env('username'), Cypress.env('password'));
  });

  it('user should be able to upload a file and download it as well', () => {
    cy.get('[href="#test-scenarios"]').click();
    const filePath = 'example.json';
    cy.get('#testFileUpload').attachFile(filePath);
    cy.get('[data-test="upload-test-button"]').click();
    cy.contains('File "example.json" uploaded successfully!').should('contain', 'File "example.json" uploaded successfully!');

    const downloadsFolder = Cypress.config('downloadsFolder');
    const downloadedFilePath = `${downloadsFolder}/example.json`;

    cy.get('#downloadTestFile').click();

    // Wait for the file to be downloaded
    cy.wait(1000);

    // Verify the existence of the downloaded file
    cy.readFile(downloadedFilePath).then(data=>{
        expect(data).to.have.property("name","Headphones");
    })
  });
  it('user should be able to use the data from the downloaded file', () => {
    const filepath ='cypress/downloads/example.json';
    cy.readFile(filepath).then(data=>{
    cy.log(data);
    const name = data.name;
    cy.get('#searchInput').type(name);
    cy.get('[data-test="search-button"]').click();
    cy.contains('Wireless Headphones').should('contain','Wireless Headphones');
    cy.log('Search successful');
    cy.get('#clearSearch').click();
    cy.get('#searchInput').should('be.empty');
    cy.log('Search cleared');
    cy.contains('h2',"Latest Products").should('contain','Latest Products');
 
    })
})
})