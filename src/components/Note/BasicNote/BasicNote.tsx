import {FC, MouseEventHandler, ReactNode} from "react";
import './BasicNote.scss'
import {highlightTags} from "../../../utils/Utils";

interface BasicNoteProps {
    title: string,
    description: string,
    tags?: string[]
    className: string,
    children?: ReactNode
    onClick?: MouseEventHandler<HTMLDivElement>
    showTags?: boolean
}

export const BasicNote: FC<BasicNoteProps> = ({
                                                  className,
                                                  title,
                                                  description,
                                                  tags = [],
                                                  children,
                                                  onClick,
                                                  showTags = false
                                              }) => {

    const noteDescription = highlightTags(description, tags)
    const noteTitle = highlightTags(title, tags)

    return (
        <div className={className} onClick={onClick}>
            {showTags ?
                <>
                    <h1 dangerouslySetInnerHTML={{__html: noteTitle}}/>
                    <p dangerouslySetInnerHTML={{__html: noteDescription}}/>
                </>
                :
                <>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </>
            }

            {tags ? <h2>{tags.join(', ')}</h2> : null}
            {children}
        </div>
    )
}