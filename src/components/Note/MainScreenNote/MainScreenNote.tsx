import './MainScreenNote.scss'
import {FC, memo, MouseEventHandler, SyntheticEvent, useCallback, useEffect, useMemo, useState} from "react";
import {BiEditAlt} from "react-icons/bi";
import { IconContext } from 'react-icons';
import {AiOutlineDelete, AiOutlineEye} from "react-icons/ai";
import {CustomModal} from "../../CustomModal/CustomModal";
import {BasicNote} from "../BasicNote/BasicNote";
import {EditAndDeleteIcons} from "../../EditAndDeleteIcons/EditAndDeleteIcons";
import {EditNote} from "../EditNote/EditNote";


interface NoteProps {
    title:string,
    description:string
}

export const MainScreenNote:FC<NoteProps> = ({title, description}) => {

    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    const colors = ['purple', 'pink', 'lilac', 'orange', 'dark_purple', 'light_orange']

    const getRandomInt = (max:number):number => {
        return Math.floor(Math.random() * max);
    }

    const randomNumber = useMemo(() => getRandomInt(6), []);

    const changeViewModalVisibility = ():void => setShowModal(!showModal)

    const changeEditModalVisibility = ():void => setShowEditModal(!showEditModal);

    const deleteNote = (event: SyntheticEvent<Element, Event>) => {
        event.stopPropagation()
        console.log('delete')
    }

    const editNote = (event: SyntheticEvent<Element, Event>) => {
        event.stopPropagation()
        setShowModal(false)
        setShowEditModal(true)
        console.log('edit')
    }

    console.log(colors[randomNumber])
    return (
        <>
                <BasicNote
                    className={`basic_container container ${colors[randomNumber]}`}
                    onClick={changeViewModalVisibility}
                    title={title}
                    description={description}
                >
                    <EditAndDeleteIcons className='animated_icons' onDelete={deleteNote} onEdit={editNote} />
                    <IconContext.Provider value={{ size: '105', color: 'white' }}>
                        <AiOutlineEye className='view_icon' />
                    </IconContext.Provider>
                </BasicNote>
                <CustomModal bodyClassName={colors[randomNumber]} show={showModal} onHide={changeViewModalVisibility}>
                <BasicNote className={`basic_container ${colors[randomNumber]}`} title={title} description={description}>
                    <EditAndDeleteIcons className='icons' onDelete={deleteNote} onEdit={editNote} />
                </BasicNote>
                </CustomModal>
            <CustomModal bodyClassName={colors[randomNumber]} show={showEditModal} onHide={changeEditModalVisibility}>
                    <EditNote title={title} description={description} className={colors[randomNumber]} />
            </CustomModal>

        </>
    );
};