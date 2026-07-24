import React from "react";

const Button = ({ children, onClick, type = "button", disabled = false }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="custom-button"
        >
            {children}
        </button>
    );
};

export default Button;