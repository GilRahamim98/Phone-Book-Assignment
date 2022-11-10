import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';


function InputField(field) {
    return (
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>{field.name}</Form.Label>
            <InputGroup hasValidation>
                <Form.Control
                    type="text"
                    placeholder={field.name}
                    aria-describedby="inputGroupPrepend"
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please enter a valid {field.name}.
                </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
    )
}

export default InputField