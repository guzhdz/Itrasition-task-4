//React import
import React from 'react';

//Styles import
import styles from './shared.module.css';

const Button = ({ type, disabled = false, text, children, color = "", customColor = "", rounded = "rounded", onClick = () => { } }) => {
    return (
        <>
            <button
                className={`
                    btn 
                    fw-medium 
                    fs-6 
                    ${rounded}
                    mb-2 
                    ${color} 
                    ${styles[customColor]} 
                    ${styles['button-custom']}`
                }
                type={type}
                disabled={disabled}
                onClick={onClick}>
                {text}
                {children}
            </button>
        </>
    );
};

export default Button;