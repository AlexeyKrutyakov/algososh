/// <reference types="Cypress" />

describe('Проверка корректности работы разворота строки', () => {
  const defaultColor = 'rgb(0, 50, 255)';
  const changingColor = 'rgb(210, 82, 225)';
  const modifiedColor = 'rgb(127, 224, 81)';
  const checkLetter = (element, letter) =>
    cy.wrap(element).should('have.text', `${letter}`);
  const checkBorderColor = (element, borderColor) => {
    cy.wrap(element)
      .children('[class*="circle_circle"]')
      .should('have.css', 'border', `4px solid ${borderColor}`);
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
        checkBorderColor($circle, defaultColor);

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
        checkBorderColor($circle, changingColor);
      }
      if (index === 1) {
        checkLetter($circle, 'a');
        checkBorderColor($circle, defaultColor);
      }
      if (index === 2) {
        checkLetter($circle, 't');
        checkBorderColor($circle, changingColor);
      }
    });

    cy.tick(1000);

    cy.get('@circles').each(($circle, index) => {
      if (index === 0) {
        checkLetter($circle, 't');
        checkBorderColor($circle, modifiedColor);
      }
      if (index === 1) {
        checkLetter($circle, 'a');
        checkBorderColor($circle, changingColor);
      }
      if (index === 2) {
        checkLetter($circle, 'c');
        checkBorderColor($circle, modifiedColor);
      }
    });

    cy.tick(1000);

    cy.get('@circles').each(($circle, index) => {
      checkBorderColor($circle, modifiedColor);

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
