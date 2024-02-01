/// <reference types="Cypress" />

import { CHECK } from '../../src/constants/test-names';
import {
  CIRCLES_SELECTOR,
  CIRCLE_CONTAINER_SELECTOR,
  CIRCLE_SELECTOR,
} from '../../src/constants/test-selectors';

describe(`${CHECK.QUEUE_WORKS_CORRECTLY}`, () => {
  const checkText = (element, str) =>
    cy.wrap(element).should('have.text', `${str}`);

  beforeEach(() => {
    cy.visit('/queue');
  });
  it(`${CHECK.QUEUE_TEMPLATE_IS_CORRECT}`, () => {
    cy.get(CIRCLES_SELECTOR).get(CIRCLE_CONTAINER_SELECTOR).as('circles');
    cy.get('@circles')
      .should('have.length', 7)
      .each(($circle, index) => {
        checkText($circle.children(CIRCLE_SELECTOR), '');
      });
  });
});
