
import React from 'react'
import { User } from '../ApiTypes'
import { Table } from 'react-bootstrap'
import { AdmNav } from './AdmNav'
import { useTranslation } from 'react-i18next'

interface UsersProps {
    users: User[]
}

export function Users(props: UsersProps) {

    const users = props.users
    const {t} = useTranslation('common')


    return (
        <header className="App-header">
        <AdmNav/>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>{t('users.name')}</th>
                    <th>{t('users.lastName')}</th>
                    <th>{t('users.email')}</th>
                    <th>{t('users.telephoneNumber')}</th>
                </tr>
            </thead>
            <tbody>

                {users.map(e => (
                    <tr>
                        <td>{e.id.toString()}</td>
                        <td>{e.name}</td>
                        <td>{e.lastName}</td>
                        <td>{e.email}</td>
                        <td>{e.telephoneNumber}</td>
                    </tr>)
                )}

            </tbody>
        </Table>
        </header>
    )

}
