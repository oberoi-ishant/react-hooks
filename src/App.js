// https://scotch.io/tutorials/build-a-react-to-do-app-with-react-hooks-no-class-components

import React, { useState } from 'react';
import './App.css';

const Todo = ({ todo, index, completeTodo, removeTodo }) => {
  return  (
    <div
      className="todo"
      style={ { textDecoration: todo.isCompleted ? 'line-through' : '' } }>
      { todo.text }
      <div>
        <button
          disabled={ todo.isCompleted }
          onClick={ () => completeTodo(index) }>Complete</button>
      <button
        onClick={ () => removeTodo(index) }>X</button>
      </div>
    </div>
  );
}

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  }

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        className="input"
        value={ value }
        onChange={ (e) => setValue(e.target.value) } />
    </form>
  );
};

const App = () => {
  const [todos, setTodos] = useState([
    {
      text: 'Learn about React',
      isCompleted: false
    },
    { text: 'Meet friend for lunch',
      isCompleted: false
    },
    { text: 'Build really cool todo app',
      isCompleted: false
    }
  ]);

  const addTodo = (str) => {
    const newTodos = [ ...todos, { text: str }];
    setTodos(newTodos);
  }

  const completeTodo = (index) => {
    // immutability. Never change the original state.
    // copy and set new state
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  }

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <div className="todo-list">
        { todos.map((todo, index) => (
          <Todo
            key={ index }
            index={ index }
            todo={ todo }
            completeTodo={ completeTodo }
            removeTodo={ removeTodo } />))
        }
        <TodoForm addTodo={ addTodo } />
      </div>
    </div>
  );
};

// class App extends React.Component {
//   state = {
//     todo: [
//       { text: 'Learn about React' },
//       { text: 'Meet friend for lunch' },
//       { text: 'Build really cool todo app' }
//     ]
//   }

//   setTodos = (todos) => this.setState({todos});

//   render () {
//     return (<div>Hello World!</div>);
//   }

// }

export default App;

