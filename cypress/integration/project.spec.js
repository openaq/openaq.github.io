// / <reference types="Cypress" />

describe('The Project Page', () => {
  it('successfully loads', () => {
    cy.visit('/#/project/AirNow');

    cy.get('header');
    cy.get('main');
    cy.get('footer');
    cy.get('h1');
  });
});
