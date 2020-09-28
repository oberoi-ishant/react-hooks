import React, { useEffect, useState, useRef } from 'react';

export const useFetchWithoutTimeout = (url) => {
  const isCurrentComponnentAvailable = useRef(true);

  useEffect(() => {
    return () => {
      // When component Unmounts.
      // set boolean: false ie component not avilable
      isCurrentComponnentAvailable.current = false;
    }
  }, []);

  const [state, setState] = useState({ data: null, loading: true })
  useEffect(() => {
    // Set before fetch starts
    setState({ data: state.data, loading: true });
    fetch(url)
      .then(x => x.text())
      .then(y => {
        if (isCurrentComponnentAvailable.current) {
          setState({ data: y, loading: false });
        }
      });
  }, [url, setState]); // you can add functions as dependencies. (setState)

  return state;
};


export const useFetchWithuseRef = (url) => {
  // Trick:
  // check if the component is avilable using a ref.
  // the update the state else, you error
  // unable to update state on an unmounted component.
  const isCurrentComponnentAvailable = useRef(true);

  useEffect(() => {
    return () => {
      // When component Unmounts.
      // set boolean: false ie component not avilable
      console.log('Unmounts');
      isCurrentComponnentAvailable.current = false;
    }
  }, []);

  const [state, setState] = useState({ data: null, loading: true })
  useEffect(() => {
    // Set before fetch starts
    setState({ data: state.data, loading: true });
    fetch(url)
      .then(x => x.text())
      .then(y => {
        setTimeout(() => {
          if (isCurrentComponnentAvailable.current) {
            setState({ data: y, loading: false });
          }
        }, 2000); // Just to minic setState with some lag
      });
  }, [url, setState]); // you can add functions as dependencies. (setState)

  return state;
};


export const useFetch = (url) => {
  const [state, setState] = useState({ data: null, loading: true })
  useEffect(() => {
    // Set before fetch starts
    setState({ data: state.data, loading: true });
    fetch(url)
      .then(x => x.text())
      .then(y => {
        setState({ data: y, loading: false });
      });
  }, [url, setState]); // you can add functions as dependencies. (setState)

  return state;

  // useEffect(() => {
  //   async function fun() {
  //     const res = fetch(url);
  //     res
  //       .then(x => x.text())
  //       .then(y => {
  //         console.log(y);
  //       });
  //   };
  //   fun();
  // }, []);
};