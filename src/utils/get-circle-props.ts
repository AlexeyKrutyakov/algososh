/// <reference types="Cypress" />

import {
  CIRCLE_HEAD_SELECTOR,
  CIRCLE_LETTER_SELECTOR,
  CIRCLE_SELECTOR,
} from '../constants/test-selectors';

export const getCircleLetter = (circle_container: any) => {
  return cy
    .wrap(circle_container)
    .children(CIRCLE_SELECTOR)
    .children(CIRCLE_LETTER_SELECTOR);
};

export const getCircleHead = (circle_container: any) => {
  return cy.wrap(circle_container.children(CIRCLE_HEAD_SELECTOR));
};
