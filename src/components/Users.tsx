
import React from 'react'
import { User, UserSession } from '../ApiTypes'
import { Button, Table, Modal, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { AdmNav } from './AdmNav'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { deleteUser, postUser } from '../restApi'

interface UsersProps {
    users: User[]
    session : UserSession
}

interface UsersTabProps {
    users: User[]
    onAdd: (event) => void
    onDelete: (UserId : Number) => void
}

interface UserModalProps {
    onClose: (event) => void
    onAdd : (event) => void
}

function UserModal( props : UserModalProps ) {

    const {t} = useTranslation('common')
    return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial', color: "black" }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>{t('users.addUser')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form>
                <FormGroup className="mb-3" controlId="formGroupEmail">
                    <FormLabel>{t('loginGroup.emailAddress')}</FormLabel>
                    <FormControl type="email" placeholder={t('loginGroup.emailEnter')} ></FormControl>
                </FormGroup>
                <FormGroup className="mb-3" controlId="formGroupPassword">
                    <FormLabel>{t('loginGroup.password')}</FormLabel>
                    <FormControl type="password" placeholder={t('loginGroup.passwordEnter')} />
                </FormGroup>
                <Button className="me-1">{t('loginGroup.login')}</Button>
                <Button className="me-1">{t('loginGroup.register')}</Button>
            </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={ event => props.onClose(event) }>{t('actions.close')}</Button>
          <Button variant="primary" onClick={ event => props.onAdd(event) }>{t('users.addUser')}</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
    )
}

function UserTab(props: UsersTabProps) {

    const users = props.users
    const {t} = useTranslation('common')

    return (

        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>{t('users.name')}</th>
                    <th>{t('users.lastName')}</th>
                    <th>{t('users.email')}</th>
                    <th>{t('users.telephoneNumber')}</th>
                    <th>{t('actions.actions')}</th>
                </tr>
            </thead>
            <tbody>

                {users.map(e => (
                    <tr key={e.id.toString()}>
                        <td>{e.id.toString()}</td>
                        <td>{e.name}</td>
                        <td>{e.lastName}</td>
                        <td>{e.email}</td>
                        <td>{e.telephoneNumber}</td>
                        <td>
                            <Button variant="primary" onClick={ event => props.onAdd(event)}>{t('actions.add')}</Button>{' '}
                            <Button variant="secondary">{t('actions.edit')}</Button>{' '}
                            <Button variant="danger" onClick={_ => props.onDelete(e.id)}>{t('actions.delete')}</Button>{' '}
                        </td>
                    </tr>)
                )}

            </tbody>
        </Table>
    )
}

export function Users(props: UsersProps) {


    const [showModal, setShowModal] = useState(false)
    const [users, setUsers] = useState(props.users)

    const onTabAdd = (event) => {
        console.log(event)
        setShowModal(true)
    }

    const onTabDelete = (userId : Number) => {
        console.log(userId)
        const modified =  users.filter( (u) =>  u.id !== userId)

        setUsers(modified)
         deleteUser(userId, props.session).then( _ =>
            console.log("Request Ok")
        ).then( _=>
            setUsers( users.filter( (u) => u.id !== userId))
        ).catch(error => console.log(error))

    }


    const onAddModal = (event) => {

        const newUser : User = {
            id : -1,
            email: "newemail@gmail.com",
            lastName: "Extremally New ",
            name: "User",
            password: "noPasswd",
            pubKey: "",
            salt: "assasasasas",
            telephoneNumber: "ddsdsddsdsds"
        }

        postUser(newUser, props.session).then(
            user => {
                console.log(user)
            }
        ).catch(error => console.log(error))

        // setShowModal(false)
    }

    const onCloseModal = (event) => {
        setShowModal(false)
    }

    return (
        <header className="App-header">
        <AdmNav activeKey='/users'/>
        { showModal && <UserModal onClose={onCloseModal} onAdd={onAddModal}/>}
        { !showModal &&


        <UserTab users={users} onAdd={onTabAdd} onDelete={onTabDelete}/>

        }

        </header>
    )

}

