import {FC, MouseEventHandler, ReactNode} from "react";
import './BasicNote.scss'

interface BasicNoteProps {
    title:string,
    description:string,
    className:string,
    children?: ReactNode
    onClick?: MouseEventHandler<HTMLDivElement>
}
export const BasicNote:FC<BasicNoteProps> = ({className, title,description, children, onClick}) => {
    return (
        <div className={className} onClick={onClick}>
            <h1>{title}</h1>
            <p>{description}</p>
            {children}
        </div>
    )
}