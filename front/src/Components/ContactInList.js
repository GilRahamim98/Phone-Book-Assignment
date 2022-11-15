import React, { useState } from 'react'
import './ContactInList.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import UpdateContactForm from './UpdateContactForm'


function ContactInList(props) {
    const [showEditForm, setShowEditForm] = useState(false)

    const handleCloseEditForm = () => setShowEditForm(false)
    const handleShowEditForm = () => setShowEditForm(true)
    const getImageStyle = (filters) => {
        const options = filters.map(filter => {
            return `${filter.property}(${filter.value}${filter.unit})`
        })
        return { filter: options.join(' ') }
    }

    return (
        <div>
            {props.contact.nickname ?
                <div className="contact" onClick={handleShowEditForm}>
                    <h1 >{props.contact.nickname}</h1>
                </div>
                : <div className="contact" onClick={handleShowEditForm}>
                    <h1>{props.contact.firstName} {props.contact.lastName}
                        <img className="contact_photo" src={props.contact.photo[0]} alt={props.contact.first_name} style={getImageStyle(JSON.parse(props.contact.photo[1]))} />
                    </h1>
                </div>}
            <Modal show={showEditForm} onHide={handleCloseEditForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body><UpdateContactForm contact={props.contact} getContacts={props.getContacts} handleCloseEditForm={handleCloseEditForm}></UpdateContactForm></Modal.Body>

            </Modal>

        </div>
    )
}

export default ContactInList