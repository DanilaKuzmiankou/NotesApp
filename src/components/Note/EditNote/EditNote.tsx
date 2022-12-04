import {ChangeEvent, FC, FormEvent, useRef, useState} from "react";
import {Form} from "react-bootstrap";
import {BasicNoteProps} from "../../../models/NoteInterface";
import './EditNote.scss'

interface EditNoteProps extends BasicNoteProps {
    saveNote: (id: number | undefined, title: string, description: string, color: string | undefined, tags: string[] | undefined) => void
}

export const EditNote: FC<EditNoteProps> = ({className, title, description, id, saveNote, color, tags}) => {

    const descriptionRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)

    const [editNoteDescription, setEditNoteDescription] = useState(highlightPrevTags(description, tags))
    const [editNoteTitle, setEditNoteTitle] = useState(highlightPrevTags(title, tags))
    const [editedTags, setEditedTags] = useState(tags.join(', '))

    const [titleError, setTitleError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')

    const submitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const editedDescription = descriptionRef.current!.innerHTML
        const editedTitle = titleRef.current!.innerHTML
        if (validateNote(editedTitle, editedDescription, editedTags)) {
            saveResults(editedTitle, editedDescription)
        }
    }

    const saveResults = (editedTitle: string, editedDescription: string) => {
        const resultTags = saveTags(editedTitle, editedDescription, editedTags)
        setEditedTags(resultTags.join(', '))
        let cleanDescription
        let cleanTitle
        cleanTitle = cleanTextFromHTMLTags(editedTitle)
        cleanDescription = cleanTextFromHTMLTags(editedDescription)
        editedTitle = highlightPrevTags(highlightNewTags(cleanTitle, resultTags), resultTags)
        editedDescription = highlightPrevTags(highlightNewTags(cleanDescription, resultTags), resultTags)
        setEditNoteDescription(editedDescription)
        setEditNoteTitle(editedTitle)
        cleanDescription = cleanTextFromHTMLTags(editedDescription)
        cleanTitle = cleanTextFromHTMLTags(editedTitle)
        saveNote(id, cleanTitle, cleanDescription, color, resultTags)
    }

    const saveTags = (editedTitle: string, editedDescription: string, editedTagsString: string): string[] => {
        let validatedTags = getWordsFromString(editedTagsString)
        validatedTags = [...getTagsFromString(editedTitle), ...getTagsFromString(editedDescription), ...validatedTags]
        return [...new Set(validatedTags.map(tag => `#${tag}`))]
    }


    const cleanTextFromHTMLTags = (text: string): string => {
        const temp = document.createElement("div");
        temp.innerHTML = text;
        return temp.textContent || temp.innerText;
    }

    function getTagsFromString(tagsString: string) {
        const getTagsFromStringRegExp = /#([a-zA-Z0-9])+/g
        const rawTags = tagsString.match(getTagsFromStringRegExp) ?? []
        return [...new Set(rawTags.map((tag) => tag.trim().slice(1, tag.length)))]
    }

    const getWordsFromString = (wordsString: string): string[] => wordsString.match(/\b(\w+)\b/g) ?? []

    const validateNote = (editedTitle: string, editedDescription: string, editedTagsString: string): boolean => {
        let validated = true
        if (editedTitle.trim().length === 0) {
            setTitleError('Invalid title')
            validated = false
        } else setTitleError('')
        if (editedDescription.trim().length === 0) {
            setDescriptionError('Invalid description')
            validated = false
        } else setDescriptionError('')
        if (title === editedTitle && description === editedDescription && editedTagsString === tags.toString()) {
            validated = false
        }
        return validated
    }

    const setTags = (event: ChangeEvent<HTMLInputElement>) => setEditedTags(event.target.value)

    function highlightPrevTags(text: string, tags: string[]): string {
        tags.forEach((tag) => {
            tag = tag.trim().slice(1, tag.length)
            text = text.replaceAll(tag, `<mark>${tag}</mark>`)
        })
        return text
    }

    function highlightNewTags(text: string, tags: string[]): string {
        tags.forEach((tag) => {
            tag = tag.trim()
            text = text.replaceAll(tag, `<mark>${tag.slice(1, tag.length)}</mark>&nbsp;`)
        })
        return text
    }


    return (
        <Form id='edit_form' className={className} onSubmit={submitForm}>
            <Form.Group>
                <Form.Control
                    ref={titleRef}
                    id='title'
                    as='div'
                    contentEditable
                    placeholder="Enter title"
                    style={{border: `${titleError ? '4px solid #ff6565' : 'none'}`}}
                    dangerouslySetInnerHTML={{__html: editNoteTitle}}
                />
                {titleError ?
                    <div className="custom-error-message">{titleError}</div>
                    : null
                }
                <Form.Control
                    ref={descriptionRef}
                    id='description'
                    as='div'
                    contentEditable
                    style={{border: `${descriptionError ? '4px solid #ff6565' : 'none'}`}}
                    placeholder="Enter text"
                    dangerouslySetInnerHTML={{__html: editNoteDescription}}
                />
                {descriptionError ?
                    <div className="custom-error-message">{descriptionError}</div>
                    : null
                }
                <Form.Control
                    id='tags'
                    name='tags'
                    type="text"
                    placeholder="Enter tags"
                    value={editedTags}
                    onChange={setTags}
                />
            </Form.Group>
        </Form>
    );
};
