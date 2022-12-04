import {MouseEventHandler, ReactNode} from "react";

export interface BasicNoteProps extends Note{
    className:string,
    children?: ReactNode
    onClick?: MouseEventHandler<HTMLDivElement>
}

export interface Note {
    id?: number
    title:string,
    description:string,
    color?: string,
    tags: string[]
}

export interface BasicNote {
    id: number
    title:string,
    description:string,
    color: string,
    tags?: string[]
}