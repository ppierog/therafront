import React from 'react';
import './App.css'
import { useState } from 'react'
import { LoginGroup } from './components/LoginGroup'
import { Patient, User, UserSession } from './ApiTypes'
import { getUsers, getPatients } from './restApi'
import { useNavigate } from 'react-router-dom';


import { Users } from './components/Users';
import { Patients } from './components/Patients';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';


export default function App() {
  const [session, setSession] = useState<UserSession>({ token: "", expiresAt: "" })
  const [users, setUsers] = useState<User[]>([])
  const [patients, setPatients] = useState<Patient[]>([])
  const navigate = useNavigate();


  const loginHandler = (session: UserSession) => {
    setSession(session)
    getUsers(session).then(users => {
      console.log(users)
      setUsers(users)
      navigate("/users")
    })

    getPatients(session).then(patients => {
      console.log(patients)
      setPatients(patients)
      navigate("/patients")
    })
  }

  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<LoginGroup updateSession={loginHandler} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/patients" element={<Patients patients={patients} />} />
      </Routes>

    </div >

  )
}
