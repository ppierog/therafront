
import React from 'react';
import { Note } from '../ApiTypes'
import { Table } from 'react-bootstrap'

interface NotesProps {
    notes: Note[]
}

export function Notes(props: NotesProps) {

    const notes = props.notes

    return (
        <header className="App-header">
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Patient Id </th>
                    <th>Session Date</th>
                    <th>Note Date</th>
                    <th>file Name</th>
                    <th>Is Crypted</th>
                </tr>
            </thead>
            <tbody>

                {notes.map(e => (
                    <tr>
                        <td>{e.id.toString()}</td>
                        <td>{e.name}</td>
                        <td>{e.patientRowId.toString()}</td>
                        <td>{e.sessionDate.toString()}</td>
                        <td>{e.noteDate.toString()}</td>
                        <td>{e.fileName}</td>
                        <td>{e.isCrypted? "TRUE" : "FALSE"}</td>
                    </tr>)
                )}

            </tbody>
        </Table>
        </header>
    )

}
