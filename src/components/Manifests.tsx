
import React from 'react';
import { Manifest } from '../ApiTypes'
import { Table } from 'react-bootstrap'

interface ManifestsProps {
    manifests: Manifest[]
}

export function Manifests(props: ManifestsProps) {

    const manifests = props.manifests

    return (
        <header className="App-header">
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Patient Id </th>
                    <th>User Id</th>
                    <th>Crud Mask</th>
                    <th>Encrypted AES</th>
                </tr>
            </thead>
            <tbody>
                {manifests.map(e => (
                    <tr>
                        <td>{e.id.toString()}</td>
                        <td>{e.patientId.toString()}</td>
                        <td>{e.userId.toString()}</td>
                        <td>{e.crudMask.toString()}</td>
                        <td>{e.encryptedAes}</td>
                    </tr>)
                )}

            </tbody>
        </Table>
        </header>
    )

}
