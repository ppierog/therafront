
import React from 'react';
import { Patient } from '../ApiTypes'
import { Table } from 'react-bootstrap'

interface PatientsProps {
    patients: Patient[]
}


export function Patients(props: PatientsProps) {

    const patients = props.patients

    return (
        <header className="App-header">
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Occupation</th>
                    <th>Birth year</th>
                    <th>City</th>
                    <th>Telphone Number</th>
                </tr>
            </thead>
            <tbody>

                {patients.map(e => (
                    <tr>
                        <td>{e.id.toString()}</td>
                        <td>{e.name}</td>
                        <td>{e.occupation}</td>
                        <td>{e.birthYear.toString()}</td>
                        <td>{e.city}</td>
                        <td>{e.telephoneNumber}</td>
                    </tr>)
                )}

            </tbody>
        </Table>
        </header>
    )

}
