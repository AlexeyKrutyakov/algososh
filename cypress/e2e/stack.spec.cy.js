/// <reference types="Cypress" />

import {
  DEFAULT_BORDER_STYLE,
  CHANGING_BORDER_STYLE,
} from '../../src/constants/styles';
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';

import {
  CIRCLES_SELECTOR,
  CIRCLE_CONTAINER_SELECTOR,
  CIRCLE_SELECTOR,
  CIRCLE_LETTER_SELECTOR,
  CIRCLE_HEAD_SELECTOR,
  INPUT_SELECTOR,
  ADD_BTN_SELECTOR,
  DELETE_BTN_SELECTOR,
  CLEAR_BTN_SELECTOR,
} from '../../src/constants/test-selectors';

import { CHECK } from '../../src/constants/test-names';

describe(`${CHECK.STACK_WORKS_CORRECTLY}`, () => {
  const checkBorderColor = (element, borderStyle) => {
    cy.wrap(element)
      .children(CIRCLE_SELECTOR)
      .should('have.css', 'border', `${borderStyle}`);
  };

  const getLetter = (circle) => {
    return circle.children(CIRCLE_SELECTOR).children(CIRCLE_LETTER_SELECTOR);
  };

  const getHead = (circle) => {
    return circle.children(CIRCLE_HEAD_SELECTOR);
  };

  const checkText = (element, str) =>
    cy.wrap(element).should('have.text', `${str}`);

  beforeEach(() => {
    cy.visit('/stack');
  });

  it(`${CHECK.BUTTONS_DISABLE_IF_INPUT_IS_EMPTY}`, () => {
    cy.get(INPUT_SELECTOR).should('be.empty');
    cy.get('[data-testid*="-button"]').each(($button) =>
      cy.wrap($button).should('be.disabled')
    );
  });

  it(`${CHECK.ADDING_TO_STACK_WORKS_CORRECTLY}`, () => {
    cy.get(ADD_BTN_SELECTOR).as('add-button');
    cy.get(DELETE_BTN_SELECTOR).as('delete-button');
    cy.get(CLEAR_BTN_SELECTOR).as('clear-button');
    cy.get(INPUT_SELECTOR).as('input');

    cy.clock();

    cy.get('@input').type('1');
    cy.get('@add-button').click();

    cy.get(CIRCLES_SELECTOR).get(CIRCLE_CONTAINER_SELECTOR).as('circles');

    cy.get('@circles')
      .should('have.length', 1)
      .each(($circle, index) => {
        if (index === 0) {
          checkBorderColor($circle, CHANGING_BORDER_STYLE);
          checkText(getLetter($circle), '1');
          checkText(getHead($circle), 'top');

          cy.tick(SHORT_DELAY_IN_MS);

          checkBorderColor($circle, DEFAULT_BORDER_STYLE);
        }
      });

    cy.get('@input').type('2');
    cy.get('@add-button').click();

    cy.get('@add-button').should('be.disabled');
    cy.get('@delete-button').should('be.disabled');
    cy.get('@clear-button').should('be.disabled');
    cy.get('@input').should('be.disabled');

    cy.get('@circles')
      .should('have.length', 2)
      .each(($circle, index) => {
        if (index === 0) {
          checkBorderColor($circle, DEFAULT_BORDER_STYLE);
          checkText(getLetter($circle), '1');
          cy.wrap(getHead($circle)).should('be.empty');
        }
        if (index === 1) {
          checkBorderColor($circle, CHANGING_BORDER_STYLE);
          checkText(getLetter($circle), '2');
          checkText(getHead($circle), 'top');

          cy.tick(SHORT_DELAY_IN_MS);

          checkBorderColor($circle, DEFAULT_BORDER_STYLE);
        }
      });
  });

  it(`${CHECK.REMOVING_FROM_STACK_WORKS_CORRECTLY}`, () => {
    cy.get(ADD_BTN_SELECTOR).as('add-button');
    cy.get(DELETE_BTN_SELECTOR).as('delete-button');
    cy.get(CLEAR_BTN_SELECTOR).as('clear-button');
    cy.get(INPUT_SELECTOR).as('input');

    cy.clock();

    cy.get('@input').type('1');
    cy.get('@add-button').click();

    cy.tick(DELAY_IN_MS);

    cy.get('@input').type('2');
    cy.get('@add-button').click();

    cy.tick(DELAY_IN_MS);

    cy.get(CIRCLES_SELECTOR).get(CIRCLE_CONTAINER_SELECTOR).as('circles');

    cy.get('@delete-button').click();

    cy.get('@circles').each(($circle, index) => {
      if (index === 0) {
        checkBorderColor($circle, DEFAULT_BORDER_STYLE);
      }

      if (index === 1) {
        checkBorderColor($circle, CHANGING_BORDER_STYLE);
      }
    });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@circles')
      .should('have.length', 1)
      .each(($circle, index) => {
        if (index === 0) {
          checkText(getHead($circle), 'top');
        }
      });

    cy.get('@delete-button').click();

    cy.get('@circles').each(($circle, index) => {
      if (index === 0) {
        checkBorderColor($circle, CHANGING_BORDER_STYLE);
      }
    });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@circles').should('have.length', 0);
  });

  it(`${CHECK.STACK_CLEARING_IS_WORKING_CORRECTLY}`, () => {
    cy.clock();

    cy.get(ADD_BTN_SELECTOR).as('add-button');
    cy.get(CLEAR_BTN_SELECTOR).as('clear-button');
    cy.get(INPUT_SELECTOR).as('input');

    for (let i = 0; i < 3; i++) {
      cy.get('@input').type(`${i}`);
      cy.get('@add-button').click();
      cy.tick(SHORT_DELAY_IN_MS);
    }

    cy.get(CIRCLES_SELECTOR).get(CIRCLE_CONTAINER_SELECTOR).as('circles');

    cy.get('@clear-button').click();

    cy.get('@circles').should('have.length', 0);
  });
});
