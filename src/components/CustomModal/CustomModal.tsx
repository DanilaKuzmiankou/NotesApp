import {Button, Modal} from "react-bootstrap";
import {FC, MouseEventHandler, ReactNode} from "react";
import './CustomModal.scss'

interface CustomModalProps {
    show: boolean,
    children: ReactNode,
    onHide?: MouseEventHandler<HTMLButtonElement>,
    bodyClassName?: string,
    saveButton?: boolean,
}

export const CustomModal: FC<CustomModalProps> = ({onHide, show, children, bodyClassName, saveButton}) => {

    return (
        <Modal
            show={show}
            size="xl"
            backdrop='static'
            centered
            keyboard
        >
            <Modal.Body className={`${bodyClassName} modal_body`}>
                {children}
                <div className={`${bodyClassName} buttons`}>
                    {saveButton ?
                        <Button
                            className='button'
                            variant="success"
                            form='edit_form'
                            type="submit"
                        >
                            Save
                        </Button>
                        : null
                    }
                    <Button className='button' variant="danger" onClick={onHide}>Close</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};