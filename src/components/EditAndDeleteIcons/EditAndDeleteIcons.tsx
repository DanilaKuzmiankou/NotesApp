import {IconContext} from "react-icons";
import {BiEditAlt} from "react-icons/bi";
import {FC, SyntheticEvent} from "react";
import {AiOutlineDelete} from "react-icons/ai";

interface EditAndDeleteIconsProps {
    className: string,
    onEdit(event: SyntheticEvent<Element, Event>): void,
    onDelete(event: SyntheticEvent<Element, Event>): void
}

export const EditAndDeleteIcons:FC<EditAndDeleteIconsProps> = ({className, onEdit, onDelete}) => {
    return (
        <div className={className}>
            <IconContext.Provider value={{size: '45', color: 'white'}}>
                <BiEditAlt className='icon' onClick={(e: SyntheticEvent) => onEdit(e)}/>
                <AiOutlineDelete className='icon' onClick={(e: SyntheticEvent) => onDelete(e)}/>
            </IconContext.Provider>
        </div>
    );
};

