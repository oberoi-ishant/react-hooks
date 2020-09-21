import React, { useLayoutEffect, useState, useRef } from 'react';

export const useMeasure = (dependencies) => {
  const [rect, setRect] = useState({});
  const myRef = useRef();

  useLayoutEffect(() => {
    setRect(myRef.current.getBoundingClientRect());
  }, dependencies);

  return [myRef, rect];
};