import {Button, Modal} from "react-bootstrap";
import {FC, MouseEventHandler, ReactNode} from "react";
import './CustomModal.scss'

interface CustomModalProps {
    show: boolean,
    children: ReactNode,
    onHide?: MouseEventHandler<HTMLButtonElement>,
    bodyClassName?: string
}

export const CustomModal:FC<CustomModalProps> = ({onHide, show, children, bodyClassName}) => {

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
                    <Button className='close_button' variant="danger" onClick={onHide}>Close</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};