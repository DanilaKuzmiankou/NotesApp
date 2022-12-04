import {
    FC,
    SyntheticEvent, useEffect,
    useMemo,
    useState
} from "react";
import {CustomModal} from "../../CustomModal/CustomModal";
import {BasicNote} from "../BasicNote/BasicNote";
import {EditNote} from "../EditNote/EditNote";

interface NewNote {
    isEditModalOpen: boolean,
    changeEditModalState: (isOpen: boolean) => void
    saveNote: (id:  number|undefined, title:string, description:string, color: string | undefined, tags: string[] | undefined) => void
}

export const NewNote: FC<NewNote> = ({saveNote, isEditModalOpen, changeEditModalState}) => {

    const title = ''
    const description = ''

    const [showEditModal, setShowEditModal] = useState(isEditModalOpen)

    const colors = ['purple', 'pink', 'lilac', 'orange', 'dark_purple', 'light_orange']

    const getRandomInt = (max: number): number => {
        return Math.floor(Math.random() * max);
    }

    const [randomNumber, setRandomNumber] = useState(getRandomInt(6))

    const changeEditModalVisibility = (): void => {
        setShowEditModal(!showEditModal);
        changeEditModalState(!showEditModal)
    }

    const handleSaveNote = (id:  number|undefined, title:string, description:string, color: string | undefined, tags: string[] | undefined) => {
        changeEditModalVisibility()
        let newRandomNumber= randomNumber
        while (randomNumber === newRandomNumber) {
            newRandomNumber = getRandomInt(6)
        }
        setRandomNumber(newRandomNumber)
        saveNote(id, title, description, color, tags)
    }

    useEffect(() => {
        console.log('changed')
        setShowEditModal(isEditModalOpen)
    }, [isEditModalOpen])

    return (
        <>
            <BasicNote
                className={`basic_container container ${colors[randomNumber]}`}
                onClick={changeEditModalVisibility}
                title={title}
                description={description}
            >
                <h1
                    style={{
                        color: '#6c757d',
                        position: 'absolute',
                        top:'50%',
                        left: '50%',
                        transform: 'translate(calc(-50% + 30px), -50%)',
                        whiteSpace: 'nowrap'
                }}
                >
                    Add new note
                </h1>
            </BasicNote>
            <CustomModal
                saveButton
                bodyClassName={colors[randomNumber]}
                show={showEditModal}
                onHide={changeEditModalVisibility}
            >
                <EditNote
                    title={title}
                    description={description}
                    tags={[]}
                    color={colors[randomNumber]}
                    className={colors[randomNumber]}
                    saveNote={handleSaveNote}
                />
            </CustomModal>
        </>
    );
};