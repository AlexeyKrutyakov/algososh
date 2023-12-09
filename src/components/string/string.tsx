import styles from './string.module.css';
import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';

export const StringComponent: React.FC = () => {
  const [word, setWord] = useState('');

  // const { values, handleChange } = useForm({
  //   word: '',
  // });

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const str = document.querySelector('input')?.value;
    str && setWord(str);
    console.log(str);
  };

  return (
    <SolutionLayout title="Строка">
      <form
        action="reverseWord"
        className={styles.form}
        onSubmit={submitHandler}
      >
        <Input
          name="stringInput"
          maxLength={11}
          isLimitText={true}
          extraClass={styles.input}
        />
        <Button text="Развернуть" type="submit" />
      </form>
    </SolutionLayout>
  );
};
