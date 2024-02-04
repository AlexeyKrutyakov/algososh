import {
  CIRCLES_SCHEME_SELECTOR,
  CIRCLE_ARTICLE_SELECTOR,
  CIRCLE_CONTAINER_SELECTOR,
  CIRCLE_HEAD_SELECTOR,
  CIRCLE_LETTER_SELECTOR,
  CIRCLE_SELECTOR,
  CIRCLE_TAIL_SELECTOR,
} from '../constants/circle-selectors';

import { DEFAULT_LINKED_LIST } from '../../src/constants/mock-data';
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import {
  CHANGING_BORDER_STYLE,
  DEFAULT_BORDER_STYLE,
  MODIFIED_BORDER_STYLE,
} from '../constants/styles';
import { createSelector } from '../utils/create-selector';

describe('Проверка корректности работы связного списка', () => {
  beforeEach(() => {
    cy.visit('/list');
    // aliases for inputs
    cy.get(createSelector('input-for-string')).as('input-for-string');
    cy.get(createSelector('input-for-index')).as('input-for-index');

    // aliases for buttons
    cy.get(createSelector('add-to-head-button')).as('add-to-head-btn');
    cy.get(createSelector('add-to-tail-button')).as('add-to-tail-btn');
    cy.get(createSelector('add-by-index-button')).as('add-by-index-btn');
    cy.get(createSelector('remove-from-head-button')).as(
      'remove-from-head-btn'
    );
    cy.get(createSelector('remove-from-tail-button')).as(
      'remove-from-tail-btn'
    );
    cy.get(createSelector('remove-by-index-button')).as('remove-by-index-btn');

    cy.get(CIRCLES_SCHEME_SELECTOR)
      .children(CIRCLE_ARTICLE_SELECTOR)
      .children(CIRCLE_CONTAINER_SELECTOR)
      .as('circles_containers');
  });

  it('Если инпут не заполнен, кнопки управления недоступны', () => {
    // check inputs
    cy.get('@input-for-string').should('be.empty');
    cy.get('@input-for-index').should('be.empty');

    // check buttons
    cy.get('@add-to-head-btn').should('be.disabled');
    cy.get('@add-to-tail-btn').should('be.disabled');
    cy.get('@add-by-index-btn').should('be.disabled');
    cy.get('@remove-from-head-btn').should('be.enabled');
    cy.get('@remove-from-tail-btn').should('be.enabled');
    cy.get('@remove-by-index-btn').should('be.disabled');
  });

  it('Проверка корректности связного списка по умолчанию', () => {
    cy.get('@circles_containers')
      .children(CIRCLE_SELECTOR)
      .children(CIRCLE_LETTER_SELECTOR)
      .each(($circle_letter, index) => {
        for (let i = 0; i < DEFAULT_LINKED_LIST.length; i++) {
          if (index === i)
            cy.wrap($circle_letter).should('have.text', DEFAULT_LINKED_LIST[i]);
        }
      });
  });

  it('Проверка корректности добавления элемента в начало списка', () => {
    cy.get('@input-for-string').type('-1');
    cy.get('@add-to-head-btn').click();

    cy.get('@circles_containers')
      .should('have.length', DEFAULT_LINKED_LIST.length)
      .first()
      .children(CIRCLE_HEAD_SELECTOR)
      .should('have.text', '-1')
      .children(CIRCLE_CONTAINER_SELECTOR)
      .children(CIRCLE_SELECTOR)
      .should('have.css', 'border', CHANGING_BORDER_STYLE);

    cy.clock();
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@circles_containers')
      .should('have.length', DEFAULT_LINKED_LIST.length + 1)
      .each(($circle_container, index) => {
        if (index === 0) {
          cy.wrap($circle_container)
            .children(CIRCLE_SELECTOR)
            .should('have.css', 'border', MODIFIED_BORDER_STYLE)

            .parent()
            .children(CIRCLE_HEAD_SELECTOR)
            .should('have.text', 'head');
        }

        if (index === 1) {
          cy.wrap($circle_container)
            .children(CIRCLE_SELECTOR)
            .should('have.css', 'border', DEFAULT_BORDER_STYLE)

            .parent()
            .children(CIRCLE_HEAD_SELECTOR)
            .should('be.empty');
        }
      });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@circles_containers')
      .first()
      .children(CIRCLE_SELECTOR)
      .should('have.css', 'border', DEFAULT_BORDER_STYLE);
  });

  it('Проверка корректности добавления элемента в конец списка', () => {
    cy.get('@input-for-string').type('2');
    cy.get('@add-to-tail-btn').click();

    cy.get('@circles_containers')
      .should('have.length', DEFAULT_LINKED_LIST.length)
      .last()
      .children(CIRCLE_HEAD_SELECTOR)
      .should('have.text', '2')
      .children(CIRCLE_CONTAINER_SELECTOR)
      .children(CIRCLE_SELECTOR)
      .should('have.css', 'border', CHANGING_BORDER_STYLE);

    cy.clock();
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@circles_containers')
      .should('have.length', DEFAULT_LINKED_LIST.length + 1)
      .each(($circle_container, index) => {
        if (index === 3) {
          cy.wrap($circle_container)
            .children(CIRCLE_SELECTOR)
            .should('have.css', 'border', DEFAULT_BORDER_STYLE)

            .parent()
            .children(CIRCLE_HEAD_SELECTOR)
            .should('be.empty')

            .parent()
            .children(CIRCLE_TAIL_SELECTOR)
            .should('be.empty');
        }

        if (index === 4) {
          cy.wrap($circle_container)
            .children(CIRCLE_SELECTOR)
            .should('have.css', 'border', MODIFIED_BORDER_STYLE)

            .parent()
            .children(CIRCLE_HEAD_SELECTOR)
            .should('be.empty')

            .parent()
            .children(CIRCLE_TAIL_SELECTOR)
            .should('have.text', 'tail');
        }
      });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@circles_containers')
      .last()
      .children(CIRCLE_SELECTOR)
      .should('have.css', 'border', DEFAULT_BORDER_STYLE);
  });

  it('Проверка корректности добавления элемента в список по индексу', () => {
    cy.get('@input-for-string').type('1');
    cy.get('@input-for-index').type('1');
    cy.get('@add-by-index-btn').click();

    cy.clock();

    cy.get('@circles_containers')
      .should('have.length', DEFAULT_LINKED_LIST.length)
      .first()
      .children(CIRCLE_SELECTOR)
      .should('have.css', 'border', CHANGING_BORDER_STYLE)

      .parent()
      .first()
      .children(CIRCLE_HEAD_SELECTOR)
      .should('have.text', 'head');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@circles_containers').each(($circle_container, index) => {
      if (index === 0) {
        cy.wrap($circle_container)
          .children(CIRCLE_SELECTOR)
          .should('have.css', 'border', CHANGING_BORDER_STYLE)

          .parent()
          .children(CIRCLE_HEAD_SELECTOR)
          .should('have.text', 'head');
      }

      if (index === 1) {
        cy.wrap($circle_container)
          .children(CIRCLE_SELECTOR)
          .should('have.css', 'border', DEFAULT_BORDER_STYLE)

          .parent()
          .children(CIRCLE_HEAD_SELECTOR)
          .should('be.empty');
      }
    });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@circles_containers').each(($circle_container, index) => {
      if (index === 1) {
        cy.wrap($circle_container)
          .children(CIRCLE_SELECTOR)
          .should('have.css', 'border', DEFAULT_BORDER_STYLE)

          .parent()
          .children(CIRCLE_HEAD_SELECTOR)
          .should('have.text', '1')
          .children(CIRCLE_CONTAINER_SELECTOR)
          .children(CIRCLE_SELECTOR)
          .should('have.css', 'border', CHANGING_BORDER_STYLE);
      }
    });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@circles_containers')
      .should('have.length', DEFAULT_LINKED_LIST.length + 1)

      .each(($circle_container, index) => {
        if (index === 0) {
          cy.wrap($circle_container)
            .children(CIRCLE_SELECTOR)
            .should('have.css', 'border', DEFAULT_BORDER_STYLE)

            .parent()
            .children(CIRCLE_HEAD_SELECTOR)
            .should('have.text', 'head');
        }

        if (index === 1) {
          cy.wrap($circle_container)
            .children(CIRCLE_SELECTOR)
            .should('have.css', 'border', MODIFIED_BORDER_STYLE)

            .parent()
            .children(CIRCLE_HEAD_SELECTOR)
            .should('be.empty');
        }
      });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@circles_containers').each(($circle_container, index) => {
      if (index === 1) {
        cy.wrap($circle_container)
          .children(CIRCLE_SELECTOR)
          .should('have.css', 'border', DEFAULT_BORDER_STYLE);
      }
    });
  });

  it('Проверка корректности удаления элемента из начала списка', () => {
    cy.clock();

    cy.get('@remove-from-head-btn').click();

    cy.get('@circles_containers')
      .should('have.length', DEFAULT_LINKED_LIST.length)
      .each(($circle_container, index) => {
        if (index === 0) {
          cy.wrap($circle_container)
            .children(CIRCLE_SELECTOR)
            .should('have.css', 'border', DEFAULT_BORDER_STYLE)
            .should('have.text', '')

            .parent()
            .children(CIRCLE_HEAD_SELECTOR)
            .should('have.text', 'head')

            .parent()
            .children(CIRCLE_TAIL_SELECTOR)
            .children(CIRCLE_CONTAINER_SELECTOR)
            .should('have.text', DEFAULT_LINKED_LIST[0])
            .children(CIRCLE_SELECTOR)
            .should('have.css', 'border', CHANGING_BORDER_STYLE);
        }
      });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@circles_containers')
      .should('have.length', DEFAULT_LINKED_LIST.length - 1)
      .first()
      .children(CIRCLE_SELECTOR)
      .should('have.css', 'border', DEFAULT_BORDER_STYLE)

      .parent()
      .children(CIRCLE_HEAD_SELECTOR)
      .should('have.text', 'head')

      .parent()
      .children(CIRCLE_TAIL_SELECTOR)
      .should('be.empty');
  });

  it('Проверка корректности удаления элемента из конца списка', () => {
    cy.clock();

    cy.get('@remove-from-tail-btn').click();

    cy.get('@circles_containers')
      .should('have.length', DEFAULT_LINKED_LIST.length)
      .each(($circle_container, index) => {
        if (index === DEFAULT_LINKED_LIST.length - 1) {
          cy.wrap($circle_container)
            .children(CIRCLE_SELECTOR)
            .should('have.css', 'border', DEFAULT_BORDER_STYLE)
            .should('have.text', '')

            .parent()
            .children(CIRCLE_HEAD_SELECTOR)
            .should('be.empty')

            .parent()
            .children(CIRCLE_TAIL_SELECTOR)
            .children(CIRCLE_CONTAINER_SELECTOR)
            .should(
              'have.text',
              DEFAULT_LINKED_LIST[DEFAULT_LINKED_LIST.length - 1]
            )
            .children(CIRCLE_SELECTOR)
            .should('have.css', 'border', CHANGING_BORDER_STYLE);
        }
      });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@circles_containers')
      .should('have.length', DEFAULT_LINKED_LIST.length - 1)
      .last()
      .children(CIRCLE_SELECTOR)
      .should('have.css', 'border', DEFAULT_BORDER_STYLE)

      .parent()
      .children(CIRCLE_TAIL_SELECTOR)
      .should('have.text', 'tail');
  });

  it('Проверка корректности удаления элемента из списка по индексу', () => {
    cy.clock();

    cy.get('@input-for-index').type('1');
    cy.get('@remove-by-index-btn').click();

    cy.get('@circles_containers')
      .should('have.length', DEFAULT_LINKED_LIST.length)
      .each(($circle_container, index) => {
        if (index === 0) {
          cy.wrap($circle_container)
            .children(CIRCLE_SELECTOR)
            .should('have.css', 'border', CHANGING_BORDER_STYLE)

            .parent()
            .children(CIRCLE_TAIL_SELECTOR)
            .should('be.empty');
        }

        if (index === 1) {
          cy.wrap($circle_container)
            .children(CIRCLE_SELECTOR)
            .should('have.css', 'border', DEFAULT_BORDER_STYLE)

            .parent()
            .children(CIRCLE_TAIL_SELECTOR)
            .should('be.empty');
        }
      });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@circles_containers')
      .should('have.length', DEFAULT_LINKED_LIST.length)
      .each(($circle_container, index) => {
        if (index === 0) {
          cy.wrap($circle_container)
            .children(CIRCLE_SELECTOR)
            .should('have.css', 'border', CHANGING_BORDER_STYLE)

            .parent()
            .children(CIRCLE_TAIL_SELECTOR)
            .should('be.empty');
        }

        if (index === 1) {
          cy.wrap($circle_container)
            .children(CIRCLE_SELECTOR)
            .should('have.css', 'border', DEFAULT_BORDER_STYLE)
            .should('have.text', '')

            .parent()
            .children(CIRCLE_TAIL_SELECTOR)
            .children(CIRCLE_CONTAINER_SELECTOR)
            .should('have.text', DEFAULT_LINKED_LIST[1])
            .children(CIRCLE_SELECTOR)
            .should('have.css', 'border', CHANGING_BORDER_STYLE);
        }
      });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@circles_containers')
      .should('have.length', DEFAULT_LINKED_LIST.length - 1)
      .first()
      .children(CIRCLE_SELECTOR)
      .should('have.text', DEFAULT_LINKED_LIST[0])
      .should('have.css', 'border', DEFAULT_BORDER_STYLE)

      .parent()
      .children(CIRCLE_HEAD_SELECTOR)
      .should('have.text', 'head');
  });
});
