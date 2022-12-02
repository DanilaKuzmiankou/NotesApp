import {MouseEventHandler, ReactNode} from "react";

export interface BasicNoteProps {
    title:string,
    description:string,
    className:string,
    children?: ReactNode
    onClick?: MouseEventHandler<HTMLDivElement>
}