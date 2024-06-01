
import { useState } from 'react'
import { Patient } from '../ApiTypes'
import { Button, Table, Modal, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { AdmNav } from './AdmNav'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { deletePatient, postPatient } from '../restApi'
import { GenericProps, GenericTabProps, GenericModalProps } from './GenericProps'

type PatientsProps = GenericProps<Patient>
type PatientsTabProps = GenericTabProps<Patient>
type PatientModalProps = GenericModalProps<Patient>

function PatientModal(props: PatientModalProps) {

    const { t } = useTranslation('common')
    const [patient, setPatient] = useState<Patient>({
        id: -1,
        name: "",
        occupation: "",
        birthYear: 0,
        city: "",
        telephoneNumber: ""
    })

    const setPatientProp = (properties:
        "name" | "occupation" | "birthYear" | "city" | "telephoneNumber", value: string) => {
        var p: Patient = { ...patient }
        switch (properties) {

            case "name":
                p.name = value
                break
            case "occupation":
                p.occupation = value
                break
            case "birthYear":
                p.birthYear = Number(value)
                break
            case "city":
                p.city = value
                break
            case "telephoneNumber":
                p.telephoneNumber = value
                break

            default:
                break
        }

        setPatient(p)
    }

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial', color: "black" }}
        >
            <Modal.Dialog>
                <Modal.Header closeButton onClick={_event => props.onClose()}>
                    <Modal.Title>{t('patients.addPatient')}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <FormGroup className="mb-3" controlId="formGroupName">
                            <FormLabel>{t('patients.name')}</FormLabel>
                            <FormControl type="text" placeholder={t('patients.nameEnter')}
                                onChange={e => setPatientProp("name", e.target.value)}></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formGroupOccupation">
                            <FormLabel>{t('patients.occupation')}</FormLabel>
                            <FormControl type="text" placeholder={t('patients.occupation')}
                                onChange={e => setPatientProp("occupation", e.target.value)} />
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formGroupBirthYear">
                            <FormLabel>{t('patients.birthYear')}</FormLabel>
                            <FormControl type="text" placeholder={t('patients.enterBirthYear')}
                                onChange={e => setPatientProp("birthYear", e.target.value)} />
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formGroupCity">
                            <FormLabel>{t('patients.city')}</FormLabel>
                            <FormControl type="text" placeholder={t('patients.enterCity')}
                                onChange={e => setPatientProp("city", e.target.value)} />

                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formGroupTelephoneNumber">
                            <FormLabel>{t('patients.telephoneNumber')}</FormLabel>
                            <FormControl type="text" placeholder={t('patients.enterTelephoneNumber')}
                                onChange={e => setPatientProp("telephoneNumber", e.target.value)} />
                        </FormGroup>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={e_ => props.onClose()}>{t('actions.close')}</Button>
                    <Button variant="primary" onClick={e_ => props.onAdd(patient)}>{t('users.addUser')}</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div >
    )
}

function PatientTab(props: PatientsTabProps) {

    const patients = props.elems
    const { t } = useTranslation('common')

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>{t('patients.name')}</th>
                    <th>{t('patients.occupation')}</th>
                    <th>{t('patients.birthYear')}</th>
                    <th>{t('patients.city')}</th>
                    <th>{t('patients.telephoneNumber')}</th>
                    <th>{t('actions.actions')}{' '}
                        <Button variant="primary" onClick={e_ => props.onAdd()}>{t('actions.add')}</Button>{' '}
                    </th>
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
                            <Button variant="secondary">{t('actions.edit')}</Button>{' '}
                            <Button variant="danger" onClick={e_ => props.onDelete(e.id)}>{t('actions.delete')}</Button>{' '}
                        </td>
                    </tr>)
                )}
            </tbody>
        </Table>
    )
}

export function Patients(props: PatientsProps) {

    const [patients, setPatients] = useState(props.elems ? props.elems : [])
    const { t } = useTranslation('common')
    const [showModal, setShowModal] = useState(false)

    const onTabAdd = () => {
        setShowModal(true)
    }

    const onTabDelete = (patientId: Number) => {
        console.log(patientId)

        deletePatient(patientId, props.session).then(_ =>
            console.log("Request Ok")
        ).then(_ =>
            setPatients(patients.filter((u) => u.id !== patientId))
        ).catch(error => console.log(error))

    }

    const onAddModal = (patient: Patient) => {
        console.log(patient)

        postPatient(patient, props.session).then(
            r => {
                console.log(patient)
                setPatients([...patients, { ...patient, id: r.id }])
            }
        ).catch(error => console.log(error))
        setShowModal(false)
    }

    const onCloseModal = () => {
        setShowModal(false)
    }

    return (
        <header className="App-header">
            <AdmNav activeKey='/patients' />
            {showModal ? <PatientModal onClose={onCloseModal} onAdd={onAddModal} /> :
                <PatientTab elems={patients} onAdd={onTabAdd} onDelete={onTabDelete} />}
        </header>
    )
}
