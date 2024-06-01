
import React, { useState } from 'react'
import { Note } from '../ApiTypes'
import { Button, Form, FormControl, FormGroup, FormLabel, Modal, Table } from 'react-bootstrap'
import { AdmNav } from './AdmNav'
import { useTranslation } from 'react-i18next'
import { deleteNote, postNote, putNote } from '../restApi'
import { GenericProps, GenericTabProps, GenericModalProps } from './GenericProps'

type NotesProps = GenericProps<Note>
type NoteModalProps = GenericModalProps<Note>
type NotesTabProps = GenericTabProps<Note>

const Number2DateString = (unix: Number): string => {
    const date = new Date()
    date.setTime(unix.valueOf() * 1000)
    const month = date.getMonth() + 1
    const strMonth = month < 10 ? `0${month}` : String(month)

    console.log(`${date.getFullYear()}/${strMonth}/${date.getDate()}`)
    return `${date.getFullYear()}/${strMonth}/${date.getDate()}`
}

function NoteModal(props: NoteModalProps) {

    const { t } = useTranslation('common')
    const isNewElement = (props.initElem == undefined) || (props.initElem.name == undefined) || (props.initElem.name == "")

    console.log("props is ")
    console.log(props.initElem)


    const [note, setNote] = useState<Note>(
        props.initElem ? props.initElem : {
            id: -1,
            name: "",
            patientRowId: -1,
            sessionDate: 1,
            noteDate: 1,
            fileName: "",
            isCrypted: false
        })

    const [dateValues, setDateValues] = useState([Number2DateString(note.noteDate), Number2DateString(note.sessionDate)])
    console.log("sss")
    console.log(dateValues)

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
                                value={dateValues[1]}
                                onChange={e => {
                                    const date = new Date(e.target.value)
                                    const unixTimestamp = Math.floor(date.getTime() / 1000);
                                    setDateValues(dateValues => [dateValues[0], e.target.value])
                                    setNoteProp("sessionDate", String(unixTimestamp))
                                }
                                } />
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formGroupNoteDate">
                            <FormLabel>{t('notes.noteDate')}</FormLabel>
                            <FormControl type="date" placeholder={t('notes.enterNoteDate')}
                                onChange={e => {
                                    const date = new Date(e.target.value)
                                    setDateValues(dateValues => [e.target.value, dateValues[1]])
                                    const unixTimestamp = Math.floor(date.getTime() / 1000);
                                    setNoteProp("noteDate", String(unixTimestamp))
                                }
                                } value={dateValues[0]} />
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
                    {isNewElement ?
                        <Button variant="primary" onClick={e_ => props.onPost(note)}>{t('notes.addNote')}</Button> :
                        <Button variant="info" onClick={e_ => props.onPut(note)}>{t('notes.editNote')}</Button>
                    }
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
    const [note, setNote] = useState<Note | undefined>(undefined)

    const onTabAdd = () => {
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

    const onPutModal = (note: Note) => {
        console.log(note)
        putNote(note, props.session).then(
            r => {
                console.log(note)

                setNotes(notes => {
                    const newNotes = notes.map((elem, i_) => {
                        return (elem.id == note.id) ? note : elem
                    })
                    return newNotes
                })
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
            {showModal ? <NoteModal initElem={note} onClose={onCloseModal} onPost={onPostModal} onPut={onPutModal} /> :
                <NotesTab elems={notes} onAdd={onTabAdd} onDelete={onTabDelete} onEdit={onTabEdit} />}
        </header>
    )
}
