import React from 'react';
import logo from './logo.svg';
import './App.css'
import { useState } from 'react'
import { LoginGroup } from './LoginGroup'
import { User, UserSession } from './ApiTypes';
import { getUsers } from './restApi';

import { Users } from './Users';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [session, setSession] = useState<UserSession>({ token: "", expiresAt: "" })
  const [users, setUsers] = useState<User[]>([])


  const loginHandler = (session: UserSession) => {
    setSession(session)
    getUsers(session).then(users => {
      console.log(users)
      setUsers(users)
    })
  }

  return (

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LoginGroup updateSession={loginHandler} />

      </header>
      <div>
        <Users users={users} />
      </div>



    </div >


  );
}

export default App;
