// https://blog.logrocket.com/how-to-get-previous-props-state-with-react-hooks/

// Trying to get the previous props in Function React Components.

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

const usePrevious = (value) => {
  const ref = useRef();

  // The callback function passed in the useEffect will run after the
  // render function. This is how useEffect works.
  // Keep in mind that useRef doesn’t notify you when its content changes.
  // Mutating the .current property doesn’t cause a re-render.

  // To understand, read this:
  // https://blog.logrocket.com/how-to-get-previous-props-state-with-react-hooks/
  useEffect(() => {
    console.log('Ref.current', ref.current);
    ref.current = value;
  }); // Running effect on every render

  return ref.current;
};

const AppUsePrevious = () => {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <div>
      <div>
        <span>Previous Count { previousCount }</span>
      </div>
      <div>
        <span>Current Count { count }</span>
      </div>
      <button onClick={ e => setCount(count+1) }>Increment</button>
    </div>
  );
};

export default AppUsePrevious;