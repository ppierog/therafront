
import React, { useState } from 'react'
import { Manifest } from '../ApiTypes'
import { Button, Form, FormControl, FormGroup, FormLabel, Modal, Table } from 'react-bootstrap'
import { AdmNav } from './AdmNav'
import { useTranslation } from 'react-i18next'

interface ManifestsProps {
    manifests: Manifest[]
}

interface ManifestsTabProps {
    manifests: Manifest[]
    onAdd: () => void
    onDelete: (UserId: Number) => void
}

interface UserModalProps {
    onClose: () => void
    onAdd: (patient: Manifest) => void
}

function ManifestModal(props: UserModalProps) {

    const { t } = useTranslation('common')
    const [manifest, setManifest] = useState<Manifest>({
        id: -1,
        patientId: -1,
        userId: -1,
        crudMask: 0,
        encryptedAes: ""

    })

    const setManifestProp = (properties:
        "patientId" | "userId" | "crudMask" | "encryptedAes", value: string) => {
        var m: Manifest = { ...manifest }
        switch (properties) {

            case "patientId":
                m.patientId = Number(value)
                break
            case "userId":
                m.userId = Number(value)
                break
            case "crudMask":
                m.crudMask = Number(value)
                break
            case "encryptedAes":
                m.encryptedAes = value
                break

            default:
                break
        }

        setManifest(m)
    }


    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial', color: "black" }}
        >
            <Modal.Dialog>
                <Modal.Header closeButton onClick={_event => props.onClose()}>
                    <Modal.Title>{t('manifests.addManifest')}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <FormGroup className="mb-3" controlId="formGroupUserId">
                            <FormLabel>{t('manifests.userId')}</FormLabel>
                            <FormControl type="text" placeholder={t('manifests.userId')}
                                onChange={e => setManifestProp("userId", e.target.value)}></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formGroupPatientId">
                            <FormLabel>{t('manifests.patientId')}</FormLabel>
                            <FormControl type="text" placeholder={t('manifests.patientId')}
                                onChange={e => setManifestProp("patientId", e.target.value)} />
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formGroupCrudMask">
                            <FormLabel>{t('manifests.crudMask')}</FormLabel>
                            <FormControl type="text" placeholder={t('manifests.crudMask')}
                                onChange={e => setManifestProp("crudMask", e.target.value)} />
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formGroupEncryptedAes">
                            <FormLabel>{t('manifests.encryptedAes')}</FormLabel>
                            <FormControl type="text" placeholder={t('manifests.encryptedAes')}
                                onChange={e => setManifestProp("encryptedAes", e.target.value)} />

                        </FormGroup>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={e_ => props.onClose()}>{t('actions.close')}</Button>
                    <Button variant="primary" onClick={e_ => props.onAdd(manifest)}>{t('manifests.addManifest')}</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div >
    )
}

function ManifestsTab(props: ManifestsTabProps) {

    const manifests = props.manifests
    const { t } = useTranslation('common')

    return (

        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>{t('manifests.userId')}</th>
                    <th>{t('manifests.patientId')}</th>
                    <th>{t('manifests.crudMask')}</th>
                    <th>{t('manifests.encryptedAES')}</th>
                    <th>{t('actions.actions')} {' '}  <Button variant="primary" onClick={e_ => props.onAdd()}>{t('actions.add')}</Button></th>
                </tr>
            </thead>
            <tbody>
                {manifests.map(e => (
                    <tr key={e.id.toString()}>
                        <td>{e.id.toString()}</td>
                        <td>{e.userId.toString()}</td>
                        <td>{e.patientId.toString()}</td>
                        <td>{e.crudMask.toString()}</td>
                        <td>{e.encryptedAes}</td>
                        <td>
                            <Button variant="secondary">{t('actions.edit')}</Button>{' '}
                            <Button variant="danger">{t('actions.delete')}</Button>{' '}
                        </td>
                    </tr>)
                )}

            </tbody>
        </Table>
    )
}


export function Manifests(props: ManifestsProps) {


    const [manifests, setManifests] = useState(props.manifests)
    const { t } = useTranslation('common')
    const [showModal, setShowModal] = useState(false)

    const onTabAdd = () => {
        setShowModal(true)
    }

    const onTabDelete = (manifestId: Number) => {
        console.log(manifestId)
        /*
        deletePatient(patientId, props.session).then(_ =>
            console.log("Request Ok")
        ).then(_ =>
            setPatients(patients.filter((u) => u.id !== patientId))
        ).catch(error => console.log(error))
        */
    }

    const onAddModal = (manifest: Manifest) => {
        console.log(manifest)
        /*
                postPatient(patient, props.session).then(
                    _ => {
                        console.log(patient)
                        setPatients([...patients, { ...patient, id: patients.length + 1 }])
                    }
                ).catch(error => console.log(error))
                setShowModal(false)
          */
        // {showModal && <PatientModal onClose={onCloseModal} onAdd={onAddModal} />}

    }

    const onCloseModal = () => {
        setShowModal(false)
    }


    return (
        <header className="App-header">
            <AdmNav activeKey='/manifests' />
            {showModal && <ManifestModal onClose={onCloseModal} onAdd={onAddModal} />}
            {!showModal &&
                <ManifestsTab manifests={manifests} onAdd={onTabAdd} onDelete={onTabDelete} />
            }

        </header>

    )
}
