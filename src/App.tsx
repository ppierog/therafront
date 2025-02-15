import React, { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import { LoginGroup, Notes, Users, Patients, Manifests } from './components/Components'

import { Manifest, Note, Patient, User, UserSession } from './ApiTypes'
import { getUsers, getPatients, getNotes, getManifests } from './restApi'
import { useNavigate } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'

export default function App() {
  const [session, setSession] = useState<UserSession>({ token: "", expiresAt: "" })
  const [users, setUsers] = useState<User[]>([])
  const [patients, setPatients] = useState<Patient[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [manifests, setManifests] = useState<Manifest[]>([])

  useEffect(() => {
    document.title = "TheraLog"
  }, []);

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
      // navigate("/patients")
    })

    getNotes(session).then(notes => {
      console.log(notes)
      setNotes(notes)
      // navigate("/notes")
    })


    getManifests(session).then(manifests => {
      console.log(manifests)
      setManifests(manifests)
      // navigate("/manifests")
    })
  }

  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<LoginGroup updateSession={loginHandler} />} />
        <Route path="/users" element={<Users elems={users} session={session} />} />
        <Route path="/patients" element={<Patients elems={patients} session={session} />} />
        <Route path="/notes" element={<Notes elems={notes} session={session} />} />
        <Route path="/manifests" element={<Manifests elems={manifests} session={session} />} />
      </Routes>
    </div >

  )
}
