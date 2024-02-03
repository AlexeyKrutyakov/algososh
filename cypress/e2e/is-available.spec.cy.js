import { CHECK } from '../constants/test-names';

describe(`${CHECK.APP_IS_AVAILABLE}`, () => {
  it(`${CHECK.LOCALHOST_AVAILABLE}`, () => {
    cy.visit('/');
  });
});
