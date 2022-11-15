import React, { useEffect, useState } from 'react'
import { useContacts } from '../hooks/useContacts'
import { UPDATE_CONTACT } from '../hooks/updateContact'
import { Mutation } from '@apollo/react-components'
import InputField from './InputField'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import FilterSlider from './FilterSlider'
import { DEFAULT_OPTIONS } from '../common/filters'
import { validate } from '../common/validations'

function UpdateContactForm(props) {
    const { error, loading, data } = useContacts()

    const [imgData, setImgData] = useState(null);

    const [filters, setFilters] = useState(JSON.parse(props.contact.photo[1]))

    const [updateContactForm, setUpdateContactForm] = useState({
        firstname: {
            value: props.contact.firstName,
            validations: {
                required: true
            },
            errors: [],
            type: "text",
            name: "First Name",
        },
        lastname: {
            value: props.contact.lastName,
            validations: {
                required: true,
            },
            errors: [],
            type: "text",
            name: "Last Name",
        },
        nickname: {
            value: props.contact.nickname ? props.contact.nickname : "",
            type: "text",
            name: "Nickname",
        },
        phonenumbers: {
            value: props.contact.phoneNumbers.toString(),
            validations: {
                required: true,
            },
            type: "text",
            name: "Phone Numbers"
        },
        address: {
            value: props.contact.address,
            validations: {
                required: true,
            },
            type: "text",
            name: "Address",
        },
        photo: {
            value: props.contact.photo[0],
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
        const currentInput = updateContactForm.photo
        currentInput.value = url
        setUpdateContactForm({ ...updateContactForm })
    }
    const handleChange = ({ target: { name, value } }) => {
        const currentInput = updateContactForm[name]
        currentInput.value = value
        currentInput.errors = validate(name, value, currentInput.validations)
        setUpdateContactForm({ ...updateContactForm })
    }
    const createForm = () => {
        return Object.keys(updateContactForm)
            .map(field => updateContactForm[field].type === "file" ? <InputField key={field} {...updateContactForm[field]} handleChangePicture={onChangePicture} ></InputField> : <InputField key={field} {...updateContactForm[field]} handleChange={handleChange} ></InputField>)
    }
    const handleSliderChange = ({ target }) => {
        setFilters(prevFilters => {
            return prevFilters.map((filter) => {
                if (filter.name !== target.name) return filter
                return { ...filter, value: target.value }
            })
        })
    }
    const getImageStyle = () => {
        const options = filters.map(filter => {
            return `${filter.property}(${filter.value}${filter.unit})`
        })
        return { filter: options.join(' ') }
    }
    const handleSubmit = async (e, updateContact) => {
        e.preventDefault()

        updateContact({
            variables: {
                updateContactData: {
                    contactId: props.contact.contactId,
                    firstName: updateContactForm.firstname.value,
                    lastName: updateContactForm.lastname.value,
                    nickname: updateContactForm.nickname.value,
                    phoneNumbers: updateContactForm.phonenumbers.value.split(','),
                    address: updateContactForm.address.value,
                    photo: [updateContactForm.photo.value, JSON.stringify(filters)]
                }
            }
        })
        window.location.reload(false);

        props.handleCloseEditForm()

    }
    return (
        <Mutation mutation={UPDATE_CONTACT}>
            {(updateContact, { data }) => (
                < Form onSubmit={(e) => handleSubmit(e, updateContact)}>
                    {createForm()}
                    <div>
                        <Image className="profile_pic" thumbnail src={imgData ? imgData : props.contact.photo[0]} alt="profilePic" style={getImageStyle()} />
                        <h1>Filters:</h1>
                        {filters.map(filter => <FilterSlider key={filter.name}
                            name={filter.name}
                            min={filter.range.min}
                            max={filter.range.max}
                            value={filter.value}
                            handleChange={handleSliderChange}></FilterSlider>)}
                    </div>

                    <Button type="submit">Save Changes!</Button>
                </Form >
            )}
        </Mutation >
    )
}

export default UpdateContactForm