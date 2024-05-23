
import React from 'react'
import { Note } from '../ApiTypes'
import { Button, Table } from 'react-bootstrap'
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
        <AdmNav activeKey='/notes'/>
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
                    <th>{t('actions.actions')}</th>

                </tr>
            </thead>
            <tbody>

                {notes.map(e => (
                    <tr key={e.id.toString()}>
                        <td>{e.id.toString()}</td>
                        <td>{e.name}</td>
                        <td>{e.patientRowId.toString()}</td>
                        <td>{e.sessionDate.toString()}</td>
                        <td>{e.noteDate.toString()}</td>
                        <td>{e.fileName}</td>
                        <td>{e.isCrypted?  t('notes.true'): t('notes.false')}</td>
                        <td>
                            <Button variant="primary">{t('actions.add')}</Button>{' '}
                            <Button variant="secondary">{t('actions.edit')}</Button>{' '}
                            <Button variant="danger">{t('actions.delete')}</Button>{' '}
                        </td>
                    </tr>)
                )}

            </tbody>
        </Table>
        </header>
    )

}
