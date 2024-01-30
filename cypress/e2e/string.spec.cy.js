/// <reference types="Cypress" />

import {
  DEFAULT_BORDER_STYLE,
  CHANGING_BORDER_STYLE,
  MODIFIED_BORDER_STYLE,
} from '../../src/constants/styles';

describe('Проверка корректности работы разворота строки', () => {
  const checkLetter = (element, letter) =>
    cy.wrap(element).should('have.text', `${letter}`);
  const checkBorderColor = (element, borderStyle) => {
    cy.wrap(element)
      .children('[class*="circle_circle"]')
      .should('have.css', 'border', `${borderStyle}`);
  };

  beforeEach(() => {
    cy.visit('/recursion');
  });

  it('Если инпут не заполнен, кнопка "Развернуть" недоступна', () => {
    cy.get('[data-testid="input-for-string"]').should('be.empty');
    cy.get('[data-testid="submit-button"]').should('be.disabled');
  });
  it('Строка разворачивается корректно, анимация отрисовывается корректно', () => {
    cy.clock();

    cy.get('[data-testid="input-for-string"]').type('cat');
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="scheme"]').children().as('circles');

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

    cy.tick(1000);

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

    cy.tick(1000);

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

    cy.tick(1000);

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

    cy.get('[data-testid="input-for-string"]').should('be.empty');
  });
});
