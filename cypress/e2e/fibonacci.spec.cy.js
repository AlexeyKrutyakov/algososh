/// <reference types="Cypress" />

import {
  INPUT_SELECTOR,
  SUBMIT_BTN_SELECTOR,
  CIRCLES_SCHEME_SELECTOR,
  CIRCLE_CONTAINER_SELECTOR,
} from '../constants/test-selectors';
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { FIBONACCI_ARRAY } from '../../src/constants/mock-data';
import { CHECK } from '../constants/test-names';

import checkCirclesLength from '../utils/check-circles-length';
import { getCircleLetter } from '../utils/get-circle-props';

describe(`${CHECK.FIBONACCI}`, () => {
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

    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(CIRCLES_SCHEME_SELECTOR)
      .children(CIRCLE_CONTAINER_SELECTOR)
      .as('circles_containers');

    for (let length = 1; length <= FIBONACCI_ARRAY.length; length++) {
      checkCirclesLength('@circles_containers', length);
      cy.tick(SHORT_DELAY_IN_MS);
    }

    cy.get('@circles_containers').each(($circle_container, index) => {
      for (let i = 0; i < FIBONACCI_ARRAY.length; i++) {
        if (i === index) {
          getCircleLetter($circle_container).should(
            'have.text',
            FIBONACCI_ARRAY[i]
          );
        }
      }
    });
  });
});
