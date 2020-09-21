// https://www.youtube.com/watch?v=ommC6fS1SZg&list=PLN3n1USn4xlmyw3ebYuZmGp60mcENitdM&index=4&ab_channel=BenAwad

// Dummy api: http://numbersapi.com/34
// Give a number at end and returns a fact about the number.
// Fires: SYNCHORNOUSLY synchronously

// The signature is identical to useEffect,
// but it fires synchronously after all DOM mutations.
// Use this to read layout from the DOM and synchronously re-render.
// Updates scheduled inside useLayoutEffect will be flushed synchronously,
// before the browser has a chance to paint.

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useForm } from './useForm';
import { useFetchWithoutTimeout } from './useFetch';
import HelloWithLayoutEffect from './HelloWithLayoutEffect';

const AppUseLayoutEffect = () => {
  const formData = {
    email: '',
    password: ''
  }
  const [values, handleChange] = useForm(formData);
  const [count, setCount] = useState(JSON.parse(localStorage.getItem('count')) || 0);
  const { data, loading } = useFetchWithoutTimeout(`http://numbersapi.com/${count}`);
  useEffect(() => {
    localStorage.setItem('count', JSON.stringify(count));
  }, [count]);

  const inputRef = useRef();
  const [showHellow, setShowHello] = useState(true);

  useLayoutEffect(() => {
    console.log(inputRef.current.getBoundingClientRect());
  }, []);

  return (
    <div>
      <input
        name="email"
        placeholder="email"
        ref={ inputRef }
        value={ values.email }
        onChange={ handleChange } />
      <input
        name="password"
        type="password"
        placeholder="password"
        value={ values.password }
        onChange={ handleChange } />
      <button onClick={
        e => {
          inputRef.current.focus();
        }
      }>FocusEmail</button>
      <button onClick={ e => { setShowHello(!showHellow); } }>Show HelloComponent</button>
      { showHellow &&  <HelloWithLayoutEffect/> }
    </div>
  );
}

export default AppUseLayoutEffect;