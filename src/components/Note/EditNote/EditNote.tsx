import {
    ChangeEvent,
    FC,
    useState
} from "react";
import {Button, Form} from "react-bootstrap";
import {BasicNoteProps} from "../../../models/NoteInterface";
import './EditNote.scss'

export const EditNote:FC<BasicNoteProps> = ({className, title,description, children, onClick}) => {

    const [noteTitle, setNoteTitle] = useState(title)
    const [noteDescription, setNoteDescription] = useState(description)

    const changeNoteTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNoteTitle(e.target.value)
    }
    const changeNoteDescription = (e: ChangeEvent<HTMLInputElement>) => {
        setNoteDescription(e.target.value)
    }

    return (
        <Form className={className}>
            <Form.Group>
                <Form.Control
                    id='title'
                    type="text"
                    placeholder="Enter title"
                    value={noteTitle}
                    onChange={changeNoteTitle}
                />
                <Form.Control
                    id='description'
                    as="textarea"
                    rows={7}
                    placeholder="Enter text"
                    value={noteDescription}
                    onChange={changeNoteDescription}
                />
            </Form.Group>
        </Form>
    );
};
