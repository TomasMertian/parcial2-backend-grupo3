import React from "react";

const Select = ({
    value,
    onChange,
    options = [],
    name
}) => {
    return (
        <select
            className="custom-select"
            value={value}
            onChange={onChange}
            name={name}
        >
            {options.map((option) => (
                <option 
                    key={option}
                    value={option}
                >
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Select;