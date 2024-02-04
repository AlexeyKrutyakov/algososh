/// <reference types="Cypress" />

import { PAGE_TITLES } from '../constants/page-titles';

const checkTitle = (title) => {
  cy.get('[class*="cardTitle"]').should('have.text', title);
};

describe('Доступность перехода по страницам', () => {
  it('Переход на страницу "Строка"', () => {
    cy.visit('/recursion');
    checkTitle(PAGE_TITLES.STRING);
  });

  it('Переход на страницу "Последовательность Фибоначчи"', () => {
    cy.visit('/fibonacci');
    checkTitle(PAGE_TITLES.FIBONACCI);
  });

  it('Переход на страницу "Сортировка массива"', () => {
    cy.visit('/sorting');
    checkTitle(PAGE_TITLES.SORT_ARRAY);
  });

  it('Переход на страницу "Стек"', () => {
    cy.visit('/stack');
    checkTitle(PAGE_TITLES.STACK);
  });

  it('Переход на страницу "Очередь"', () => {
    cy.visit('/queue');
    checkTitle(PAGE_TITLES.QUEUE);
  });

  it('Переход на страницу "Связный список"', () => {
    cy.visit('/list');
    checkTitle(PAGE_TITLES.LIST);
  });
});
