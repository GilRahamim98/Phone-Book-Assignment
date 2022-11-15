import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputField from './InputField'
import Image from 'react-bootstrap/Image'
import { validate } from '../common/validations'
import FilterSlider from './FilterSlider'
import { DEFAULT_OPTIONS } from '../common/filters'
import { CREATE_CONTACT } from '../hooks/createContact'
import { Mutation } from '@apollo/react-components'
import './ContactForm.css'

function ContactForm(props) {
    const [imgData, setImgData] = useState(null);
    const [filters, setFilters] = useState(DEFAULT_OPTIONS)
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
            validations: {
                required: true,
            },
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
            validations: {
                required: true,
            },
            type: "text",
            name: "Address",
        },
        photo: {
            value: '',
            validations: {
                required: true,
            },
            errors: [],
            type: "file",
            name: "Photo",
        }
    })


    const onChangePicture = (url) => {
        setImgData(url)
        const currentInput = contactForm.photo
        currentInput.value = url
        setContactForm({ ...contactForm })
    }
    const handleSliderChange = ({ target }) => {
        console.log(filters);
        setFilters(prevFilters => {
            return prevFilters.map((filter) => {
                if (filter.name !== target.name) return filter
                return { ...filter, value: target.value }
            })
        })
    }
    const handleChange = ({ target: { name, value } }) => {
        const currentInput = contactForm[name]
        currentInput.value = value
        currentInput.errors = validate(name, value, currentInput.validations)
        setContactForm({ ...contactForm })
    }
    const createForm = () => {
        return Object.keys(contactForm)
            .map(field => contactForm[field].type === "file" ? <InputField key={field} {...contactForm[field]} handleChangePicture={onChangePicture} ></InputField> : <InputField key={field} {...contactForm[field]} handleChange={handleChange} ></InputField>)
    }
    const getImageStyle = () => {
        const options = filters.map(filter => {
            return `${filter.property}(${filter.value}${filter.unit})`
        })
        return { filter: options.join(' ') }
    }
    const handleSubmit = async (e, createContact) => {
        e.preventDefault()

        createContact({
            variables: {
                createContactData: {
                    firstName: contactForm.firstname.value,
                    lastName: contactForm.lastname.value,
                    nickname: contactForm.nickname.value,
                    phoneNumbers: contactForm.phonenumbers.value.split(','),
                    address: contactForm.address.value,
                    photo: [contactForm.photo.value, JSON.stringify(filters)]
                }
            }
        })
        props.handleCloseAddForm()
        window.location.reload(false);


    }
    return (
        <Mutation mutation={CREATE_CONTACT}>
            {(createContact, { data }) => (
                < Form onSubmit={(e) => handleSubmit(e, createContact)}>
                    {createForm()}
                    {!imgData ?
                        null :
                        <div>
                            <Image className="profile_pic" thumbnail src={imgData} alt="profilePic" style={getImageStyle()} />
                            <h1>Filters:</h1>
                            {filters.map(filter => <FilterSlider key={filter.name}
                                name={filter.name}
                                min={filter.range.min}
                                max={filter.range.max}
                                value={filter.value}
                                handleChange={handleSliderChange}></FilterSlider>)}
                        </div>
                    }
                    <Button type="submit">Add!</Button>
                </Form >
            )}
        </Mutation >
    )
}
export default ContactForm