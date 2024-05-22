import React from 'react';
import { Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap'
import { useState } from 'react'
import { apiLogin } from '../restApi'
import { UserSession } from '../ApiTypes'

import logo from '../logo.svg'
import { useTranslation } from 'react-i18next';

interface LoginGroupProps {
    updateSession: (v: UserSession) => void
}


export function LoginGroup(props: LoginGroupProps) {

    const [emailValue, setEmailValue] = useState('')
    const [passwdValue, setPasswdValue] = useState('')

    const {t} = useTranslation('common')

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
                    <FormLabel>{t('loginGroup.emailAddress')}</FormLabel>
                    <FormControl type="email" placeholder={t('loginGroup.emailEnter')} onChange={onInputEmailchange}></FormControl>
                </FormGroup>
                <FormGroup className="mb-3" controlId="formGroupPassword">
                    <FormLabel>{t('loginGroup.password')}</FormLabel>
                    <FormControl type="password" placeholder={t('loginGroup.passwordEnter')} onChange={onInputPasswdchange} />
                </FormGroup>
                <Button onClick={login} className="me-1">{t('loginGroup.login')}</Button>

                <Button className="me-1">{t('loginGroup.register')}</Button>
            </Form>
        </header>
    )
}
