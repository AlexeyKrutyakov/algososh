/// <reference types="Cypress" />

import {
  CIRCLES_SCHEME_SELECTOR,
  CIRCLE_CONTAINER_SELECTOR,
} from '../constants/circle-selectors.ts';
import {
  DEFAULT_BORDER_STYLE,
  CHANGING_BORDER_STYLE,
  MODIFIED_BORDER_STYLE,
} from '../constants/styles.ts';
import { CHECK } from '../constants/test-names';
import { DELAY_IN_MS } from '../../src/constants/delays';

import checkCirclesLength from '../utils/check-circles-length.ts';
import { checkCircleBorderColor } from '../utils/check-circle-props';
import { getCircleLetter } from '../utils/get-circle-props';
import { createSelector } from '../utils/create-selector.ts';

describe(`${CHECK.STRING}`, () => {
  beforeEach(() => {
    cy.visit('/recursion');
    cy.get(createSelector('input-for-string')).as('input');
    cy.get(createSelector('submit-button')).as('submit-btn');
  });

  it(`${CHECK.SUBMIT_DISABLE_IF_INPUT_IS_EMPTY}`, () => {
    cy.get('@input').should('be.empty');
    cy.get('@submit-btn').should('be.disabled');
  });

  it(`${CHECK.STRING_REVERSE_IS_CORRECT}`, () => {
    cy.clock();

    cy.get('@input').type('cat');
    cy.get('@submit-btn').click();

    cy.get(CIRCLES_SCHEME_SELECTOR)
      .children(CIRCLE_CONTAINER_SELECTOR)
      .as('circles_containers');

    checkCirclesLength('@circles_containers', 3);

    cy.get('@circles_containers').each(($circle_container, index) => {
      checkCircleBorderColor($circle_container, DEFAULT_BORDER_STYLE);

      if (index === 0) {
        getCircleLetter($circle_container).should('have.text', 'c');
      }

      if (index === 1) {
        getCircleLetter($circle_container).should('have.text', 'a');
      }

      if (index === 2) {
        getCircleLetter($circle_container).should('have.text', 't');
      }
    });

    cy.tick(DELAY_IN_MS);

    cy.get('@circles_containers').each(($circle_container, index) => {
      if (index === 0) {
        getCircleLetter($circle_container).should('have.text', 'c');
        checkCircleBorderColor($circle_container, CHANGING_BORDER_STYLE);
      }
      if (index === 1) {
        getCircleLetter($circle_container).should('have.text', 'a');
        checkCircleBorderColor($circle_container, DEFAULT_BORDER_STYLE);
      }
      if (index === 2) {
        getCircleLetter($circle_container).should('have.text', 't');
        checkCircleBorderColor($circle_container, CHANGING_BORDER_STYLE);
      }
    });

    cy.tick(DELAY_IN_MS);

    cy.get('@circles_containers').each(($circle_container, index) => {
      if (index === 0) {
        getCircleLetter($circle_container).should('have.text', 't');
        checkCircleBorderColor($circle_container, MODIFIED_BORDER_STYLE);
      }
      if (index === 1) {
        getCircleLetter($circle_container).should('have.text', 'a');
        checkCircleBorderColor($circle_container, CHANGING_BORDER_STYLE);
      }
      if (index === 2) {
        getCircleLetter($circle_container).should('have.text', 'c');
        checkCircleBorderColor($circle_container, MODIFIED_BORDER_STYLE);
      }
    });

    cy.tick(DELAY_IN_MS);

    cy.get('@circles_containers').each(($circle_container, index) => {
      checkCircleBorderColor($circle_container, MODIFIED_BORDER_STYLE);

      if (index === 0) {
        getCircleLetter($circle_container).should('have.text', 't');
      }

      if (index === 1) {
        getCircleLetter($circle_container).should('have.text', 'a');
      }

      if (index === 2) {
        getCircleLetter($circle_container).should('have.text', 'c');
      }
    });

    cy.get('@input').should('be.empty');
  });
});
