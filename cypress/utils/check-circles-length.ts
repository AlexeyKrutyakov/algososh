/// <reference types="Cypress" />

const checkCirclesLength = (circles_containers: any, length: number) => {
  cy.get(circles_containers).should('have.length', length);
};

export default checkCirclesLength;
