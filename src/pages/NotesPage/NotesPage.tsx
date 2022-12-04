import './NotesPage.scss'
import {FloatingButton} from "../../components/FloatingButton/FloatingButton";
import {MainScreenNote} from "../../components/Note/MainScreenNote/MainScreenNote";
import {Col, Container, Row} from "react-bootstrap";
import {NewNote} from "../../components/Note/NewNote/NewNote";
import {useState} from "react";
import {BasicNote, Note} from "../../models/NoteInterface";

export const NotesPage = () => {

    const userNotesString = localStorage.getItem('notes');
    const userNotes = userNotesString ? JSON.parse(userNotesString) : []

    const [notes, setNotes] = useState<BasicNote[]>(userNotes)
    const [showNewNoteModal, setShowNewNoteModal] = useState(false)

    const saveNote = (id: number | undefined, title: string, description: string, color: string | undefined, tags: string[] | undefined) => {
        let newNotes
        if (id) {
            newNotes = notes.map(note => {
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
            if(notes.length > 0) {
                const noteWithHigherId =  notes.reduce((noteWithMaxId, note) => noteWithMaxId.id > note.id ? noteWithMaxId : note)
                id = noteWithHigherId.id + 1
            }
            newNotes = [...notes,
                {
                    id,
                    title,
                    description,
                    color,
                    tags
                }]
            setNotes(newNotes)
            console.log('done!!!!')
        }
        localStorage.setItem('notes', JSON.stringify(newNotes))
    }

    const deleteNode = (id:number) => {
        const newNotes = notes.filter(note => note.id !== id)
        setNotes(newNotes)
        localStorage.setItem('notes', JSON.stringify(notes))
    }

    const changeEditModalState = (isOpen: boolean) => {
        setShowNewNoteModal(isOpen)
    }

    return (
        <div className='main__container'>
            <Container fluid>
                <Row className='notes_row'>
                    <Col xs={'auto'} className='column'>
                        <NewNote changeEditModalState={changeEditModalState} saveNote={saveNote} isEditModalOpen={showNewNoteModal}/>
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
            <div className="note"></div>
            <FloatingButton onClick={() => changeEditModalState(true)}>+</FloatingButton>
        </div>
    );
};