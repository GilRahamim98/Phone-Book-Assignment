import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputField from './InputField'
import Image from 'react-bootstrap/Image'
import { validate } from '../common/validations'
import './ContactForm.css'
import FilterSlider from './FilterSlider'
import { DEFAULT_OPTIONS } from '../common/filters'
import { CREATE_CONTACT } from '../hooks/createContact'
import { useMutation } from '@apollo/client'


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
    const [imgData, setImgData] = useState(null);
    const [filters, setFilters] = useState(DEFAULT_OPTIONS)
    const [createContact, { error }] = useMutation(CREATE_CONTACT)

    const addContact = () => {
        createContact({
            variables: {
                firstName: "Dani",
                // lastName: "Lolo",
                // nickname: "Dan",
                // phoneNumbers: ["0525381649"],
                // address: "Golani 70,Ramat Gan",
                // photo: ["https://upcdn.io/W142hJk/raw/demo/4Da9imN.jpg", "grayscale(20 %) blur(3px) saturate(193 %)"]
            }
        })

        // createContact({
        //     variables: {
        //         firstName: contactForm.firstname.value,
        //         lastName: contactForm.lastname.value,
        //         nickname: contactForm.nickname.value,
        //         phoneNumbers: contactForm.phonenumbers.value.split(','),
        //         address: contactForm.address.value,
        //         photo: [contactForm.photo.value, getImageStyle().filter]
        //     }
        // })

        if (error) {
            console.log(error)
        }
    }


    const onChangePicture = (url) => {
        setImgData(url)
        const currentInput = contactForm.photo
        currentInput.value = url
        setContactForm({ ...contactForm })
    };
    const handleSliderChange = ({ target }) => {

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
    const handleSubmit = async (e) => {
        e.preventDefault()
        await addContact()

    }

    return (
        <Form onSubmit={handleSubmit}>
            {createForm()}
            {!imgData ?
                null :
                <>
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
                </>
            }
            <Button type="submit">Add!</Button>


        </Form>
    )
}

export default ContactForm