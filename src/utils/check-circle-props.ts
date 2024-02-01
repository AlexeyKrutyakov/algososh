/// <reference types="Cypress" />

import { CIRCLE_SELECTOR } from '../constants/test-selectors';

export const checkCircleBorderColor = (
  circle_container: any,
  borderStyle: string
) => {
  cy.wrap(circle_container)
    .children(CIRCLE_SELECTOR)
    .should('have.css', 'border', `${borderStyle}`);
};
