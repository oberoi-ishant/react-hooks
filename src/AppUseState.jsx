// https://www.youtube.com/watch?v=9xhKH43llhU&list=PLN3n1USn4xlmyw3ebYuZmGp60mcENitdM&index=2&ab_channel=BenAwad
// https://www.youtube.com/watch?v=j1ZRyw7OtZs&list=PLN3n1USn4xlmyw3ebYuZmGp60mcENitdM&index=2&ab_channel=BenAwad

import React, { useState } from 'react';
import { useForm, useFormValidations } from './useForm';

const AppUseState = () => {
  const formData = {
    email: '', password: ''
  }
  const [values, handleChange] = useForm(formData);
  const [errors, handleValidation] = useFormValidations();

  const showErros = () => {
    const errMsgs = [];
    for (let name in errors) {
      errMsgs.push(`${name}: ${errors[name]}`);
    }
    return errMsgs.join(' ');
  }

  return (
    <div>
      <input
        name="email"
        placeholder="email"
        value={ values.email }
        onChange={
          (e) => {
            handleChange(e);
            handleValidation(e)
          }
        } />
      <input
        name="password"
        type="password"
        placeholder="password"
        value={ values.password }
        onChange={
          (e) => {
            handleChange(e);
            handleValidation(e);
          }
        } />
      <div>
      <div>
        { showErros() }
      </div>
      </div>
    </div>
  );
}


// const AppUseState = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   return (
//     <div>
//       <input
//         name="email"
//         placeholder="email"
//         value={ email }
//         onChange={ e => setEmail(e.target.value) } />
//       <input
//         name="password"
//         type="password"
//         placeholder="password"
//         value={ password }
//         onChange={ e => setPassword(e.target.value) } />
//     </div>
//   );
// }


// const AppUseState = () => {

//   const initialState = {
//     count: 0,
//     name: 'useState'
//   };

//   const [state, setCurrentState] = useState(initialState);

//   const updateCount = (e) => {
//     setCurrentState(currentState => ({
//       ...currentState,
//       count: currentState.count + 1
//     }));
//   }

//   return (
//     <div>
//       <div>Count { state.count }</div>
//       <div>Name: { state.name }</div>
//       <button onClick={ (e) => updateCount(e) }>Increment</button>
//     </div>
//   );
// }

export default AppUseState;