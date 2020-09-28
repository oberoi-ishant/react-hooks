import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useFetchWithuseRef } from './useFetch';
import { useMeasure } from './useMeasure';

const HelloWithLayoutEffect = () => {
  const renders = useRef(0); // Storing an initial value 0
  console.log(renders.current++);

  const [count, setCount] = useState(JSON.parse(localStorage.getItem('count')) || 0);
  const { data, loading } = useFetchWithuseRef(`http://numbersapi.com/${count}`);
  useEffect(() => {
    localStorage.setItem('count', JSON.stringify(count));
  }, [count]);


  /* Created custom hook useMeasure for the below code */
  // const numberMsgRef = useRef();
  // const [rect, setRect] = useState({});
  // // Since we want to be synchronous with DOM update, we use useLayoutEffect
  // useLayoutEffect(() => {
  //   setRect(numberMsgRef.current.getBoundingClientRect());
  // },[data]); // Whenever we hit increment, get new data, then trigger the effect.
  /* Created custom hook useMeasure for the above code */

  const [numberMsgRef, rect] = useMeasure([data]);
  // Pass empty array for calling on just mount

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div ref={ numberMsgRef }>
          { !data ? 'loading...' : data }
        </div>
      </div>
      <pre>{ JSON.stringify(rect, null, 2) }</pre>
      <div>
        <button onClick={ e => setCount(count + 1) }>Increment</button>
      </div>
    </div>
  );
}

export default HelloWithLayoutEffect;