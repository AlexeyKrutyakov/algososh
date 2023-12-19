import styles from './list-page.module.css';
import React from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { ElementStates } from '../../types/element-states';

export const ListPage: React.FC = () => {
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
        <Circle head={'head'} index={0} letter="0" />
        <ArrowIcon />
        <Circle
          index={1}
          head={
            <Circle letter="85" state={ElementStates.Changing} isSmall={true} />
          }
          letter="34"
        />
        <ArrowIcon />
        <Circle index={2} letter="8" />
        <ArrowIcon />
        <Circle index={3} letter="1" tail={'tail'} />
      </div>
    </SolutionLayout>
  );
};
