import React, { useState } from 'react';
import { useFormProps } from '../types/hooks';

export const useForm = (inputValues: useFormProps) => {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
};
