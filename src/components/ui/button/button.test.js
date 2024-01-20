import TestRenderer from 'react-test-renderer';

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
});
