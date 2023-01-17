import {FC, memo, SyntheticEvent, useState} from "react";
import {IconContext} from 'react-icons';
import {AiOutlineEye} from "react-icons/ai";
import {CustomModal} from "../../CustomModal/CustomModal";
import {BasicNote} from "../BasicNote/BasicNote";
import {EditAndDeleteIcons} from "../../EditAndDeleteIcons/EditAndDeleteIcons";
import {EditNote} from "../EditNote/EditNote";


interface NoteProps {
    id: number,
    title: string,
    description: string,
    tags: string[],
    color: string,
    saveNote: (id: number | undefined, title: string, description: string, color: string | undefined, tags: string[] | undefined) => void
    deleteNote: (id: number) => void
}

export const MainScreenNote: FC<NoteProps> = memo(({id, title, description, tags, color, saveNote, deleteNote}) => {

    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    const changeViewModalVisibility = (): void => setShowModal(!showModal)

    const changeEditModalVisibility = (): void => setShowEditModal(!showEditModal);

    const handleDeleteNote = (event: SyntheticEvent<Element, Event>) => {
        event.stopPropagation()
        deleteNote(id)
    }

    const editNote = (event: SyntheticEvent<Element, Event>) => {
        event.stopPropagation()
        setShowModal(false)
        setShowEditModal(true)
    }

    return (
        <>
            <BasicNote
                className={`basic_container container ${color}`}
                onClick={changeViewModalVisibility}
                title={title}
                tags={tags}
                description={description}
            >
                <EditAndDeleteIcons className='animated_icons' onDelete={handleDeleteNote} onEdit={editNote}/>
                <IconContext.Provider value={{size: '105', color: 'white'}}>
                    <AiOutlineEye className='view_icon'/>
                </IconContext.Provider>
            </BasicNote>
            <CustomModal bodyClassName={color} show={showModal} onHide={changeViewModalVisibility}>
                <BasicNote
                    className={`view_container ${color}`}
                    title={title}
                    description={description}
                    tags={tags}
                    showTags
                >
                    <EditAndDeleteIcons className='icons' onDelete={handleDeleteNote} onEdit={editNote}/>
                </BasicNote>
            </CustomModal>
            <CustomModal
                saveButton
                bodyClassName={color}
                show={showEditModal}
                onHide={changeEditModalVisibility}
            >
                <EditNote
                    id={id}
                    title={title}
                    description={description}
                    tags={tags}
                    className={color}
                    saveNote={saveNote}
                />
            </CustomModal>
        </>
    );
});