
import React from 'react'
import { Note } from '../ApiTypes'
import { Table } from 'react-bootstrap'
import { AdmNav } from './AdmNav'
import { useTranslation } from 'react-i18next'

interface NotesProps {
    notes: Note[]
}

export function Notes(props: NotesProps) {

    const notes = props.notes
    const {t} = useTranslation('common')

    return (
        <header className="App-header">
        <AdmNav/>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>{t('notes.name')}</th>
                    <th>{t('notes.patientId')}</th>
                    <th>{t('notes.sessionDate')}</th>
                    <th>{t('notes.noteDate')}</th>
                    <th>{t('notes.fileName')}</th>
                    <th>{t('notes.isCrypted')}</th>

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
                        <td>{e.isCrypted?  t('notes.true'): t('notes.false')}</td>
                    </tr>)
                )}

            </tbody>
        </Table>
        </header>
    )

}
