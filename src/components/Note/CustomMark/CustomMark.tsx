import {FC, ReactNode} from "react";
import './CustomMark.scss'

interface CustomMarkProps {
    children: ReactNode
}

export const CustomMark: FC<CustomMarkProps> = ({children}) => {
    return (
        <mark className='custom-mark'>
            {children}
        </mark>
    );
};