import styles from './list-page.module.css';
import React, { useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle, CircleProps } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { ElementStates } from '../../types/element-states';
import { HEAD, TAIL } from '../../constants/element-captions';

export const ListPage: React.FC = () => {
  const [elements, setElements] = useState<CircleProps[]>([]);
  const initialElements = [
    {
      index: 0,
      head: HEAD,
      letter: '0',
    },
    {
      index: 1,
      letter: '34',
    },
    {
      index: 2,
      letter: '8',
    },
    {
      index: 3,
      letter: '8',
      tail: TAIL,
    },
  ];

  useEffect(() => {
    setElements([...initialElements]);
    // eslint-disable-next-line
  }, []);

  return (
    <SolutionLayout title="Связный список">
      <form name="controls_value" className={styles.controls_value}>
        <Input
          extraClass={styles.input}
          placeholder="Введите значение"
          type="text"
          isLimitText={true}
          maxLength={4}
        />
        <Button
          extraClass={styles.button_top}
          isLoader={false}
          text="Добавить в head"
        />
        <Button extraClass={styles.button_top} text="Добавить в tail" />
        <Button extraClass={styles.button_top} text="Удалить из head" />
        <Button extraClass={styles.button_top} text="Удалить из tail" />
      </form>
      <form name="controls_index" className={styles.controls_index}>
        <Input extraClass={styles.input} placeholder="Введите индекс" />
        <Button extraClass={styles.button_bot} text="Добавить по индексу" />
        <Button extraClass={styles.button_bot} text="Удалить по индексу" />
      </form>
      <div className={styles.scheme}>
        {elements.map((element, index) => {
          return (
            <article key={index} className={styles.article}>
              <Circle
                index={element.index}
                letter={element.letter}
                head={element.head}
                tail={element.tail}
                state={element.state}
              />
              {index !== elements.length - 1 && <ArrowIcon />}
            </article>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
