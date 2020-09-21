import React, { useState } from 'react';

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    e => {
      setValues({
        ...values,
        [e.target.name]: [e.target.value]
      })
    }
  ];
}

// Adding Validations on form fields
export const useFormValidations = () => {
  const [errors, setValues] = useState({});

  const checkLength = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    if (val.length <= 2) {
      errors[name] = 'length too short'
    } else {
      delete errors[name];
    }
  }

  return [
    errors,
    checkLength
  ];
}
