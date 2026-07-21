import React from "react";

const Input = ({
    type = "text",
    placeholder,
    value,
    onChange,
    name
}) => {
    return (
        <input
            className="custom-input"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
        />
    );
};

export default Input;