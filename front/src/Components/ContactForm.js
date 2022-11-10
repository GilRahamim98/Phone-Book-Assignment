import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputField from './InputField'

function ContactForm() {
    const [contactForm, setContactForm] = useState({
        firstname: {
            value: '',
            validations: {
                required: true
            },
            errors: [],
            type: "text",
            name: "First Name",
        },
        lastname: {
            value: '',
            validations: {
                required: true,
            },
            errors: [],
            type: "text",
            name: "Last Name",
        },
        nickname: {
            value: '',
            type: "text",
            name: "Nickname",
        },
        phonenumbers: {
            value: [],
            validations: {
                required: true,
            },
            type: "text",
            name: "Phone Numbers"
        },
        address: {
            value: '',
            type: "text",
            name: "Address",
        },
        photo: {
            value: '',
            validations: {
                required: true,
                pattern: ".png||.jpeg"
            },
            errors: [],
            type: "text",
            name: "Photo",
        }
    })
    const handleChange = ({ target: { name, value } }) => {
        const currentInput = contactForm[name]
        currentInput.value = value
        // currentInput.errors = validate(name, value, currentInput.validations)
        setContactForm({ ...contactForm })
    }
    const createForm = () => {
        return Object.keys(contactForm)
            .map(field => <InputField key={field} {...contactForm[field]} handleChange={handleChange} ></InputField>)
    }

    return (
        <Form>
            {createForm()}

        </Form>
    )
}

export default ContactForm