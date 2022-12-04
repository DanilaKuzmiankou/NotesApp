import './NotesPage.scss'
import {FloatingButton} from "../../components/FloatingButton/FloatingButton";
import {MainScreenNote} from "../../components/Note/MainScreenNote/MainScreenNote";
import {Col, Container, Form, FormControl, Row} from "react-bootstrap";
import {NewNote} from "../../components/Note/NewNote/NewNote";
import {ChangeEvent, useState} from "react";
import {BasicNote} from "../../models/NoteInterface";

export const NotesPage = () => {

    const userNotesString = localStorage.getItem('notes');
    const userNotes: BasicNote[] = userNotesString ? JSON.parse(userNotesString) : []

    const [notes, setNotes] = useState<BasicNote[]>(userNotes)
    const [showNewNoteModal, setShowNewNoteModal] = useState(false)

    const saveNote = (id: number | undefined, title: string, description: string, color: string | undefined, tags: string[] | undefined) => {
        let newNotes
        if (id) {
            newNotes = userNotes.map(note => {
                if (note.id === id) {
                    note.title = title
                    note.description = description
                    note.tags = tags
                }
                return note
            })
            setNotes(newNotes)
        } else if (color) {
            let id = 1
            if (notes.length > 0) {
                const noteWithHigherId = notes.reduce((noteWithMaxId, note) => noteWithMaxId.id > note.id ? noteWithMaxId : note)
                id = noteWithHigherId.id + 1
            }
            newNotes = [...userNotes,
                {
                    id,
                    title,
                    description,
                    color,
                    tags
                }]
            setNotes(newNotes)
        }
        localStorage.setItem('notes', JSON.stringify(newNotes))
    }

    const deleteNode = (id: number) => {
        const newNotes = userNotes.filter(note => note.id !== id)
        setNotes(newNotes)
        localStorage.setItem('notes', JSON.stringify(newNotes))
    }

    const changeEditModalState = (isOpen: boolean) => {
        setShowNewNoteModal(isOpen)
    }

    const setSearchData = (event: ChangeEvent<HTMLInputElement>) => {
        const tag = event.currentTarget.value
        const currentNotes = tag ? userNotes.filter(note => note.tags?.includes(`#${tag}`)) : userNotes
        setNotes(currentNotes)
    }

    return (
        <div className='main__container'>
            <h1>Notes Manager</h1>
            <Form id='search_form'>
                <FormControl
                    id='search_input'
                    type='search'
                    placeholder='Search by tags'
                    aria-label='Search'
                    onChange={setSearchData}
                />
            </Form>
            <Container id='notes_container' fluid>
                <Row className='notes_row'>
                    <Col xs={'auto'} className='column'>
                        <NewNote changeEditModalState={changeEditModalState} saveNote={saveNote}
                                 isEditModalOpen={showNewNoteModal}/>
                    </Col>
                    {notes.map((note, index) => (
                        <Col key={note.id} xs={'auto'} className='column'>
                            <MainScreenNote
                                id={note.id}
                                title={note.title}
                                description={note.description}
                                tags={note.tags ?? []}
                                color={note.color}
                                saveNote={saveNote}
                                deleteNote={deleteNode}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
            <FloatingButton onClick={() => changeEditModalState(true)}>+</FloatingButton>
        </div>
    );
};