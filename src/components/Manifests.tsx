
import React from 'react'
import { Manifest } from '../ApiTypes'
import { Table } from 'react-bootstrap'
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
        <AdmNav/>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>{t('manifests.patientId')}</th>
                    <th>{t('manifests.userId')}</th>
                    <th>{t('manifests.crudMask')}</th>
                    <th>{t('manifests.encryptedAES')}</th>
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
