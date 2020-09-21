// https://www.youtube.com/watch?v=RkBg0gDTLU8&list=PLN3n1USn4xlmyw3ebYuZmGp60mcENitdM&index=6&ab_channel=BenAwad

// https://raw.githubusercontent.com/ajzbc/kanye.rest/quotes/quotes.json

import React, { useState, useMemo, useCallback } from 'react';
import { useFetchWithoutTimeout } from './useFetch';

// useMemo: only when you feel there is lag.
// Returns a memoized value.
// Pass a “create” function and an array of dependencies.
// useMemo will only recompute the memoized value when one of the dependencies has changed.
// This optimization helps to avoid expensive calculations on every render.
// Remember that the function passed to useMemo runs during rendering.
// Don’t do anything there that you wouldn’t normally do while rendering.
// For example, side effects belong in useEffect, not useMemo.
// If no array is provided, a new value will be computed on every render.
// You may rely on useMemo as a performance optimization, not as a semantic guarantee.

// NOTE: Write your code so that it still works without useMemo — and then add it to optimize performance.



// Solution 2: READ BELOW FIRST
// const computeLongestWord = (inputData) => {
//   if (!inputData) {
//     return '';
//   }

//   console.log('computing longest word...');
//   let longestWord = '';
//   JSON.parse(inputData)
//     .forEach(sentence => sentence.split(' ')
//       .forEach(word => {
//         if (word.length > longestWord.length) {
//           longestWord = word;
//         }
//   }));
//   return longestWord;
// }

const AppUseMemo = () => {
  const [count, setCount] = useState(0);
  const { data } = useFetchWithoutTimeout('https://raw.githubusercontent.com/ajzbc/kanye.rest/quotes/quotes.json');

  // We will compute longest word from all quotes returned from the above api.

  // const computeLongestWord = (inputData) => {
  //   if (!inputData) {
  //     return '';
  //   }

  //   console.log('computing longest word...');
  //   let longestWord = '';
  //   JSON.parse(inputData)
  //     .forEach(sentence => sentence.split(' ')
  //       .forEach(word => {
  //         if (word.length > longestWord.length) {
  //           longestWord = word;
  //         }
  //   }));
  //   return longestWord;
  // };
  //
  // The above is a function that can do long computations.
  // We will use it like return (<div>{ computeLongestWord(data) }</div>)
  // So this is computed everytime. So to solve useMemo.
  // Step1: Adding the function to useMemo.
  // Now when you list the computeLongestWord as dependencies in useMemo.
  // Since this function is created on every render when functional component AppUseMemo renders.
  // As functional component will run again from line 1.
  // So when this computeLongestWord function gets created dependency changes
  // and we still run the function and we see log inside function computeLongestWord.
  // So useMemo has no effect.

  // Solutions:
  // Solution 1. Remove the function from dependency list.
  // const compute = useMemo(() => computeLongestWord, [data]);
  // Now computeLongestWord runs only on inital render. useMemo works.

  // Solution 2:
  // Remove the function from inside the component and put is outside the component
  // AppUseMemo.
  // Now it does not get created again as it is not part of AppUseMemo.
  // const compute = useMemo(() => computeLongestWord(data), [data, computeLongestWord]);
  // Now it can be there in dependencies.

  // Solution 3:
  // useCallback. This will re-create function only when its dependencies change.
  // Now you can list computeLongestWord as dependency and use memoized function inside
  // useMemo.

  const computeLongestWord = useCallback((inputData) => {
    if (!inputData) {
      return '';
    }

    console.log('computing longest word...');
    let longestWord = '';
    JSON.parse(inputData)
      .forEach(sentence => sentence.split(' ')
        .forEach(word => {
          if (word.length > longestWord.length) {
            longestWord = word;
          }
    }));
    return longestWord;
  }, []);
  // One Trick: When you see empty dependencies in useCallback
  // means you may move the function outside the component
  // and work with just the passed parameters. (Solution 2)
  // No dependency. Simple logic on the passed argument.
  // We are not accessing any property or function that relates to any state.
  // Now we can add computeLongestWord as dependency, as it is wrapped in useCallback.
  // And useCallback will memoize it.
  const compute = useMemo(() => computeLongestWord(data), [data, computeLongestWord]);

  return (
    <div>
      <div>{ count }</div>
      <button onClick={ () => setCount(count+1) }>Increment</button>
      <div>{ compute }</div>
    </div>
  );
}

export default AppUseMemo;

// Prefered Solution: 2. You may simply put function outside AppUseMemo
// as it avoid re-creation of function and no need for useCallback ie additional hook.
// Also since it is not dependendent on anything from state here, so can be put outside.

/* This is error:
React Hook "useMemo" cannot be called inside a callback.
React Hooks must be called in a React function component or a custom
React Hook function react-hooks/rules-of-hooks
const compute = useCallback(() => {
  useMemo(() => computeLongestWord(data), []);
}, []);
*/


// export default class AppUseMemo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 0
//     }
//     this.data = JSON.stringify(['Hello My name is Rock', 'And is awesome!']);
//   }

//   computeLongestWord = (inputData) => {
//     if (!inputData) {
//       return '';
//     }

//     console.log('computing longest word...');
//     let longestWord = '';
//     JSON.parse(inputData)
//       .forEach(sentence => sentence.split(' ')
//         .forEach(word => {
//           if (word.length > longestWord.length) {
//             longestWord = word;
//           }
//     }));
//     return longestWord;
//   }

//   setCount = () => {
//     this.setState(state => ({ count: state.count++ }));
//   }

//   render() {
//     return (
//       <div>
//         <div>{ this.state.count }</div>
//         <button onClick={ () => this.setCount() }>Increment</button>
//         <div>{ this.computeLongestWord(this.data) }</div>
//       </div>);
//   }

// }



