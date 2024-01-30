/// <reference types="Cypress" />

import { CHECK } from '../../src/constants/test-names';
import { CARD_TITLE_SELECTOR } from '../../src/constants/test-selectors';
import { CARD_TITLE } from '../../src/constants/page-titles';

const checkTitle = (title) => {
  cy.get(CARD_TITLE_SELECTOR).should('have.text', title);
};

describe(`${CHECK.ROUTING_AVAILABLE}`, () => {
  it(`${CHECK.STRING_PAGE_VISIT}`, () => {
    cy.visit('/recursion');
    checkTitle(CARD_TITLE.STRING);
  });

  it(`${CHECK.FIBONACCI_PAGE_VISIT}`, () => {
    cy.visit('/fibonacci');
    checkTitle(CARD_TITLE.FIBONACCI);
  });

  it(`${CHECK.SORT_ARRAY_PAGE_VISIT}`, () => {
    cy.visit('/sorting');
    checkTitle(CARD_TITLE.SORT_ARRAY);
  });

  it(`${CHECK.STACK_PAGE_VISIT}`, () => {
    cy.visit('/stack');
    checkTitle(CARD_TITLE.STACK);
  });

  it(`${CHECK.QUEUE_PAGE_VISIT}`, () => {
    cy.visit('/queue');
    checkTitle(CARD_TITLE.QUEUE);
  });

  it(`${CHECK.LIST_PAGE_VISIT}`, () => {
    cy.visit('/list');
    checkTitle(CARD_TITLE.LIST);
  });
});
