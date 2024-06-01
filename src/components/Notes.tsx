
import React, { useState } from 'react'
import { Note } from '../ApiTypes'
import { Button, Form, FormControl, FormGroup, FormLabel, Modal, Table } from 'react-bootstrap'
import { AdmNav } from './AdmNav'
import { useTranslation } from 'react-i18next'
import { deleteNote, postNote } from '../restApi'
import { GenericProps, GenericTabProps, GenericModalProps } from './GenericProps'

type NotesProps = GenericProps<Note>
type NoteModalProps = GenericModalProps<Note>
type NotesTabProps = GenericTabProps<Note>

const Number2DateString = (unix: Number): string => {
    const date = new Date()
    date.setTime(unix.valueOf() * 1000)
    return date.toDateString()
}
const Number2DateString2 = (unix: Number): string => {
    const date = new Date()
    date.setTime(unix.valueOf() * 1000)
    console.log(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

function NoteModal(props: NoteModalProps) {

    const { t } = useTranslation('common')
    const [note, setNote] = useState<Note>(
        props.initElem ? props.initElem : {
            id: -1,
            name: "",
            patientRowId: -1,
            sessionDate: 0,
            noteDate: 0,
            fileName: "",
            isCrypted: false
        })

    const noteDateValue = React.useRef(Number2DateString2(note.noteDate))
    const sessionDateValue = React.useRef(Number2DateString2(note.sessionDate))

    const setNoteProp = (properties:
        "name" | "patientRowId" | "noteDate" | "sessionDate" | "fileName" | "isCrypted", value: string) => {
        var n: Note = { ...note }
        switch (properties) {

            case "name":
                n.name = value
                break
            case "patientRowId":
                n.patientRowId = Number(value)
                break
            case "sessionDate":
                n.sessionDate = Number(value)
                break
            case "noteDate":
                n.noteDate = Number(value)
                break
            case "fileName":
                n.fileName = value
                break
            case "isCrypted":
                n.isCrypted = Boolean(value)
                break

            default:
                break
        }

        setNote(n)
    }

    const isNewElement = (props.initElem === undefined) || (props.initElem.name === undefined) || (props.initElem.name === "")
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial', color: "black" }}
        >
            <Modal.Dialog>
                <Modal.Header closeButton onClick={_event => props.onClose()}>
                    <Modal.Title>{isNewElement ? t('notes.addNote') : t('notes.editNote')}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <FormGroup className="mb-3" controlId="formGroupName">
                            <FormLabel>{t('notes.name')}</FormLabel>
                            <FormControl type="text" placeholder={t('notes.nameEnter')}
                                onChange={e => setNoteProp("name", e.target.value)} value={note.name}></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formGroupPatientId">
                            <FormLabel>{t('notes.patientId')}</FormLabel>
                            <FormControl type="text" placeholder={t('notes.enterPatientId')}
                                onChange={e => setNoteProp("patientRowId", e.target.value)} value={String(note.patientRowId)} />
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formGroupSessionDate">
                            <FormLabel>{t('notes.sessionDate')}</FormLabel>
                            <FormControl type="date" placeholder={t('notes.enterSessionDate')}
                                onChange={e => {
                                    console.log(`On change ${e} ${e.target.value}`)
                                    const date = new Date(e.target.value)
                                    const unixTimestamp = Math.floor(date.getTime() / 1000);
                                    sessionDateValue.current = e.target.value
                                    setNoteProp("sessionDate", String(unixTimestamp))
                                }
                                } value={sessionDateValue.current} />
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formGroupNoteDate">
                            <FormLabel>{t('notes.noteDate')}</FormLabel>
                            <FormControl type="date" placeholder={t('notes.enterNoteDate')}
                                onChange={e => {
                                    console.log(`On change ${e} ${e.target.value}`)
                                    const date = new Date(e.target.value)
                                    console.log(date)
                                    noteDateValue.current = e.target.value

                                    const unixTimestamp = Math.floor(date.getTime() / 1000);
                                    setNoteProp("noteDate", String(unixTimestamp))
                                }
                                } value={noteDateValue.current} />
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formGroupFileName">
                            <FormLabel>{t('notes.fileName')}</FormLabel>
                            <FormControl type="file" placeholder={t('notes.enterFileName')}
                                onChange={e => setNoteProp("fileName", e.target.value)} />
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formGroupIsCrypted" >
                            <FormLabel>{t('notes.isCrypted')}</FormLabel>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id={`default-checkbox}`}

                            />

                        </FormGroup>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={e_ => props.onClose()}>{t('actions.close')}</Button>
                    <Button variant="primary" onClick={e_ => props.onPost(note)}>{t('notes.addNote')}</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div >
    )
}

function NotesTab(props: NotesTabProps) {

    const notes = props.elems
    const { t } = useTranslation('common')

    return (
        < Table striped bordered hover size="sm" >
            <thead>
                <tr>
                    <th>#</th>
                    <th>{t('notes.name')}</th>
                    <th>{t('notes.patientId')}</th>
                    <th>{t('notes.sessionDate')}</th>
                    <th>{t('notes.noteDate')}</th>
                    <th>{t('notes.fileName')}</th>
                    <th>{t('notes.isCrypted')}</th>
                    <th>{t('actions.actions')} {' '} <Button variant="primary" onClick={e_ => props.onAdd()}>{t('actions.add')}</Button></th>

                </tr>
            </thead>
            <tbody>
                {notes.map(e => (
                    <tr key={e.id.toString()}>
                        <td>{e.id.toString()}</td>
                        <td>{e.name}</td>
                        <td>{e.patientRowId.toString()}</td>
                        <td>{Number2DateString(e.sessionDate)}</td>
                        <td>{Number2DateString(e.noteDate)}</td>
                        <td>{e.fileName}</td>
                        <td>{e.isCrypted ? t('notes.true') : t('notes.false')}</td>
                        <td>
                            <Button variant="secondary" onClick={_ => props.onEdit(e)}>{t('actions.edit')}</Button>{' '}
                            <Button variant="danger" onClick={e_ => props.onDelete(e.id)}>{t('actions.delete')}</Button>{' '}
                        </td>
                    </tr>)
                )}
            </tbody>
        </Table >
    )
}

export function Notes(props: NotesProps) {

    const [notes, setNotes] = useState(props.elems ? props.elems : [])
    const [showModal, setShowModal] = useState(false)
    const [note, setNote] = useState<Note>()

    const onTabAdd = () => {
        setNote({} as Note)
        setShowModal(true)
    }
    const onTabEdit = (element: Note) => {
        setNote(element)
        setShowModal(true)
    }

    const onTabDelete = (noteId: Number) => {
        console.log(noteId)

        deleteNote(noteId, props.session).then(_ =>
            console.log("Request Ok")
        ).then(_ =>
            setNotes(notes.filter((u) => u.id !== noteId))
        ).catch(error => console.log(error))

    }

    const onPostModal = (note: Note) => {
        console.log(note)

        postNote(note, props.session).then(
            r => {
                console.log(note)
                setNotes([...notes, { ...note, id: r.id }])
            }
        ).catch(error => console.log(error))
        setShowModal(false)

    }

    const onCloseModal = () => {
        setShowModal(false)
    }

    return (
        <header className="App-header">
            <AdmNav activeKey='/notes' />
            {showModal ? <NoteModal onClose={onCloseModal} onPost={onPostModal} initElem={note} /> :
                <NotesTab elems={notes} onAdd={onTabAdd} onDelete={onTabDelete} onEdit={onTabEdit} />}
        </header>
    )
}
