/// <reference types="Cypress" />

describe('Проверка корректности работы страницы "Последовательность Фибоначчи"', () => {
  const firstSevenMembersFibonacci = [0, 1, 1, 2, 3, 5, 8];
  const checkCirclesLength = (elements, length) => {
    cy.get(elements).should('have.length', length);
  };
  const checkLetter = (element, letter) =>
    cy.wrap(element).should('have.text', `${letter}`);

  beforeEach(() => {
    cy.visit('/fibonacci');
  });

  it('Если инпут не заполнен, кнопка "Развернуть" недоступна', () => {
    cy.get('[data-testid="input-for-string').should('be.empty');
    cy.get('[data-testid="submit-button"]').should('be.disabled');
  });

  it('Числа генерируются корректно', () => {
    cy.clock();

    cy.get('[data-testid="input-for-string"]').type('6');
    cy.get('[data-testid="submit-button"]').click();

    cy.tick(500);
    cy.get('[class*="scheme"]').children().as('circles');

    for (let length = 1; length <= 7; length++) {
      checkCirclesLength('@circles', length);
      cy.tick(500);
    }

    cy.get('@circles').each(($circle, index) => {
      for (let i = 0; i <= 6; i++) {
        if (i === index) {
          checkLetter(
            $circle.children('[class*="circle_circle"]'),
            firstSevenMembersFibonacci[i]
          );
        }
      }
    });
  });
});
