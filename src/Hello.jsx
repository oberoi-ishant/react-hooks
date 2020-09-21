import React, { useRef, useState, useEffect } from 'react';
import { useFetchWithuseRef } from './useFetch';

const Hello = () => {
  const renders = useRef(0); // Storing an initial value 0
  console.log(renders.current++);

  const [count, setCount] = useState(JSON.parse(localStorage.getItem('count')) || 0);
  const { data, loading } = useFetchWithuseRef(`http://numbersapi.com/${count}`);
  useEffect(() => {
    localStorage.setItem('count', JSON.stringify(count));
  }, [count]);
  return (
    <div>
      <div>
        { loading && 'Loading...' }
        { !loading && <span>{ data }</span> }
      </div>
      <button onClick={ e => setCount(count + 1) }>Increment</button>
    </div>
  );
}

export default Hello;