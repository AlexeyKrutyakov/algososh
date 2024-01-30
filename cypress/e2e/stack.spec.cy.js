/// <reference types="Cypress" />

import {
  DEFAULT_BORDER_STYLE,
  CHANGING_BORDER_STYLE,
} from '../../src/constants/styles';
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Проверка корректности работы стека', () => {
  const checkBorderColor = (element, borderStyle) => {
    cy.wrap(element)
      .children('[class*="circle_circle"]')
      .should('have.css', 'border', `${borderStyle}`);
  };

  const getLetter = (circle) => {
    return circle
      .children('[class*="circle_circle"]')
      .children('[class*="circle_letter"]');
  };

  const getHead = (circle) => {
    return circle.children('[class*="circle_head"]');
  };

  const checkText = (element, str) =>
    cy.wrap(element).should('have.text', `${str}`);

  beforeEach(() => {
    cy.visit('/stack');
  });

  it('Если инпут не заполнен, кнопки управления недоступны', () => {
    cy.get('[data-testid="input-for-string"]').should('be.empty');
    cy.get('[data-testid*="-button"]').each(($button) =>
      cy.wrap($button).should('be.disabled')
    );
  });

  it('Проверка корректности добавления элементов в стек', () => {
    cy.get('[data-testid="add-button"]').as('add-button');
    cy.get('[data-testid="delete-button"]').as('delete-button');
    cy.get('[data-testid="clear-button"]').as('clear-button');
    cy.get('[data-testid="input-for-string"]').as('input');

    cy.clock();

    cy.get('@input').type('1');
    cy.get('@add-button').click();

    cy.get('[class*="scheme"]').get('[class*="circle_content"]').as('circles');

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

  it('Проверка корректности удаления элементов из стека', () => {
    cy.get('[data-testid="add-button"]').as('add-button');
    cy.get('[data-testid="delete-button"]').as('delete-button');
    cy.get('[data-testid="clear-button"]').as('clear-button');
    cy.get('[data-testid="input-for-string"]').as('input');

    cy.clock();

    cy.get('@input').type('1');
    cy.get('@add-button').click();

    cy.tick(DELAY_IN_MS);

    cy.get('@input').type('2');
    cy.get('@add-button').click();

    cy.tick(DELAY_IN_MS);

    cy.get('[class*="scheme"]').get('[class*="circle_content"]').as('circles');

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

  it('Проверка корректности очистки стека', () => {
    cy.clock();

    cy.get('[data-testid="add-button"]').as('add-button');
    cy.get('[data-testid="clear-button"]').as('clear-button');
    cy.get('[data-testid="input-for-string"]').as('input');

    for (let i = 0; i < 3; i++) {
      cy.get('@input').type(`${i}`);
      cy.get('@add-button').click();
      cy.tick(SHORT_DELAY_IN_MS);
    }

    cy.get('[class*="scheme"]').get('[class*="circle_content"]').as('circles');

    cy.get('@clear-button').click();

    cy.get('@circles').should('have.length', 0);
  });
});
