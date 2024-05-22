import React from 'react';
import { Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap'
import { useState } from 'react'
import { apiLogin } from '../restApi'
import { UserSession } from '../ApiTypes'

import logo from '../logo.svg'

interface LoginGroupProps {
    updateSession: (v: UserSession) => void
}


export function LoginGroup(props: LoginGroupProps) {

    const [emailValue, setEmailValue] = useState('')
    const [passwdValue, setPasswdValue] = useState('')


    function login(event) {

        console.log(emailValue)
        apiLogin({ email: emailValue, password: passwdValue }).then(
            session => {
                console.log(session)
                props.updateSession(session)
            }
        ).catch(error => console.log(error))

    }

    function onInputEmailchange(event) {
        setEmailValue(event.target.value)
    }
    function onInputPasswdchange(event) {
        setPasswdValue(event.target.value)
    }

    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />

            <Form>
                <FormGroup className="mb-3" controlId="formGroupEmail">
                    <FormLabel>Email address</FormLabel>
                    <FormControl type="email" placeholder="Enter email" onChange={onInputEmailchange}></FormControl>
                </FormGroup>
                <FormGroup className="mb-3" controlId="formGroupPassword">
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" placeholder="Password" onChange={onInputPasswdchange} />
                </FormGroup>
                <Button onClick={login}>Login</Button>
                <Button >Register</Button>
            </Form>
        </header>
    )
}
