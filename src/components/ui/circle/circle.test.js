import TestRenderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types';

describe('Рендеринг компонента Circle', () => {
  it('Circle без буквы отрисовывается без ошибок', () => {
    const tree = TestRenderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с буквами отрисовывается без ошибок', () => {
    const tree = TestRenderer.create(<Circle letter="ABC" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с head отрисовывается без ошибок', () => {
    const tree = TestRenderer.create(
      <Circle
        letter="ABC"
        head="HEAD"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с react-элементом в head отрисовывается без ошибок', () => {
    const tree = TestRenderer.create(
      <Circle
        letter="ABC"
        head={<Circle letter="R_H" />}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с tail отрисовывается без ошибок', () => {
    const tree = TestRenderer.create(
      <Circle
        letter="ABC"
        tail="TAIL"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с react-элементом в tail отрисовывается без ошибок', () => {
    const tree = TestRenderer.create(
      <Circle
        letter="ABC"
        tail={<Circle letter="R_T" />}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с index отрисовывается без ошибок', () => {
    const tree = TestRenderer.create(
      <Circle
        letter="ABC"
        index="1"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с пропом isSmall === true отрисовывается без ошибок', () => {
    const tree = TestRenderer.create(
      <Circle
        letter="ABC"
        isSmall={true}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle в состоянии default отрисовывается без ошибок', () => {
    const tree = TestRenderer.create(
      <Circle
        letter="ABC"
        state={ElementStates.Default}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle в состоянии changing отрисовывается без ошибок', () => {
    const tree = TestRenderer.create(
      <Circle
        letter="ABC"
        state={ElementStates.Changing}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle в состоянии modified отрисовывается без ошибок', () => {
    const tree = TestRenderer.create(
      <Circle
        letter="ABC"
        state={ElementStates.Modified}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
