// https://www.youtube.com/watch?v=W6AJ-gRupCs&list=PLN3n1USn4xlmyw3ebYuZmGp60mcENitdM&index=3&ab_channel=BenAwad

import React, { useState, useEffect, useRef } from 'react';
import { useForm } from './useForm';
import { useFetch } from './useFetch';
import Hello from './Hello';

const AppUseRef = () => {
  const formData = {
    email: '',
    password: ''
  }
  const [values, handleChange] = useForm(formData);
  const [showHellow, setShowHello] = useState(false);
  const inputRef = useRef();
  // Storing a function in ref.
  const myFun = useRef(() => console.log('My Function'));
  // useRef can be used to store anything.
  // like any data. You can use them like instance variables in class components.
  // they do not cause re-renders
  // check Hello.jsx useFetchWithuseRef

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
          myFun.current();
        }
      }>FocusEmail</button>
      {
        /* So now on focus, it also runs a function. Just a demo to show
          functions in useRef. You can store anything in ref. Objects, arrays etc.
          Treat them as class/instance variables.
          They do not produce re-render */
      }
      <button onClick={ e => { setShowHello(!showHellow); } }>Show HelloComponent</button>
      { showHellow &&  <Hello/> }
    </div>
  );
}

export default AppUseRef;

// How can I measure a DOM node?
// One rudimentary way to measure the position or size of a DOM node is to use a callback ref.
// React will call that callback whenever the ref gets attached to a different node.
// https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
// Basically we are using a callback function to give to the ref like we do in
// classes. Here we use useCallback to memoize that callback function. And this
// function recieves the reference to the DOM node.

// function MeasureExample() {
//   const [height, setHeight] = useState(0);

//   const measuredRef = useCallback(node => {
//     if (node !== null) {
//       setHeight(node.getBoundingClientRect().height);
//     }
//   }, []);

//   return (
//     <>
//       <h1 ref={measuredRef}>Hello, world</h1>
//       <h2>The above header is {Math.round(height)}px tall</h2>
//     </>
//   );
// }
