/// <reference types="Cypress" />

import { CHECK } from '../../src/constants/test-names';

describe(`${CHECK.ROUTING_AVAILABLE}`, () => {
  it(`${CHECK.STRING_PAGE_VISIT}`, () => {
    cy.visit('/recursion');
  });

  it(`${CHECK.FIBONACCI_PAGE_VISIT}`, () => {
    cy.visit('/fibonacci');
  });

  it(`${CHECK.SORT_ARRAY_PAGE_VISIT}`, () => {
    cy.visit('/sorting');
  });

  it(`${CHECK.STACK_PAGE_VISIT}`, () => {
    cy.visit('/stack');
  });

  it(`${CHECK.QUEUE_PAGE_VISIT}`, () => {
    cy.visit('/queue');
  });

  it(`${CHECK.LIST_PAGE_VISIT}`, () => {
    cy.visit('/list');
  });
});
