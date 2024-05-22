
import React from 'react';
import { User } from '../ApiTypes';
import { Table } from 'react-bootstrap';

interface UsersProps {
    users: User[]
}

export function Users(props: UsersProps) {

    const users = props.users

    return (
        <header className="App-header">
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Telphone Number</th>
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
