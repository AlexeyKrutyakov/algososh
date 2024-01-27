/// <reference types="Cypress" />

describe('Доступность перехода по страницам', () => {
  it('Переход на страницу "Строка"', () => {
    cy.visit('/recursion');
  });

  it('Переход на страницу "Последовательность Фибоначчи"', () => {
    cy.visit('/fibonacci');
  });

  it('Переход на страницу "Сортировка массива"', () => {
    cy.visit('/sorting');
  });

  it('Переход на страницу "Стек"', () => {
    cy.visit('/stack');
  });

  it('Переход на страницу "Очередь"', () => {
    cy.visit('/queue');
  });

  it('Переход на страницу "Связный список"', () => {
    cy.visit('/list');
  });
});
