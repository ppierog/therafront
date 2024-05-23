
import React, { useTransition } from 'react'
import { Patient } from '../ApiTypes'
import { Button, Table } from 'react-bootstrap'
import { AdmNav } from './AdmNav'
import { useTranslation } from 'react-i18next'

interface PatientsProps {
    patients: Patient[]
}


export function Patients(props: PatientsProps) {

    const patients = props.patients
    const {t} = useTranslation('common')

    return (
        <header className="App-header">
        <AdmNav activeKey='/patients'/>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>{t('patients.name')}</th>
                    <th>{t('patients.occupation')}</th>
                    <th>{t('patients.birthYear')}</th>
                    <th>{t('patients.city')}</th>
                    <th>{t('patients.telephoneNumber')}</th>
                    <th>{t('actions.actions')}</th>
                </tr>
            </thead>
            <tbody>

                {patients.map(e => (
                    <tr key={e.id.toString()}>
                        <td>{e.id.toString()}</td>
                        <td>{e.name}</td>
                        <td>{e.occupation}</td>
                        <td>{e.birthYear.toString()}</td>
                        <td>{e.city}</td>
                        <td>{e.telephoneNumber}</td>
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
