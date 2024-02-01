/// <reference types="Cypress" />

import { CHECK } from '../../src/constants/test-names';
import {
  CIRCLES_SCHEME_SELECTOR,
  CIRCLE_CONTAINER_SELECTOR,
  CIRCLE_SELECTOR,
} from '../../src/constants/test-selectors';

import checkCirclesLength from '../../src/utils/check-circles-length';
import { getCircleLetter } from '../../src/utils/get-circle-props';

describe(`${CHECK.QUEUE_WORKS_CORRECTLY}`, () => {
  beforeEach(() => {
    cy.visit('/queue');
  });
  it(`${CHECK.QUEUE_TEMPLATE_IS_CORRECT}`, () => {
    cy.get(CIRCLES_SCHEME_SELECTOR)
      .children(CIRCLE_CONTAINER_SELECTOR)
      .as('circles_containers');

    checkCirclesLength('@circles_containers', 7);

    cy.get('@circles_containers').each(($circle_container, index) => {
      cy.wrap($circle_container)
        .children(CIRCLE_SELECTOR)
        .should('have.text', '');
    });
  });
});
