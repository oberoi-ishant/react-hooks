// https://reactjs.org/docs/hooks-reference.html#usecallback
// https://www.youtube.com/watch?v=-Ls48dd-vJE&list=PLN3n1USn4xlmyw3ebYuZmGp60mcENitdM&index=5&ab_channel=BenAwad

import React, { useState, useCallback } from 'react';
import HelloUseCallback from './HelloUseCallback';
import SquareUseCallback from './SquareUseCallback';

// useCallback: Returns a memoized callback.
// useCallback will return a memoized version of the callback
// that only changes if one of the dependencies has changed.
// This is useful when passing callbacks to optimized
// child components that rely on reference equality to
// prevent unnecessary renders (e.g. shouldComponentUpdate).
// useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).

// For a simple function like const fun = () => { .... } inside functional React Component.
// This function is re-created every time parent component renders.
// As parent is functional component, it will render from line 1 again.
// So these functions inside parent like const fun = () => { .... } are re-created everytime.
// To avoid this re-creation everytime, use useCallback. This gives the power to
// re-create these functions only when the dependencies change, else the memoized version
// of function is used.

// Coupled with when you now want to pass this function to a child optimized with React.memo.
// React.memo will only shallowly compare complex objects in the props object.
// So to keep its props same, on re-render we give it memoized function(useCallback)
// so that React.memo has same props and it skips rendering. Uses the last render value.
// Thereby boots performance.
// So
// When child component is memoized using React.memo.
// 1. Create a memoized function using useCallback(in parent) so that is re-created only if its
// dependencies change. This is to be passed as prop to child.
// 2. Pass this function to the memoized child component(React.memo()=> {}) as reference.
// If you create it like () => funCreatedWithUseCallback(), You are still creating
// a new anonymous function with
// () => {}. So this prop will change for React.memo child component and it will re-render
// everytime. So pass this memoized function(created with useCallback) to child directly
// funName= { memoizedFun }.
// Now Child re-renders only when the memoized functions dependency changes.

const AppUseCallback = () => {
  const [count, setCount] = useState(0);

  /*
    Now here, we use useCallback to create the function with
    its depedencies. Note: we use the updater/functional form
    of setState.
    If we do it like setCount(count => count+1);, then we are dependent on
    count. Everytime count changes again re-render happens. Therefore
    we use function form and say dependency is just setCount function, which
    is not changing. So coupled with React.memo, now the component HelloUseCallback
    renders only when parent is rendered initally.
    And not re-render on every render of parent.
    Also now we understand, why we add functions to hooks dependencies.
  */


  // const increment = useCallback(() => {
  //   setCount(count => count+1);
  // }, [count, setCount]);

  // Functional form of setState, using the previous state value.
  // We can also pass args to useCallback.
  // Also return a value if required.(rare case)
  // const increment = useCallback((step=0) => {
  //   setCount(count => count+step);
  // }, [setCount]);

  const increment = useCallback((step=0) => {
    setCount(count => count+step);
  }, [setCount]);

  // Another option to use useCallback is inside useEffect
  // when you have some logic depending on a function.
  // You don't want to run the effect everytime based on function.
  // Example:
  // useEffect(() => {}, [increment]); // using useCallback in increment.

  const favNumbers = [7, 21, 37];

  return (
    <div>
      <span>{ count }</span>
      {
        <HelloUseCallback increment={ increment }/>
        /* now the child component HelloUseCallback skip re-render on click
        of increment button */
      }
      {  /*
          <HelloUseCallback
            increment={ () => increment(5) } // creating a new function on every render
          />
          Since HelloUseCallback is React.memo. We need to keep its
          props same after intial render to avoid re-render.
          Here we create increment prop everytime with a new function.
          Thus HelloUseCallback will re-render. */
      }
      {
        /* If we do this, the function is created everytime.
          So even if the component HelloUseCallback uses React.memo
          it will still be re-rendered as this props changes with new
          function everytime.
          <HelloUseCallback
            increment={ () => setCount(count+1) }/> // creating a new function on every render
        */
      }
      { // Same logic as above.
        favNumbers.map(
        (n) => {
          return (
            <SquareUseCallback
              increment={ increment }
              n={ n }
              key={ n } />
            )
        })
        /*
         Since SquareCallback is Rect.memo it will check its props. If they change,
         it will re-render. So here we keep props same after inital render.
         Pass the memoized function increment directly and call it from
         SquareCallback. onClick={ () => increment(n) }
         Thus the function increment is not created everytime.
         And SquareCallback is not re-rendered on every click of button inside
         SquareCallback.
        */
      }
      {
        // favNumbers.map(
        // (n) => {
        //   return (
        //     <SquareUseCallback
        //       increment={ () => increment(n) } // creating a new function on every render
        //       n={ n }
        //       key={ n } />
        //     )
        // })
        /* And in SquareCallback -> onClick={ increment }
        Since SquareCallback is Rect.memo it will check its props. If they change,
        it will re-render. So here we create a NEW function everytime for increment.
        This props change, and even with React.memo SquareCallback is re-rendered for
        all the numbers in favNumbers.
        SquareCallback is going to get rendered thrice! for every item in favNumbers.
        This is because the function increment above is created everytime. */
      }

    </div>
  );
};

export default AppUseCallback;

// It can also be used with ref
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

