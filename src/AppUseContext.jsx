// https://www.youtube.com/watch?v=lhMKvyLRWo0&list=PLN3n1USn4xlmyw3ebYuZmGp60mcENitdM&index=8

import React, { useReducer, useState, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Home } from "./Home";
import { About } from "./About";
import { UserContext } from './UserContext';

const AppUseContext = () => {
  const [user, setUser] = useState(null);
  // If you use <UserContext.Provider value={ { value, setValue} }>
  // then the value object is created every time this component renders.
  // So can you useMemo to store the value
  // Using memoized value, incase the value is computed everytime.
  // So create new value only if the dependencies change.
  // Doesn't make difference in this small example.
  const providerValue = useMemo(
    () => ({ user, setUser}),
    [user, setUser]);
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
          </ul>
        </nav>
        <UserContext.Provider value={ providerValue }>
          <Route path="/" exact component={Home} />
          <Route path="/about/" component={About} />
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default AppUseContext;