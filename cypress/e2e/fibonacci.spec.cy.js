/// <reference types="Cypress" />

import {
  INPUT_SELECTOR,
  SUBMIT_BTN_SELECTOR,
  CIRCLES_SELECTOR,
  CIRCLE_SELECTOR,
} from '../../src/constants/test-selectors';

import { FIBONACCI_ARRAY } from '../../src/constants/mock-data';
import { CHECK } from '../../src/constants/test-names';

describe(`${CHECK.FIBONACCI}`, () => {
  const checkCirclesLength = (elements, length) => {
    cy.get(elements).should('have.length', length);
  };
  const checkLetter = (element, letter) =>
    cy.wrap(element).should('have.text', `${letter}`);

  beforeEach(() => {
    cy.visit('/fibonacci');
  });

  it(`${CHECK.SUBMIT_DISABLE_IF_INPUT_IS_EMPTY}`, () => {
    cy.get(INPUT_SELECTOR).should('be.empty');
    cy.get(SUBMIT_BTN_SELECTOR).should('be.disabled');
  });

  it(`${CHECK.FIBONACCI_SERIES_IS_CORRECT}`, () => {
    cy.clock();

    cy.get(INPUT_SELECTOR).type(`${FIBONACCI_ARRAY.length - 1}`);
    cy.get(SUBMIT_BTN_SELECTOR).click();

    cy.tick(500);
    cy.get(CIRCLES_SELECTOR).children().as('circles');

    for (let length = 1; length <= FIBONACCI_ARRAY.length; length++) {
      checkCirclesLength('@circles', length);
      cy.tick(500);
    }

    cy.get('@circles').each(($circle, index) => {
      for (let i = 0; i < FIBONACCI_ARRAY.length; i++) {
        if (i === index) {
          checkLetter($circle.children(CIRCLE_SELECTOR), FIBONACCI_ARRAY[i]);
        }
      }
    });
  });
});
