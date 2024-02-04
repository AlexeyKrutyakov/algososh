/// <reference types="Cypress" />

import {
  CIRCLES_SCHEME_SELECTOR,
  CIRCLE_CONTAINER_SELECTOR,
} from '../constants/circle-selectors';
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { FIBONACCI_ARRAY } from '../../src/constants/mock-data';

import checkCirclesLength from '../utils/check-circles-length';
import { getCircleLetter } from '../utils/get-circle-props';
import { createSelector } from '../utils/create-selector';

describe('Проверка корректности работы страницы "Последовательность Фибоначчи"', () => {
  beforeEach(() => {
    cy.visit('/fibonacci');
    cy.get(createSelector('input-for-string')).as('input');
    cy.get(createSelector('submit-button')).as('submit-btn');
  });

  it('Если инпут не заполнен, кнопка "Submit" недоступна', () => {
    cy.get('@input').should('be.empty');
    cy.get('@submit-btn').should('be.disabled');
  });

  it('Ряд Фибоначчи генерируется корректно', () => {
    cy.clock();

    cy.get('@input').type(`${FIBONACCI_ARRAY.length - 1}`);
    cy.get('@submit-btn').click();

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
