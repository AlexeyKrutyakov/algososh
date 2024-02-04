/// <reference types="Cypress" />

import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import {
  CHANGING_BORDER_STYLE,
  DEFAULT_BORDER_STYLE,
} from '../constants/styles';
import { CHECK } from '../constants/test-names';
import {
  CIRCLES_SCHEME_SELECTOR,
  CIRCLE_CONTAINER_SELECTOR,
  CIRCLE_SELECTOR,
} from '../constants/circle-selectors';
import { checkCircleBorderColor } from '../utils/check-circle-props';

import checkCirclesLength from '../utils/check-circles-length';
import {
  getCircleHead,
  getCircleLetter,
  getCircleTail,
} from '../utils/get-circle-props';
import { createSelector } from '../utils/create-selector';

describe(`${CHECK.QUEUE_WORKS_CORRECTLY}`, () => {
  const addElement = (text) => {
    cy.get('@input').type(text);
    cy.get('@add-btn').click();
  };

  beforeEach(() => {
    cy.visit('/queue');

    cy.get(createSelector('add-button')).as('add-btn');
    cy.get(createSelector('delete-button')).as('delete-btn');
    cy.get(createSelector('clear-button')).as('clear-btn');
    cy.get(createSelector('input-for-string')).as('input');

    cy.clock();

    cy.get(CIRCLES_SCHEME_SELECTOR)
      .children(CIRCLE_CONTAINER_SELECTOR)
      .as('circles_containers');
  });

  it(`${CHECK.QUEUE_TEMPLATE_IS_CORRECT}`, () => {
    checkCirclesLength('@circles_containers', 7);

    cy.get('@circles_containers').each(($circle_container, index) => {
      cy.wrap($circle_container)
        .children(CIRCLE_SELECTOR)
        .should('have.text', '');
    });
  });

  it(`${CHECK.BUTTONS_DISABLE_IF_INPUT_IS_EMPTY}`, () => {
    cy.get('@input').should('be.empty');

    cy.get('[data-cy*="-button"]').each(($button) =>
      cy.wrap($button).should('be.disabled')
    );
  });

  it(`${CHECK.ADDING_TO_QUEUE_WORKS_CORRECTLY}`, () => {
    addElement('a');

    cy.get('@add-btn').should('be.disabled');
    cy.get('@delete-btn').should('be.disabled');
    cy.get('@clear-btn').should('be.disabled');
    cy.get('@input').should('be.disabled');

    checkCirclesLength('@circles_containers', 7);

    cy.get('@circles_containers').each(($circle_container, index) => {
      if (index === 0) {
        checkCircleBorderColor($circle_container, CHANGING_BORDER_STYLE);
        getCircleLetter($circle_container).should('have.text', 'a');
        getCircleHead($circle_container).should('have.text', 'head');

        cy.tick(SHORT_DELAY_IN_MS);

        checkCircleBorderColor($circle_container, DEFAULT_BORDER_STYLE);
      }
    });

    addElement('b');

    checkCirclesLength('@circles_containers', 7);

    cy.get('@circles_containers').each(($circle_container, index) => {
      if (index === 0) {
        checkCircleBorderColor($circle_container, DEFAULT_BORDER_STYLE);

        getCircleLetter($circle_container).should('have.text', 'a');

        getCircleHead($circle_container).should('have.text', 'head');

        getCircleTail($circle_container).should('be.empty');
      }
      if (index === 1) {
        checkCircleBorderColor($circle_container, CHANGING_BORDER_STYLE);
        getCircleLetter($circle_container).should('have.text', 'b');
        getCircleHead($circle_container).should('be.empty');
        getCircleTail($circle_container).should('have.text', 'tail');

        cy.tick(SHORT_DELAY_IN_MS);

        checkCircleBorderColor($circle_container, DEFAULT_BORDER_STYLE);
      }
    });
  });

  it(`${CHECK.REMOVING_FROM_QUEUE_WORKS_CORRECTLY}`, () => {
    addElement('a');
    cy.tick(SHORT_DELAY_IN_MS);
    addElement('b');
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@delete-btn').click();

    cy.get('@circles_containers').each(($circle_container, index) => {
      if (index === 0) {
        checkCircleBorderColor($circle_container, CHANGING_BORDER_STYLE);
        getCircleLetter($circle_container).should('have.text', 'a');
        getCircleHead($circle_container).should('have.text', 'head');
        getCircleTail($circle_container).should('be.empty');
      }
      if (index === 1) {
        checkCircleBorderColor($circle_container, DEFAULT_BORDER_STYLE);
        getCircleLetter($circle_container).should('have.text', 'b');
        getCircleHead($circle_container).should('be.empty');
        getCircleTail($circle_container).should('have.text', 'tail');
      }
    });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@circles_containers').each(($circle_container, index) => {
      if (index === 0) {
        checkCircleBorderColor($circle_container, DEFAULT_BORDER_STYLE);
        getCircleLetter($circle_container).should('be.empty');
        getCircleHead($circle_container).should('be.empty');
        getCircleTail($circle_container).should('be.empty');
      }
      if (index === 1) {
        checkCircleBorderColor($circle_container, DEFAULT_BORDER_STYLE);
        getCircleLetter($circle_container).should('have.text', 'b');
        getCircleHead($circle_container).should('have.text', 'head');
        getCircleTail($circle_container).should('have.text', 'tail');
      }
    });
  });

  it(`${CHECK.QUEUE_CLEARING_IS_WORKING_CORRECTLY}`, () => {
    addElement('a');
    cy.tick(SHORT_DELAY_IN_MS);
    addElement('b');
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@clear-btn').click();

    checkCirclesLength('@circles_containers', 7);

    cy.get('@circles_containers').each(($circle_container, index) => {
      cy.wrap($circle_container)
        .children(CIRCLE_SELECTOR)
        .should('have.text', '');

      getCircleHead($circle_container).should('be.empty');

      getCircleTail($circle_container).should('be.empty');
    });
  });
});
