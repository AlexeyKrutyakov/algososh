import TestRenderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from './button';

describe('Рендеринг кнопки', () => {
  it('Кнопка с текстом рендерится без ошибок', () => {
    const tree = TestRenderer.create(
      <Button
        type="submit"
        text="Развернуть"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Кнопка без текста рендерится без ошибок', () => {
    const tree = TestRenderer.create(
      <Button
        type="submit"
        text="Развернуть"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Заблокированная кнопка рендерится без ошибок', () => {
    const tree = TestRenderer.create(
      <Button
        type="submit"
        text="Развернуть"
        disabled="true"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Кнопка с индикацией загрузки рендерится без ошибок', () => {
    const tree = TestRenderer.create(
      <Button
        type="submit"
        text="Развернуть"
        isLoader={true}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Нажатие на кнопку вызывает коллбэк', () => {
    let testText = '';
    const callback = () => {
      testText = 'correct';
    };

    render(
      <Button
        type="submit"
        text="Развернуть"
        onClick={callback}
      />
    );

    const btn = screen.getByText(/Развернуть/i);

    fireEvent.click(btn);

    expect(testText).toBe('correct');
  });
});
