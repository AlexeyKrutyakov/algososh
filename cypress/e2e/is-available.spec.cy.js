describe('Доступность приложения', () => {
  it('должно быть доступно по адресу localhost:3000', () => {
    cy.visit('/');
  });
});