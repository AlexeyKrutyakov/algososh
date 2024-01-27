describe('Проверка корректности работы разворота строки', () => {
  const defaultColor = 'rgb(0, 50, 255)';

  it('Если инпут не заполнен, кнопка "Развернуть" недоступна', () => {
    cy.visit('/recursion');
    cy.get('[data-testid="input-for-string"]').should('be.empty');
    cy.get('[data-testid="submit-button"]').should('be.disabled');
  });
  it('Строка разворачивается корректно, анимация отрисовывается корректно', () => {
    cy.clock();

    cy.visit('/recursion');
    cy.get('[data-testid="input-for-string"]').type('string');
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="scheme"]').children().as('circles');

    cy.get('@circles')
      .should('have.length', 6)
      .each(($circle, index) => {
        cy.wrap($circle)
          .children('[class*="circle_circle"]')
          .should('have.css', 'border', `4px solid ${defaultColor}`);

        if (index === 0) {
          cy.wrap($circle).should('have.text', 's');
        }
      });
  });
});
