// https://scotch.io/tutorials/getting-started-with-react-hooks
import React,  { useState, useEffect } from 'react';

const GithubUsers = () => {

  // TODO: Implement a custom debounce hook.

  const [user, setUser] = useState({ login: 'userName' });
  const [name, setName] = useState('mojombo');

  // useEffect(() => {
  //   fetch(`https://api.github.com/users/${name}`)
  //     .then(res => res.json())
  //     .then(data => setUser(data));

  //   return () => { console.log("unmounting..."); };

  // }, [name]);

  useEffect(() => {
    console.log(name);
  }, [name]);

  return (
    <div>
      <input
        type="text"
        value={ name }
        placholder="enter login name..."
        onChange={ (e) => setName(e.target.value) } />
      <div>
        { user ? user.login : 'Hello World!' }
      </div>
    </div>
  );
};

// mojombo defunkt

export default GithubUsers;