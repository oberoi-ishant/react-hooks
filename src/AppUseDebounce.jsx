import React, { useState, useEffect, useCallback } from 'react';
import { useFetch } from './useFetch';
import _ from "lodash";

// Test api: https://randomuser.me/api
// https://blog.ezrabowman.com/debounce-with-react-hooks-3/
// https://medium.com/@gabrielmickey28/using-debounce-with-react-components-f988c28f52c1

// Note useFetch:
// React Hook "useFetch" cannot be called inside a callback.
// React Hooks must be called in a React function component or a custom React Hook function

// // OPTION 1: DEBOUNCE FUNCTION
// const AppUseDebounce = () => {
//   const [val, setVal] = useState(0);
//   const [dVal, setDVal] = useState(0); // debounced value
//   const [state, setState] = useState({ data: null, loading: true });


//   /* TRICK:
//   How debounce works?
//   We create a function once using call to debounce() and if that function is called
//   again within the within the wait time, a new timeout is initiated.
//   So it remembers the last timeout value along with other private variables.
//   In functional react components, if we just create the debounce function myFn(below)
//   , it will be re-created fresh on every render. Hence if you directly call
//   it in handleChange myFn(e.target.value) it will be fired for all changing input values.

//   So idea is to stop re-creation of function. So use hook useCallback.
//   This now memoizes the debounce function. Same fun is used for next render.
//   Hence now it works as expected. */

//   // Option: 1
//   // const myfn = _.debounce((newVal) => {
//   //   console.log('Hi');
//   //   setState({ data: null, loading: true })
//   //   fetch(`http://numbersapi.com/${newVal}`)
//   //     .then(x => x.text())
//   //     .then(y => {
//   //       setState({ data: y, loading: false });
//   //       setDVal(newVal);
//   //     });
//   // }, 2000);

//   /* here also we are re-creating the debounce function inside callback.
//   const fn = _.debounce(...) and calling it fn(). Though the function is
//   memoized with useCallback but when it fires, inside we create a new fn everytime
//   using debounce. So wrong implementation.  */
// Option: 2
// const makeCall = useCallback((newVal) => {
//   const fn = _.debounce((newVal) => {
//     console.log('Hi')
//     setState({ data: null, loading: true })
//     fetch(`http://numbersapi.com/${newVal}`)
//       .then(x => x.text())
//       .then(y => {
//         setState({ data: y, loading: false });
//         setDVal(newVal);
//       });
//   }, 2000);
//   fn(newVal);
// }, []); // Only on mount component

//   Option: 3
//   Create the myfn function EVERYTIME and useCallback to memoize the
//   result of it _.debounce() result. ie memoize a anonymous function
//   that calls return of myfn() essentially return of debounce().
//   So fn2 reference is cached inside this anonymous function
//   after the initial render.
//   Here we are
//   using this same fn2 definition on re-render.
//   Check 'outside debounce' is logged on everytime but
//   'inside debounce' is logged only after debounce timeout.

// const myfn = () => {
//   console.log('outside debounce');
//   return _.debounce((newVal) => {
//     console.log('inside debounce');
//     setState({ data: null, loading: true });
//     fetch(`http://numbersapi.com/${newVal}`)
//       .then(x => x.text())
//       .then(y => {
//         setState({ data: y, loading: false });
//         setDVal(newVal);
//       });
//   }, 2000);
// };

// const fn2 = myfn();

// const makeCall = useCallback((newVal) => { fn2(newVal);}, []); // Only on first render

// Option: 4
// TRICK: the return function from debounce should not be created
// everytime. It should be memoized so that it remembers it timeout and other private
// variables.
// const myFn = _.debounce((newVal) => {
//   console.log('inside debounce');
//   setState({ data: null, loading: true });
//   fetch(`http://numbersapi.com/${newVal}`)
//     .then(x => x.text())
//     .then(y => {
//       setState({ data: y, loading: false });
//       setDVal(newVal);
//     });
// }, 2000);
// const makeCall = useCallback((newVal) => myFn(newVal), []); // Only on mount component

//   Option: 5
//   /* directly CALL debounce inside useCallback and memoize the return
//   function from debounce.
//   note: useCallback(() => {}, []) we are using debounce instead of anonymous
//   callback function. useCallback(debounce(), []).
//   So debounce is called and its return function is replacing the usual
//   anonynous function (() => {}) inside the useCallback. And this return
//   function definition is memoized.
//   Same concept as the definition with anonymous function is memoized
//   by useCallback. So this part _.debounce((newVal)...) is created once
//   and the returned function is used everytime same as myfn from Option 3.
//   As the dependencies are [] */

  // NOTE: If you change the dependencies of useCallback to [someVar] or omit
  // the empty array altogether(useCallback(() => {})), you are back to re-creating
  // it every time.
  // Now same behaviour as Option 1 and 2.
//   const makeCall = useCallback(_.debounce((newVal) => {
//     console.log('Hi');
//     setState({ data: null, loading: true });
//     fetch(`http://numbersapi.com/${newVal}`)
//       .then(x => x.text())
//       .then(y => {
//         setState({ data: y, loading: false });
//         setDVal(newVal);
//       });
//   }, 2000), []); // Only on mount component

//   return (
//     <div>
//       <input
//         type="number"
//         placeholder="enter number"
//         value={ val }
//         onChange={ e => {
//           setVal(e.target.value);
//           makeCall(e.target.value);
//         }} />
//       <div>
//         { state.loading && 'loading...' }
//         { !state.loading && state.data }
//       </div>
//       <div>{ dVal }</div>
//     </div>
//   );
// }



// OPTION 2: DEBOUNCE VALUE
// Trick: delay setting a state value or prop.
// Then you can use it to fire api or perform action
// after the delay
const useDebounceVal = ({ value, delay }) => {
  const [dVal, setDVal] = useState(value);

  const deb = useCallback(_.debounce((value) => {
    console.log('value in callback', value);
    setDVal(value);
  }, delay), []); // Only on mount component

  useEffect(() => {
    deb(value);
  }, [value, delay]);

  return dVal;
}

const AppUseDebounce = () => {
  const [val, setVal] = useState(0);
  const debounceVal = useDebounceVal({ value: val, delay: 2000 });
  const { data, loading } = useFetch(`http://numbersapi.com/${debounceVal}`);

  return (
    <div>
      <input
        type="number"
        placeholder="enter number"
        value={ val }
        onChange={ e => {
          setVal(e.target.value);
        }} />
      <div>
        { loading && 'loading...' }
        { !loading && data }
      </div>
      <div>{ debounceVal }</div>
    </div>
  );
}

// Class Component Debounce: EASY
// class AppUseDebounce extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       val: '',
//       data: null,
//       loading: true
//     }
//   }

//   setVal = (val) => {
//     this.setState(state => ({...state, val: val}));
//   }

//   makeCall = _.debounce((newVal) => {
//     console.log('Hi');
//     fetch(`http://numbersapi.com/${newVal}`)
//       .then(x => x.text())
//       .then(y => {
//         this.setState(state => ({ ...state, data: y, loading: false }));
//       });
//   }, 2000);

//   render() {
//     return (
//       <div>
//         <input
//           type="number"
//           placeholder="enter number"
//           value={ this.state.val }
//           onChange={ e => {
//             this.setVal(e.target.value);
//             this.makeCall(e.target.value);
//           }} />
//         <div>
//           { this.state.loading && 'loading...' }
//           { !this.state.loading && this.state.data }
//         </div>
//       </div>
//     );
//   }
// }


export default AppUseDebounce;