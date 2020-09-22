// https://www.youtube.com/watch?v=wcRawY6aJaw&list=PLN3n1USn4xlmyw3ebYuZmGp60mcENitdM&index=7

import React, { useReducer, useState, useCallback } from 'react';
import { useCountRenders } from './useCountRenders';

// Keeping reducer outside the component here.
// Reducer should return the state.

// https://github.com/immerjs/use-immer
// A lib to help manage complex state with useReducer/useState.

function reducer (state, action) {
  switch(action.type) {
    case 'add-todo':
      return {
        ...state,
        todos: [...state.todos, { text: action.text, completed: false }],
        todosCount: state.todosCount + 1
      };
    case 'toggle-todo':
      return {
        ...state,
        todos: state.todos.map( // map creates new object. Immutability
          (t, idx) => action.index === idx ? { ...t, completed: !t.completed } : t),
      }
    default:
      return state;
  }
}

// Lazy initialization: Use init function for lazy state initialization
// Remember: If the init function accepts an argument,
// you need set the argument as the second value in useReducer
// while using init function for lazy initialization of the state.
// useReducer(reducer, initialArgument, init);

// Example: Prefered Approach: Passing 'dispatch' to child Todo
const Todo = React.memo(({ idx, todo, dispatch }) => {
  useCountRenders();
  return (
    <div
      key={ idx }
      style={ { 'textDecoration': todo.completed ? 'line-through' : '' }  }
      onClick={ e => dispatch({ type: 'toggle-todo', index: idx }) }>
      { todo.text }
    </div>
  );
});

const initialArgument = {
  todos: [{ text: 'initial state todo', completed: true }],
  todosCount: 1
};
const init = (initialArgument) => initialArgument;
const AppUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialArgument, init);
  const [text, setText] = useState('');
  const { todos, todosCount } = state;

  const getTodos = () => {
    return todos.map(
      (t, idx) => (
        <Todo
          idx={ idx }
          todo={ t }
          dispatch={ dispatch } />
          // Passing dispatch to child component instead of a callback
          // React guarantees that dispatch function identity is stable and won’t
          // change on re-renders.
          // This is why it’s safe to omit from the useEffect or useCallback dependency list.
        )
      );
  }

  return (
    <div>
      <div>todosCount: { todosCount }</div>
      <form onSubmit={ e => {
        e.preventDefault();
        dispatch({ type: 'add-todo', text });
        setText('')
      }}>
        <input
          type="text"
          name="text"
          value={ text }
          onChange={ e => setText(e.target.value) } />
      </form>
      {/*<pre>{ JSON.stringify(todos, null, 2) }</pre>*/}
      { getTodos() }
    </div>
  );
}

// Example: Passing 'callback' to child Todo
// const Todo = React.memo(({ idx, todo, toggleTodo }) => {
//   useCountRenders();
//   return (
//     <div
//       key={ idx }
//       style={ { 'textDecoration': todo.completed ? 'line-through' : '' }  }
//       onClick={ e => toggleTodo({type: 'toggle-todo', index: idx}) }>
//       { todo.text }
//     </div>
//   );
// });

// const initialArgument = {
//   todos: [{ text: 'initial state todo', completed: true }],
//   todosCount: 1
// };
// const init = (initialArgument) => initialArgument;
// const AppUseReducer = () => {
//   const [state, dispatch] = useReducer(reducer, initialArgument, init);
//   const [text, setText] = useState('');
//   const { todos, todosCount } = state;
//   // Callback passed for toggleTodo.
//   // Now you get into issues of function re-creation., so you try to memoize it
//   // with useCallback

//   const toggleTodo = useCallback(({ type, index }) => {
//     dispatch({ type, index })
//   }, []); // Empty as no dependency

//   const getTodos = () => {
//     return todos.map(
//       (t, idx) => (
//         <Todo
//           idx={ idx }
//           todo={ t }
//           toggleTodo={ toggleTodo } />
//           // Passing callback to child component instead of a dispatch directly
//         )
//       );
//   }

//   return (
//     <div>
//       <div>todosCount: { todosCount }</div>
//       <form onSubmit={ e => {
//         e.preventDefault();
//         dispatch({ type: 'add-todo', text });
//         setText('')
//       }}>
//         <input
//           type="text"
//           name="text"
//           value={ text }
//           onChange={ e => setText(e.target.value) } />
//       </form>
//       {/*<pre>{ JSON.stringify(todos, null, 2) }</pre>*/}
//       { getTodos() }
//     </div>
//   );
// }

/* EXAMPLE: 1: IMMUTABLE STATE */
// function reducer (state, action) {
//   switch(action.type) {
//     case 'increment':
//       // state++ or ++state is changing the same state variable.(Mutation)
//       // hence we do state + 1, returning a new copy of state.
//       // So keeping state Immutable.
//       return state + 1;
//     case 'decrement':
//       return state - 1;
//     default:
//       return state;
//   }
// }

// const AppUseReducer = () => {
//   const [count, dispatch] = useReducer(reducer, 0);

//   return (
//     <div>
//       <div>hey</div>
//       <div>count: { count }</div>
//       <button onClick={ () => dispatch({ type: 'increment' }) }>increment</button>
//       <button onClick={ () => dispatch({ type: 'decrement' }) }>decrement</button>
//     </div>
//   );
// }

export default AppUseReducer;