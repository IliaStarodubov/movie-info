import React, { Children, FC } from "react";
import classes from './Button.module.scss'

interface ButtonProps {
    onClick: () => void;
    children: string;
}

const Button: FC<ButtonProps> = ({onClick, children}) => {
    return (
        <button onClick={() => onClick()} className={classes.btn}>
            {children}
        </button>
    )
}

export default Button