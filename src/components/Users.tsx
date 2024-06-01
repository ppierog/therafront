
import React from 'react'
import { User } from '../ApiTypes'
import { Button, Table, Modal, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { AdmNav } from './AdmNav'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { deleteUser, postUser } from '../restApi'
import { GenericProps, GenericModalProps, GenericTabProps } from './GenericProps'

type UsersProps = GenericProps<User>
type UsersTabProps = GenericTabProps<User>
type UserModalProps = GenericModalProps<User>

function UserModal(props: UserModalProps) {

    const { t } = useTranslation('common')
    const [user, setUser] = useState<User>({
        id: -1,
        email: "",
        lastName: "",
        name: "",
        password: "",
        pubKey: "",
        salt: "",
        telephoneNumber: ""
    })

    const setUserProp = (properties:
        "name" | "email" | "lastName" | "password" | "telephoneNumber", value: string) => {
        var u: User = { ...user }
        switch (properties) {

            case "name":
                u.name = value
                break
            case "email":
                u.email = value
                break
            case "lastName":
                u.lastName = value
                break
            case "password":
                u.password = value
                break
            case "telephoneNumber":
                u.telephoneNumber = value
                break

            default:
                break
        }

        setUser(u)
    }

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial', color: "black" }}
        >
            <Modal.Dialog>
                <Modal.Header closeButton onClick={_event => props.onClose()}>
                    <Modal.Title>{t('users.addUser')}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <FormGroup className="mb-3" controlId="formGroupName">
                            <FormLabel>{t('users.name')}</FormLabel>
                            <FormControl type="text" placeholder={t('users.nameEnter')}
                                onChange={e => setUserProp("name", e.target.value)}></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formGroupLastName">
                            <FormLabel>{t('users.lastName')}</FormLabel>
                            <FormControl type="text" placeholder={t('users.lastNameEnter')}
                                onChange={e => setUserProp("lastName", e.target.value)} />
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formGroupEmail">
                            <FormLabel>{t('users.email')}</FormLabel>
                            <FormControl type="email" placeholder={t('users.emailEnter')}
                                onChange={e => setUserProp("email", e.target.value)} />
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formGroupPassword">
                            <FormLabel>{t('users.password')}</FormLabel>
                            <FormControl type="text" placeholder={t('users.enterPassword')}
                                onChange={e => setUserProp("password", e.target.value)} />

                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formGroupTelephoneNumber">
                            <FormLabel>{t('users.telephoneNumber')}</FormLabel>
                            <FormControl type="text" placeholder={t('users.enterTelephoneNumber')}
                                onChange={e => setUserProp("telephoneNumber", e.target.value)} />
                        </FormGroup>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={e_ => props.onClose()}>{t('actions.close')}</Button>
                    <Button variant="primary" onClick={e_ => props.onAdd(user)}>{t('users.addUser')}</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div >
    )
}

function UserTab(props: UsersTabProps) {

    const users = props.elems
    const { t } = useTranslation('common')

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>{t('users.name')}</th>
                    <th>{t('users.lastName')}</th>
                    <th>{t('users.email')}</th>
                    <th>{t('users.telephoneNumber')}</th>
                    <th>{t('actions.actions')}{' '}
                        <Button variant="primary" onClick={e_ => props.onAdd()}>{t('actions.add')}</Button>{' '}
                    </th>
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
    const [users, setUsers] = useState(props.elems ? props.elems : [])

    const onTabAdd = () => {
        setShowModal(true)
    }

    const onTabDelete = (userId: Number) => {
        console.log(userId)

        deleteUser(userId, props.session).then(_ =>
            console.log("Request Ok")
        ).then(_ =>
            setUsers(users.filter((u) => u.id !== userId))
        ).catch(error => console.log(error))

    }

    const onAddModal = (user: User) => {

        console.log(user)
        postUser(user, props.session).then(
            r => {
                console.log(user)
                setUsers([...users, { ...user, id: r.id }])
            }
        ).catch(error => console.log(error))
        setShowModal(false)

    }

    const onCloseModal = () => {
        setShowModal(false)
    }

    return (
        <header className="App-header">
            <AdmNav activeKey='/users' />
            {showModal ? <UserModal onClose={onCloseModal} onAdd={onAddModal} /> :
                <UserTab elems={users} onAdd={onTabAdd} onDelete={onTabDelete} />}
        </header>
    )

}

