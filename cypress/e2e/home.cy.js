import { MockServiceCall } from '../support/utils';

describe('Photo Grid Home', () => {
  it('Verify if images are loaded on page load', () => {
    cy.visit('/');
    MockServiceCall.fetchImageList(cy, 1, 10);
    cy.get('li.MuiImageListItem-root').should('have.length', 10);
  });

  it('Verify if an image can be selected', () => {
    cy.get('li.MuiImageListItem-root:nth-child(4)').click();
    cy.get('.modal-content-wrapper').should('have.length', 1);
  });

  it('Verify if the selected image details are correct', () => {
    cy.get('.modal-content-wrapper .details .title').contains('wasacrispbread');
  });

  it('Verify if the selected image can be closed', () => {
    cy.get('.modal-content-wrapper .details .close-button').click();
    cy.get('.modal-content-wrapper').should('have.length', 0);
  });
});
