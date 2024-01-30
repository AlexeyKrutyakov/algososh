/// <reference types="Cypress" />

import {
  CIRCLES_SELECTOR,
  CIRCLE_SELECTOR,
  INPUT_SELECTOR,
  SUBMIT_BTN_SELECTOR,
} from '../../src/constants/test-selectors';

import {
  DEFAULT_BORDER_STYLE,
  CHANGING_BORDER_STYLE,
  MODIFIED_BORDER_STYLE,
} from '../../src/constants/styles';

import { CHECK } from '../../src/constants/test-names';

import { DELAY_IN_MS } from '../../src/constants/delays';

describe(`${CHECK.STRING}`, () => {
  const checkLetter = (element, letter) =>
    cy.wrap(element).should('have.text', `${letter}`);
  const checkBorderColor = (element, borderStyle) => {
    cy.wrap(element)
      .children(CIRCLE_SELECTOR)
      .should('have.css', 'border', `${borderStyle}`);
  };

  beforeEach(() => {
    cy.visit('/recursion');
  });

  it(`${CHECK.SUBMIT_DISABLE_IF_INPUT_IS_EMPTY}`, () => {
    cy.get(INPUT_SELECTOR).should('be.empty');
    cy.get(SUBMIT_BTN_SELECTOR).should('be.disabled');
  });
  it(`${CHECK.STRING_REVERSE_IS_CORRECT}`, () => {
    cy.clock();

    cy.get(INPUT_SELECTOR).type('cat');
    cy.get(SUBMIT_BTN_SELECTOR).click();

    cy.get(CIRCLES_SELECTOR).children().as('circles');

    cy.get('@circles')
      .should('have.length', 3)
      .each(($circle, index) => {
        checkBorderColor($circle, DEFAULT_BORDER_STYLE);

        if (index === 0) {
          checkLetter($circle, 'c');
        }

        if (index === 1) {
          checkLetter($circle, 'a');
        }

        if (index === 2) {
          checkLetter($circle, 't');
        }
      });

    cy.tick(DELAY_IN_MS);

    cy.get('@circles').each(($circle, index) => {
      if (index === 0) {
        checkLetter($circle, 'c');
        checkBorderColor($circle, CHANGING_BORDER_STYLE);
      }
      if (index === 1) {
        checkLetter($circle, 'a');
        checkBorderColor($circle, DEFAULT_BORDER_STYLE);
      }
      if (index === 2) {
        checkLetter($circle, 't');
        checkBorderColor($circle, CHANGING_BORDER_STYLE);
      }
    });

    cy.tick(DELAY_IN_MS);

    cy.get('@circles').each(($circle, index) => {
      if (index === 0) {
        checkLetter($circle, 't');
        checkBorderColor($circle, MODIFIED_BORDER_STYLE);
      }
      if (index === 1) {
        checkLetter($circle, 'a');
        checkBorderColor($circle, CHANGING_BORDER_STYLE);
      }
      if (index === 2) {
        checkLetter($circle, 'c');
        checkBorderColor($circle, MODIFIED_BORDER_STYLE);
      }
    });

    cy.tick(DELAY_IN_MS);

    cy.get('@circles').each(($circle, index) => {
      checkBorderColor($circle, MODIFIED_BORDER_STYLE);

      if (index === 0) {
        checkLetter($circle, 't');
      }

      if (index === 1) {
        checkLetter($circle, 'a');
      }

      if (index === 2) {
        checkLetter($circle, 'c');
      }
    });

    cy.get(INPUT_SELECTOR).should('be.empty');
  });
});
