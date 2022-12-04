import {FC, MouseEventHandler, ReactNode} from "react";
import './FloatingButton.scss'

interface FloatingButtonProps {
    className?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    children: ReactNode
}

export const FloatingButton: FC<FloatingButtonProps> = ({children, className, onClick}) => {
    return (
        <button onClick={onClick} className={className ? className : 'floating_button'}>
            {children}
        </button>
    );
};