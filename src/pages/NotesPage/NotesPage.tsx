import './NotesPage.scss'
import {FloatingButton} from "../../components/FloatingButton/FloatingButton";
import {MainScreenNote} from "../../components/Note/MainScreenNote/MainScreenNote";
import {Col, Container, Row} from "react-bootstrap";

export const NotesPage = () => {

    const nodes =  [
        {
            title: 'Nice title 11 11 1  11 1 1 1 1 1 1 1 1 1 1 1 1',
            description: 'Nice description'
        },
        {
            title: 'Nice title',
            description: 'Nice description2 '
        },
        {
            title: 'Nice title',
            description: 'Nice descr  dadad sadas dasdase descriptio'
        },
        {
            title: 'Nice title',
            description: 'Nice description 4'
        },
        {
            title: 'Nice title',
            description: 'Nice description 5'
        },
        {
            title: 'Nice title',
            description: 'Nice description description Nice description description Nice description description Nice description description'
        },
        {
            title: 'Nice title',
            description: 'Nice description Nice description Nice description Nice description' +
                'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description' +
            'Nice description Nice description Nice description Nice description Nice description' +
                    'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description' +
            'Nice description Nice description Nice description Nice description Nice description' +
                    'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description'+
                'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description Nice description Nice description Nice description Nice description' +
                'Nice description'
        },
    ]
    const createNote = () => {
        console.log('note')
    }
    return (
        <div className='main__container'>
            <Container fluid >
                <Row className='notes_row'>
                {nodes.map((note, index) => (
                        <Col xs={'auto'} className='column'>
                            <MainScreenNote title={note.title} description={note.description} />
                        </Col>
                ))}
                </Row>
            </Container>
            <div className="note"></div>
            <FloatingButton onClick={createNote}>+</FloatingButton>
        </div>
    );
};