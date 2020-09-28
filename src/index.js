import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GithubUsers from './App_2';
import AppUseState from './AppUseState';
import AppUseEffect from './AppUseEffect';
import AppUseRef from './AppUseRef';
import AppUseLayoutEffect from './AppUseLayoutEffect';
import AppUseCallback from './AppUseCallback';
import AppUseMemo from './AppUseMemo';
import AppUseReducer from './AppUseReducer';
import AppUseContext from './AppUseContext';
import AppUseDebounce from './AppUseDebounce';
import AppUsePrevious from './AppUsePrevious';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <AppUseLayoutEffect />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
