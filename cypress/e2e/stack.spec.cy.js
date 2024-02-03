/// <reference types="Cypress" />

import {
  DEFAULT_BORDER_STYLE,
  CHANGING_BORDER_STYLE,
} from '../constants/styles';
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';

import {
  CIRCLES_SCHEME_SELECTOR,
  CIRCLE_CONTAINER_SELECTOR,
  INPUT_SELECTOR,
  ADD_BTN_SELECTOR,
  DELETE_BTN_SELECTOR,
  CLEAR_BTN_SELECTOR,
} from '../constants/test-selectors';

import { CHECK } from '../constants/test-names';

import { checkCircleBorderColor } from '../utils/check-circle-props';

import { getCircleLetter, getCircleHead } from '../utils/get-circle-props';

import checkCirclesLength from '../utils/check-circles-length';

describe(`${CHECK.STACK_WORKS_CORRECTLY}`, () => {
  const addElement = (text) => {
    cy.get('@input').type(text);
    cy.get('@add-button').click();
  };

  beforeEach(() => {
    cy.visit('/stack');

    cy.get(ADD_BTN_SELECTOR).as('add-button');
    cy.get(DELETE_BTN_SELECTOR).as('delete-button');
    cy.get(CLEAR_BTN_SELECTOR).as('clear-button');
    cy.get(INPUT_SELECTOR).as('input');

    cy.clock();
  });

  it(`${CHECK.BUTTONS_DISABLE_IF_INPUT_IS_EMPTY}`, () => {
    cy.get(INPUT_SELECTOR).should('be.empty');

    cy.get('[data-testid*="-button"]').each(($button) =>
      cy.wrap($button).should('be.disabled')
    );
  });

  it(`${CHECK.ADDING_TO_STACK_WORKS_CORRECTLY}`, () => {
    addElement('1');

    cy.get('@add-button').should('be.disabled');
    cy.get('@delete-button').should('be.disabled');
    cy.get('@clear-button').should('be.disabled');
    cy.get('@input').should('be.disabled');

    cy.get(CIRCLES_SCHEME_SELECTOR)
      .children(CIRCLE_CONTAINER_SELECTOR)
      .as('circles_containers');

    checkCirclesLength('@circles_containers', 1);

    cy.get('@circles_containers').each(($circle_container, index) => {
      if (index === 0) {
        checkCircleBorderColor($circle_container, CHANGING_BORDER_STYLE);
        getCircleLetter($circle_container).should('have.text', '1');
        getCircleHead($circle_container).should('have.text', 'top');

        cy.tick(SHORT_DELAY_IN_MS);

        checkCircleBorderColor($circle_container, DEFAULT_BORDER_STYLE);
      }
    });

    addElement('2');

    checkCirclesLength('@circles_containers', 2);

    cy.get('@circles_containers').each(($circle_container, index) => {
      if (index === 0) {
        checkCircleBorderColor($circle_container, DEFAULT_BORDER_STYLE);

        getCircleLetter($circle_container).should('have.text', '1');

        getCircleHead($circle_container).should('be.empty');
      }
      if (index === 1) {
        checkCircleBorderColor($circle_container, CHANGING_BORDER_STYLE);
        getCircleLetter($circle_container).should('have.text', '2');
        getCircleHead($circle_container).should('have.text', 'top');

        cy.tick(SHORT_DELAY_IN_MS);

        checkCircleBorderColor($circle_container, DEFAULT_BORDER_STYLE);
      }
    });
  });

  it(`${CHECK.REMOVING_FROM_STACK_WORKS_CORRECTLY}`, () => {
    addElement('1');

    cy.tick(DELAY_IN_MS);

    addElement('2');

    cy.tick(DELAY_IN_MS);

    cy.get(CIRCLES_SCHEME_SELECTOR)
      .children(CIRCLE_CONTAINER_SELECTOR)
      .as('circles_containers');

    cy.get('@delete-button').click();

    cy.get('@circles_containers').each(($circle_container, index) => {
      if (index === 0) {
        checkCircleBorderColor($circle_container, DEFAULT_BORDER_STYLE);
      }

      if (index === 1) {
        checkCircleBorderColor($circle_container, CHANGING_BORDER_STYLE);
      }
    });

    cy.tick(SHORT_DELAY_IN_MS);

    checkCirclesLength('@circles_containers', 1);

    cy.get('@circles_containers').each(($circle_container, index) => {
      if (index === 0) {
        getCircleHead($circle_container).should('have.text', 'top');
      }
    });

    cy.get('@delete-button').click();

    cy.get('@circles_containers').each(($circle_container, index) => {
      if (index === 0) {
        checkCircleBorderColor($circle_container, CHANGING_BORDER_STYLE);
      }
    });

    cy.tick(SHORT_DELAY_IN_MS);

    checkCirclesLength('@circles_containers', 0);
  });

  it(`${CHECK.STACK_CLEARING_IS_WORKING_CORRECTLY}`, () => {
    for (let i = 0; i < 3; i++) {
      addElement(`${i}`);
      cy.tick(SHORT_DELAY_IN_MS);
    }

    cy.get(CIRCLES_SCHEME_SELECTOR)
      .get(CIRCLE_CONTAINER_SELECTOR)
      .as('circles');

    cy.get('@clear-button').click();

    cy.get('@circles').should('have.length', 0);
  });
});
