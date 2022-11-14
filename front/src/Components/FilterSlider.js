import React from 'react'
import Form from 'react-bootstrap/Form';

function FilterSlider({ name, min, max, value, handleChange }) {
    return (
        <div>
            <Form.Group className="mb-3" >
                <Form.Label>{name}</Form.Label>
                <Form.Control type="range"
                    className="slider"
                    name={name}
                    min={min}
                    max={max}
                    value={value}
                    onChange={handleChange} />


            </Form.Group>
        </div>
    )
}

export default FilterSlider