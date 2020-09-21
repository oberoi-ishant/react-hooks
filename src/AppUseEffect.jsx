// https://www.youtube.com/watch?v=9xhKH43llhU&list=PLN3n1USn4xlmyw3ebYuZmGp60mcENitdM&index=2&ab_channel=BenAwad
// https://www.youtube.com/watch?v=j1ZRyw7OtZs&list=PLN3n1USn4xlmyw3ebYuZmGp60mcENitdM&index=2&ab_channel=BenAwad

// Dummy api: http://numbersapi.com/34
// Give a number at end and returns a fact about the number.
// Fires: ASYNCHORNOUSLY a-synchronously

import React, { useState, useEffect } from 'react';
import { useForm } from './useForm';
import { useFetch } from './useFetch';

const AppUseEffect = () => {
  const formData = {
    email: '',
    password: ''
  }
  const [values, handleChange] = useForm(formData);
  const [count, setCount] = useState(JSON.parse(localStorage.getItem('count')) || 0);
  const { data, loading } = useFetch(`http://numbersapi.com/${count}`);
  useEffect(() => {
    localStorage.setItem('count', JSON.stringify(count));
  }, [count]);

  // Effects great place to add event listeners

  // useEffect(() => {
  //   console.log('render');
  //   return () => console.log('cleanup');
  // }, []);

  // // Effects run in the order they are declared in the code.
  // // cleanup will run even with change in the props specified, everytime prop changes.
  // // here cleanup runs everytime the email value changes.
  // useEffect(() => {
  //   console.log('render');
  //   return () => console.log('cleanup');
  // }, [values.email]);

  // useEffect(() => {
  //   const onMousemove = (e) => console.log(e);
  //   window.addEventListener('mousemove', onMousemove);
  //   return () => window.removeEventListener('mousemove', onMousemove);
  // }, []);

  return (
    <div>
      <input
        name="email"
        placeholder="email"
        value={ values.email }
        onChange={ handleChange } />
      <input
        name="password"
        type="password"
        placeholder="password"
        value={ values.password }
        onChange={ handleChange } />
      <button onClick={ e => setCount(count + 1) }>Increment</button>
      <div>
        { loading && 'Loading...' }
        { !loading && <span>{ data }</span> }
      </div>
    </div>
  );
}

export default AppUseEffect;