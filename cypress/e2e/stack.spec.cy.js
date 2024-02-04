/// <reference types="Cypress" />

import {
  DEFAULT_BORDER_STYLE,
  CHANGING_BORDER_STYLE,
} from '../constants/styles';

import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';

import {
  CIRCLES_SCHEME_SELECTOR,
  CIRCLE_CONTAINER_SELECTOR,
} from '../constants/circle-selectors';

import { checkCircleBorderColor } from '../utils/check-circle-props';

import { getCircleLetter, getCircleHead } from '../utils/get-circle-props';

import checkCirclesLength from '../utils/check-circles-length';
import { createSelector } from '../utils/create-selector';

describe('Проверка корректности работы стека', () => {
  const addElement = (text) => {
    cy.get('@input').type(text);
    cy.get('@add-btn').click();
  };

  beforeEach(() => {
    cy.visit('/stack');

    cy.get(createSelector('add-button')).as('add-btn');
    cy.get(createSelector('delete-button')).as('delete-btn');
    cy.get(createSelector('clear-button')).as('clear-btn');
    cy.get(createSelector('input-for-string')).as('input');

    cy.clock();
  });

  it('Если инпут не заполнен, кнопки управления недоступны', () => {
    cy.get('@input').should('be.empty');

    cy.get('[data-cy*="-button"]').each(($button) =>
      cy.wrap($button).should('be.disabled')
    );
  });

  it('Проверка корректности добавления элементов в стек', () => {
    addElement('1');

    cy.get('@add-btn').should('be.disabled');
    cy.get('@delete-btn').should('be.disabled');
    cy.get('@clear-btn').should('be.disabled');
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

  it('Проверка корректности удаления элементов из стека', () => {
    addElement('1');

    cy.tick(DELAY_IN_MS);

    addElement('2');

    cy.tick(DELAY_IN_MS);

    cy.get(CIRCLES_SCHEME_SELECTOR)
      .children(CIRCLE_CONTAINER_SELECTOR)
      .as('circles_containers');

    cy.get('@delete-btn').click();

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

    cy.get('@delete-btn').click();

    cy.get('@circles_containers').each(($circle_container, index) => {
      if (index === 0) {
        checkCircleBorderColor($circle_container, CHANGING_BORDER_STYLE);
      }
    });

    cy.tick(SHORT_DELAY_IN_MS);

    checkCirclesLength('@circles_containers', 0);
  });

  it('Проверка корректности очистки стека', () => {
    for (let i = 0; i < 3; i++) {
      addElement(`${i}`);
      cy.tick(SHORT_DELAY_IN_MS);
    }

    cy.get(CIRCLES_SCHEME_SELECTOR)
      .get(CIRCLE_CONTAINER_SELECTOR)
      .as('circles');

    cy.get('@clear-btn').click();

    cy.get('@circles').should('have.length', 0);
  });
});
