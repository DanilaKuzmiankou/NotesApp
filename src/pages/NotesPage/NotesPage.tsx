import './NotesPage.scss'
import {FloatingButton} from "../../components/FloatingButton/FloatingButton";
import {MainScreenNote} from "../../components/Note/MainScreenNote/MainScreenNote";
import {Col, Container, Form, FormControl, Row} from "react-bootstrap";
import {NewNote} from "../../components/Note/NewNote/NewNote";
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {BasicNote} from "../../models/NoteInterface";
import {IconContext} from 'react-icons';
import {RxCross1} from "react-icons/rx";

export const NotesPage = () => {

    const userNotesString = localStorage.getItem('notes');
    const user = localStorage.getItem('user');
    const userNotes: BasicNote[] = userNotesString ? JSON.parse(userNotesString) : []

    const [notes, setNotes] = useState<BasicNote[]>(userNotes)
    const [showNewNoteModal, setShowNewNoteModal] = useState(false)
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (!user) {
            initUser()
        }
    }, [])

    const initUser = () => {
        const noteTemplate: BasicNote = {
            id: 1,
            title: 'Template note',
            description: `Welcome to the note manager app, written by Danila  Kuzmiankou!
            There is a lot of opportunities which you can made with notes: add, delete, edit, view, and search by tag.
            Also this app have different features, like tag higlighting, adding tag right when writing text by just inserting '#' sign before needed word.
            All of your notes will be saved so don't blow your mind up about remembering them.
            Wish you great experience!`,
            tags: ['#template', '#tag', '#notes'],
            color: 'orange'
        }
        setNotes([noteTemplate])
        localStorage.setItem('notes', JSON.stringify([noteTemplate]))
        localStorage.setItem('user', '1')
    }

    const editNode = (id: number, title: string, description: string, tags: string[] | undefined): BasicNote[] => {
        return userNotes.map(note => {
            if (note.id === id) {
                note.title = title
                note.description = description
                note.tags = tags
            }
            return note
        })
    }

    const addNote = (title: string, description: string, color: string, tags: string[] | undefined): BasicNote[] => {
        let id = 1
        if (notes.length > 0) {
            const noteWithHigherId = notes.reduce((noteWithMaxId, note) => noteWithMaxId.id > note.id ? noteWithMaxId : note)
            id = noteWithHigherId.id + 1
        }
        return [...userNotes,
            {
                id,
                title,
                description,
                color,
                tags
            }]
    }

    const saveNote = useCallback((id: number | undefined, title: string, description: string, color: string | undefined, tags: string[] | undefined) => {
        let newNotes
        if (id) {
            newNotes = editNode(id, title, description, tags)
        } else if (color) {
            newNotes = addNote(title, description, color, tags)
        }
        setNotes(newNotes ?? notes)
        localStorage.setItem('notes', JSON.stringify(newNotes))
    }, [userNotes])

    const deleteNode = useCallback((id: number) => {
        const newNotes = userNotes.filter(note => note.id !== id)
        setNotes(newNotes)
        localStorage.setItem('notes', JSON.stringify(newNotes))
    }, [userNotes])

    const changeEditModalState = (isOpen: boolean) => {
        setShowNewNoteModal(isOpen)
    }

    const setSearchData = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.currentTarget.value)
        const tag = event?.currentTarget.value || ''
        const currentNotes = tag ? userNotes.filter(note => {
            const filtered = note.tags?.filter(noteTag => noteTag.includes(`#${tag}`))
            return !!filtered?.length
        }) : userNotes
        setNotes(currentNotes)
    }

    const clearSearch = () => {
        setSearch('')
        setNotes(userNotes)
    }

    return (
        <div className='main__container'>
            <h1 id='app_name'>Notes Manager</h1>
            <Form id='search_form'>
                <div id="search_container">
                    <FormControl
                        id='search_input'
                        type='search'
                        placeholder='Search by tags'
                        aria-label='Search'
                        value={search}
                        onChange={setSearchData}
                    />
                    <IconContext.Provider value={{size: '30', color: 'black'}}>
                        <RxCross1 id='clear_icon' onClick={clearSearch}/>
                    </IconContext.Provider>
                </div>
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
            <FloatingButton onClick={() => {
                changeEditModalState(true)
            }}>+</FloatingButton>
        </div>
    );
};