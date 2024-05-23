
import React from 'react'
import { Manifest } from '../ApiTypes'
import { Button, Table } from 'react-bootstrap'
import { AdmNav } from './AdmNav'
import { useTranslation } from 'react-i18next'

interface ManifestsProps {
    manifests: Manifest[]
}

export function Manifests(props: ManifestsProps) {

    const manifests = props.manifests
    const {t} = useTranslation('common')

    return (
        <header className="App-header">
        <AdmNav activeKey='/manifests'/>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>{t('manifests.patientId')}</th>
                    <th>{t('manifests.userId')}</th>
                    <th>{t('manifests.crudMask')}</th>
                    <th>{t('manifests.encryptedAES')}</th>
                    <th>{t('actions.actions')}</th>
                </tr>
            </thead>
            <tbody>
                {manifests.map(e => (
                    <tr key={e.id.toString()}>
                        <td>{e.id.toString()}</td>
                        <td>{e.patientId.toString()}</td>
                        <td>{e.userId.toString()}</td>
                        <td>{e.crudMask.toString()}</td>
                        <td>{e.encryptedAes}</td>
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
